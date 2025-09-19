import Career from '@/app/models/Career';
import { NextResponse } from 'next/server';
import dbConnect from '@/app/lib/mongoose';


export async function GET(req: Request, context: { params: { id: string } }) {
  const { params } = context;
  await dbConnect();
  const career = await Career.findOne({ career_id: params.id }).lean();
  if (!career) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ career });
}


export async function PATCH(req: Request, context: { params: { id: string } }) {
  const { params } = context;
  await dbConnect();
  const data = await req.json();
  const career = await Career.findOneAndUpdate({ career_id: params.id }, data, { new: true });
  if (!career) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ career });
}


export async function DELETE(req: Request, context: { params: { id: string } }) {
  const { params } = context;
  await dbConnect();
  await Career.deleteOne({ career_id: params.id });
  return NextResponse.json({ success: true });
}
