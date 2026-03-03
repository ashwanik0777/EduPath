"use client";

import { useEffect, useState } from "react";
import { BadgeCheck, Gift, Sparkles, ShieldCheck, IndianRupee, DollarSign, Euro, CalendarClock, Check, X, Star, Quote } from "lucide-react";

type CurrencyCode = "INR" | "USD" | "EUR";

type PricingResponse = {
  success: boolean;
  pricing: {
    freeTier: {
      enabled: boolean;
      durationDays: number;
      maxAssessments: number;
      maxCounselingSessions: number;
      features: string[];
      alwaysFreeFeatures: string[];
    };
    monthlyPlan: {
      name: string;
      description: string;
      benefitLine: string;
      popularTag: string;
      ctaLabel: string;
      priceINR: number;
      priceUSD: number;
      features: string[];
    };
    yearlyPlan: {
      name: string;
      description: string;
      benefitLine: string;
      popularTag: string;
      ctaLabel: string;
      priceINR: number;
      priceUSD: number;
      features: string[];
    };
    singleCounselingPlan: {
      name: string;
      description: string;
      benefitLine: string;
      popularTag: string;
      ctaLabel: string;
      priceINR: number;
      priceUSD: number;
      durationMinutes: number;
      features: string[];
    };
    firstSubscriptionDiscount: number;
    comparisonRows: {
      label: string;
      monthlyPlanValue: string;
      yearlyPlanValue: string;
      singleCounselingPlanValue: string;
    }[];
    testimonials: {
      name: string;
      planName: string;
      quote: string;
    }[];
  };
};

export default function PricingPage() {
  const [data, setData] = useState<PricingResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [currency, setCurrency] = useState<CurrencyCode>("INR");

  useEffect(() => {
    const loadPricing = async () => {
      try {
        const response = await fetch("/api/pricing", { cache: "no-store" });
        const result = (await response.json()) as PricingResponse;
        setData(result);
      } finally {
        setLoading(false);
      }
    };

    loadPricing();
  }, []);

  const pricing = data?.pricing;
  const firstSubscriptionDiscount = pricing?.firstSubscriptionDiscount ?? 50;

  if (loading) {
    return (
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-16">
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-slate-600">
          Loading pricing plans...
        </div>
      </main>
    );
  }

  if (!pricing) {
    return (
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-16">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-10 text-center text-red-700">
          Pricing information is currently unavailable. Please try again shortly.
        </div>
      </main>
    );
  }

  const EUR_PER_USD = 0.92;

  const toCurrencyValue = (priceINR: number, priceUSD: number, selectedCurrency: CurrencyCode) => {
    if (selectedCurrency === "INR") return priceINR;
    if (selectedCurrency === "USD") return priceUSD;
    return priceUSD * EUR_PER_USD;
  };

  const toEnding99 = (amount: number, selectedCurrency: CurrencyCode) => {
    if (selectedCurrency === "INR") {
      const rounded = Math.max(1, Math.round(amount));
      const base = Math.floor(rounded / 100) * 100 + 99;
      const up = base < rounded ? base + 100 : base;
      const down = base > rounded ? Math.max(99, base - 100) : base;
      return Math.abs(up - rounded) < Math.abs(rounded - down) ? up : down;
    }

    const rounded = Math.max(1, Math.round(amount));
    return Math.max(0.99, rounded - 0.01);
  };

  const applyDiscount = (amount: number) => Math.max(0, amount * (100 - firstSubscriptionDiscount) / 100);

  const formatCurrency = (amount: number, selectedCurrency: CurrencyCode) => {
    const hasFraction = selectedCurrency !== "INR";
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: selectedCurrency,
      maximumFractionDigits: hasFraction ? 2 : 0,
      minimumFractionDigits: hasFraction ? 2 : 0,
    }).format(amount);
  };

  const corePlans = [
    {
      key: "single",
      ...pricing.singleCounselingPlan,
      headerBg: "bg-gradient-to-br from-violet-50 to-purple-50",
      topBorder: "border-t-4 border-violet-400",
      badgeClass: "bg-violet-100 text-violet-700 border-violet-200",
      iconColor: "text-violet-500",
      priceColor: "text-violet-700",
      ctaBg: "bg-violet-600 hover:bg-violet-700",
      discountBadge: "bg-violet-100 text-violet-700",
      priceINR: pricing.singleCounselingPlan.priceINR,
      priceUSD: pricing.singleCounselingPlan.priceUSD,
    },
    {
      key: "monthly",
      ...pricing.monthlyPlan,
      headerBg: "bg-gradient-to-br from-emerald-50 to-teal-50",
      topBorder: "border-t-4 border-emerald-400",
      badgeClass: "bg-emerald-100 text-emerald-700 border-emerald-200",
      iconColor: "text-emerald-500",
      priceColor: "text-emerald-700",
      ctaBg: "bg-emerald-600 hover:bg-emerald-700",
      discountBadge: "bg-emerald-100 text-emerald-700",
      priceINR: pricing.monthlyPlan.priceINR,
      priceUSD: pricing.monthlyPlan.priceUSD,
    },
    {
      key: "yearly",
      ...pricing.yearlyPlan,
      headerBg: "bg-gradient-to-br from-blue-50 to-indigo-50",
      topBorder: "border-t-4 border-blue-400",
      badgeClass: "bg-blue-100 text-blue-700 border-blue-200",
      iconColor: "text-blue-500",
      priceColor: "text-blue-700",
      ctaBg: "bg-indigo-600 hover:bg-indigo-700",
      discountBadge: "bg-blue-100 text-blue-700",
      priceINR: pricing.yearlyPlan.priceINR,
      priceUSD: pricing.yearlyPlan.priceUSD,
    },
  ];

  const additionalPlans = [
    {
      name: "Quarterly Mentorship",
      tag: "3-Month Plan",
      description: "3-month focused mentorship for board + entrance readiness.",
      benefitLine: "Stay consistent with weekly check-ins and milestone reviews.",
      priceINR: 4999,
      priceUSD: 74,
      headerBg: "bg-gradient-to-br from-sky-50 to-cyan-50",
      topBorder: "border-t-4 border-sky-400",
      badgeClass: "bg-sky-100 text-sky-700 border-sky-200",
      iconColor: "text-sky-500",
      priceColor: "text-sky-700",
      ctaBg: "bg-sky-600 hover:bg-sky-700",
      discountBadge: "bg-sky-100 text-sky-700",
      cta: "Start Mentorship",
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
      priceINR: 1499,
      priceUSD: 19,
      headerBg: "bg-gradient-to-br from-amber-50 to-orange-50",
      topBorder: "border-t-4 border-amber-400",
      badgeClass: "bg-amber-100 text-amber-700 border-amber-200",
      iconColor: "text-amber-500",
      priceColor: "text-amber-700",
      ctaBg: "bg-orange-500 hover:bg-orange-600",
      discountBadge: "bg-amber-100 text-amber-700",
      cta: "Boost Now",
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
      priceINR: 8999,
      priceUSD: 129,
      headerBg: "bg-gradient-to-br from-teal-50 to-cyan-50",
      topBorder: "border-t-4 border-teal-400",
      badgeClass: "bg-teal-100 text-teal-700 border-teal-200",
      iconColor: "text-teal-500",
      priceColor: "text-teal-700",
      ctaBg: "bg-teal-600 hover:bg-teal-700",
      discountBadge: "bg-teal-100 text-teal-700",
      cta: "Get Bundle",
      features: [
        "Application strategy planning",
        "SOP / profile review support",
        "Interview prep sessions",
      ],
    },
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16 space-y-10">
      <section className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 text-blue-700 px-4 py-1 text-sm font-medium">
          <Sparkles className="w-4 h-4" />
          Flexible Plans for Every Student
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-slate-900">Pricing & Subscription Plans</h1>
        
        <div className="inline-flex items-center rounded-full bg-amber-100 border border-amber-200 text-amber-800 px-4 py-1.5 text-sm font-semibold">
          First Subscription Offer: {firstSubscriptionDiscount}% OFF on all paid plans
        </div>
        <div className="flex justify-center">
          <div className="inline-flex items-center rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
            {([
              { code: "INR", label: "INR", icon: IndianRupee },
              { code: "USD", label: "USD", icon: DollarSign },
              { code: "EUR", label: "EUR", icon: Euro },
            ] as const).map((item) => {
              const Icon = item.icon;
              const isActive = currency === item.code;
              return (
                <button
                  key={item.code}
                  onClick={() => setCurrency(item.code)}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-slate-900 text-white"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 space-y-3">
          <div className="flex items-center gap-2 text-emerald-700 font-semibold">
            <Gift className="w-5 h-5" />
            Limited-Time Free Tier
          </div>
          <p className="text-slate-700 text-sm">
            {pricing.freeTier.enabled
              ? `Active for ${pricing.freeTier.durationDays} days with up to ${pricing.freeTier.maxAssessments} assessments and ${pricing.freeTier.maxCounselingSessions} counseling sessions.`
              : "Currently inactive. Admin can enable it anytime from dashboard settings."}
          </p>
          <ul className="space-y-2 text-sm text-slate-700">
            {pricing.freeTier.features.slice(0, 3).map((feature, index) => (
              <li key={`free-feature-${index}`} className="flex items-start gap-2">
                <BadgeCheck className="w-4 h-4 mt-0.5 text-emerald-600" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-blue-200 bg-blue-50 p-6 space-y-3">
          <div className="flex items-center gap-2 text-blue-700 font-semibold">
            <ShieldCheck className="w-5 h-5" />
            Always Free Features
          </div>
          <ul className="space-y-2 text-sm text-slate-700">
            {pricing.freeTier.alwaysFreeFeatures.slice(0, 3).map((feature, index) => (
              <li key={`always-feature-${index}`} className="flex items-start gap-2">
                <BadgeCheck className="w-4 h-4 mt-0.5 text-blue-600" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Core Plans */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {corePlans.map((plan) => {
          const original = toCurrencyValue(plan.priceINR, plan.priceUSD, currency);
          const discounted = applyDiscount(original);
          const orig99 = toEnding99(original, currency);
          const disc99 = toEnding99(discounted, currency);
          return (
            <div key={plan.key} className={`rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col ${plan.topBorder}`}>
              {/* Soft header */}
              <div className={`${plan.headerBg} px-6 pt-5 pb-5`}>
                <div className="flex items-start justify-between gap-2">
                  <p className="text-base font-bold text-slate-800 leading-tight">{plan.name}</p>
                  {plan.popularTag ? (
                    <span className={`shrink-0 inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full border ${plan.badgeClass}`}>
                      <Star className="w-3 h-3" />{plan.popularTag}
                    </span>
                  ) : null}
                </div>
                {plan.benefitLine ? (
                  <p className="text-xs text-slate-500 mt-1.5 leading-snug">{plan.benefitLine}</p>
                ) : null}
                <div className="mt-4">
                  <p className="text-xs text-slate-400 line-through">{formatCurrency(orig99, currency)}</p>
                  <p className={`text-3xl font-extrabold mt-0.5 ${plan.priceColor}`}>
                    {formatCurrency(disc99, currency)}
                  </p>
                  <span className={`inline-block mt-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${plan.discountBadge}`}>50% OFF — First subscription</span>
                  {plan.key === "single" ? (
                    <p className="flex items-center gap-1 text-xs text-slate-500 mt-2">
                      <CalendarClock className="w-3.5 h-3.5" />
                      {pricing.singleCounselingPlan.durationMinutes} min session
                    </p>
                  ) : null}
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-slate-100" />

              {/* Features + CTA */}
              <div className="flex flex-col flex-1 px-6 py-5">
                <ul className="space-y-2.5 text-sm text-slate-700 flex-1">
                  {plan.features.slice(0, 4).map((feature, index) => (
                    <li key={`${plan.key}-feature-${index}`} className="flex items-start gap-2.5">
                      <BadgeCheck className={`w-4 h-4 mt-0.5 shrink-0 ${plan.iconColor}`} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className={`mt-6 w-full rounded-xl ${plan.ctaBg} text-white py-2.5 text-sm font-semibold transition-colors shadow-sm`}>
                  {plan.ctaLabel || "Get Started"}
                </button>
              </div>
            </div>
          );
        })}
      </section>

      {/* Additional Smart Plans */}
      <section className="space-y-5">
        <div className="text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 text-slate-600 px-4 py-1 text-sm font-medium">
            <Sparkles className="w-4 h-4 text-amber-500" />
            More Smart Plans
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mt-3">Power Packs for Every Goal</h2>
          <p className="text-slate-500 text-sm mt-1">Focused bundles for deeper mentoring and faster admissions support.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {additionalPlans.map((plan) => {
            const original = toCurrencyValue(plan.priceINR, plan.priceUSD, currency);
            const discounted = applyDiscount(original);
            const orig99 = toEnding99(original, currency);
            const disc99 = toEnding99(discounted, currency);
            return (
              <div key={plan.name} className={`rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col ${plan.topBorder}`}>
                <div className={`${plan.headerBg} px-6 pt-5 pb-5`}>
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-base font-bold text-slate-800 leading-tight">{plan.name}</p>
                    <span className={`shrink-0 text-[11px] font-semibold px-2.5 py-1 rounded-full border ${plan.badgeClass}`}>{plan.tag}</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1.5 leading-snug">{plan.benefitLine}</p>
                  <div className="mt-4">
                    <p className="text-xs text-slate-400 line-through">{formatCurrency(orig99, currency)}</p>
                    <p className={`text-3xl font-extrabold mt-0.5 ${plan.priceColor}`}>{formatCurrency(disc99, currency)}</p>
                    <span className={`inline-block mt-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${plan.discountBadge}`}>50% OFF — First subscription</span>
                  </div>
                </div>
                <div className="border-t border-slate-100" />
                <div className="flex flex-col flex-1 px-6 py-5">
                  <ul className="space-y-2.5 text-sm text-slate-700 flex-1">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <BadgeCheck className={`w-4 h-4 mt-0.5 shrink-0 ${plan.iconColor}`} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button className={`mt-6 w-full rounded-xl ${plan.ctaBg} text-white py-2.5 text-sm font-semibold transition-colors shadow-sm`}>
                    {plan.cta}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="space-y-6">
        <div className="text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 text-slate-600 px-4 py-1 text-sm font-medium">
            <Sparkles className="w-4 h-4 text-amber-500" />
            Side-by-Side Comparison
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mt-3">Compare All Plans</h2>
          <p className="text-slate-500 text-sm mt-1">From basic to premium — find the plan that fits your journey perfectly.</p>
        </div>

        {(() => {
          type ColPlan = {
            key: string;
            name: string;
            tag?: string;
            priceINR: number;
            priceUSD: number;
            headerBg: string;
            topBorder: string;
            badgeClass: string;
            checkBg: string;
            checkText: string;
            ctaBg: string;
            ctaLabel: string;
            popularTag?: string;
          };

          const colPlans: ColPlan[] = [
            {
              key: "booster",
              name: "Assessment Booster",
              tag: "One-Time",
              priceINR: 1499,
              priceUSD: 19,
              headerBg: "bg-gradient-to-b from-amber-50 to-white",
              topBorder: "border-t-4 border-amber-400",
              badgeClass: "bg-amber-100 text-amber-700 border-amber-200",
              checkBg: "bg-amber-50 border-amber-200",
              checkText: "text-amber-600",
              ctaBg: "bg-orange-500 hover:bg-orange-600",
              ctaLabel: "Boost Now",
            },
            {
              key: "single",
              name: pricing.singleCounselingPlan.name,
              tag: "Per Session",
              priceINR: pricing.singleCounselingPlan.priceINR,
              priceUSD: pricing.singleCounselingPlan.priceUSD,
              headerBg: "bg-gradient-to-b from-violet-50 to-white",
              topBorder: "border-t-4 border-violet-400",
              badgeClass: "bg-violet-100 text-violet-700 border-violet-200",
              checkBg: "bg-violet-50 border-violet-200",
              checkText: "text-violet-600",
              ctaBg: "bg-violet-600 hover:bg-violet-700",
              ctaLabel: pricing.singleCounselingPlan.ctaLabel || "Book Session",
              popularTag: pricing.singleCounselingPlan.popularTag,
            },
            {
              key: "monthly",
              name: pricing.monthlyPlan.name,
              tag: "Monthly",
              priceINR: pricing.monthlyPlan.priceINR,
              priceUSD: pricing.monthlyPlan.priceUSD,
              headerBg: "bg-gradient-to-b from-emerald-50 to-white",
              topBorder: "border-t-4 border-emerald-400",
              badgeClass: "bg-emerald-100 text-emerald-700 border-emerald-200",
              checkBg: "bg-emerald-50 border-emerald-200",
              checkText: "text-emerald-600",
              ctaBg: "bg-emerald-600 hover:bg-emerald-700",
              ctaLabel: pricing.monthlyPlan.ctaLabel || "Get Started",
              popularTag: pricing.monthlyPlan.popularTag,
            },
            {
              key: "quarterly",
              name: "Quarterly Mentorship",
              tag: "3-Month",
              priceINR: 4999,
              priceUSD: 74,
              headerBg: "bg-gradient-to-b from-sky-50 to-white",
              topBorder: "border-t-4 border-sky-400",
              badgeClass: "bg-sky-100 text-sky-700 border-sky-200",
              checkBg: "bg-sky-50 border-sky-200",
              checkText: "text-sky-600",
              ctaBg: "bg-sky-600 hover:bg-sky-700",
              ctaLabel: "Start Mentorship",
            },
            {
              key: "yearly",
              name: pricing.yearlyPlan.name,
              tag: "Best Value",
              priceINR: pricing.yearlyPlan.priceINR,
              priceUSD: pricing.yearlyPlan.priceUSD,
              headerBg: "bg-gradient-to-b from-indigo-100 to-indigo-50",
              topBorder: "border-t-4 border-indigo-500",
              badgeClass: "bg-indigo-100 text-indigo-700 border-indigo-300",
              checkBg: "bg-indigo-50 border-indigo-300",
              checkText: "text-indigo-600",
              ctaBg: "bg-indigo-600 hover:bg-indigo-700",
              ctaLabel: pricing.yearlyPlan.ctaLabel || "Subscribe Now",
              popularTag: pricing.yearlyPlan.popularTag,
            },
            {
              key: "sprint",
              name: "Admission Sprint Bundle",
              tag: "Premium",
              priceINR: 8999,
              priceUSD: 129,
              headerBg: "bg-gradient-to-b from-teal-100 to-teal-50",
              topBorder: "border-t-4 border-teal-500",
              badgeClass: "bg-teal-100 text-teal-700 border-teal-300",
              checkBg: "bg-teal-50 border-teal-200",
              checkText: "text-teal-600",
              ctaBg: "bg-teal-600 hover:bg-teal-700",
              ctaLabel: "Get Bundle",
            },
          ];

          type FeatureRow = { label: string; category?: boolean; values: string[] };
          // values index matches colPlans order: booster, single, monthly, quarterly, yearly, sprint
          const featureRows: FeatureRow[] = [
            { label: "Pricing & Access", category: true, values: [] },
            { label: "Plan Type", values: ["One-Time", "Per Session", "Monthly", "3-Month", "Yearly", "Bundle"] },
            { label: "Counseling Sessions", values: ["-", "1 Session", "Unlimited", "12 Sessions", "Unlimited", "Included"] },
            { label: "Career Assessment", category: true, values: [] },
            { label: "Psychometric Assessment", values: ["Advanced", "-", "Basic", "-", "Full Report", "-"] },
            { label: "Career Fit Profile", values: ["Detailed", "-", "Basic", "-", "In-Depth", "-"] },
            { label: "Career Percentile Insights", values: ["Included", "-", "-", "-", "Included", "-"] },
            { label: "Stream Recommendation", values: ["Included", "-", "Included", "-", "Included", "Included"] },
            { label: "Guidance & Mentoring", category: true, values: [] },
            { label: "Study Resources Access", values: ["-", "-", "Included", "Included", "Included", "-"] },
            { label: "Progress Dashboard", values: ["-", "-", "Included", "Included", "Included", "-"] },
            { label: "Competitive Exam Guidance", values: ["-", "-", "Included", "Included", "Included", "-"] },
            { label: "Weekly Check-ins", values: ["-", "-", "-", "Included", "Included", "-"] },
            { label: "Milestone Tracker", values: ["-", "-", "-", "Included", "Included", "-"] },
            { label: "Parent Progress Summary", values: ["-", "-", "-", "Included", "Included", "-"] },
            { label: "Admissions Support", category: true, values: [] },
            { label: "College Shortlisting", values: ["-", "Included", "Included", "-", "Included", "Included"] },
            { label: "Application Strategy", values: ["-", "-", "-", "-", "-", "Included"] },
            { label: "SOP / Profile Review", values: ["-", "-", "-", "-", "-", "Included"] },
            { label: "Interview Prep Sessions", values: ["-", "-", "-", "-", "Included", "Included"] },
            { label: "Support", category: true, values: [] },
            { label: "Priority Support", values: ["-", "-", "-", "-", "Included", "Included"] },
            { label: "Email & Chat Support", values: ["Included", "Included", "Included", "Included", "Included", "Included"] },
            { label: "Validity", values: ["Lifetime", "One-Time", "1 Month", "3 Months", "12 Months", "Ongoing"] },
          ];

          const isNeg = (v: string) => !v || v.trim() === "-" || v.trim() === "";
          const highlightCol = 4; // yearly = index 4

          return (
            <div className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-lg">
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm border-collapse">
                  <thead>
                    <tr>
                      {/* Feature label column */}
                      <th className="sticky left-0 z-20 w-48 min-w-[12rem] bg-slate-50 border-b-2 border-r-2 border-slate-200 px-5 py-5 text-left">
                        <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">Features</span>
                      </th>
                      {colPlans.map((plan, ci) => {
                        const orig = toCurrencyValue(plan.priceINR, plan.priceUSD, currency);
                        const disc = toEnding99(applyDiscount(orig), currency);
                        const isHighlight = ci === highlightCol;
                        return (
                          <th
                            key={plan.key}
                            className={`border-b-2 border-r border-slate-200 px-3 py-0 text-center align-top min-w-[9rem] ${
                              isHighlight ? "border-x-2 border-indigo-200" : ""
                            }`}
                          >
                            <div className={`flex flex-col items-center gap-1 py-4 ${plan.headerBg} ${plan.topBorder} border-t-4`}>
                              {plan.popularTag ? (
                                <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${plan.badgeClass}`}>
                                  <Star className="w-2.5 h-2.5" />{plan.popularTag}
                                </span>
                              ) : plan.tag ? (
                                <span className={`inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded-full border ${plan.badgeClass}`}>
                                  {plan.tag}
                                </span>
                              ) : <span className="h-5" />}
                              <p className={`font-bold text-sm mt-1 leading-tight text-center px-1 ${ isHighlight ? "text-indigo-700" : "text-slate-800" }`}>{plan.name}</p>
                              <p className={`text-xl font-extrabold mt-1 ${ isHighlight ? "text-indigo-700" : "text-slate-900" }`}>
                                {formatCurrency(disc, currency)}
                              </p>
                              <p className="text-[10px] text-slate-400 font-medium">{firstSubscriptionDiscount}% OFF</p>
                            </div>
                          </th>
                        );
                      })}
                    </tr>
                  </thead>

                  <tbody>
                    {featureRows.map((row, ri) => {
                      if (row.category) {
                        return (
                          <tr key={`cat-${ri}`}>
                            <td
                              colSpan={colPlans.length + 1}
                              className="bg-slate-100 border-t border-slate-200 px-5 py-2.5"
                            >
                              <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500">{row.label}</span>
                            </td>
                          </tr>
                        );
                      }
                      return (
                        <tr key={`row-${ri}`} className={ri % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                          <td className="sticky left-0 z-10 bg-inherit border-r-2 border-slate-100 px-5 py-3 font-medium text-slate-700 text-[13px]">
                            {row.label}
                          </td>
                          {row.values.map((val, ci) => {
                            const isHighlight = ci === highlightCol;
                            const neg = isNeg(val);
                            return (
                              <td
                                key={ci}
                                className={`border-r border-slate-100 px-3 py-3 text-center ${
                                  isHighlight ? "bg-indigo-50/40 border-x border-indigo-100" : ""
                                }`}
                              >
                                {neg ? (
                                  <div className="flex justify-center">
                                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-slate-100 border border-slate-200">
                                      <X className="w-3 h-3 text-slate-300" />
                                    </span>
                                  </div>
                                ) : (
                                  <div className="flex flex-col items-center gap-0.5">
                                    <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full border ${colPlans[ci].checkBg}`}>
                                      <Check className={`w-3 h-3 ${colPlans[ci].checkText}`} />
                                    </span>
                                    {val !== "Included" && (
                                      <span className={`text-[11px] font-medium mt-0.5 leading-tight max-w-[90px] text-center ${
                                        isHighlight ? "text-indigo-700" : "text-slate-600"
                                      }`}>{val}</span>
                                    )}
                                  </div>
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>

                  {/* Footer CTA row */}
                  <tfoot>
                    <tr className="border-t-2 border-slate-100 bg-slate-50">
                      <td className="sticky left-0 z-10 bg-slate-50 border-r-2 border-slate-200 px-5 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                        Get Started
                      </td>
                      {colPlans.map((plan, ci) => {
                        const isHighlight = ci === highlightCol;
                        return (
                          <td
                            key={plan.key}
                            className={`px-3 py-4 text-center border-r border-slate-100 ${
                              isHighlight ? "bg-indigo-50/40 border-x border-indigo-100" : ""
                            }`}
                          >
                            <button
                              className={`rounded-lg text-white text-xs font-semibold px-4 py-2 transition-colors shadow-sm ${
                                plan.ctaBg
                              }`}
                            >
                              {plan.ctaLabel}
                            </button>
                          </td>
                        );
                      })}
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          );
        })()}
      </section>

      <section className="space-y-8">
        <style>{`
          @keyframes testimonial-scroll {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .testimonial-track {
            display: flex;
            width: max-content;
            gap: 1.25rem;
            animation: testimonial-scroll 32s linear infinite;
          }
          .testimonial-track:hover {
            animation-play-state: paused;
          }
        `}</style>

        <div className="text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-200 bg-indigo-50 text-indigo-700 px-4 py-1 text-sm font-medium">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            Student Reviews
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mt-3">What Students Say</h2>
          <p className="text-slate-500 text-sm mt-1">Real outcomes from students who unlocked their potential with EduPath.</p>

          {/* Aggregate rating bar */}
          <div className="inline-flex items-center gap-2 mt-4 bg-amber-50 border border-amber-200 rounded-2xl px-5 py-2.5">
            <div className="flex items-center gap-0.5">
              {[1,2,3,4,5].map((s) => (
                <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-sm font-bold text-amber-800">4.9</span>
            <span className="text-xs text-amber-600 font-medium">· 2,400+ students</span>
          </div>
        </div>

        {pricing.testimonials.length > 0 ? (
          <>
            {/* Top featured testimonials grid */}
            {pricing.testimonials.length >= 3 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {pricing.testimonials.slice(0, 3).map((item, index) => {
                  const gradients = [
                    "from-indigo-500 to-violet-500",
                    "from-emerald-500 to-teal-500",
                    "from-amber-400 to-orange-500",
                  ];
                  const bgAccents = [
                    "bg-indigo-50 border-indigo-100",
                    "bg-emerald-50 border-emerald-100",
                    "bg-amber-50 border-amber-100",
                  ];
                  const quoteColors = [
                    "text-indigo-200",
                    "text-emerald-200",
                    "text-amber-200",
                  ];
                  const tagColors = [
                    "bg-indigo-100 text-indigo-700",
                    "bg-emerald-100 text-emerald-700",
                    "bg-amber-100 text-amber-800",
                  ];
                  return (
                    <div
                      key={`featured-${index}`}
                      className={`rounded-3xl border ${bgAccents[index % 3]} p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-0.5">
                            {[1,2,3,4,5].map((s) => (
                              <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            ))}
                          </div>
                          <Quote className={`w-7 h-7 ${quoteColors[index % 3]}`} />
                        </div>
                        <p className="text-[15px] text-slate-700 leading-relaxed italic">&ldquo;{item.quote}&rdquo;</p>
                      </div>
                      <div className="mt-5 pt-4 border-t border-white/60 flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${gradients[index % 3]} flex items-center justify-center shrink-0 shadow`}>
                          <span className="text-sm font-bold text-white">{item.name.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{item.name}</p>
                          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${tagColors[index % 3]}`}>
                            {item.planName}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : null}

            {/* Scrolling carousel for remaining testimonials */}
            {pricing.testimonials.length > 3 ? (
              <div className="relative overflow-hidden mt-2">
                <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
                <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />
                <div className="testimonial-track py-2">
                  {[...pricing.testimonials.slice(3), ...pricing.testimonials.slice(3)].map((item, index) => (
                    <div
                      key={`scroll-${index}`}
                      className="w-80 shrink-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-0.5">
                            {[1,2,3,4,5].map((s) => (
                              <Star key={s} className="w-3 h-3 fill-amber-400 text-amber-400" />
                            ))}
                          </div>
                          <Quote className="w-5 h-5 text-slate-200" />
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed italic">&ldquo;{item.quote}&rdquo;</p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center shrink-0">
                          <span className="text-xs font-bold text-slate-600">{item.name.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{item.name}</p>
                          <span className="text-[11px] text-slate-400 font-medium">{item.planName}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {/* When 3 or fewer testimonials, all are shown in the grid above — add scroll with duplicates for a looping feel */}
            {pricing.testimonials.length <= 3 ? (
              <div className="relative overflow-hidden">
                <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
                <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />
                <div className="testimonial-track py-2">
                  {[...pricing.testimonials, ...pricing.testimonials, ...pricing.testimonials].map((item, index) => (
                    <div
                      key={`loop-${index}`}
                      className="w-80 shrink-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-0.5 mb-3">
                          {[1,2,3,4,5].map((s) => (
                            <Star key={s} className="w-3 h-3 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed italic">&ldquo;{item.quote}&rdquo;</p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-100 to-violet-100 flex items-center justify-center shrink-0">
                          <span className="text-xs font-bold text-indigo-600">{item.name.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{item.name}</p>
                          <span className="text-[11px] text-slate-400 font-medium">{item.planName}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </>
        ) : null}
      </section>
    </main>
  );
}
