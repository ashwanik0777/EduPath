import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/app/lib/mongoose"
import Counselor from "@/app/models/Counselor"
import { z } from "zod"

const counselorQuerySchema = z.object({
  specialization: z.string().optional(),
  experience: z.string().optional(),
  rating: z.string().optional(),
  availability: z.string().optional(),
})

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const queryParams = Object.fromEntries(searchParams.entries())
    const { specialization, experience, rating, availability } = counselorQuerySchema.parse(queryParams)

    // Build filter query
    const filter: any = { isActive: true }

    if (specialization && specialization !== "All") {
      filter.specializations = { $in: [specialization] }
    }

    if (experience && experience !== "All") {
      const expRange = experience.split("-")
      if (expRange.length === 2) {
        filter.experience = {
          $gte: Number.parseInt(expRange[0]),
          $lte: Number.parseInt(expRange[1]),
        }
      }
    }

    if (rating && rating !== "All") {
      filter.rating = { $gte: Number.parseFloat(rating) }
    }

    if (availability === "available") {
      filter.isAvailable = true
    }

    const counselors = await Counselor.find(filter)
      .select("name specializations experience rating bio profileImage languages sessionTypes pricing isAvailable")
      .lean()

    return NextResponse.json({
      success: true,
      data: counselors,
    })
  } catch (error: any) {
    console.error("Get counselors error:", error)

    if (error.name === "ZodError") {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid query parameters",
          errors: error.errors,
        },
        { status: 400 },
      )
    }

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch counselors",
      },
      { status: 500 },
    )
  }
}
