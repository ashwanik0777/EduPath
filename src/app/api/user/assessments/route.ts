export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const token = getTokenFromRequest(request);
    if (!token) {
      return NextResponse.json({ success: false, message: "Authentication required" }, { status: 401 });
    }
    const user = await getUserFromToken(token);
    if (!user) {
      return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 });
    }
    const body = await request.json();
    // Validate required fields
    if (!body.responses || !Array.isArray(body.responses) || !body.scores || typeof body.overallScore !== "number") {
      return NextResponse.json({ success: false, message: "Missing or invalid fields" }, { status: 400 });
    }
    // Save result
    const result = await AssessmentResult.create({
      userId: user._id,
      assessmentId: body.assessmentId || null, // If you have a static assessment, you can hardcode or fetch it
      responses: body.responses,
      scores: body.scores,
      overallScore: body.overallScore,
      recommendations: body.recommendations || {},
      completedAt: new Date(),
      timeSpent: body.timeSpent || 0,
      isValid: true,
    });
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Save assessment result error:", error);
    return NextResponse.json({ success: false, message: "Failed to save assessment result" }, { status: 500 });
  }
}
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
