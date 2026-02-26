import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/lib/mongoose";
import { requireCounselor } from "@/app/lib/counselorAuth";
import Feedback from "@/app/models/Feedback";

export async function GET(request: NextRequest) {
  const { user, unauthorizedResponse } = await requireCounselor(request);
  if (unauthorizedResponse) return unauthorizedResponse;

  await connectDB();

  const rows = await Feedback.find({ userId: String(user?._id), type: "Counselor Suggestion" })
    .sort({ submitted_on: -1 })
    .limit(50)
    .lean();

  return NextResponse.json({ success: true, data: rows });
}

export async function POST(request: NextRequest) {
  const { user, unauthorizedResponse } = await requireCounselor(request);
  if (unauthorizedResponse) return unauthorizedResponse;

  await connectDB();

  const body = await request.json();
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const suggestionCategory = typeof body.suggestionCategory === "string" ? body.suggestionCategory.trim() : "General";

  if (!message) {
    return NextResponse.json({ success: false, message: "Message is required" }, { status: 400 });
  }

  const created = await Feedback.create({
    userId: String(user?._id),
    name: user?.name || "Counselor",
    email: user?.email || "",
    type: "Counselor Suggestion",
    message,
    suggestionText: message,
    suggestionCategory,
    status: "Pending",
    submitted_on: new Date(),
  });

  return NextResponse.json({ success: true, data: created }, { status: 201 });
}
