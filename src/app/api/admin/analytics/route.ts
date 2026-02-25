import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/lib/mongoose";
import { requireAdmin } from "@/app/lib/adminAuth";
import User from "@/app/models/User";
import Assessment from "@/app/models/Assessment";
import AssessmentResult from "@/app/models/AssessmentResult";
import CounselingSession from "@/app/models/CounselingSession";

export async function GET(request: NextRequest) {
  const { unauthorizedResponse } = await requireAdmin(request);
  if (unauthorizedResponse) return unauthorizedResponse;

  await connectDB();

  const now = new Date();

  const [
    totalStudents,
    studentsWithAssessments,
    studentsWithSessions,
    scoreStats,
    completedSessions,
    scheduledSessions,
    totalAssessments,
    activeAssessments,
    totalResults,
    avgResult,
    totalSessions,
    upcomingSessions,
    cancelledSessions,
  ] = await Promise.all([
    User.countDocuments({ role: "student" }),
    User.countDocuments({ role: "student", assessments: { $exists: true, $not: { $size: 0 } } }),
    User.countDocuments({ role: "student", sessions: { $exists: true, $not: { $size: 0 } } }),
    AssessmentResult.aggregate([{ $group: { _id: null, averageAssessmentScore: { $avg: "$overallScore" } } }]),
    CounselingSession.countDocuments({ status: "completed" }),
    CounselingSession.countDocuments({ status: { $in: ["scheduled", "in-progress"] } }),
    Assessment.countDocuments({}),
    Assessment.countDocuments({ isActive: true }),
    AssessmentResult.countDocuments({}),
    AssessmentResult.aggregate([{ $group: { _id: null, averageScore: { $avg: "$overallScore" } } }]),
    CounselingSession.countDocuments({}),
    CounselingSession.countDocuments({ scheduledAt: { $gte: now }, status: { $in: ["scheduled", "in-progress"] } }),
    CounselingSession.countDocuments({ status: "cancelled" }),
  ]);

  const topAssessmentsAggregation = await AssessmentResult.aggregate([
    { $group: { _id: "$assessmentId", attempts: { $sum: 1 } } },
    { $sort: { attempts: -1 } },
    { $limit: 5 },
  ]);

  const assessmentIds = topAssessmentsAggregation.map((item) => item._id);
  const assessmentDocs = await Assessment.find({ _id: { $in: assessmentIds } }).select("title").lean();
  const assessmentTitleMap = new Map(assessmentDocs.map((item: any) => [String(item._id), item.title]));

  const topAssessments = topAssessmentsAggregation.map((item) => ({
    id: String(item._id),
    title: assessmentTitleMap.get(String(item._id)) || "Assessment",
    attempts: item.attempts,
  }));

  const recentResultsDocs = await AssessmentResult.find({})
    .sort({ completedAt: -1 })
    .limit(8)
    .populate("assessmentId", "title")
    .populate("userId", "name")
    .lean();

  const recentResults = recentResultsDocs.map((item: any) => ({
    id: String(item._id),
    assessmentTitle: item.assessmentId?.title || "Assessment",
    studentName: item.userId?.name || "Student",
    overallScore: item.overallScore || 0,
    completedAt: item.completedAt,
  }));

  const shortlistAggregation = await User.aggregate([
    { $match: { role: "student" } },
    { $project: { shortlistedColleges: 1 } },
    { $unwind: { path: "$shortlistedColleges", preserveNullAndEmptyArrays: false } },
    {
      $group: {
        _id: "$shortlistedColleges.name",
        count: { $sum: 1 },
        applied: {
          $sum: {
            $cond: [{ $eq: ["$shortlistedColleges.application_status", "applied"] }, 1, 0],
          },
        },
      },
    },
    { $sort: { count: -1 } },
  ]);

  const totalShortlisted = shortlistAggregation.reduce((sum, item) => sum + (item.count || 0), 0);
  const appliedCount = shortlistAggregation.reduce((sum, item) => sum + (item.applied || 0), 0);

  return NextResponse.json({
    success: true,
    data: {
      progress: {
        totalStudents,
        studentsWithAssessments,
        studentsWithSessions,
        averageAssessmentScore: Number(scoreStats?.[0]?.averageAssessmentScore || 0),
        completedSessions,
        scheduledSessions,
      },
      psychometric: {
        totalAssessments,
        activeAssessments,
        totalResults,
        averageScore: Number(avgResult?.[0]?.averageScore || 0),
        topAssessments,
        recentResults,
      },
      shortlists: {
        totalShortlisted,
        appliedCount,
        uniqueCollegeCount: shortlistAggregation.length,
        topColleges: shortlistAggregation.slice(0, 8).map((item) => ({
          name: item._id || "Unknown College",
          count: item.count || 0,
          applied: item.applied || 0,
        })),
      },
      counseling: {
        totalSessions,
        upcomingSessions,
        completedSessions,
        cancelledSessions,
      },
    },
  });
}
