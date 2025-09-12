import { type NextRequest, NextResponse } from "next/server"
import { loginUser } from "@/app/lib/auth"
import { z } from "zod"

const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input
    const validatedData = loginSchema.parse(body)

    // Authenticate user
    const { user, token } = await loginUser(validatedData)

    // Create response
    const response = NextResponse.json(
      {
        success: true,
        message: "Login successful",
        user,
      },
      { status: 200 },
    )

    // Set HTTP-only cookie
    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    })

    return response
  } catch (error: any) {
    console.error("Login error:", error)

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
        message: error.message || "Login failed",
      },
      { status: 401 },
    )
  }
}
