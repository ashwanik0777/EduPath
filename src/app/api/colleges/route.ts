import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/app/lib/mongoose"
import College from "@/app/models/College"
import { z } from "zod"

const collegeQuerySchema = z.object({
  page: z.string().optional().default("1"),
  limit: z.string().optional().default("10"),
  search: z.string().optional(),
  state: z.string().optional(),
  category: z.string().optional(),
  course: z.string().optional(),
  ranking: z.string().optional(),
  sortBy: z.string().optional().default("name"),
  sortOrder: z.enum(["asc", "desc"]).optional().default("asc"),
})

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const queryParams = Object.fromEntries(searchParams.entries())
    const { page, limit, search, state, category, course, ranking, sortBy, sortOrder } =
      collegeQuerySchema.parse(queryParams)

    const pageNum = Number.parseInt(page)
    const limitNum = Number.parseInt(limit)
    const skip = (pageNum - 1) * limitNum

    // Build filter query
    const filter: any = {}

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
        { courses: { $elemMatch: { $regex: search, $options: "i" } } },
      ]
    }

    if (state && state !== "All") {
      filter.state = state
    }

    if (category && category !== "All") {
      filter.category = category
    }

    if (course && course !== "All") {
      filter.courses = { $in: [course] }
    }

    if (ranking && ranking !== "All") {
      const rankingRange = ranking.split("-")
      if (rankingRange.length === 2) {
        filter.nirfRanking = {
          $gte: Number.parseInt(rankingRange[0]),
          $lte: Number.parseInt(rankingRange[1]),
        }
      }
    }

    // Build sort query
    const sort: any = {}
    sort[sortBy] = sortOrder === "asc" ? 1 : -1

    // Execute queries
    const [colleges, total] = await Promise.all([
      College.find(filter).sort(sort).skip(skip).limit(limitNum).lean(),
      College.countDocuments(filter),
    ])

    const totalPages = Math.ceil(total / limitNum)

    return NextResponse.json({
      success: true,
      data: {
        colleges,
        pagination: {
          currentPage: pageNum,
          totalPages,
          totalItems: total,
          itemsPerPage: limitNum,
          hasNextPage: pageNum < totalPages,
          hasPrevPage: pageNum > 1,
        },
      },
    })
  } catch (error: any) {
    console.error("Get colleges error:", error)

    if (error.name === "ZodError") {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid query parameters",
          errors: error.errors,
        },
        { status: 400 },
      )
    }

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch colleges",
      },
      { status: 500 },
    )
  }
}

const createCollegeSchema = z.object({
  name: z.string().min(1, "College name is required"),
  location: z.string().min(1, "Location is required"),
  state: z.string().min(1, "State is required"),
  category: z.enum(["Engineering", "Medical", "Arts", "Commerce", "Science", "Management", "Law", "Other"]),
  courses: z.array(z.string()).min(1, "At least one course is required"),
  fees: z.object({
    tuition: z.number().min(0),
    hostel: z.number().min(0).optional(),
    other: z.number().min(0).optional(),
  }),
  nirfRanking: z.number().optional(),
  placementStats: z
    .object({
      averagePackage: z.number().min(0).optional(),
      highestPackage: z.number().min(0).optional(),
      placementRate: z.number().min(0).max(100).optional(),
    })
    .optional(),
  admissionProcess: z.string().optional(),
  website: z.string().url().optional(),
  established: z.number().optional(),
})

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const body = await request.json()
    const validatedData = createCollegeSchema.parse(body)

    // Check if college already exists
    const existingCollege = await College.findOne({
      name: validatedData.name,
      location: validatedData.location,
    })

    if (existingCollege) {
      return NextResponse.json(
        {
          success: false,
          message: "College already exists in this location",
        },
        { status: 409 },
      )
    }

    const college = new College(validatedData)
    await college.save()

    return NextResponse.json(
      {
        success: true,
        message: "College created successfully",
        data: college,
      },
      { status: 201 },
    )
  } catch (error: any) {
    console.error("Create college error:", error)

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
        message: "Failed to create college",
      },
      { status: 500 },
    )
  }
}
