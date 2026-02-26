import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/lib/mongoose";
import { requireCounselor } from "@/app/lib/counselorAuth";
import College from "@/app/models/College";
import Career from "@/app/models/Career";
import Exam from "@/app/models/Exam";
import Scholarship from "@/app/models/Scholarship";

export async function GET(request: NextRequest) {
  const { unauthorizedResponse } = await requireCounselor(request);
  if (unauthorizedResponse) return unauthorizedResponse;

  await connectDB();

  const { searchParams } = new URL(request.url);
  const q = (searchParams.get("q") || "").trim();

  const [colleges, careers, exams, scholarships] = await Promise.all([
    College.find(
      q
        ? {
            $or: [
              { name: { $regex: q, $options: "i" } },
              { "location.city": { $regex: q, $options: "i" } },
              { "location.state": { $regex: q, $options: "i" } },
            ],
          }
        : {},
    )
      .select("name type category location.city location.state")
      .sort({ createdAt: -1 })
      .limit(24)
      .lean(),
    Career.find(q ? { title: { $regex: q, $options: "i" } } : {})
      .select("title stream salary_range career_nature")
      .sort({ createdAt: -1 })
      .limit(24)
      .lean(),
    Exam.find(q ? { name: { $regex: q, $options: "i" } } : {})
      .select("name type eligibility exam_date state")
      .sort({ createdAt: -1 })
      .limit(24)
      .lean(),
    Scholarship.find(q ? { name: { $regex: q, $options: "i" } } : {})
      .select("name provider amount deadline")
      .sort({ createdAt: -1 })
      .limit(24)
      .lean(),
  ]);

  return NextResponse.json({
    success: true,
    data: {
      colleges,
      careers,
      exams,
      scholarships,
      counters: {
        colleges: colleges.length,
        careers: careers.length,
        exams: exams.length,
        scholarships: scholarships.length,
      },
    },
  });
}
