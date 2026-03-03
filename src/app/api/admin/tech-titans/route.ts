import { NextRequest, NextResponse } from "next/server"
import connectDB from "@/app/lib/mongoose"
import { requireAdmin } from "@/app/lib/adminAuth"
import TechTitan from "@/app/models/TechTitan"

const parseListField = (value: unknown): string[] => {
  if (Array.isArray(value)) return value.filter((item) => typeof item === "string" && item.trim())
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value)
      if (Array.isArray(parsed)) return parsed.filter(Boolean)
    } catch {
      /* ignore */
    }
    return value
      .split("|")
      .map((item) => item.trim())
      .filter(Boolean)
  }
  return []
}

const buildPayload = (payload: Record<string, unknown>) => ({
  name: (payload.name as string)?.trim() || "Tech Member",
  role: (payload.role as string)?.trim() || "Developer",
  roleType: payload.roleType || "Member",
  specialization: (payload.specialization as string)?.trim() || "",
  bio: (payload.bio as string)?.trim() || "",
  image: (payload.image as string) || "",
  imageUrl: (payload.imageUrl as string) || "",
  email: (payload.email as string) || "",
  github: (payload.github as string) || "",
  githubUrl: (payload.githubUrl as string) || "",
  linkedin: (payload.linkedin as string) || "",
  linkedinUrl: (payload.linkedinUrl as string) || "",
  website: (payload.website as string) || "",
  portfolioUrl: (payload.portfolioUrl as string) || "",
  twitter: (payload.twitter as string) || "",
  instagram: (payload.instagram as string) || "",
  facebook: (payload.facebook as string) || "",
  rollNumber: (payload.rollNumber as string) || "",
  batch: (payload.batch as string) || "",
  program: (payload.program as string) || "",
  school: (payload.school as string) || "",
  department: (payload.department as string) || "",
  responsibilities: parseListField(payload.responsibilities),
  technologies: parseListField(payload.technologies),
  contributions: parseListField(payload.contributions),
  yearsOfExperience: Number(payload.yearsOfExperience || 0),
  isActive: payload.isActive !== false,
})

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
        { school: { $regex: q, $options: "i" } },
        { program: { $regex: q, $options: "i" } },
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
    const created = await TechTitan.create(buildPayload(body?.payload || {}))
    return NextResponse.json({ success: true, data: created }, { status: 201 })
  } catch (error) {
    console.error("Admin create tech titan failed:", error)
    return NextResponse.json({ success: false, message: "Failed to create tech titan" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  const { unauthorizedResponse } = await requireAdmin(request)
  if (unauthorizedResponse) return unauthorizedResponse

  try {
    await connectDB()
    const body = await request.json()
    const { id, payload } = body as { id: string; payload: Record<string, unknown> }

    if (!id) return NextResponse.json({ success: false, message: "id is required" }, { status: 400 })

    const updated = await TechTitan.findByIdAndUpdate(
      id,
      { $set: buildPayload(payload || {}) },
      { new: true, runValidators: true }
    ).lean()

    if (!updated) return NextResponse.json({ success: false, message: "Record not found" }, { status: 404 })

    return NextResponse.json({ success: true, data: updated })
  } catch (error) {
    console.error("Admin update tech titan failed:", error)
    return NextResponse.json({ success: false, message: "Failed to update tech titan" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  const { unauthorizedResponse } = await requireAdmin(request)
  if (unauthorizedResponse) return unauthorizedResponse

  try {
    await connectDB()
    const body = await request.json()
    const id = body?.id as string

    if (!id) return NextResponse.json({ success: false, message: "id is required" }, { status: 400 })

    const deleted = await TechTitan.findByIdAndDelete(id).lean()
    if (!deleted) return NextResponse.json({ success: false, message: "Record not found" }, { status: 404 })

    return NextResponse.json({ success: true, data: deleted })
  } catch (error) {
    console.error("Admin delete tech titan failed:", error)
    return NextResponse.json({ success: false, message: "Failed to delete tech titan" }, { status: 500 })
  }
}

