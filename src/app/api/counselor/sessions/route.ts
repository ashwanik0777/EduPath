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

export async function PATCH(request: NextRequest) {
  const { user, unauthorizedResponse } = await requireCounselor(request);
  if (unauthorizedResponse) return unauthorizedResponse;

  await connectDB();

  const counselor = await Counselor.findOne({ userId: user?._id }).select("_id").lean();
  if (!counselor) {
    return NextResponse.json({ success: false, message: "Counselor profile not found" }, { status: 404 });
  }

  const body = await request.json();
  const sessionId = typeof body.sessionId === "string" ? body.sessionId : "";
  const status = body.status as "scheduled" | "in-progress" | "completed" | "cancelled" | "no-show" | undefined;
  const counselorNotes = typeof body.counselorNotes === "string" ? body.counselorNotes.trim() : undefined;
  const actionItems = Array.isArray(body.actionItems)
    ? body.actionItems.filter((item: unknown) => typeof item === "string" && item.trim()).map((item: string) => item.trim())
    : undefined;

  if (!sessionId) {
    return NextResponse.json({ success: false, message: "sessionId is required" }, { status: 400 });
  }

  const update: Record<string, unknown> = {};
  if (status) update.status = status;
  if (counselorNotes !== undefined) update["notes.counselorNotes"] = counselorNotes;
  if (actionItems !== undefined) update["notes.actionItems"] = actionItems;

  if (Object.keys(update).length === 0) {
    return NextResponse.json({ success: false, message: "No updates provided" }, { status: 400 });
  }

  const updated = await CounselingSession.findOneAndUpdate(
    { _id: sessionId, counselorId: counselor._id },
    update,
    { new: true },
  )
    .populate("studentId", "name email")
    .lean();

  if (!updated) {
    return NextResponse.json({ success: false, message: "Session not found" }, { status: 404 });
  }

  return NextResponse.json({
    success: true,
    data: {
      _id: String(updated._id),
      type: updated.type,
      scheduledAt: updated.scheduledAt,
      duration: updated.duration,
      status: updated.status,
      studentName: (updated as any).studentId?.name || "Student",
      studentEmail: (updated as any).studentId?.email || "",
      platform: updated.meetingDetails?.platform || "-",
      location: updated.meetingDetails?.location || "",
      counselorNotes: updated.notes?.counselorNotes || "",
      actionItems: updated.notes?.actionItems || [],
    },
  });
}
