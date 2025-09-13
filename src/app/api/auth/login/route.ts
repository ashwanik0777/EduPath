import { NextResponse } from "next/server";
import { z, ZodError } from "zod";
import { loginUser } from "@/app/lib/auth";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = loginSchema.parse(body);

    const { user, token } = await loginUser(validatedData.email, validatedData.password);

    const response = NextResponse.json({
      success: true,
      message: "Login successful",
      user,
    });

    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return response;
  } catch (error: any) {
    if (error instanceof ZodError) {
      return NextResponse.json({ success: false, message: "Invalid input", errors: error.issues }, { status: 400 });
    }
    return NextResponse.json({ success: false, message: error.message || "Login failed" }, { status: 401 });
  }
}
