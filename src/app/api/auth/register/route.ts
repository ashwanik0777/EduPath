import { NextResponse } from "next/server";
import { z, ZodError } from "zod";
import { registerUser } from "@/app/lib/auth";

const registerSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  fullName: z.string().min(2),
  academicLevel: z.enum([
    "elementary",
    "middle_school",
    "high_school",
    "undergraduate",
    "graduate",
    "postgraduate",
  ]),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = registerSchema.parse(body);

    const newUser = await registerUser(validatedData.fullName, validatedData.email, validatedData.password);

    return NextResponse.json(newUser, { status: 201 });
  } catch (error: any) {
    if (error instanceof ZodError) {
      return NextResponse.json({ errors: error.issues }, { status: 400 });
    }
    return NextResponse.json({ message: error.message || "Failed to register user" }, { status: 500 });
  }
}
