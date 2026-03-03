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
    benefitLine: "Perfect for active students who want structured monthly guidance.",
    popularTag: "Student Favorite",
    ctaLabel: "Get Started",
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
    benefitLine: "Best for long-term planning and admission preparation.",
    popularTag: "Best Value",
    ctaLabel: "Subscribe Now",
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
    benefitLine: "Great for quick clarity before a major academic decision.",
    popularTag: "Most Popular",
    ctaLabel: "Book Session",
    priceINR: 799,
    priceUSD: 12,
    durationMinutes: 45,
    features: [
      "1:1 live counseling",
      "Session summary notes",
      "Next-step action checklist",
    ],
  },
  firstSubscriptionDiscount: 50,
  comparisonRows: [
    {
      label: "Counseling Access",
      monthlyPlanValue: "4 sessions/month",
      yearlyPlanValue: "Priority yearly access",
      singleCounselingPlanValue: "1 focused session",
    },
    {
      label: "Assessment Support",
      monthlyPlanValue: "Unlimited attempts",
      yearlyPlanValue: "Unlimited + yearly roadmap",
      singleCounselingPlanValue: "Not included",
    },
    {
      label: "Best For",
      monthlyPlanValue: "Monthly momentum",
      yearlyPlanValue: "Long-term planning",
      singleCounselingPlanValue: "One-time guidance",
    },
  ],
  testimonials: [
    {
      name: "Riya Sharma",
      planName: "Pro Monthly",
      quote: "Monthly sessions helped me stay consistent and improve my exam strategy.",
    },
    {
      name: "Ankit Verma",
      planName: "Pro Yearly",
      quote: "Yearly plan gave me a full roadmap from stream selection to admissions.",
    },
  ],
};

function normalizePricing(pricing: unknown) {
  const source = (pricing || {}) as Partial<typeof DEFAULT_PRICING>;
  const merged = {
    ...DEFAULT_PRICING,
    ...source,
    freeTier: {
      ...DEFAULT_PRICING.freeTier,
      ...(source.freeTier || {}),
    },
    monthlyPlan: {
      ...DEFAULT_PRICING.monthlyPlan,
      ...(source.monthlyPlan || {}),
    },
    yearlyPlan: {
      ...DEFAULT_PRICING.yearlyPlan,
      ...(source.yearlyPlan || {}),
    },
    singleCounselingPlan: {
      ...DEFAULT_PRICING.singleCounselingPlan,
      ...(source.singleCounselingPlan || {}),
    },
    comparisonRows: Array.isArray(source.comparisonRows) && source.comparisonRows.length > 0
      ? source.comparisonRows
      : DEFAULT_PRICING.comparisonRows,
    testimonials: Array.isArray(source.testimonials) && source.testimonials.length > 0
      ? source.testimonials
      : DEFAULT_PRICING.testimonials,
  } as typeof DEFAULT_PRICING;

  return {
    ...merged,
    firstSubscriptionDiscount: 50,
  };
}

export async function GET() {
  await connectDB();
  const doc = (await WebsiteManagement.findOne({ singletonKey: "primary" }).lean()) as {
    pricing?: typeof DEFAULT_PRICING;
    maintenanceMode?: boolean;
    supportEmail?: string;
  } | null;

  return NextResponse.json({
    success: true,
    pricing: normalizePricing(doc?.pricing || DEFAULT_PRICING),
    maintenanceMode: doc?.maintenanceMode || false,
    supportEmail: doc?.supportEmail || "support@edupath.com",
  });
}
