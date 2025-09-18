import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/lib/mongoose";
import Institute from "@/app/models/Institute";

// GET: List institutes with filters (JK only)
export async function GET(req: NextRequest) {
  await dbConnect();
  const searchParams = req.nextUrl.searchParams;
  const academic = searchParams.get("academic"); // 10th, 12th, graduation
  const district = searchParams.get("district");
  const stream = searchParams.get("stream");
  const type = searchParams.get("type");
  const medium = searchParams.get("medium");
  const coed = searchParams.get("coed");

  // Map academic stage to grade_level/type
  let gradeLevel: string | undefined;
  let instType: string | undefined;
  if (academic === "10th") {
    gradeLevel = "11th-12th";
    instType = "school";
  } else if (academic === "12th") {
    gradeLevel = "UG";
    instType = "college";
  } else if (academic === "graduation") {
    gradeLevel = "PG";
    instType = "university";
  }

  const query: any = { state_code: "JK" };
  if (gradeLevel) query.grade_level = gradeLevel;
  if (instType) query.type = instType;
  if (district) query.district = district;
  if (type) query.type = type;
  if (medium) query["courses.medium"] = medium;
  if (coed) query.coed_type = coed;
  if (stream) query["courses.streams"] = stream;

  const institutes = await Institute.find(query).lean();
  return NextResponse.json({ institutes });
}

// GET by ID: /api/institutes?id=xxx
export async function POST(req: NextRequest) {
  await dbConnect();
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: "No id provided" }, { status: 400 });
  const inst = await Institute.findById(id).lean();
  if (!inst) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ institute: inst });
}
