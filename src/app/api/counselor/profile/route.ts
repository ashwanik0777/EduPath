import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/lib/mongoose";
import { requireCounselor } from "@/app/lib/counselorAuth";
import Counselor from "@/app/models/Counselor";
import User from "@/app/models/User";

export async function GET(request: NextRequest) {
  const { user, unauthorizedResponse } = await requireCounselor(request);
  if (unauthorizedResponse) return unauthorizedResponse;

  await connectDB();

  const [userDoc, counselorDoc] = await Promise.all([
    User.findById(user?._id).select("name email profile.phone profile.profileImage").lean<any>(),
    Counselor.findOne({ userId: user?._id }).lean<any>(),
  ]);

  if (!userDoc || !counselorDoc) {
    return NextResponse.json({ success: false, message: "Counselor profile not found" }, { status: 404 });
  }

  return NextResponse.json({
    success: true,
    data: {
      name: userDoc.name || "",
      email: userDoc.email || "",
      phone: userDoc.profile?.phone || "",
      profileImage: userDoc.profile?.profileImage || counselorDoc.profile?.profileImage || "",
      bio: counselorDoc.profile?.bio || "",
      displayName: counselorDoc.profile?.displayName || userDoc.name || "",
      specializations: counselorDoc.specializations || [],
      languages: counselorDoc.languages || [],
      availability: {
        timezone: counselorDoc.availability?.timezone || "Asia/Kolkata",
        start: counselorDoc.availability?.workingHours?.start || "09:00",
        end: counselorDoc.availability?.workingHours?.end || "18:00",
        workingDays: counselorDoc.availability?.workingDays || [],
        isAvailable: counselorDoc.availability?.isAvailable ?? true,
      },
    },
  });
}

export async function PATCH(request: NextRequest) {
  const { user, unauthorizedResponse } = await requireCounselor(request);
  if (unauthorizedResponse) return unauthorizedResponse;

  await connectDB();

  const body = await request.json();
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const profileImage = typeof body.profileImage === "string" ? body.profileImage.trim() : "";
  const bio = typeof body.bio === "string" ? body.bio.trim() : "";
  const displayName = typeof body.displayName === "string" ? body.displayName.trim() : "";
  const specializations = Array.isArray(body.specializations)
    ? body.specializations.filter((item: unknown) => typeof item === "string" && item.trim()).map((item: string) => item.trim())
    : [];
  const languages = Array.isArray(body.languages)
    ? body.languages.filter((item: unknown) => typeof item === "string" && item.trim()).map((item: string) => item.trim())
    : [];

  const timezone = typeof body?.availability?.timezone === "string" ? body.availability.timezone : "Asia/Kolkata";
  const start = typeof body?.availability?.start === "string" ? body.availability.start : "09:00";
  const end = typeof body?.availability?.end === "string" ? body.availability.end : "18:00";
  const workingDays = Array.isArray(body?.availability?.workingDays)
    ? body.availability.workingDays.filter((item: unknown) => typeof item === "string" && item.trim())
    : [];
  const isAvailable = Boolean(body?.availability?.isAvailable);

  if (!name || !displayName) {
    return NextResponse.json({ success: false, message: "Name and display name are required" }, { status: 400 });
  }

  const [updatedUser, updatedCounselor] = await Promise.all([
    User.findByIdAndUpdate(
      user?._id,
      {
        name,
        "profile.phone": phone || undefined,
        "profile.profileImage": profileImage || undefined,
      },
      { new: true },
    )
      .select("name email profile.phone profile.profileImage")
      .lean(),
    Counselor.findOneAndUpdate(
      { userId: user?._id },
      {
        "profile.displayName": displayName,
        "profile.bio": bio,
        "profile.profileImage": profileImage || undefined,
        specializations,
        languages,
        "availability.timezone": timezone,
        "availability.workingHours.start": start,
        "availability.workingHours.end": end,
        "availability.workingDays": workingDays,
        "availability.isAvailable": isAvailable,
      },
      { new: true },
    ).lean(),
  ]);

  if (!updatedUser || !updatedCounselor) {
    return NextResponse.json({ success: false, message: "Failed to update counselor profile" }, { status: 404 });
  }

  return NextResponse.json({ success: true, message: "Profile updated successfully" });
}
