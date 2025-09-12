import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/app/lib/mongoose"
import AssessmentResult from "@/app/models/AssessmentResult"
import { getTokenFromRequest, getUserFromToken } from "@/app/lib/auth"

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    // Check authentication
    const token = getTokenFromRequest(request)
    if (!token) {
      return NextResponse.json({ success: false, message: "Authentication required" }, { status: 401 })
    }

    const user = await getUserFromToken(token)
    if (!user) {
      return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 })
    }

    const results = await AssessmentResult.find({ userId: user._id })
      .populate("assessmentId", "title type description")
      .sort({ createdAt: -1 })
      .lean()

    return NextResponse.json({
      success: true,
      data: results,
    })
  } catch (error) {
    console.error("Get user assessments error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch assessment history",
      },
      { status: 500 },
    )
  }
}
