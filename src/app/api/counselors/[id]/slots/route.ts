import { type NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/lib/mongoose";
import Counselor from "@/app/models/Counselor";
import CounselingSession from "@/app/models/CounselingSession";
import { isValidObjectId } from "mongoose";

// Helper to generate time slots (e.g. every 1 hour)
function generateTimeSlots(start: string, end: string, duration = 60) {
  const slots: string[] = [];
  let [h, m] = start.split(":").map(Number);
  let [eh, em] = end.split(":").map(Number);
  let startMinutes = h * 60 + m;
  const endMinutes = eh * 60 + em;
  while (startMinutes + duration <= endMinutes) {
    const sh = Math.floor(startMinutes / 60).toString().padStart(2, "0");
    const sm = (startMinutes % 60).toString().padStart(2, "0");
    slots.push(`${sh}:${sm}`);
    startMinutes += duration;
  }
  return slots;
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const { id } = params;
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date"); // YYYY-MM-DD
    if (!isValidObjectId(id) || !date) {
      return NextResponse.json({ success: false, message: "Invalid counselor ID or date" }, { status: 400 });
    }
    const counselor = await Counselor.findById(id).lean() as any;
    if (!counselor) {
      return NextResponse.json({ success: false, message: "Counselor not found" }, { status: 404 });
    }
    // Check if working day
    const dayOfWeek = new Date(date).toLocaleDateString("en-US", { weekday: "long", timeZone: counselor.availability?.timezone || "Asia/Kolkata" });
    if (!counselor.availability?.workingDays?.includes(dayOfWeek)) {
      return NextResponse.json({ success: true, slots: [] });
    }
    // Generate all possible slots
    const allSlots = generateTimeSlots(counselor.availability.workingHours.start, counselor.availability.workingHours.end, 60);
    // Find booked sessions for that day
    const dayStart = new Date(`${date}T00:00:00.000Z`);
    const dayEnd = new Date(`${date}T23:59:59.999Z`);
    const sessions = await CounselingSession.find({
      counselorId: id,
      scheduledAt: { $gte: dayStart, $lte: dayEnd },
      status: { $in: ["scheduled", "in-progress"] },
    }).lean();
    const bookedTimes = sessions.map(s => {
      const d = new Date(s.scheduledAt);
      return d.toISOString().slice(11, 16); // "HH:MM"
    });
    // Filter out booked slots
    const availableSlots = allSlots.filter(slot => !bookedTimes.includes(slot));
    return NextResponse.json({ success: true, slots: availableSlots });
  } catch (error) {
    console.error("Get slots error:", error);
    return NextResponse.json({ success: false, message: "Failed to fetch slots" }, { status: 500 });
  }
}
