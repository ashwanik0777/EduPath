import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/app/lib/mongoose"
import College from "@/app/models/College"
import { getCollegesAlgoliaIndex } from "@/app/lib/algolia"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = (searchParams.get("q") || "").trim()
    const limit = Number(searchParams.get("limit") || 20)

    if (!query) {
      return NextResponse.json({ success: true, data: [] })
    }

    const index = getCollegesAlgoliaIndex()
    if (index) {
      const result = await index.search(query, { hitsPerPage: limit })
      const hits = Array.isArray(result?.hits) ? result.hits : []
      if (hits.length > 0) {
        return NextResponse.json({ success: true, data: hits })
      }
    }

    await connectDB()

    const fallback = await College.find({
      isActive: { $ne: false },
      $or: [
        { name: { $regex: query, $options: "i" } },
        { shortName: { $regex: query, $options: "i" } },
        { "location.city": { $regex: query, $options: "i" } },
        { "location.state": { $regex: query, $options: "i" } },
        { eligibilitySummary: { $regex: query, $options: "i" } },
        { "courses.name": { $regex: query, $options: "i" } },
      ],
    })
      .sort({ name: 1 })
      .limit(limit)
      .lean()

    return NextResponse.json({ success: true, data: fallback })
  } catch (error) {
    console.error("College search failed:", error)
    return NextResponse.json({ success: false, message: "Search failed" }, { status: 500 })
  }
}
