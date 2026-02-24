import { NextRequest, NextResponse } from "next/server";
import { getTokenFromRequest, getUserFromToken } from "@/app/lib/auth";

export async function requireCounselor(request: NextRequest) {
  const token = getTokenFromRequest(request);

  if (!token) {
    return {
      user: null,
      unauthorizedResponse: NextResponse.json(
        { success: false, message: "Authentication required" },
        { status: 401 },
      ),
    };
  }

  const user = await getUserFromToken(token);

  if (!user) {
    return {
      user: null,
      unauthorizedResponse: NextResponse.json(
        { success: false, message: "Invalid token" },
        { status: 401 },
      ),
    };
  }

  if (user.role !== "counselor") {
    return {
      user: null,
      unauthorizedResponse: NextResponse.json(
        { success: false, message: "Counselor access required" },
        { status: 403 },
      ),
    };
  }

  return { user, unauthorizedResponse: null };
}
