export type PricingPlan = {
  name: string;
  description: string;
  benefitLine: string;
  popularTag: string;
  ctaLabel: string;
  priceINR: number;
  priceUSD: number;
  features: string[];
};

export type SingleCounselingPlan = PricingPlan & {
  durationMinutes: number;
};

export type AdditionalPricingPlan = PricingPlan & {
  tag: string;
};

export type ComparisonRow = {
  label: string;
  monthlyPlanValue: string;
  yearlyPlanValue: string;
  singleCounselingPlanValue: string;
};

export type FullComparisonRow = {
  label: string;
  category?: boolean;
  values: string[];
};

export type PlanTestimonial = {
  name: string;
  planName: string;
  quote: string;
};

export type WebsitePricing = {
  freeTier: {
    enabled: boolean;
    durationDays: number;
    maxAssessments: number;
    maxCounselingSessions: number;
    features: string[];
    alwaysFreeFeatures: string[];
  };
  monthlyPlan: PricingPlan;
  yearlyPlan: PricingPlan;
  singleCounselingPlan: SingleCounselingPlan;
  additionalPlans: AdditionalPricingPlan[];
  firstSubscriptionDiscount: number;
  comparisonRows: ComparisonRow[];
  fullComparisonRows: FullComparisonRow[];
  testimonials: PlanTestimonial[];
};

export const DEFAULT_PRICING: WebsitePricing = {
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
  additionalPlans: [
    {
      name: "Quarterly Mentorship",
      tag: "3-Month Plan",
      description: "3-month focused mentorship for board + entrance readiness.",
      benefitLine: "Stay consistent with weekly check-ins and milestone reviews.",
      ctaLabel: "Start Mentorship",
      popularTag: "",
      priceINR: 4999,
      priceUSD: 74,
      features: [
        "12 counseling sessions (3 months)",
        "Weekly milestone tracker",
        "Parent progress summary",
      ],
    },
    {
      name: "Assessment Booster Pack",
      tag: "One-Time",
      description: "One-time deep career profiling and action map package.",
      benefitLine: "Discover your true strengths with a detailed career profile.",
      ctaLabel: "Boost Now",
      popularTag: "",
      priceINR: 1499,
      priceUSD: 19,
      features: [
        "Advanced psychometric report",
        "Career fit percentile insights",
        "Recommended stream + college path",
      ],
    },
    {
      name: "Admission Sprint Bundle",
      tag: "Premium",
      description: "End-to-end application and admissions guidance bundle.",
      benefitLine: "Everything you need to land your dream college.",
      ctaLabel: "Get Bundle",
      popularTag: "",
      priceINR: 8999,
      priceUSD: 129,
      features: [
        "Application strategy planning",
        "SOP / profile review support",
        "Interview prep sessions",
      ],
    },
  ],
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
  fullComparisonRows: [
    { label: "Pricing & Access", category: true, values: [] },
    { label: "Plan Type", values: ["One-Time", "Per Session", "Monthly", "3-Month", "Bundle", "Yearly"] },
    { label: "Counseling Sessions", values: ["-", "1 Session", "Unlimited", "12 Sessions", "Included", "Unlimited"] },
    { label: "Career Assessment", category: true, values: [] },
    { label: "Psychometric Assessment", values: ["Advanced", "-", "Basic", "-", "-", "Full Report"] },
    { label: "Career Fit Profile", values: ["Detailed", "-", "Basic", "-", "-", "In-Depth"] },
    { label: "Career Percentile Insights", values: ["Included", "-", "-", "-", "-", "Included"] },
    { label: "Stream Recommendation", values: ["Included", "-", "Included", "-", "Included", "Included"] },
    { label: "Guidance & Mentoring", category: true, values: [] },
    { label: "Study Resources Access", values: ["-", "-", "Included", "Included", "-", "Included"] },
    { label: "Progress Dashboard", values: ["-", "-", "Included", "Included", "-", "Included"] },
    { label: "Competitive Exam Guidance", values: ["-", "-", "Included", "Included", "-", "Included"] },
    { label: "Weekly Check-ins", values: ["-", "-", "-", "Included", "-", "Included"] },
    { label: "Milestone Tracker", values: ["-", "-", "-", "Included", "-", "Included"] },
    { label: "Parent Progress Summary", values: ["-", "-", "-", "Included", "-", "Included"] },
    { label: "Admissions Support", category: true, values: [] },
    { label: "College Shortlisting", values: ["-", "Included", "Included", "-", "Included", "Included"] },
    { label: "Application Strategy", values: ["-", "-", "-", "-", "Included", "-"] },
    { label: "SOP / Profile Review", values: ["-", "-", "-", "-", "Included", "-"] },
    { label: "Interview Prep Sessions", values: ["-", "-", "-", "-", "Included", "Included"] },
    { label: "Support", category: true, values: [] },
    { label: "Priority Support", values: ["-", "-", "-", "-", "Included", "Included"] },
    { label: "Email & Chat Support", values: ["Included", "Included", "Included", "Included", "Included", "Included"] },
    { label: "Validity", values: ["Lifetime", "One-Time", "1 Month", "3 Months", "Ongoing", "12 Months"] },
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

function ensureStringArray(value: unknown, fallback: string[]) {
  if (!Array.isArray(value)) return fallback;
  const cleaned = value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean);
  return cleaned.length > 0 ? cleaned : fallback;
}

export function normalizePricing(pricing: unknown): WebsitePricing {
  const source = (pricing || {}) as Partial<WebsitePricing>;

  const additionalPlans = Array.isArray(source.additionalPlans) && source.additionalPlans.length > 0
    ? source.additionalPlans
    : DEFAULT_PRICING.additionalPlans;

  const normalizedAdditionalPlans = DEFAULT_PRICING.additionalPlans.map((plan, index) => {
    const sourcePlan = additionalPlans[index] || {};
    return {
      ...plan,
      ...sourcePlan,
      features: ensureStringArray(sourcePlan.features, plan.features),
    };
  });

  const merged: WebsitePricing = {
    ...DEFAULT_PRICING,
    ...source,
    freeTier: {
      ...DEFAULT_PRICING.freeTier,
      ...(source.freeTier || {}),
      features: ensureStringArray(source.freeTier?.features, DEFAULT_PRICING.freeTier.features),
      alwaysFreeFeatures: ensureStringArray(
        source.freeTier?.alwaysFreeFeatures,
        DEFAULT_PRICING.freeTier.alwaysFreeFeatures,
      ),
    },
    monthlyPlan: {
      ...DEFAULT_PRICING.monthlyPlan,
      ...(source.monthlyPlan || {}),
      features: ensureStringArray(source.monthlyPlan?.features, DEFAULT_PRICING.monthlyPlan.features),
    },
    yearlyPlan: {
      ...DEFAULT_PRICING.yearlyPlan,
      ...(source.yearlyPlan || {}),
      features: ensureStringArray(source.yearlyPlan?.features, DEFAULT_PRICING.yearlyPlan.features),
    },
    singleCounselingPlan: {
      ...DEFAULT_PRICING.singleCounselingPlan,
      ...(source.singleCounselingPlan || {}),
      features: ensureStringArray(
        source.singleCounselingPlan?.features,
        DEFAULT_PRICING.singleCounselingPlan.features,
      ),
    },
    additionalPlans: normalizedAdditionalPlans,
    comparisonRows: Array.isArray(source.comparisonRows) && source.comparisonRows.length > 0
      ? source.comparisonRows.map((row, index) => ({
          ...DEFAULT_PRICING.comparisonRows[index % DEFAULT_PRICING.comparisonRows.length],
          ...row,
        }))
      : DEFAULT_PRICING.comparisonRows,
    fullComparisonRows: Array.isArray(source.fullComparisonRows) && source.fullComparisonRows.length > 0
      ? source.fullComparisonRows.map((row) => ({
          label: typeof row?.label === "string" ? row.label : "",
          category: Boolean(row?.category),
          values: Array.isArray(row?.values)
            ? row.values
                .filter((value): value is string => typeof value === "string")
                .slice(0, 6)
            : [],
        }))
      : DEFAULT_PRICING.fullComparisonRows,
    testimonials: Array.isArray(source.testimonials) && source.testimonials.length > 0
      ? source.testimonials
      : DEFAULT_PRICING.testimonials,
    firstSubscriptionDiscount:
      typeof source.firstSubscriptionDiscount === "number"
        ? Math.min(100, Math.max(0, source.firstSubscriptionDiscount))
        : DEFAULT_PRICING.firstSubscriptionDiscount,
  };

  merged.fullComparisonRows = merged.fullComparisonRows.map((row) => ({
    ...row,
    values: row.category
      ? []
      : [...row.values, "", "", "", "", "", ""].slice(0, 6),
  }));

  return merged;
}
