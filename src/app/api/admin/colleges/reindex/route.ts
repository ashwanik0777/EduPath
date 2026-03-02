import { NextRequest, NextResponse } from "next/server"
import connectDB from "@/app/lib/mongoose"
import { requireAdmin } from "@/app/lib/adminAuth"
import College from "@/app/models/College"
import WebsiteManagement from "@/app/models/WebsiteManagement"
import { getCollegesAlgoliaIndex, mapCollegeToAlgoliaRecord } from "@/app/lib/algolia"

export async function POST(request: NextRequest) {
  const { unauthorizedResponse } = await requireAdmin(request)
  if (unauthorizedResponse) return unauthorizedResponse

  try {
    await connectDB()

    const index = getCollegesAlgoliaIndex()
    if (!index) {
      return NextResponse.json(
        {
          success: false,
          message: "Algolia is not configured. Add ALGOLIA_APP_ID, ALGOLIA_ADMIN_API_KEY, and ALGOLIA_COLLEGES_INDEX_NAME in .env.",
        },
        { status: 400 },
      )
    }

    const colleges = await College.find({ isActive: { $ne: false } }).lean()
    const records = colleges
      .map((college) => mapCollegeToAlgoliaRecord(college as Record<string, any>))
      .filter((record) => Boolean(record.objectID))

    if (records.length > 0) {
      await index.saveObjects(records)
    }

    await WebsiteManagement.findOneAndUpdate(
      { singletonKey: "primary" },
      { $set: { collegeSearchProvider: "algolia" } },
      { upsert: true, new: true },
    )

    return NextResponse.json({
      success: true,
      data: {
        indexedCount: records.length,
        provider: "algolia",
      },
    })
  } catch (error) {
    console.error("Reindex colleges failed:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to reindex colleges",
      },
      { status: 500 },
    )
  }
}
