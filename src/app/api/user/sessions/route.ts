import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/app/lib/mongoose"
import CounselingSession from "@/app/models/CounselingSession"
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

    const sessions = await CounselingSession.find({ userId: user._id })
      .populate("counselorId", "name specializations profileImage")
      .sort({ scheduledDate: -1 })
      .lean()

    return NextResponse.json({
      success: true,
      data: sessions,
    })
  } catch (error) {
    console.error("Get user sessions error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch counseling sessions",
      },
      { status: 500 },
    )
  }
}
