import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import connectDB from "@/app/lib/mongoose";
import { requireAdmin } from "@/app/lib/adminAuth";
import Feedback from "@/app/models/Feedback";

const updateFeedbackSchema = z.object({
  feedbackId: z.string().min(1),
  status: z.enum(["Pending", "Reviewed", "Responded"]),
});

export async function GET(request: NextRequest) {
  const { unauthorizedResponse } = await requireAdmin(request);
  if (unauthorizedResponse) return unauthorizedResponse;

  await connectDB();

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");

  const filter = status && status !== "All" ? { status } : {};

  const feedbacks = await Feedback.find(filter)
    .sort({ submitted_on: -1 })
    .limit(100)
    .lean();

  return NextResponse.json({ success: true, data: feedbacks });
}

export async function PATCH(request: NextRequest) {
  const { unauthorizedResponse } = await requireAdmin(request);
  if (unauthorizedResponse) return unauthorizedResponse;

  await connectDB();

  const body = await request.json();
  const parsed = updateFeedbackSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { success: false, message: "Invalid payload", errors: parsed.error.issues },
      { status: 400 },
    );
  }

  const { feedbackId, status } = parsed.data;
  const updatedFeedback = await Feedback.findByIdAndUpdate(
    feedbackId,
    { status },
    { new: true },
  ).lean();

  if (!updatedFeedback) {
    return NextResponse.json({ success: false, message: "Feedback not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, data: updatedFeedback });
}
