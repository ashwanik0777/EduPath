import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/lib/mongoose";
import Scholarship from "@/app/models/Scholarship";
import User from "@/app/models/User";
import { getTokenFromRequest, getUserFromToken } from "@/app/lib/auth";

// GET: List saved scholarships
export async function GET(request: NextRequest) {
  await connectDB();
  const token = getTokenFromRequest(request);
  if (!token) return NextResponse.json({ success: false, message: "Auth required" }, { status: 401 });
  const user = await getUserFromToken(token);
  if (!user) return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 });
  const saved = user.savedScholarships || [];
  const scholarships = await Scholarship.find({ scholarship_id: { $in: saved } }).lean();
  return NextResponse.json({ success: true, data: scholarships });
}

// POST: Save/unsave scholarship
export async function POST(request: NextRequest) {
  await connectDB();
  const token = getTokenFromRequest(request);
  if (!token) return NextResponse.json({ success: false, message: "Auth required" }, { status: 401 });
  const user = await getUserFromToken(token);
  if (!user) return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 });
  const { scholarship_id, action } = await request.json();
  if (!scholarship_id) return NextResponse.json({ success: false, message: "Missing scholarship_id" }, { status: 400 });
  let saved = user.savedScholarships || [];
  if (action === "save") {
    if (!saved.includes(scholarship_id)) saved.push(scholarship_id);
  } else if (action === "unsave") {
    saved = saved.filter((id: string) => id !== scholarship_id);
  }
  user.savedScholarships = saved;
  await user.save();
  return NextResponse.json({ success: true, data: saved });
}
