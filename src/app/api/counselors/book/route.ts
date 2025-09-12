import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/app/lib/mongoose"
import CounselingSession from "@/app/models/CounselingSession"
import Counselor from "@/app/models/Counselor"
import { getTokenFromRequest, getUserFromToken } from "@/app/lib/auth"
import { z } from "zod"

const bookSessionSchema = z.object({
  counselorId: z.string().min(1, "Counselor ID is required"),
  sessionType: z.enum(["video", "audio", "chat"]),
  scheduledDate: z.string().min(1, "Scheduled date is required"),
  duration: z.number().min(15).max(120),
  notes: z.string().optional(),
})

export async function POST(request: NextRequest) {
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
    const validatedData = bookSessionSchema.parse(body)

    // Check if counselor exists and is available
    const counselor = await Counselor.findById(validatedData.counselorId)
    if (!counselor) {
      return NextResponse.json(
        {
          success: false,
          message: "Counselor not found",
        },
        { status: 404 },
      )
    }

    if (!counselor.isAvailable) {
      return NextResponse.json(
        {
          success: false,
          message: "Counselor is not available",
        },
        { status: 400 },
      )
    }

    // Check for scheduling conflicts
    const scheduledDate = new Date(validatedData.scheduledDate)
    const endTime = new Date(scheduledDate.getTime() + validatedData.duration * 60000)

    const conflictingSession = await CounselingSession.findOne({
      counselorId: validatedData.counselorId,
      status: { $in: ["scheduled", "in-progress"] },
      $or: [
        {
          scheduledDate: { $lte: scheduledDate },
          endTime: { $gt: scheduledDate },
        },
        {
          scheduledDate: { $lt: endTime },
          endTime: { $gte: endTime },
        },
      ],
    })

    if (conflictingSession) {
      return NextResponse.json(
        {
          success: false,
          message: "Time slot is not available",
        },
        { status: 409 },
      )
    }

    // Calculate pricing
    const sessionTypePrice = counselor.pricing.find((p) => p.type === validatedData.sessionType)
    const totalPrice = sessionTypePrice ? sessionTypePrice.price * (validatedData.duration / 60) : 0

    // Create session
    const session = new CounselingSession({
      userId: user._id,
      counselorId: validatedData.counselorId,
      sessionType: validatedData.sessionType,
      scheduledDate,
      endTime,
      duration: validatedData.duration,
      notes: validatedData.notes,
      price: totalPrice,
      status: "scheduled",
    })

    await session.save()

    return NextResponse.json(
      {
        success: true,
        message: "Session booked successfully",
        data: {
          sessionId: session._id,
          scheduledDate: session.scheduledDate,
          duration: session.duration,
          price: session.price,
          counselorName: counselor.name,
        },
      },
      { status: 201 },
    )
  } catch (error: any) {
    console.error("Book session error:", error)

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
        message: "Failed to book session",
      },
      { status: 500 },
    )
  }
}
