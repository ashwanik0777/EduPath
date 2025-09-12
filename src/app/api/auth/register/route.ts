import { type NextRequest, NextResponse } from "next/server"
import { registerUser } from "@/app/lib/auth"
import { z } from "zod"

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.string().optional(),
  dateOfBirth: z.string().optional(),
  class: z.string().optional(),
  stream: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input
    const validatedData = registerSchema.parse(body)

    // Register user
    const { user, token } = await registerUser(validatedData)

    // Create response
    const response = NextResponse.json(
      {
        success: true,
        message: "Registration successful",
        user,
      },
      { status: 201 },
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
    console.error("Registration error:", error)

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
        message: error.message || "Registration failed",
      },
      { status: 400 },
    )
  }
}
