import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/lib/mongoose";
import { requireAdmin } from "@/app/lib/adminAuth";
import User from "@/app/models/User";

export async function GET(request: NextRequest) {
  const { user, unauthorizedResponse } = await requireAdmin(request);
  if (unauthorizedResponse) return unauthorizedResponse;

  await connectDB();

  const admin = await User.findById(user?._id)
    .select("name email role profile")
    .lean();

  if (!admin) {
    return NextResponse.json({ success: false, message: "Admin not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, data: admin });
}

export async function PATCH(request: NextRequest) {
  const { user, unauthorizedResponse } = await requireAdmin(request);
  if (unauthorizedResponse) return unauthorizedResponse;

  await connectDB();

  const body = await request.json();
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const profileImage = typeof body.profileImage === "string" ? body.profileImage.trim() : "";

  if (!name) {
    return NextResponse.json({ success: false, message: "Name is required" }, { status: 400 });
  }

  const updated = await User.findByIdAndUpdate(
    user?._id,
    {
      name,
      "profile.phone": phone || undefined,
      "profile.profileImage": profileImage || undefined,
    },
    { new: true },
  )
    .select("name email role profile")
    .lean();

  return NextResponse.json({ success: true, data: updated });
}
