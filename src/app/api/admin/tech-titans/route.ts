import { NextRequest, NextResponse } from "next/server"
import connectDB from "@/app/lib/mongoose"
import { requireAdmin } from "@/app/lib/adminAuth"
import TechTitan from "@/app/models/TechTitan"

export async function GET(request: NextRequest) {
  const { unauthorizedResponse } = await requireAdmin(request)
  if (unauthorizedResponse) return unauthorizedResponse

  try {
    await connectDB()
    const { searchParams } = new URL(request.url)
    const q = (searchParams.get("q") || "").trim()

    const filter: Record<string, unknown> = {}
    if (q) {
      filter.$or = [
        { name: { $regex: q, $options: "i" } },
        { role: { $regex: q, $options: "i" } },
        { specialization: { $regex: q, $options: "i" } },
      ]
    }

    const rows = await TechTitan.find(filter).sort({ createdAt: -1 }).limit(120).lean()
    return NextResponse.json({ success: true, data: rows })
  } catch (error) {
    console.error("Admin get tech titans failed:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch tech titans" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const { unauthorizedResponse } = await requireAdmin(request)
  if (unauthorizedResponse) return unauthorizedResponse

  try {
    await connectDB()

    const body = await request.json()
    const payload = body?.payload || {}

    const created = await TechTitan.create({
      name: payload.name || "Tech Member",
      role: payload.role || "Developer",
      specialization: payload.specialization || "Engineering",
      bio: payload.bio || "",
      imageUrl: payload.imageUrl || "",
      linkedinUrl: payload.linkedinUrl || "",
      githubUrl: payload.githubUrl || "",
      portfolioUrl: payload.portfolioUrl || "",
      yearsOfExperience: Number(payload.yearsOfExperience || 0),
      isActive: payload.isActive !== false,
    })

    return NextResponse.json({ success: true, data: created }, { status: 201 })
  } catch (error) {
    console.error("Admin create tech titan failed:", error)
    return NextResponse.json({ success: false, message: "Failed to create tech titan" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  const { unauthorizedResponse } = await requireAdmin(request)
  if (unauthorizedResponse) return unauthorizedResponse

  try {
    await connectDB()

    const body = await request.json()
    const id = body?.id as string

    if (!id) {
      return NextResponse.json({ success: false, message: "id is required" }, { status: 400 })
    }

    const deleted = await TechTitan.findByIdAndDelete(id).lean()
    if (!deleted) {
      return NextResponse.json({ success: false, message: "Record not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: deleted })
  } catch (error) {
    console.error("Admin delete tech titan failed:", error)
    return NextResponse.json({ success: false, message: "Failed to delete tech titan" }, { status: 500 })
  }
}
