import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/lib/mongoose";
import { requireCounselor } from "@/app/lib/counselorAuth";
import Counselor from "@/app/models/Counselor";
import CounselingSession from "@/app/models/CounselingSession";
import AssessmentResult from "@/app/models/AssessmentResult";

export async function GET(request: NextRequest) {
  const { user, unauthorizedResponse } = await requireCounselor(request);
  if (unauthorizedResponse) return unauthorizedResponse;

  await connectDB();

  const counselor = await Counselor.findOne({ userId: user?._id }).select("_id").lean<any>();
  if (!counselor) {
    return NextResponse.json({
      success: true,
      data: {
        totalAttempts: 0,
        studentsCovered: 0,
        averageScore: 0,
        topCategories: [],
        recentResults: [],
      },
    });
  }

  const studentIds = await CounselingSession.distinct("studentId", { counselorId: counselor._id });

  if (studentIds.length === 0) {
    return NextResponse.json({
      success: true,
      data: {
        totalAttempts: 0,
        studentsCovered: 0,
        averageScore: 0,
        topCategories: [],
        recentResults: [],
      },
    });
  }

  const [results, scoreStats, categoryStats] = await Promise.all([
    AssessmentResult.find({ userId: { $in: studentIds } })
      .sort({ completedAt: -1 })
      .limit(12)
      .populate("userId", "name")
      .populate("assessmentId", "title type")
      .lean(),
    AssessmentResult.aggregate([
      { $match: { userId: { $in: studentIds } } },
      {
        $group: {
          _id: null,
          totalAttempts: { $sum: 1 },
          averageScore: { $avg: "$overallScore" },
          uniqueStudents: { $addToSet: "$userId" },
        },
      },
    ]),
    AssessmentResult.aggregate([
      { $match: { userId: { $in: studentIds } } },
      { $unwind: "$scores" },
      {
        $group: {
          _id: "$scores.category",
          average: { $avg: "$scores.percentage" },
          attempts: { $sum: 1 },
        },
      },
      { $sort: { average: -1 } },
      { $limit: 6 },
    ]),
  ]);

  const summary = scoreStats[0];

  return NextResponse.json({
    success: true,
    data: {
      totalAttempts: summary?.totalAttempts || 0,
      studentsCovered: summary?.uniqueStudents?.length || 0,
      averageScore: Math.round(summary?.averageScore || 0),
      topCategories: categoryStats.map((item) => ({
        category: item._id || "General",
        average: Math.round(item.average || 0),
        attempts: item.attempts || 0,
      })),
      recentResults: results.map((result: any) => ({
        id: String(result._id),
        studentName: result.userId?.name || "Student",
        assessmentTitle: result.assessmentId?.title || "Assessment",
        score: result.overallScore || 0,
        completedAt: result.completedAt,
      })),
    },
  });
}
