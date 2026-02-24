import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/lib/mongoose";
import Counselor from "@/app/models/Counselor";
import CounselingSession from "@/app/models/CounselingSession";
import { requireCounselor } from "@/app/lib/counselorAuth";

export async function GET(request: NextRequest) {
  const { user, unauthorizedResponse } = await requireCounselor(request);
  if (unauthorizedResponse) return unauthorizedResponse;

  await connectDB();

  const counselor = await Counselor.findOne({ userId: user?._id }).lean();

  if (!counselor) {
    return NextResponse.json({
      success: true,
      data: {
        counselorProfile: null,
        counters: {
          todaySessions: 0,
          upcomingSessions: 0,
          completedSessions: 0,
          totalStudents: 0,
        },
        recentSessions: [],
      },
    });
  }

  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

  const [todaySessions, upcomingSessions, completedSessions, recentSessionsRaw, distinctStudents] = await Promise.all([
    CounselingSession.countDocuments({
      counselorId: counselor._id,
      scheduledAt: { $gte: startOfDay, $lt: endOfDay },
      status: { $in: ["scheduled", "in-progress", "completed"] },
    }),
    CounselingSession.countDocuments({
      counselorId: counselor._id,
      scheduledAt: { $gte: now },
      status: { $in: ["scheduled", "in-progress"] },
    }),
    CounselingSession.countDocuments({
      counselorId: counselor._id,
      status: "completed",
    }),
    CounselingSession.find({ counselorId: counselor._id })
      .sort({ scheduledAt: -1 })
      .limit(8)
      .populate("studentId", "name email")
      .lean(),
    CounselingSession.distinct("studentId", { counselorId: counselor._id }),
  ]);

  const recentSessions = recentSessionsRaw.map((session: any) => ({
    _id: String(session._id),
    type: session.type,
    scheduledAt: session.scheduledAt,
    duration: session.duration,
    status: session.status,
    studentName: session.studentId?.name || "Student",
    studentEmail: session.studentId?.email || "",
    platform: session.meetingDetails?.platform || "-",
  }));

  return NextResponse.json({
    success: true,
    data: {
      counselorProfile: {
        displayName: counselor.profile?.displayName || user?.name || "Counselor",
        bio: counselor.profile?.bio || "",
        profileImage: counselor.profile?.profileImage,
        specializations: counselor.specializations || [],
        languages: counselor.languages || [],
        rating: counselor.rating?.average || 0,
      },
      counters: {
        todaySessions,
        upcomingSessions,
        completedSessions,
        totalStudents: distinctStudents.length,
      },
      recentSessions,
    },
  });
}
