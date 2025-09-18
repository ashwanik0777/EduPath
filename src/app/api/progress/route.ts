import { NextRequest, NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
import dbConnect from "@/app/lib/mongoose";
import Progress from "@/app/models/Progress";
import User from "@/app/models/User";
import mongoose from "mongoose";

// Steps config (should match frontend)
const stepsData = [
  { step_id: 1, key: "profile" },
  { step_id: 2, key: "psychometric" },
  { step_id: 3, key: "career" },
  { step_id: 4, key: "courses" },
  { step_id: 5, key: "gov_colleges" },
  { step_id: 6, key: "preferred_colleges" },
  { step_id: 7, key: "scholarships" },
  { step_id: 8, key: "counseling" },
  { step_id: 9, key: "finalize" },
];

// GET: Fetch progress for current user
export async function GET(req: NextRequest) {
  await dbConnect();
  // TODO: Replace with real session
  const userId = req.nextUrl.searchParams.get("userId");
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return NextResponse.json({ error: "Invalid userId. Must be a MongoDB ObjectId." }, { status: 400 });
  }
  let progress = await Progress.findOne({ user: userId });
  if (!progress) {
    // Create default progress if not exists
    progress = await Progress.create({
      user: userId,
      steps: stepsData.map((s, i) => ({
        ...s,
        status: i === 0 ? "in_progress" : "locked",
        completed_on: null,
        details: "",
        counselor_notes: "",
      })),
    });
  }
  return NextResponse.json(progress);
}

// PUT: Update progress for current user
export async function PUT(req: NextRequest) {
  await dbConnect();
  const body = await req.json();
  // TODO: Replace with real session
  const userId = body.userId;
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { steps } = body;
  const progress = await Progress.findOneAndUpdate(
    { user: userId },
    { steps, updatedAt: new Date() },
    { new: true }
  );
  return NextResponse.json(progress);
}
