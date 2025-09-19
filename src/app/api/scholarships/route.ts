import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/lib/mongoose";
import Scholarship from "@/app/models/Scholarship";

// GET: List/filter/search scholarships
export async function GET(request: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(request.url);
  const query: any = {};
  if (searchParams.get("q")) query.name = { $regex: searchParams.get("q"), $options: "i" };
  if (searchParams.get("class")) query["eligibility.class"] = searchParams.get("class");
  if (searchParams.get("category")) query["eligibility.category"] = searchParams.get("category");
  if (searchParams.get("income")) query["eligibility.income_limit"] = { $regex: searchParams.get("income"), $options: "i" };
  if (searchParams.get("type")) query.type = searchParams.get("type");
  if (searchParams.get("location")) query.location = searchParams.get("location");
  if (searchParams.get("gender")) query.gender = searchParams.get("gender");
  const scholarships = await Scholarship.find(query).sort({ deadline: 1 }).lean();
  return NextResponse.json({ success: true, data: scholarships });
}
