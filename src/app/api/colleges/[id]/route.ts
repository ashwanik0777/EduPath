import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/app/lib/mongoose"
import College from "@/app/models/College"
import { isValidObjectId } from "mongoose"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()

    const { id } = params

    if (!isValidObjectId(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid college ID",
        },
        { status: 400 },
      )
    }

    const college = await College.findById(id).lean()

    if (!college) {
      return NextResponse.json(
        {
          success: false,
          message: "College not found",
        },
        { status: 404 },
      )
    }

    return NextResponse.json({
      success: true,
      data: college,
    })
  } catch (error) {
    console.error("Get college error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch college",
      },
      { status: 500 },
    )
  }
}
