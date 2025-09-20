import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/lib/mongoose";
import PsychometricQuestion from "@/app/models/PsychometricQuestion";

export async function GET(req: NextRequest) {
  await dbConnect();
  const questions = await PsychometricQuestion.find({}).sort({ section: 1, order: 1 });
  return NextResponse.json({ questions });
}
