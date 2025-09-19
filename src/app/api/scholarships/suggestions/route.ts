import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/lib/mongoose";
import Scholarship from "@/app/models/Scholarship";
import User from "@/app/models/User";
import { getTokenFromRequest, getUserFromToken } from "@/app/lib/auth";

export async function GET(request: NextRequest) {
  await connectDB();
  const token = getTokenFromRequest(request);
  if (!token) return NextResponse.json({ success: false, message: "Auth required" }, { status: 401 });
  const user = await getUserFromToken(token);
  if (!user) return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 });
  const classLevel = user.academic?.currentLevel || "";
  const category = user.profile?.category || "";
  const income = user.profile?.income || "";
  const scholarships = await Scholarship.find({
    $or: [
      { "eligibility.class": classLevel },
      { "eligibility.category": category },
      { "eligibility.income_limit": { $regex: income, $options: "i" } }
    ]
  }).limit(5).lean();
  return NextResponse.json({ success: true, data: scholarships });
}
