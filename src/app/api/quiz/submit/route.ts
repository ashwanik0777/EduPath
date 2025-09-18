import { NextRequest, NextResponse } from "next/server";
import { getTokenFromRequest, getUserFromToken } from "@/app/lib/auth";
import User from "@/app/models/User";
import connectDB from "@/app/lib/mongoose";

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const token = getTokenFromRequest(request);
    if (!token) {
      return NextResponse.json({ success: false, message: "Not authenticated" }, { status: 401 });
    }
    const user = await getUserFromToken(token);
    if (!user) {
      return NextResponse.json({ success: false, message: "Invalid or expired token" }, { status: 401 });
    }
    const body = await request.json();
    // Save quiz results to user profile
    user.quizResult = body.quizResult;
    user.quizCompleted = true;
    await user.save();
    return NextResponse.json({ success: true, message: "Quiz result saved" });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to save quiz result" }, { status: 500 });
  }
}
