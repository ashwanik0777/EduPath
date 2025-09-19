

import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/lib/mongoose";
import Feedback from "@/app/models/Feedback";
import { getTokenFromRequest, getUserFromToken } from "@/app/lib/auth";
import cloudinary from "cloudinary";

// Cloudinary config (set your env variables in .env.local)
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


export const config = {
  api: {
    bodyParser: false, // For file uploads (multipart)
  },
};




export async function POST(req: NextRequest) {
  await dbConnect();
  let userId = undefined;
  let name = undefined;
  let email = undefined;
  try {
    const token = getTokenFromRequest(req);
    if (token) {
      const user = await getUserFromToken(token);
      if (user) {
        userId = user._id;
        name = user.name;
        email = user.email;
      }
    }
  } catch {}

  // Use formData API (App Router compatible)
  const formData = await req.formData();
  const getField = (key: string) => formData.get(key) ? String(formData.get(key)) : undefined;
  let screenshotUrl = undefined;
  const file = formData.get("screenshot");
  if (file && typeof file === "object" && "arrayBuffer" in file) {
    // Upload to Cloudinary
    const buffer = Buffer.from(await file.arrayBuffer());
    const base64 = buffer.toString("base64");
    const dataUri = `data:${file.type};base64,${base64}`;
    try {
      const uploadRes = await cloudinary.v2.uploader.upload(dataUri, {
        folder: "edupath-feedback",
        resource_type: "auto",
      });
      screenshotUrl = uploadRes.secure_url;
    } catch (err) {
      console.error("Cloudinary upload error", err);
      return NextResponse.json({ success: false, error: "Failed to upload screenshot" }, { status: 500 });
    }
  }
  const feedback = new Feedback({
    userId,
    name: getField("name") || name,
    email: getField("email") || email,
    type: getField("type"),
    message: getField("message"),
    rating: getField("rating"),
    screenshotUrl,
    suggestionText: getField("suggestionText"),
    suggestionCategory: getField("suggestionCategory"),
    status: "Pending",
    submitted_on: new Date(),
  });
  await feedback.save();
  return NextResponse.json({ success: true, feedback });
}

// (Optional) GET: List feedbacks (admin/user)
export async function GET(req: NextRequest) {
  await dbConnect();
  // Optionally filter by user or status
  const url = new URL(req.url);
  const userId = url.searchParams.get("userId");
  const status = url.searchParams.get("status");
  const query: any = {};
  if (userId) query.userId = userId;
  if (status) query.status = status;
  const feedbacks = await Feedback.find(query).sort({ submitted_on: -1 });
  return NextResponse.json({ feedbacks });
}
