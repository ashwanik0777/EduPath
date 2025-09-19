import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/lib/mongoose";
import User from "@/app/models/User";
import { getTokenFromRequest, getUserFromToken } from "@/app/lib/auth";

// GET: Get all shortlisted colleges for the logged-in user
export async function GET(request: NextRequest) {
  await connectDB();
  const token = getTokenFromRequest(request);
  if (!token) return NextResponse.json({ success: false, message: "Authentication required" }, { status: 401 });
  const user = await getUserFromToken(token);
  if (!user) return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 });
  return NextResponse.json({ success: true, data: user.shortlistedColleges || [] });
}

// POST: Add a college to the shortlist
export async function POST(request: NextRequest) {
  await connectDB();
  const token = getTokenFromRequest(request);
  if (!token) return NextResponse.json({ success: false, message: "Authentication required" }, { status: 401 });
  const user = await getUserFromToken(token);
  if (!user) return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 });
  const body = await request.json();
  if (!body.college_id) return NextResponse.json({ success: false, message: "college_id required" }, { status: 400 });
  // Prevent duplicates
  if (user.shortlistedColleges.some((c: any) => c.college_id === body.college_id)) {
    return NextResponse.json({ success: false, message: "College already shortlisted" }, { status: 409 });
  }
  user.shortlistedColleges.push(body);
  await user.save();
  return NextResponse.json({ success: true, data: user.shortlistedColleges });
}

// PATCH: Update note or application status for a college
export async function PATCH(request: NextRequest) {
  await connectDB();
  const token = getTokenFromRequest(request);
  if (!token) return NextResponse.json({ success: false, message: "Authentication required" }, { status: 401 });
  const user = await getUserFromToken(token);
  if (!user) return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 });
  const body = await request.json();
  const idx = user.shortlistedColleges.findIndex((c: any) => c.college_id === body.college_id);
  if (idx === -1) return NextResponse.json({ success: false, message: "College not found" }, { status: 404 });
  if (body.student_note !== undefined) user.shortlistedColleges[idx].student_note = body.student_note;
  if (body.application_status !== undefined) user.shortlistedColleges[idx].application_status = body.application_status;
  await user.save();
  return NextResponse.json({ success: true, data: user.shortlistedColleges[idx] });
}

// DELETE: Remove a college from the shortlist
export async function DELETE(request: NextRequest) {
  await connectDB();
  const token = getTokenFromRequest(request);
  if (!token) return NextResponse.json({ success: false, message: "Authentication required" }, { status: 401 });
  const user = await getUserFromToken(token);
  if (!user) return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 });
  const { college_id } = await request.json();
  user.shortlistedColleges = user.shortlistedColleges.filter((c: any) => c.college_id !== college_id);
  await user.save();
  return NextResponse.json({ success: true, data: user.shortlistedColleges });
}
