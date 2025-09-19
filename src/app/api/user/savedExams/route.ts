import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/lib/mongoose";
import Exam from "@/app/models/Exam";
import User from "@/app/models/User";
import { getTokenFromRequest, getUserFromToken } from "@/app/lib/auth";

// GET: List saved exams
export async function GET(request: NextRequest) {
  await connectDB();
  const token = getTokenFromRequest(request);
  if (!token) return NextResponse.json({ success: false, message: "Auth required" }, { status: 401 });
  const user = await getUserFromToken(token);
  if (!user) return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 });
  const saved = user.savedExams || [];
  const exams = await Exam.find({ exam_id: { $in: saved } }).lean();
  return NextResponse.json({ success: true, data: exams });
}

// POST: Save/unsave exam
export async function POST(request: NextRequest) {
  await connectDB();
  const token = getTokenFromRequest(request);
  if (!token) return NextResponse.json({ success: false, message: "Auth required" }, { status: 401 });
  const user = await getUserFromToken(token);
  if (!user) return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 });
  const { exam_id, action } = await request.json();
  if (!exam_id) return NextResponse.json({ success: false, message: "Missing exam_id" }, { status: 400 });
  let saved = user.savedExams || [];
  if (action === "save") {
    if (!saved.includes(exam_id)) saved.push(exam_id);
  } else if (action === "unsave") {
    saved = saved.filter((id: string) => id !== exam_id);
  }
  user.savedExams = saved;
  await user.save();
  return NextResponse.json({ success: true, data: saved });
}
