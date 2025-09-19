import { NextRequest, NextResponse } from "next/server"
import connectDB from "@/app/lib/mongoose"
import CounselingSession from "@/app/models/CounselingSession"
import { getTokenFromRequest, getUserFromToken } from "@/app/lib/auth"

// PATCH: Reschedule a session
export async function PATCH(request: NextRequest) {
  try {
    await connectDB()
    const token = getTokenFromRequest(request)
    if (!token) return NextResponse.json({ success: false, message: "Authentication required" }, { status: 401 })
    const user = await getUserFromToken(token)
    if (!user) return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 })
    const { sessionId, newDate, newTime } = await request.json()
    if (!sessionId || !newDate || !newTime) return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 })
    const session = await CounselingSession.findById(sessionId)
    if (!session) return NextResponse.json({ success: false, message: "Session not found" }, { status: 404 })
    if (String(session.studentId) !== String(user._id)) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 403 })
    if (["completed", "cancelled"].includes(session.status)) return NextResponse.json({ success: false, message: "Cannot reschedule completed or cancelled session" }, { status: 400 })
    session.scheduledAt = new Date(`${newDate}T${newTime}:00.000Z`)
    session.status = "scheduled"
    await session.save()
    return NextResponse.json({ success: true, message: "Session rescheduled successfully" })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to reschedule session" }, { status: 500 })
  }
}

// DELETE: Cancel a session
export async function DELETE(request: NextRequest) {
  try {
    await connectDB()
    const token = getTokenFromRequest(request)
    if (!token) return NextResponse.json({ success: false, message: "Authentication required" }, { status: 401 })
    const user = await getUserFromToken(token)
    if (!user) return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 })
    const { sessionId, reason } = await request.json()
    if (!sessionId) return NextResponse.json({ success: false, message: "Missing sessionId" }, { status: 400 })
    const session = await CounselingSession.findById(sessionId)
    if (!session) return NextResponse.json({ success: false, message: "Session not found" }, { status: 404 })
    if (String(session.studentId) !== String(user._id)) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 403 })
    if (["completed", "cancelled"].includes(session.status)) return NextResponse.json({ success: false, message: "Cannot cancel completed or already cancelled session" }, { status: 400 })
    session.status = "cancelled"
    session.cancellation = {
      cancelledBy: "student",
      reason: reason || "Cancelled by user",
      cancelledAt: new Date(),
    }
    await session.save()
    return NextResponse.json({ success: true, message: "Session cancelled successfully" })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to cancel session" }, { status: 500 })
  }
}
