import SavedCareer from '@/app/models/SavedCareer';
import { NextResponse } from 'next/server';
import dbConnect from '@/app/lib/mongoose';

import { verify } from 'jsonwebtoken';

// Helper to get userId from JWT cookie
function getUserIdFromRequest(req: Request) {
  const cookie = req.headers.get('cookie') || '';
  const match = cookie.match(/auth-token=([^;]+)/);
  if (!match) return null;
  try {
    const decoded: any = verify(match[1], process.env.JWT_SECRET!);
    return decoded.id || decoded.userId || decoded._id;
  } catch {
    return null;
  }
}

// GET: List saved careers for user
export async function GET(req: Request) {
  await dbConnect();
  const userId = getUserIdFromRequest(req);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const saved = await SavedCareer.find({ userId }).lean();
  return NextResponse.json({ saved });
}

// POST: Save a career
export async function POST(req: Request) {
  await dbConnect();
  const userId = getUserIdFromRequest(req);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { career_id, note } = await req.json();
  const saved = await SavedCareer.create({ userId, career_id, note });
  return NextResponse.json({ saved });
}

// DELETE: Remove saved career
export async function DELETE(req: Request) {
  await dbConnect();
  const userId = getUserIdFromRequest(req);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { career_id } = await req.json();
  await SavedCareer.deleteOne({ userId, career_id });
  return NextResponse.json({ success: true });
}
