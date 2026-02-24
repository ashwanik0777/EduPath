import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/lib/mongoose";
import { requireAdmin } from "@/app/lib/adminAuth";
import User from "@/app/models/User";
import College from "@/app/models/College";
import Career from "@/app/models/Career";
import Exam from "@/app/models/Exam";
import Scholarship from "@/app/models/Scholarship";
import Counselor from "@/app/models/Counselor";
import Feedback from "@/app/models/Feedback";

export async function GET(request: NextRequest) {
  const { unauthorizedResponse } = await requireAdmin(request);
  if (unauthorizedResponse) return unauthorizedResponse;

  await connectDB();

  const [
    usersCount,
    studentsCount,
    counselorsCount,
    adminsCount,
    collegesCount,
    careersCount,
    examsCount,
    scholarshipsCount,
    feedbacksCount,
    pendingFeedbacksCount,
    recentUsers,
    recentFeedbacks,
  ] = await Promise.all([
    User.countDocuments({}),
    User.countDocuments({ role: "student" }),
    User.countDocuments({ role: "counselor" }),
    User.countDocuments({ role: "admin" }),
    College.countDocuments({}),
    Career.countDocuments({}),
    Exam.countDocuments({}),
    Scholarship.countDocuments({}),
    Feedback.countDocuments({}),
    Feedback.countDocuments({ status: "Pending" }),
    User.find({}).sort({ createdAt: -1 }).limit(5).select("name email role isActive createdAt").lean(),
    Feedback.find({}).sort({ submitted_on: -1 }).limit(5).select("name email type message status submitted_on").lean(),
  ]);

  return NextResponse.json({
    success: true,
    data: {
      counters: {
        users: usersCount,
        students: studentsCount,
        counselors: counselorsCount,
        admins: adminsCount,
        colleges: collegesCount,
        careers: careersCount,
        exams: examsCount,
        scholarships: scholarshipsCount,
        feedbacks: feedbacksCount,
        pendingFeedbacks: pendingFeedbacksCount,
      },
      recentUsers,
      recentFeedbacks,
    },
  });
}
