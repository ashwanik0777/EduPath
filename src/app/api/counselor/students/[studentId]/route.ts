import { NextRequest, NextResponse } from "next/server";
import { isValidObjectId } from "mongoose";
import connectDB from "@/app/lib/mongoose";
import { requireCounselor } from "@/app/lib/counselorAuth";
import Counselor from "@/app/models/Counselor";
import User from "@/app/models/User";
import CounselingSession from "@/app/models/CounselingSession";
import AssessmentResult from "@/app/models/AssessmentResult";
import Progress from "@/app/models/Progress";

export async function GET(request: NextRequest, { params }: { params: { studentId: string } }) {
  const { user, unauthorizedResponse } = await requireCounselor(request);
  if (unauthorizedResponse) return unauthorizedResponse;

  await connectDB();

  const counselor = await Counselor.findOne({ userId: user?._id }).select("_id").lean<any>();
  if (!counselor) {
    return NextResponse.json({ success: false, message: "Counselor profile not found" }, { status: 404 });
  }

  const { studentId } = params;

  if (!isValidObjectId(studentId)) {
    return NextResponse.json({ success: false, message: "Invalid student id" }, { status: 400 });
  }

  const assignmentExists = await CounselingSession.exists({
    counselorId: counselor._id,
    studentId,
  });

  if (!assignmentExists) {
    return NextResponse.json({ success: false, message: "Student not assigned to this counselor" }, { status: 403 });
  }

  const [student, sessionsRaw, progressDoc, assessmentSummary, latestResults] = await Promise.all([
    User.findById(studentId)
      .select(
        "name email profile academic preferences shortlistedColleges savedScholarships savedExams createdAt",
      )
      .lean<any>(),
    CounselingSession.find({ counselorId: counselor._id, studentId })
      .sort({ scheduledAt: -1 })
      .limit(50)
      .lean<any>(),
    Progress.findOne({ user: studentId }).lean<any>(),
    AssessmentResult.aggregate([
      { $match: { userId: studentId } },
      {
        $group: {
          _id: null,
          attempts: { $sum: 1 },
          averageScore: { $avg: "$overallScore" },
          latestCompletedAt: { $max: "$completedAt" },
        },
      },
    ]),
    AssessmentResult.find({ userId: studentId })
      .sort({ completedAt: -1 })
      .limit(8)
      .populate("assessmentId", "title")
      .lean<any>(),
  ]);

  if (!student) {
    return NextResponse.json({ success: false, message: "Student not found" }, { status: 404 });
  }

  const completedSessions = sessionsRaw.filter((session: any) => session.status === "completed").length;
  const upcomingSessions = sessionsRaw.filter(
    (session: any) =>
      (session.status === "scheduled" || session.status === "in-progress") &&
      new Date(session.scheduledAt) >= new Date(),
  ).length;

  const stepStats = {
    total: progressDoc?.steps?.length || 0,
    completed: (progressDoc?.steps || []).filter((step: any) => step.status === "completed").length,
    inProgress: (progressDoc?.steps || []).filter((step: any) => step.status === "in_progress").length,
    locked: (progressDoc?.steps || []).filter((step: any) => step.status === "locked").length,
  };

  return NextResponse.json({
    success: true,
    data: {
      student: {
        _id: String(student._id),
        name: student.name || "Student",
        email: student.email || "",
        profileImage: student.profile?.profileImage || "",
        phone: student.profile?.phone || "",
        gender: student.profile?.gender || "",
        dateOfBirth: student.profile?.dateOfBirth || null,
        academic: {
          currentLevel: student.academic?.currentLevel || "",
          institution: student.academic?.institution || "",
          course: student.academic?.course || "",
          year: student.academic?.year || null,
          percentage: student.academic?.percentage || null,
          interests: student.academic?.interests || [],
        },
        preferences: {
          careerGoal: student.preferences?.careerGoal || "",
          careerFields: student.preferences?.careerFields || [],
          preferredLocations: student.preferences?.preferredLocations || [],
          preferredCourses: student.preferences?.preferredCourses || [],
          targetedExams: student.preferences?.targetedExams || [],
        },
        createdAt: student.createdAt || null,
      },
      stats: {
        totalSessions: sessionsRaw.length,
        completedSessions,
        upcomingSessions,
        completionRate: sessionsRaw.length > 0 ? Math.round((completedSessions / sessionsRaw.length) * 100) : 0,
        assessmentsAttempted: assessmentSummary?.[0]?.attempts || 0,
        averageAssessmentScore: Math.round(assessmentSummary?.[0]?.averageScore || 0),
        latestAssessmentAt: assessmentSummary?.[0]?.latestCompletedAt || null,
        shortlistedCollegesCount: (student.shortlistedColleges || []).length,
        savedScholarshipsCount: (student.savedScholarships || []).length,
        savedExamsCount: (student.savedExams || []).length,
      },
      progress: {
        updatedAt: progressDoc?.updatedAt || null,
        steps: (progressDoc?.steps || []).map((step: any) => ({
          stepId: step.step_id,
          key: step.key,
          status: step.status,
          details: step.details || "",
          counselorNotes: step.counselor_notes || "",
          completedOn: step.completed_on || null,
        })),
        summary: stepStats,
      },
      sessions: sessionsRaw.map((session: any) => ({
        _id: String(session._id),
        type: session.type,
        scheduledAt: session.scheduledAt,
        duration: session.duration,
        status: session.status,
        platform: session.meetingDetails?.platform || "-",
        location: session.meetingDetails?.location || "",
        counselorNotes: session.notes?.counselorNotes || "",
        actionItems: session.notes?.actionItems || [],
      })),
      psychometric: {
        recentResults: latestResults.map((result: any) => ({
          id: String(result._id),
          assessmentTitle: result.assessmentId?.title || "Assessment",
          score: result.overallScore || 0,
          completedAt: result.completedAt,
          topCategories: (result.scores || [])
            .slice(0, 4)
            .map((score: any) => ({ category: score.category, percentage: score.percentage })),
        })),
      },
    },
  });
}
