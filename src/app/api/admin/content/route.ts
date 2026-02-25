import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/lib/mongoose";
import { requireAdmin } from "@/app/lib/adminAuth";
import College from "@/app/models/College";
import Career from "@/app/models/Career";
import Exam from "@/app/models/Exam";
import Scholarship from "@/app/models/Scholarship";

type Resource = "colleges" | "careers" | "exams" | "scholarships";

const allowedResources: Resource[] = ["colleges", "careers", "exams", "scholarships"];

function isResource(value: string | null): value is Resource {
  return !!value && allowedResources.includes(value as Resource);
}

function getModel(resource: Resource) {
  if (resource === "colleges") return College;
  if (resource === "careers") return Career;
  if (resource === "exams") return Exam;
  return Scholarship;
}

function createId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}

export async function GET(request: NextRequest) {
  const { unauthorizedResponse } = await requireAdmin(request);
  if (unauthorizedResponse) return unauthorizedResponse;

  await connectDB();

  const { searchParams } = new URL(request.url);
  const resourceParam = searchParams.get("resource");
  const q = searchParams.get("q")?.trim();

  if (!isResource(resourceParam)) {
    return NextResponse.json({ success: false, message: "Invalid resource" }, { status: 400 });
  }

  const model = getModel(resourceParam);

  const query: Record<string, unknown> = {};
  if (q) {
    if (resourceParam === "colleges") {
      query.$or = [
        { name: { $regex: q, $options: "i" } },
        { "location.city": { $regex: q, $options: "i" } },
        { "location.state": { $regex: q, $options: "i" } },
      ];
    } else if (resourceParam === "careers") {
      query.title = { $regex: q, $options: "i" };
    } else {
      query.name = { $regex: q, $options: "i" };
    }
  }

  const rows = await model.find(query).sort({ createdAt: -1 }).limit(120).lean();
  return NextResponse.json({ success: true, data: rows });
}

export async function POST(request: NextRequest) {
  const { unauthorizedResponse } = await requireAdmin(request);
  if (unauthorizedResponse) return unauthorizedResponse;

  await connectDB();

  const body = await request.json();
  const resource = body.resource as Resource;
  const payload = body.payload || {};

  if (!allowedResources.includes(resource)) {
    return NextResponse.json({ success: false, message: "Invalid resource" }, { status: 400 });
  }

  let createPayload: Record<string, unknown> = payload;

  if (resource === "colleges") {
    createPayload = {
      name: payload.name || "New College",
      shortName: payload.name || "College",
      type: payload.type || "government",
      category: payload.category || "engineering",
      location: {
        city: payload.city || "Unknown",
        state: payload.state || "Unknown",
        pincode: "000000",
      },
      courses: [],
      facilities: [],
      placement: {},
      contact: {},
      isActive: true,
    };
  }

  if (resource === "careers") {
    createPayload = {
      career_id: createId("career"),
      title: payload.title || "Career",
      stream: payload.stream || "General",
      salary_range: payload.salary_range || "-",
      career_nature: payload.career_nature || "General",
      description: "",
      required_skills: [],
      education_path: [],
    };
  }

  if (resource === "exams") {
    createPayload = {
      exam_id: createId("exam"),
      name: payload.name || "Exam",
      type: payload.type || "General",
      eligibility: payload.eligibility || "Not specified",
      exam_date: payload.exam_date || "TBD",
      state: payload.state || "All India",
    };
  }

  if (resource === "scholarships") {
    createPayload = {
      scholarship_id: createId("scholarship"),
      name: payload.name || "Scholarship",
      provider: payload.provider || "Unknown Provider",
      amount: payload.amount || "-",
      deadline: payload.deadline || "TBD",
      eligibility: { class: "Any", category: "Any", income_limit: "-" },
      apply_link: "",
      documents_required: [],
    };
  }

  const model = getModel(resource);
  const created = await model.create(createPayload);
  return NextResponse.json({ success: true, data: created }, { status: 201 });
}

export async function DELETE(request: NextRequest) {
  const { unauthorizedResponse } = await requireAdmin(request);
  if (unauthorizedResponse) return unauthorizedResponse;

  await connectDB();

  const body = await request.json();
  const resource = body.resource as Resource;
  const id = body.id as string;

  if (!allowedResources.includes(resource) || !id) {
    return NextResponse.json({ success: false, message: "Invalid payload" }, { status: 400 });
  }

  const model = getModel(resource);
  const deleted = await model.findByIdAndDelete(id).lean();

  if (!deleted) {
    return NextResponse.json({ success: false, message: "Record not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, data: deleted });
}
