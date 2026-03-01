"use client";

import { useEffect, useMemo, useState } from "react";
import { BadgeCheck, Gift, Sparkles, ShieldCheck, IndianRupee, DollarSign, CalendarClock } from "lucide-react";

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
      priceINR: number;
      priceUSD: number;
      features: string[];
    };
    yearlyPlan: {
      name: string;
      description: string;
      priceINR: number;
      priceUSD: number;
      features: string[];
    };
    singleCounselingPlan: {
      name: string;
      description: string;
      priceINR: number;
      priceUSD: number;
      durationMinutes: number;
      features: string[];
    };
    firstSubscriptionDiscount: number;
  };
};

const planCardClass =
  "rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow";

export default function PricingPage() {
  const [data, setData] = useState<PricingResponse | null>(null);
  const [loading, setLoading] = useState(true);

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

  const additionalPlans = useMemo(
    () => [
      {
        name: "Quarterly Mentorship",
        description: "3-month focused mentorship for board + entrance readiness.",
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
        description: "One-time deep career profiling and action map package.",
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
        description: "End-to-end application and admissions guidance bundle.",
        priceINR: 8999,
        priceUSD: 129,
        features: [
          "Application strategy planning",
          "SOP/profile review support",
          "Interview prep sessions",
        ],
      },
    ],
    []
  );

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

  const discountedPrice = (price: number) => Math.max(0, Math.round((price * (100 - firstSubscriptionDiscount)) / 100));

  return (
    <main className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16 space-y-10">
      <section className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 text-blue-700 px-4 py-1 text-sm font-medium">
          <Sparkles className="w-4 h-4" />
          Flexible Plans for Every Student
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-slate-900">Pricing & Subscription Plans</h1>
        <p className="text-slate-600 max-w-3xl mx-auto">
          Choose monthly, yearly, single counseling, or premium bundles with dual pricing in INR and USD. First subscription discount is directly applied on all paid plans.
        </p>
        <div className="inline-flex items-center rounded-full bg-amber-100 border border-amber-200 text-amber-800 px-4 py-1.5 text-sm font-semibold">
          First Subscription Offer: {firstSubscriptionDiscount}% OFF on all paid plans
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
            {pricing.freeTier.features.map((feature, index) => (
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
            {pricing.freeTier.alwaysFreeFeatures.map((feature, index) => (
              <li key={`always-feature-${index}`} className="flex items-start gap-2">
                <BadgeCheck className="w-4 h-4 mt-0.5 text-blue-600" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={planCardClass}>
          <p className="text-lg font-semibold text-slate-900">{pricing.monthlyPlan.name}</p>
          <p className="text-sm text-slate-600 mt-1">{pricing.monthlyPlan.description}</p>
          <div className="mt-4 space-y-1">
            <p className="text-xs text-slate-500 line-through flex items-center gap-1">
              <IndianRupee className="w-3.5 h-3.5" /> {pricing.monthlyPlan.priceINR}
            </p>
            <p className="flex items-center gap-1 text-2xl font-bold text-emerald-700">
              <IndianRupee className="w-5 h-5" /> {discountedPrice(pricing.monthlyPlan.priceINR)}
              <span className="ml-2 text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">50% OFF</span>
            </p>
            <p className="text-xs text-slate-500 line-through flex items-center gap-1 mt-1">
              <DollarSign className="w-3.5 h-3.5" /> {pricing.monthlyPlan.priceUSD}
            </p>
            <p className="flex items-center gap-1 text-sm text-slate-600">
              <DollarSign className="w-4 h-4" /> {discountedPrice(pricing.monthlyPlan.priceUSD)}
            </p>
          </div>
          <ul className="mt-4 space-y-2 text-sm text-slate-700">
            {pricing.monthlyPlan.features.map((feature, index) => (
              <li key={`monthly-feature-${index}`} className="flex items-start gap-2">
                <BadgeCheck className="w-4 h-4 mt-0.5 text-emerald-600" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={`${planCardClass} border-blue-300`}>
          <p className="text-lg font-semibold text-slate-900">{pricing.yearlyPlan.name}</p>
          <p className="text-sm text-slate-600 mt-1">{pricing.yearlyPlan.description}</p>
          <div className="mt-4 space-y-1">
            <p className="text-xs text-slate-500 line-through flex items-center gap-1">
              <IndianRupee className="w-3.5 h-3.5" /> {pricing.yearlyPlan.priceINR}
            </p>
            <p className="flex items-center gap-1 text-2xl font-bold text-blue-700">
              <IndianRupee className="w-5 h-5" /> {discountedPrice(pricing.yearlyPlan.priceINR)}
              <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">50% OFF</span>
            </p>
            <p className="text-xs text-slate-500 line-through flex items-center gap-1 mt-1">
              <DollarSign className="w-3.5 h-3.5" /> {pricing.yearlyPlan.priceUSD}
            </p>
            <p className="flex items-center gap-1 text-sm text-slate-600">
              <DollarSign className="w-4 h-4" /> {discountedPrice(pricing.yearlyPlan.priceUSD)}
            </p>
          </div>
          <ul className="mt-4 space-y-2 text-sm text-slate-700">
            {pricing.yearlyPlan.features.map((feature, index) => (
              <li key={`yearly-feature-${index}`} className="flex items-start gap-2">
                <BadgeCheck className="w-4 h-4 mt-0.5 text-blue-600" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={planCardClass}>
          <p className="text-lg font-semibold text-slate-900">{pricing.singleCounselingPlan.name}</p>
          <p className="text-sm text-slate-600 mt-1">{pricing.singleCounselingPlan.description}</p>
          <div className="mt-4 space-y-1">
            <p className="text-xs text-slate-500 line-through flex items-center gap-1">
              <IndianRupee className="w-3.5 h-3.5" /> {pricing.singleCounselingPlan.priceINR}
            </p>
            <p className="flex items-center gap-1 text-2xl font-bold text-violet-700">
              <IndianRupee className="w-5 h-5" /> {discountedPrice(pricing.singleCounselingPlan.priceINR)}
              <span className="ml-2 text-xs bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full">50% OFF</span>
            </p>
            <p className="text-xs text-slate-500 line-through flex items-center gap-1 mt-1">
              <DollarSign className="w-3.5 h-3.5" /> {pricing.singleCounselingPlan.priceUSD}
            </p>
            <p className="flex items-center gap-1 text-sm text-slate-600">
              <DollarSign className="w-4 h-4" /> {discountedPrice(pricing.singleCounselingPlan.priceUSD)}
            </p>
            <p className="flex items-center gap-1 text-xs text-slate-500">
              <CalendarClock className="w-4 h-4" />
              {pricing.singleCounselingPlan.durationMinutes} min session
            </p>
          </div>
          <ul className="mt-4 space-y-2 text-sm text-slate-700">
            {pricing.singleCounselingPlan.features.map((feature, index) => (
              <li key={`single-feature-${index}`} className="flex items-start gap-2">
                <BadgeCheck className="w-4 h-4 mt-0.5 text-violet-600" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">More Smart Plans</h2>
          <p className="text-slate-600 mt-1">Extra value packs for students who need deeper mentoring and faster admissions support.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {additionalPlans.map((plan, index) => (
            <div key={plan.name} className={`${planCardClass} ${index === 0 ? "border-cyan-300" : ""}`}>
              <p className="text-lg font-semibold text-slate-900">{plan.name}</p>
              <p className="text-sm text-slate-600 mt-1">{plan.description}</p>
              <div className="mt-4 space-y-1">
                <p className="text-xs text-slate-500 line-through flex items-center gap-1">
                  <IndianRupee className="w-3.5 h-3.5" /> {plan.priceINR}
                </p>
                <p className="flex items-center gap-1 text-2xl font-bold text-cyan-700">
                  <IndianRupee className="w-5 h-5" /> {discountedPrice(plan.priceINR)}
                  <span className="ml-2 text-xs bg-cyan-100 text-cyan-700 px-2 py-0.5 rounded-full">50% OFF</span>
                </p>
                <p className="text-xs text-slate-500 line-through flex items-center gap-1 mt-1">
                  <DollarSign className="w-3.5 h-3.5" /> {plan.priceUSD}
                </p>
                <p className="flex items-center gap-1 text-sm text-slate-600">
                  <DollarSign className="w-4 h-4" /> {discountedPrice(plan.priceUSD)}
                </p>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {plan.features.map((feature) => (
                  <li key={`${plan.name}-${feature}`} className="flex items-start gap-2">
                    <BadgeCheck className="w-4 h-4 mt-0.5 text-cyan-600" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
