import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/app/lib/mongoose"
import Assessment from "@/app/models/Assessment"
import { getTokenFromRequest, getUserFromToken } from "@/app/lib/auth"
import { z } from "zod"

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const assessments = await Assessment.find({ isActive: true })
      .select("title description type duration questionCount")
      .lean()

    return NextResponse.json({
      success: true,
      data: assessments,
    })
  } catch (error) {
    console.error("Get assessments error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch assessments",
      },
      { status: 500 },
    )
  }
}

const createAssessmentSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  type: z.enum(["personality", "aptitude", "interest", "skills"]),
  questions: z
    .array(
      z.object({
        question: z.string().min(1),
        options: z.array(z.string()).min(2),
        correctAnswer: z.number().optional(),
        category: z.string().optional(),
      }),
    )
    .min(1),
  duration: z.number().min(1),
  isActive: z.boolean().default(true),
})

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    // Check authentication
    const token = getTokenFromRequest(request)
    if (!token) {
      return NextResponse.json({ success: false, message: "Authentication required" }, { status: 401 })
    }

    const user = await getUserFromToken(token)
    if (!user || user.role !== "admin") {
      return NextResponse.json({ success: false, message: "Admin access required" }, { status: 403 })
    }

    const body = await request.json()
    const validatedData = createAssessmentSchema.parse(body)

    const assessment = new Assessment({
      ...validatedData,
      createdBy: user._id,
    })

    await assessment.save()

    return NextResponse.json(
      {
        success: true,
        message: "Assessment created successfully",
        data: assessment,
      },
      { status: 201 },
    )
  } catch (error: any) {
    console.error("Create assessment error:", error)

    if (error.name === "ZodError") {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid input data",
          errors: error.errors,
        },
        { status: 400 },
      )
    }

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create assessment",
      },
      { status: 500 },
    )
  }
}
