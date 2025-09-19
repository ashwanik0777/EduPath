import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/lib/mongoose";
import Exam from "@/app/models/Exam";

// GET: List/filter/search exams
export async function GET(request: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(request.url);
  const query: any = {};
  if (searchParams.get("q")) query.name = { $regex: searchParams.get("q"), $options: "i" };
  if (searchParams.get("type")) query.type = searchParams.get("type");
  if (searchParams.get("qualification")) query.eligibility = { $regex: searchParams.get("qualification"), $options: "i" };
  if (searchParams.get("department")) query.department = searchParams.get("department");
  if (searchParams.get("state")) query.state = searchParams.get("state");
  if (searchParams.get("mode")) query.exam_mode = searchParams.get("mode");
  if (searchParams.get("language")) query.languages = searchParams.get("language");
  const exams = await Exam.find(query).sort({ exam_date: 1 }).lean();
  return NextResponse.json({ success: true, data: exams });
}
