import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/lib/mongoose";
import PsychometricAttempt from "@/app/models/PsychometricAttempt";
import { getTokenFromRequest, getUserFromToken } from "@/app/lib/auth";

// --- Professional scoring logic (OCEAN, Holland, Aptitude, etc.) ---
// Improved OCEAN scoring: map answers by questionId prefix, use weighted scoring, and generate recommendations
function calculateScores(answers: any[]) {
  const categories = [
    { key: "O", label: "Openness" },
    { key: "C", label: "Conscientiousness" },
    { key: "E", label: "Extraversion" },
    { key: "A", label: "Agreeableness" },
    { key: "N", label: "Neuroticism" },
  ];
  // Map answers to categories by questionId prefix (e.g., O-0, C-1, ...)
  const scores = categories.map((cat) => {
    const catAnswers = answers.filter((a) => a.questionId.startsWith(cat.key)).map(a => a.answer);
    // Assume answers are 0-4 (scale: Strongly Disagree to Strongly Agree)
    const score = catAnswers.reduce((a, b) => a + (typeof b === "number" ? b : 0), 0);
    const maxScore = catAnswers.length * 4;
    const percentage = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
    let interpretation = "Low";
    if (percentage > 75) interpretation = "High";
    else if (percentage > 50) interpretation = "Moderate";
    return {
      category: cat.label,
      score,
      percentage,
      interpretation,
    };
  });
  // Example: recommend careers based on highest two traits
  const sorted = [...scores].sort((a, b) => b.percentage - a.percentage);
  const recommendations = {
    careerPaths: [
      sorted[0].category === "Openness"
        ? { field: "Designer", match: sorted[0].percentage, description: "Creative and open-minded.", suggestedCourses: ["Design", "Fine Arts"], topColleges: ["NID", "IIT-Design"] }
        : sorted[0].category === "Conscientiousness"
        ? { field: "Engineer", match: sorted[0].percentage, description: "Organized and detail-oriented.", suggestedCourses: ["Engineering"], topColleges: ["IIT", "NIT"] }
        : sorted[0].category === "Extraversion"
        ? { field: "Sales/Marketing", match: sorted[0].percentage, description: "Sociable and assertive.", suggestedCourses: ["Marketing", "Business"], topColleges: ["IIM", "FMS"] }
        : sorted[0].category === "Agreeableness"
        ? { field: "Psychologist", match: sorted[0].percentage, description: "Empathetic and helpful.", suggestedCourses: ["Psychology"], topColleges: ["DU", "JNU"] }
        : { field: "Analyst", match: sorted[0].percentage, description: "Analytical and thoughtful.", suggestedCourses: ["Analytics", "Statistics"], topColleges: ["ISI", "IIT"] },
      sorted[1].category === "Openness"
        ? { field: "Writer", match: sorted[1].percentage, description: "Imaginative and expressive.", suggestedCourses: ["Literature", "Journalism"], topColleges: ["DU", "JNU"] }
        : sorted[1].category === "Conscientiousness"
        ? { field: "Manager", match: sorted[1].percentage, description: "Organized and responsible.", suggestedCourses: ["Management"], topColleges: ["IIM", "XLRI"] }
        : sorted[1].category === "Extraversion"
        ? { field: "Event Manager", match: sorted[1].percentage, description: "Outgoing and energetic.", suggestedCourses: ["Event Management"], topColleges: ["NIEM"] }
        : sorted[1].category === "Agreeableness"
        ? { field: "Counselor", match: sorted[1].percentage, description: "Supportive and caring.", suggestedCourses: ["Counseling"], topColleges: ["TISS"] }
        : { field: "Researcher", match: sorted[1].percentage, description: "Thoughtful and analytical.", suggestedCourses: ["Research"], topColleges: ["ISI", "IIT"] },
    ],
    nextSteps: ["Explore suggested courses", "Book a counseling session"],
    resources: [],
  };
  const overallScore = Math.round(scores.reduce((a, b) => a + b.percentage, 0) / scores.length);
  return { scores, overallScore, recommendations };
}

export async function POST(req: NextRequest) {
  await dbConnect();
  const token = getTokenFromRequest(req);
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const user = await getUserFromToken(token);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const { answers, timeSpent } = body;
  // Calculate scores and recommendations
  const { scores, overallScore, recommendations } = calculateScores(answers);
  const attempt = await PsychometricAttempt.create({
    userId: user._id,
    answers,
    scores,
    overallScore,
    recommendations,
    timeSpent,
  });
  // Always fetch the full attempt (with _id, takenAt, etc.)
  const saved = await PsychometricAttempt.findById(attempt._id);
  return NextResponse.json({ success: true, attempt: saved });
}

export async function GET(req: NextRequest) {
  await dbConnect();
  const token = getTokenFromRequest(req);
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const user = await getUserFromToken(token);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  // Return all attempts for this user, newest first
  const attempts = await PsychometricAttempt.find({ userId: user._id }).sort({ takenAt: -1 });
  return NextResponse.json({ attempts });
}
