import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/lib/mongoose";
import Exam from "@/app/models/Exam";
import User from "@/app/models/User";
import { getTokenFromRequest, getUserFromToken } from "@/app/lib/auth";

export async function GET(request: NextRequest) {
  await connectDB();
  const token = getTokenFromRequest(request);
  if (!token) return NextResponse.json({ success: false, message: "Auth required" }, { status: 401 });
  const user = await getUserFromToken(token);
  if (!user) return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 });
  const qualification = user.academic?.currentLevel || "";
  const exams = await Exam.find({ eligibility: { $regex: qualification, $options: "i" } }).limit(5).lean();
  return NextResponse.json({ success: true, data: exams });
}
