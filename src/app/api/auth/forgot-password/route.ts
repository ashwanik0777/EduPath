import { type NextRequest, NextResponse } from "next/server"
import { generateResetToken } from "@/app/lib/auth"
import connectDB from "@/app/lib/mongoose"
import User from "@/app/models/User"
import { z } from "zod"

const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email format"),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = forgotPasswordSchema.parse(body)

    await connectDB()

    // Check if user exists
    const user = await User.findOne({ email: email.toLowerCase() })
    if (!user) {
      // Don't reveal if email exists or not for security
      return NextResponse.json(
        {
          success: true,
          message: "If an account with that email exists, we've sent a password reset link.",
        },
        { status: 200 },
      )
    }

    // Generate reset token
    const resetToken = generateResetToken(email)

    // In a real application, you would send an email here
    // For now, we'll just return the token (remove this in production)
    console.log(`Password reset token for ${email}: ${resetToken}`)

    return NextResponse.json(
      {
        success: true,
        message: "If an account with that email exists, we've sent a password reset link.",
        // Remove this in production - only for development
        resetToken: process.env.NODE_ENV === "development" ? resetToken : undefined,
      },
      { status: 200 },
    )
  } catch (error: any) {
    console.error("Forgot password error:", error)

    if (error.name === "ZodError") {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email format",
          errors: error.errors,
        },
        { status: 400 },
      )
    }

    return NextResponse.json(
      {
        success: false,
        message: "Failed to process password reset request",
      },
      { status: 500 },
    )
  }
}
