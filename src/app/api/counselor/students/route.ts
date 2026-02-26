import { NextRequest, NextResponse } from "next/server";
import { isValidObjectId } from "mongoose";
import connectDB from "@/app/lib/mongoose";
import { requireCounselor } from "@/app/lib/counselorAuth";
import Counselor from "@/app/models/Counselor";
import CounselingSession from "@/app/models/CounselingSession";

export async function GET(request: NextRequest) {
  const { user, unauthorizedResponse } = await requireCounselor(request);
  if (unauthorizedResponse) return unauthorizedResponse;

  await connectDB();

  const counselor = await Counselor.findOne({ userId: user?._id }).select("_id").lean<any>();
  if (!counselor) {
    return NextResponse.json({ success: true, data: [] });
  }

  const { searchParams } = new URL(request.url);
  const q = (searchParams.get("q") || "").trim().toLowerCase();

  const rows = await CounselingSession.aggregate([
    { $match: { counselorId: counselor._id } },
    { $sort: { scheduledAt: -1 } },
    {
      $group: {
        _id: "$studentId",
        totalSessions: { $sum: 1 },
        completedSessions: {
          $sum: { $cond: [{ $eq: ["$status", "completed"] }, 1, 0] },
        },
        upcomingSessions: {
          $sum: {
            $cond: [
              {
                $and: [
                  { $in: ["$status", ["scheduled", "in-progress"]] },
                  { $gte: ["$scheduledAt", new Date()] },
                ],
              },
              1,
              0,
            ],
          },
        },
        lastSessionAt: { $max: "$scheduledAt" },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "_id",
        as: "student",
      },
    },
    { $unwind: "$student" },
    {
      $project: {
        studentId: "$_id",
        name: "$student.name",
        email: "$student.email",
        profileImage: "$student.profile.profileImage",
        totalSessions: 1,
        completedSessions: 1,
        upcomingSessions: 1,
        lastSessionAt: 1,
      },
    },
    { $sort: { totalSessions: -1, lastSessionAt: -1 } },
    { $limit: 100 },
  ]);

  const filtered = rows
    .filter((item: any) => isValidObjectId(item.studentId))
    .filter((item: any) => {
      if (!q) return true;
      const name = String(item.name || "").toLowerCase();
      const email = String(item.email || "").toLowerCase();
      return name.includes(q) || email.includes(q);
    })
    .map((item: any) => ({
      studentId: String(item.studentId),
      name: item.name || "Student",
      email: item.email || "",
      profileImage: item.profileImage || "",
      totalSessions: item.totalSessions || 0,
      completedSessions: item.completedSessions || 0,
      upcomingSessions: item.upcomingSessions || 0,
      completionRate:
        item.totalSessions > 0 ? Math.round(((item.completedSessions || 0) / item.totalSessions) * 100) : 0,
      lastSessionAt: item.lastSessionAt || null,
    }));

  return NextResponse.json({ success: true, data: filtered });
}
