import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/app/lib/mongoose"
import TechTitan from "@/app/models/TechTitan"

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const q = (searchParams.get("q") || "").trim()

    const filter: Record<string, unknown> = { isActive: true }

    if (q) {
      filter.$or = [
        { name: { $regex: q, $options: "i" } },
        { role: { $regex: q, $options: "i" } },
        { specialization: { $regex: q, $options: "i" } },
        { bio: { $regex: q, $options: "i" } },
      ]
    }

    const members = await TechTitan.find(filter).sort({ createdAt: -1 }).lean()

    return NextResponse.json({ success: true, data: members })
  } catch (error) {
    console.error("Get tech titans failed:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch tech titans" }, { status: 500 })
  }
}
