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
    return NextResponse.json({ success: true, data: [] });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");

  const filter: Record<string, unknown> = {
    counselorId: counselor._id,
  };

  if (status && status !== "All") {
    filter.status = status;
  }

  const sessions = await CounselingSession.find(filter)
    .sort({ scheduledAt: -1 })
    .limit(100)
    .populate("studentId", "name email")
    .lean();

  const normalized = sessions.map((session: any) => ({
    _id: String(session._id),
    type: session.type,
    scheduledAt: session.scheduledAt,
    duration: session.duration,
    status: session.status,
    studentName: session.studentId?.name || "Student",
    studentEmail: session.studentId?.email || "",
    platform: session.meetingDetails?.platform || "-",
    location: session.meetingDetails?.location || "",
  }));

  return NextResponse.json({ success: true, data: normalized });
}
