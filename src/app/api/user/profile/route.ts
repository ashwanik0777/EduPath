export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const token = getTokenFromRequest(request);
    if (!token) {
      return NextResponse.json({ success: false, message: "Authentication required" }, { status: 401 });
    }
    const user = await getUserFromToken(token);
    if (!user) {
      return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 });
    }
    // Fetch full user profile from DB
    const dbUser = await User.findById(user._id).select("name email profile").lean();
    if (!dbUser) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: dbUser });
  } catch (error) {
    console.error("Get user profile error:", error);
    return NextResponse.json({ success: false, message: "Failed to fetch profile" }, { status: 500 });
  }
}
import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/app/lib/mongoose"
import User from "@/app/models/User"
import { getTokenFromRequest, getUserFromToken } from "@/app/lib/auth"
import { z } from "zod"


const updateProfileSchema = z.object({
  // Basic
  name: z.string().min(2).optional(),
  profilePhoto: z.string().optional(),
  dateOfBirth: z.string().optional(),
  gender: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  address: z.string().optional(),
  state: z.string().optional(),
  district: z.string().optional(),
  city: z.string().optional(),
  pincode: z.string().optional(),
  // Academic
  class: z.string().optional(),
  stream: z.string().optional(),
  board: z.string().optional(),
  prevMarks: z.string().optional(),
  school: z.string().optional(),
  passingYear: z.string().optional(),
  // Career
  careerFields: z.array(z.string()).optional(),
  preferredCourses: z.array(z.string()).optional(),
  targetedExams: z.array(z.string()).optional(),
  careerGoal: z.string().optional(),
  // Psychometric
  testTaken: z.string().optional(),
  testDate: z.string().optional(),
  strengths: z.string().optional(),
  suggestedCareers: z.string().optional(),
  // Counseling
  sessionsAttended: z.string().optional(),
  lastCounselingDate: z.string().optional(),
  counselorRemarks: z.string().optional(),
  actionItems: z.string().optional(),
});

export async function PUT(request: NextRequest) {
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


    const validatedData = updateProfileSchema.parse(body);

    // Map frontend fields to User model structure
    const updateObj: any = {};
    // Basic
    if (validatedData.name) updateObj.name = validatedData.name;
    if (validatedData.email) updateObj.email = validatedData.email;
    updateObj.profile = {
      ...(user.profile || {}),
      profileImage: validatedData.profilePhoto,
      dateOfBirth: validatedData.dateOfBirth,
      gender: validatedData.gender,
      phone: validatedData.phone,
      address: {
        ...(user.profile?.address || {}),
        street: validatedData.address,
        city: validatedData.city,
        state: validatedData.state,
        pincode: validatedData.pincode,
      },
    };
    // Academic
    updateObj.academic = {
      ...(user.academic || {}),
      currentLevel: validatedData.class,
      course: validatedData.stream,
      institution: validatedData.school,
      year: validatedData.passingYear,
      percentage: validatedData.prevMarks,
      board: validatedData.board,
    };
    // Career Preferences
    updateObj.preferences = {
      ...(user.preferences || {}),
      careerFields: validatedData.careerFields,
      preferredCourses: validatedData.preferredCourses,
      targetedExams: validatedData.targetedExams,
      careerGoal: validatedData.careerGoal,
    };
    // Psychometric
    updateObj.psychometric = {
      ...(user.psychometric || {}),
      testTaken: validatedData.testTaken,
      testDate: validatedData.testDate,
      strengths: validatedData.strengths,
      suggestedCareers: validatedData.suggestedCareers,
    };
    // Counseling
    updateObj.counseling = {
      ...(user.counseling || {}),
      sessionsAttended: validatedData.sessionsAttended,
      lastCounselingDate: validatedData.lastCounselingDate,
      counselorRemarks: validatedData.counselorRemarks,
      actionItems: validatedData.actionItems,
    };

    // Update user profile
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { $set: updateObj },
      { new: true, runValidators: true },
    ).select("-password");

    if (!updatedUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 },
      )
    }

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUser,
    })
  } catch (error: any) {
    console.error("Update profile error:", error)

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
        message: "Failed to update profile",
      },
      { status: 500 },
    )
  }
}
