import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/app/lib/mongoose"
import Assessment from "@/app/models/Assessment"
import AssessmentResult from "@/app/models/AssessmentResult"
import { getTokenFromRequest, getUserFromToken } from "@/app/lib/auth"
import { isValidObjectId } from "mongoose"
import { z } from "zod"

const submitAssessmentSchema = z.object({
  responses: z
    .array(
      z.object({
        questionId: z.string(),
        selectedOption: z.number(),
      }),
    )
    .min(1),
  timeSpent: z.number().min(1),
})

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()

    const { id } = params

    if (!isValidObjectId(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid assessment ID",
        },
        { status: 400 },
      )
    }

    // Check authentication
    const token = getTokenFromRequest(request)
    if (!token) {
      return NextResponse.json({ success: false, message: "Authentication required" }, { status: 401 })
    }

    const user = await getUserFromToken(token)
    if (!user) {
      return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 })
    }

    const body = await request.json()
    const { responses, timeSpent } = submitAssessmentSchema.parse(body)

    // Get assessment
    const assessment = await Assessment.findById(id)
    if (!assessment) {
      return NextResponse.json(
        {
          success: false,
          message: "Assessment not found",
        },
        { status: 404 },
      )
    }

    // Calculate score and recommendations
    let score = 0
    const categoryScores: Record<string, number> = {}

    responses.forEach((response) => {
      const question = assessment.questions.find((q: { _id: { toString: () => string } }) => q._id.toString() === response.questionId)
      if (question) {
        if (question.correctAnswer !== undefined && question.correctAnswer === response.selectedOption) {
          score += 1
        }

        // Track category scores for personality/interest assessments
        if (question.category) {
          categoryScores[question.category] = (categoryScores[question.category] || 0) + 1
        }
      }
    })

    const totalQuestions = assessment.questions.length
    const percentage = (score / totalQuestions) * 100

    // Generate recommendations based on assessment type and scores
    const recommendations = generateRecommendations(assessment.type, categoryScores, percentage)

    // Save result
    const result = new AssessmentResult({
      userId: user._id,
      assessmentId: id,
      responses,
      score,
      percentage,
      categoryScores,
      recommendations,
      timeSpent,
    })

    await result.save()

    return NextResponse.json({
      success: true,
      message: "Assessment submitted successfully",
      data: {
        score,
        percentage,
        categoryScores,
        recommendations,
        resultId: result._id,
      },
    })
  } catch (error: any) {
    console.error("Submit assessment error:", error)

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
        message: "Failed to submit assessment",
      },
      { status: 500 },
    )
  }
}

function generateRecommendations(
  assessmentType: string,
  categoryScores: Record<string, number>,
  percentage: number,
): string[] {
  const recommendations: string[] = []

  switch (assessmentType) {
    case "personality":
      const topPersonalityTrait = Object.keys(categoryScores).reduce((a, b) =>
        categoryScores[a] > categoryScores[b] ? a : b,
      )

      if (topPersonalityTrait === "analytical") {
        recommendations.push("Engineering", "Data Science", "Research", "Finance")
      } else if (topPersonalityTrait === "creative") {
        recommendations.push("Design", "Arts", "Marketing", "Media")
      } else if (topPersonalityTrait === "social") {
        recommendations.push("Teaching", "Psychology", "Social Work", "HR")
      }
      break

    case "aptitude":
      if (percentage >= 80) {
        recommendations.push("Competitive Exams", "Engineering", "Medical", "Research")
      } else if (percentage >= 60) {
        recommendations.push("Management", "Commerce", "Liberal Arts")
      } else {
        recommendations.push("Skill-based Courses", "Vocational Training", "Diploma Programs")
      }
      break

    case "interest":
      const topInterest = Object.keys(categoryScores).reduce((a, b) => (categoryScores[a] > categoryScores[b] ? a : b))

      if (topInterest === "technology") {
        recommendations.push("Computer Science", "IT", "Electronics", "Robotics")
      } else if (topInterest === "healthcare") {
        recommendations.push("Medicine", "Nursing", "Pharmacy", "Physiotherapy")
      } else if (topInterest === "business") {
        recommendations.push("MBA", "Commerce", "Economics", "Entrepreneurship")
      }
      break

    default:
      recommendations.push("General Career Counseling Recommended")
  }

  return recommendations
}
