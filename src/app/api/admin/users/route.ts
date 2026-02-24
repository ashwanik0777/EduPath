import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import connectDB from "@/app/lib/mongoose";
import { requireAdmin } from "@/app/lib/adminAuth";
import User from "@/app/models/User";

const updateUserSchema = z.object({
  userId: z.string().min(1),
  role: z.enum(["student", "counselor", "admin"]).optional(),
  isActive: z.boolean().optional(),
});

export async function GET(request: NextRequest) {
  const { unauthorizedResponse } = await requireAdmin(request);
  if (unauthorizedResponse) return unauthorizedResponse;

  await connectDB();

  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.trim();

  const filter = query
    ? {
        $or: [
          { name: { $regex: query, $options: "i" } },
          { email: { $regex: query, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(filter)
    .sort({ createdAt: -1 })
    .limit(100)
    .select("name email role isActive createdAt lastLoginAt")
    .lean();

  return NextResponse.json({ success: true, data: users });
}

export async function PATCH(request: NextRequest) {
  const { user, unauthorizedResponse } = await requireAdmin(request);
  if (unauthorizedResponse) return unauthorizedResponse;

  await connectDB();

  const body = await request.json();
  const parsed = updateUserSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { success: false, message: "Invalid payload", errors: parsed.error.issues },
      { status: 400 },
    );
  }

  const { userId, role, isActive } = parsed.data;

  if (!role && typeof isActive === "undefined") {
    return NextResponse.json(
      { success: false, message: "No update fields provided" },
      { status: 400 },
    );
  }

  if (String(user?._id) === userId && role && role !== "admin") {
    return NextResponse.json(
      { success: false, message: "You cannot remove your own admin role" },
      { status: 400 },
    );
  }

  const updateData: { role?: "student" | "counselor" | "admin"; isActive?: boolean } = {};
  if (role) updateData.role = role;
  if (typeof isActive !== "undefined") updateData.isActive = isActive;

  const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
    new: true,
  })
    .select("name email role isActive createdAt lastLoginAt")
    .lean();

  if (!updatedUser) {
    return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, data: updatedUser });
}
