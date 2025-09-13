import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/app/lib/mongoose"
import Assessment from "@/app/models/Assessment"
import { isValidObjectId } from "mongoose"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
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

    const assessment = await Assessment.findById(id).lean()

    if (!assessment) {
      return NextResponse.json(
        {
          success: false,
          message: "Assessment not found",
        },
        { status: 404 },
      )
    }

    return NextResponse.json({
      success: true,
      data: assessment,
    })
  } catch (error) {
    console.error("Get assessment error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch assessment",
      },
      { status: 500 },
    )
  }
}
