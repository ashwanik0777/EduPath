import SavedCareer from '@/app/models/SavedCareer';
import { NextResponse } from 'next/server';
import dbConnect from '@/app/lib/mongoose';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';

// GET: List saved careers for user
export async function GET(req: Request) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const saved = await SavedCareer.find({ userId: session.user.id }).lean();
  return NextResponse.json({ saved });
}

// POST: Save a career
export async function POST(req: Request) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { career_id, note } = await req.json();
  const saved = await SavedCareer.create({ userId: session.user.id, career_id, note });
  return NextResponse.json({ saved });
}

// DELETE: Remove saved career
export async function DELETE(req: Request) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { career_id } = await req.json();
  await SavedCareer.deleteOne({ userId: session.user.id, career_id });
  return NextResponse.json({ success: true });
}
