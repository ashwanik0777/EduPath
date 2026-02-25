import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import connectDB from "@/app/lib/mongoose";
import { requireAdmin } from "@/app/lib/adminAuth";
import CounselingSession from "@/app/models/CounselingSession";

const updateSessionSchema = z.object({
  sessionId: z.string().min(1),
  status: z.enum(["scheduled", "in-progress", "completed", "cancelled", "no-show"]),
});

export async function GET(request: NextRequest) {
  const { unauthorizedResponse } = await requireAdmin(request);
  if (unauthorizedResponse) return unauthorizedResponse;

  await connectDB();

  const sessions = await CounselingSession.find({})
    .sort({ scheduledAt: -1 })
    .limit(120)
    .populate("studentId", "name")
    .populate("counselorId", "profile.displayName")
    .lean();

  return NextResponse.json({
    success: true,
    data: sessions.map((session: any) => ({
      _id: String(session._id),
      type: session.type,
      status: session.status,
      scheduledAt: session.scheduledAt,
      duration: session.duration,
      studentName: session.studentId?.name || "Student",
      counselorName: session.counselorId?.profile?.displayName || "Counselor",
      platform: session.meetingDetails?.platform || "-",
    })),
  });
}

export async function PATCH(request: NextRequest) {
  const { unauthorizedResponse } = await requireAdmin(request);
  if (unauthorizedResponse) return unauthorizedResponse;

  await connectDB();

  const body = await request.json();
  const parsed = updateSessionSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { success: false, message: "Invalid payload", errors: parsed.error.issues },
      { status: 400 },
    );
  }

  const { sessionId, status } = parsed.data;

  const updated = await CounselingSession.findByIdAndUpdate(
    sessionId,
    { status },
    { new: true },
  ).lean();

  if (!updated) {
    return NextResponse.json({ success: false, message: "Session not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, data: updated });
}
