import { type NextRequest, NextResponse } from "next/server"
import { getTokenFromRequest, getUserFromToken } from "@/app/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const token = getTokenFromRequest(request)

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "No authentication token provided",
        },
        { status: 401 },
      )
    }

    const user = await getUserFromToken(token)

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid or expired token",
        },
        { status: 401 },
      )
    }

    return NextResponse.json(
      {
        success: true,
        user: {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
          class: user.class,
          stream: user.stream,
          quizCompleted: user.quizCompleted,
          quizResult: user.quizResult,
          profile: user.profile ? {
            phone: user.profile.phone,
            dateOfBirth: user.profile.dateOfBirth,
            firstName: user.profile.firstName,
            lastName: user.profile.lastName,
            gender: user.profile.gender,
            address: user.profile.address,
            profileImage: user.profile.profileImage,
          } : undefined,
        },
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Get user error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to get user information",
      },
      { status: 500 },
    )
  }
}
