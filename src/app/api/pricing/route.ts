import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongoose";
import WebsiteManagement from "@/app/models/WebsiteManagement";

const DEFAULT_PRICING = {
  freeTier: {
    enabled: true,
    durationDays: 7,
    maxAssessments: 1,
    maxCounselingSessions: 1,
    features: [
      "Career discovery starter assessment",
      "1 counseling session with mentor",
      "Basic progress dashboard",
    ],
    alwaysFreeFeatures: [
      "Study resources access",
      "Government college listings",
      "Scholarship and exam notifications",
    ],
  },
  monthlyPlan: {
    name: "Pro Monthly",
    description: "For active students who need ongoing mentor and planning support.",
    priceINR: 1999,
    priceUSD: 29,
    features: [
      "Unlimited assessment attempts",
      "4 counseling sessions / month",
      "Personalized roadmap + reminders",
    ],
  },
  yearlyPlan: {
    name: "Pro Yearly",
    description: "Best value plan for complete yearly guidance and admissions prep.",
    priceINR: 14999,
    priceUSD: 199,
    features: [
      "Everything in Monthly",
      "Priority counselor booking",
      "Admission strategy guidance",
    ],
  },
  singleCounselingPlan: {
    name: "Single Counseling Session",
    description: "One focused session for stream/career/college decision support.",
    priceINR: 799,
    priceUSD: 12,
    durationMinutes: 45,
    features: [
      "1:1 live counseling",
      "Session summary notes",
      "Next-step action checklist",
    ],
  },
  firstSubscriptionOffers: {
    monthly: [30, 50, 70],
    yearly: [30, 50, 70],
    singleCounseling: [30, 50, 70],
  },
};

export async function GET() {
  await connectDB();
  const doc = (await WebsiteManagement.findOne({ singletonKey: "primary" }).lean()) as {
    pricing?: typeof DEFAULT_PRICING;
    maintenanceMode?: boolean;
    supportEmail?: string;
  } | null;

  return NextResponse.json({
    success: true,
    pricing: doc?.pricing || DEFAULT_PRICING,
    maintenanceMode: doc?.maintenanceMode || false,
    supportEmail: doc?.supportEmail || "support@edupath.com",
  });
}
