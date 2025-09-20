import { NextRequest, NextResponse } from "next/server";

// Simple feedback logger (expand to DB/file as needed)
export async function POST(req: NextRequest) {
  const { message, value } = await req.json();
  // For demo: just log to server (replace with DB insert if needed)
  console.log("Chatbot feedback:", { message, value });
  return NextResponse.json({ ok: true });
}
