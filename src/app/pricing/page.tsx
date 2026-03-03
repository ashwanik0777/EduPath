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
      headerBg: "bg-gradient-to-br from-rose-50 to-pink-50",
      topBorder: "border-t-4 border-rose-400",
      badgeClass: "bg-rose-100 text-rose-700 border-rose-200",
      iconColor: "text-rose-500",
      priceColor: "text-rose-700",
      ctaBg: "bg-rose-600 hover:bg-rose-700",
      discountBadge: "bg-rose-100 text-rose-700",
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
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Compare All Plans</h2>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-md">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr>
                  {/* Feature label header */}
                  <th className="w-52 min-w-[13rem] bg-slate-50 border-b border-r border-slate-200 px-5 py-4 text-left">
                    <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">Features</span>
                  </th>

                  {/* Monthly plan header */}
                  <th className="border-b border-r border-slate-200 px-4 py-0 text-center align-bottom">
                    <div className="flex flex-col items-center gap-1 py-4 bg-white">
                      {pricing.monthlyPlan.popularTag ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200">
                          <Star className="w-3 h-3" />
                          {pricing.monthlyPlan.popularTag}
                        </span>
                      ) : <span className="h-5" />}
                      <p className="font-bold text-slate-900 text-base mt-1">{pricing.monthlyPlan.name}</p>
                      <p className="text-xs text-slate-400">{pricing.monthlyPlan.benefitLine}</p>
                    </div>
                  </th>

                  {/* Yearly plan header – highlighted */}
                  <th className="border-b border-r border-slate-200 px-4 py-0 text-center align-bottom">
                    <div className="flex flex-col items-center gap-1 py-4 bg-gradient-to-b from-indigo-50 to-white rounded-t-2xl">
                      {pricing.yearlyPlan.popularTag ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700 border border-indigo-200">
                          <Star className="w-3 h-3" />
                          {pricing.yearlyPlan.popularTag}
                        </span>
                      ) : <span className="h-5" />}
                      <p className="font-bold text-indigo-700 text-base mt-1">{pricing.yearlyPlan.name}</p>
                      <p className="text-xs text-indigo-400">{pricing.yearlyPlan.benefitLine}</p>
                    </div>
                  </th>

                  {/* Single counseling header */}
                  <th className="border-b border-slate-200 px-4 py-0 text-center align-bottom">
                    <div className="flex flex-col items-center gap-1 py-4 bg-white">
                      {pricing.singleCounselingPlan.popularTag ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-violet-100 text-violet-700 border border-violet-200">
                          <Star className="w-3 h-3" />
                          {pricing.singleCounselingPlan.popularTag}
                        </span>
                      ) : <span className="h-5" />}
                      <p className="font-bold text-slate-900 text-base mt-1">{pricing.singleCounselingPlan.name}</p>
                      <p className="text-xs text-slate-400">{pricing.singleCounselingPlan.benefitLine}</p>
                    </div>
                  </th>
                </tr>
              </thead>

              <tbody>
                {pricing.comparisonRows.map((row, index) => {
                  const isNegative = (val: string) => !val || val.toLowerCase().includes("not included") || val.trim() === "-" || val.trim() === "";
                  const cellClass = (val: string, highlight?: boolean) => isNegative(val)
                    ? `px-4 py-3.5 text-center ${highlight ? "bg-indigo-50/40" : ""}`
                    : `px-4 py-3.5 text-center ${highlight ? "bg-indigo-50/40" : ""}`;

                  return (
                    <tr key={`${row.label}-${index}`} className={index % 2 === 0 ? "bg-white" : "bg-slate-50/60"}>
                      {/* Feature name */}
                      <td className="border-r border-slate-100 px-5 py-3.5 font-medium text-slate-800">
                        {row.label}
                      </td>

                      {/* Monthly value */}
                      <td className={`${cellClass(row.monthlyPlanValue)} border-r border-slate-100`}>
                        {isNegative(row.monthlyPlanValue) ? (
                          <div className="flex flex-col items-center gap-0.5">
                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-rose-50 border border-rose-200">
                              <X className="w-3.5 h-3.5 text-rose-400" />
                            </span>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center gap-0.5">
                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-50 border border-emerald-200">
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                            </span>
                            <span className="text-xs text-slate-600 mt-1 leading-tight max-w-[120px]">{row.monthlyPlanValue}</span>
                          </div>
                        )}
                      </td>

                      {/* Yearly value – highlighted column */}
                      <td className={`${cellClass(row.yearlyPlanValue, true)} border-r border-indigo-100 bg-indigo-50/30`}>
                        {isNegative(row.yearlyPlanValue) ? (
                          <div className="flex flex-col items-center gap-0.5">
                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-rose-50 border border-rose-200">
                              <X className="w-3.5 h-3.5 text-rose-400" />
                            </span>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center gap-0.5">
                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-indigo-100 border border-indigo-300">
                              <Check className="w-3.5 h-3.5 text-indigo-600" />
                            </span>
                            <span className="text-xs text-indigo-700 font-medium mt-1 leading-tight max-w-[120px]">{row.yearlyPlanValue}</span>
                          </div>
                        )}
                      </td>

                      {/* Single counseling value */}
                      <td className={cellClass(row.singleCounselingPlanValue)}>
                        {isNegative(row.singleCounselingPlanValue) ? (
                          <div className="flex flex-col items-center gap-0.5">
                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-rose-50 border border-rose-200">
                              <X className="w-3.5 h-3.5 text-rose-400" />
                            </span>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center gap-0.5">
                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-violet-50 border border-violet-200">
                              <Check className="w-3.5 h-3.5 text-violet-600" />
                            </span>
                            <span className="text-xs text-slate-600 mt-1 leading-tight max-w-[120px]">{row.singleCounselingPlanValue}</span>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>

              {/* Footer CTA row */}
              <tfoot>
                <tr className="border-t-2 border-slate-100 bg-slate-50">
                  <td className="border-r border-slate-200 px-5 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Get Started</td>
                  <td className="border-r border-slate-100 px-4 py-4 text-center">
                    <button className="rounded-lg border border-emerald-300 bg-white text-emerald-700 text-xs font-semibold px-4 py-2 hover:bg-emerald-50 transition-colors">
                      {pricing.monthlyPlan.ctaLabel || "Get Started"}
                    </button>
                  </td>
                  <td className="border-r border-indigo-100 px-4 py-4 text-center bg-indigo-50/30">
                    <button className="rounded-lg bg-indigo-600 text-white text-xs font-semibold px-5 py-2 hover:bg-indigo-700 transition-colors shadow">
                      {pricing.yearlyPlan.ctaLabel || "Subscribe Now"}
                    </button>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <button className="rounded-lg border border-violet-300 bg-white text-violet-700 text-xs font-semibold px-4 py-2 hover:bg-violet-50 transition-colors">
                      {pricing.singleCounselingPlan.ctaLabel || "Book Session"}
                    </button>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <style>{`
          @keyframes testimonial-scroll {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .testimonial-track {
            display: flex;
            width: max-content;
            animation: testimonial-scroll 28s linear infinite;
          }
          .testimonial-track:hover {
            animation-play-state: paused;
          }
        `}</style>

        <div className="text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 text-slate-600 px-4 py-1 text-sm font-medium">
            <Quote className="w-4 h-4 text-indigo-400" />
            Real Stories
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mt-3">What Students Say</h2>
          <p className="text-slate-500 text-sm mt-1">Real outcomes from students who subscribed to our plans.</p>
        </div>

        {pricing.testimonials.length > 0 ? (
          <div className="relative overflow-hidden">
            {/* Fade edges */}
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />

            <div className="testimonial-track gap-5 py-1">
              {[...pricing.testimonials, ...pricing.testimonials].map((item, index) => (
                <div
                  key={`testimonial-${index}`}
                  className="w-72 shrink-0 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <Quote className="w-6 h-6 text-indigo-200 mb-3" />
                    <p className="text-sm text-slate-600 leading-relaxed">{item.quote}</p>
                  </div>
                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-100 to-violet-100 flex items-center justify-center shrink-0">
                      <span className="text-sm font-bold text-indigo-600">{item.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{item.name}</p>
                      <span className="text-xs text-slate-400 font-medium">{item.planName}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}

       
      </section>
    </main>
  );
}
