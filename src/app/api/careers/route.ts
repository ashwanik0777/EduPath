import Career from '@/app/models/Career';
import { NextResponse } from 'next/server';
import dbConnect from '@/app/lib/mongoose';

// GET: List careers with filters/search
export async function GET(req: Request) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const query: any = {};
  if (searchParams.get('stream') && searchParams.get('stream') !== 'All') query.stream = searchParams.get('stream');
  if (searchParams.get('education_level')) query.education_level = searchParams.get('education_level');
  if (searchParams.get('interest_area')) query.interest_area = searchParams.get('interest_area');
  if (searchParams.get('skills')) query.required_skills = { $in: searchParams.getAll('skills') };
  if (searchParams.get('career_nature')) query.career_nature = searchParams.get('career_nature');
  if (searchParams.get('q')) query.title = { $regex: searchParams.get('q'), $options: 'i' };
  const careers = await Career.find(query).lean();
  return NextResponse.json({ careers });
}

// POST: Add new career (admin only)
export async function POST(req: Request) {
  await dbConnect();
  const data = await req.json();
  const career = await Career.create(data);
  return NextResponse.json({ career });
}
