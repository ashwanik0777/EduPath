import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/app/lib/mongoose"
import User from "@/app/models/User"
import { getTokenFromRequest, getUserFromToken } from "@/app/lib/auth"
import { z } from "zod"

const updateProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
  phone: z.string().optional(),
  dateOfBirth: z.string().optional(),
  class: z.string().optional(),
  stream: z.string().optional(),
  interests: z.array(z.string()).optional(),
  goals: z.array(z.string()).optional(),
})

export async function PUT(request: NextRequest) {
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

    const body = await request.json()

    const validatedData = updateProfileSchema.parse(body)

    // Build update object for nested fields
    const updateObj: any = {};
    if (validatedData.name) updateObj.name = validatedData.name;
    if (validatedData.class) updateObj.class = validatedData.class;
    if (validatedData.stream) updateObj.stream = validatedData.stream;
    if (validatedData.phone || validatedData.dateOfBirth) {
      updateObj["profile"] = {};
      if (validatedData.phone) updateObj["profile"].phone = validatedData.phone;
      if (validatedData.dateOfBirth) updateObj["profile"].dateOfBirth = validatedData.dateOfBirth;
    }

    // Update user profile
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { $set: updateObj },
      { new: true, runValidators: true },
    ).select("-password")

    if (!updatedUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 },
      )
    }

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUser,
    })
  } catch (error: any) {
    console.error("Update profile error:", error)

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
        message: "Failed to update profile",
      },
      { status: 500 },
    )
  }
}
