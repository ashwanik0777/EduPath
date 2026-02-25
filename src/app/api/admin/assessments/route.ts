import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import connectDB from "@/app/lib/mongoose";
import { requireAdmin } from "@/app/lib/adminAuth";
import Assessment from "@/app/models/Assessment";
import AssessmentResult from "@/app/models/AssessmentResult";

const updateAssessmentSchema = z.object({
  assessmentId: z.string().min(1),
  isActive: z.boolean(),
});

export async function GET(request: NextRequest) {
  const { unauthorizedResponse } = await requireAdmin(request);
  if (unauthorizedResponse) return unauthorizedResponse;

  await connectDB();

  const [assessments, attempts] = await Promise.all([
    Assessment.find({})
      .sort({ createdAt: -1 })
      .select("title type duration totalQuestions isActive")
      .lean(),
    AssessmentResult.aggregate([
      { $group: { _id: "$assessmentId", attempts: { $sum: 1 } } },
    ]),
  ]);

  const attemptsMap = new Map(attempts.map((item) => [String(item._id), item.attempts]));

  return NextResponse.json({
    success: true,
    data: assessments.map((assessment: any) => ({
      ...assessment,
      attempts: attemptsMap.get(String(assessment._id)) || 0,
    })),
  });
}

export async function PATCH(request: NextRequest) {
  const { unauthorizedResponse } = await requireAdmin(request);
  if (unauthorizedResponse) return unauthorizedResponse;

  await connectDB();

  const body = await request.json();
  const parsed = updateAssessmentSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { success: false, message: "Invalid payload", errors: parsed.error.issues },
      { status: 400 },
    );
  }

  const { assessmentId, isActive } = parsed.data;

  const updated = await Assessment.findByIdAndUpdate(
    assessmentId,
    { isActive },
    { new: true },
  )
    .select("title type duration totalQuestions isActive")
    .lean();

  if (!updated) {
    return NextResponse.json({ success: false, message: "Assessment not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, data: updated });
}
