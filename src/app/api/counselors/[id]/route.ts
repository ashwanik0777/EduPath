import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/app/lib/mongoose"
import Counselor from "@/app/models/Counselor"
import { isValidObjectId } from "mongoose"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()

    const { id } = params

    if (!isValidObjectId(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid counselor ID",
        },
        { status: 400 },
      )
    }

    const counselor = await Counselor.findById(id).lean()

    if (!counselor) {
      return NextResponse.json(
        {
          success: false,
          message: "Counselor not found",
        },
        { status: 404 },
      )
    }

    return NextResponse.json({
      success: true,
      data: counselor,
    })
  } catch (error) {
    console.error("Get counselor error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch counselor",
      },
      { status: 500 },
    )
  }
}
