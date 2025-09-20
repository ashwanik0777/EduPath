import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/lib/mongoose";
import PsychometricAttempt from "@/app/models/PsychometricAttempt";
import { getTokenFromRequest, getUserFromToken } from "@/app/lib/auth";

export async function GET(req: NextRequest) {
  await dbConnect();
  const token = getTokenFromRequest(req);
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const user = await getUserFromToken(token);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const attempts = await PsychometricAttempt.find({ userId: user._id }).sort({ takenAt: 1 });
  if (!attempts.length) return NextResponse.json({ analytics: null });

  // Average scores per trait
  const traitSums: Record<string, number> = {};
  const traitCounts: Record<string, number> = {};
  const trends: { date: string; scores: Record<string, number> }[] = [];
  const topCareers: Record<string, number> = {};

  for (const att of attempts) {
    const scoreMap: Record<string, number> = {};
    for (const s of att.scores) {
      traitSums[s.category] = (traitSums[s.category] || 0) + s.percentage;
      traitCounts[s.category] = (traitCounts[s.category] || 0) + 1;
      scoreMap[s.category] = s.percentage;
    }
    trends.push({ date: att.takenAt, scores: scoreMap });
    if (att.recommendations?.careerPaths?.[0]?.field) {
      const field = att.recommendations.careerPaths[0].field;
      topCareers[field] = (topCareers[field] || 0) + 1;
    }
  }
  const avgScores = Object.fromEntries(
    Object.entries(traitSums).map(([k, v]) => [k, Math.round(v / (traitCounts[k] || 1))])
  );
  const mostCommonCareer = Object.entries(topCareers).sort((a, b) => b[1] - a[1])[0]?.[0] || null;

  return NextResponse.json({
    analytics: {
      avgScores,
      trends,
      mostCommonCareer,
      totalAttempts: attempts.length,
    },
  });
}
