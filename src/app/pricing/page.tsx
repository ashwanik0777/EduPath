"use client";

import { useEffect, useState } from "react";
import { BadgeCheck, Gift, Sparkles, ShieldCheck, IndianRupee, DollarSign, Euro, CalendarClock, Check, X, Star, Quote } from "lucide-react";
import { type WebsitePricing } from "@/app/lib/pricingDefaults";

type CurrencyCode = "INR" | "USD" | "EUR";

type PricingResponse = {
  success: boolean;
  pricing: WebsitePricing;
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
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-14 md:py-20 space-y-16">
        {/* Hero skeleton */}
        <section className="flex flex-col items-center gap-5">
          <div className="h-7 w-56 rounded-full bg-slate-200 animate-pulse" />
          <div className="h-10 w-96 max-w-full rounded-xl bg-slate-200 animate-pulse" />
          <div className="h-4 w-72 rounded-lg bg-slate-100 animate-pulse" />
          <div className="h-10 w-60 rounded-xl bg-slate-200 animate-pulse mt-2" />
        </section>

        {/* Free tier cards skeleton */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[0, 1].map((i) => (
            <div key={i} className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4 shadow-sm">
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full bg-slate-200 animate-pulse" />
                <div className="h-5 w-40 rounded-lg bg-slate-200 animate-pulse" />
              </div>
              <div className="h-4 w-full rounded bg-slate-100 animate-pulse" />
              <div className="h-4 w-5/6 rounded bg-slate-100 animate-pulse" />
              <div className="space-y-2">
                {[0, 1, 2].map((j) => (
                  <div key={j} className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded-full bg-slate-200 animate-pulse shrink-0" />
                    <div className="h-4 rounded bg-slate-100 animate-pulse" style={{ width: `${70 + j * 8}%` }} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Core plans skeleton */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden flex flex-col">
              <div className="border-t-4 border-slate-200 bg-slate-50 p-6 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="h-5 w-32 rounded-lg bg-slate-200 animate-pulse" />
                  <div className="h-6 w-20 rounded-full bg-slate-200 animate-pulse" />
                </div>
                <div className="h-3 w-48 rounded bg-slate-100 animate-pulse" />
                <div className="pt-2 space-y-1.5">
                  <div className="h-3 w-16 rounded bg-slate-200 animate-pulse" />
                  <div className="h-8 w-28 rounded-lg bg-slate-200 animate-pulse" />
                  <div className="h-5 w-36 rounded-full bg-slate-100 animate-pulse" />
                </div>
              </div>
              <div className="border-t border-slate-100" />
              <div className="p-6 flex flex-col flex-1 space-y-3">
                {[0, 1, 2, 3].map((j) => (
                  <div key={j} className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded-full bg-slate-200 animate-pulse shrink-0" />
                    <div className="h-3.5 rounded bg-slate-100 animate-pulse" style={{ width: `${65 + j * 5}%` }} />
                  </div>
                ))}
                <div className="h-10 w-full rounded-xl bg-slate-200 animate-pulse mt-4" />
              </div>
            </div>
          ))}
        </section>

        {/* Additional plans section skeleton */}
        <section className="space-y-6">
          <div className="flex flex-col items-center gap-3">
            <div className="h-7 w-40 rounded-full bg-slate-200 animate-pulse" />
            <div className="h-8 w-64 rounded-xl bg-slate-200 animate-pulse" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[0, 1, 2].map((i) => (
              <div key={i} className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden flex flex-col">
                <div className="border-t-4 border-slate-200 bg-slate-50 p-6 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="h-5 w-36 rounded-lg bg-slate-200 animate-pulse" />
                    <div className="h-5 w-16 rounded-full bg-slate-200 animate-pulse" />
                  </div>
                  <div className="h-3 w-44 rounded bg-slate-100 animate-pulse" />
                  <div className="pt-2 space-y-1.5">
                    <div className="h-3 w-16 rounded bg-slate-200 animate-pulse" />
                    <div className="h-8 w-24 rounded-lg bg-slate-200 animate-pulse" />
                    <div className="h-5 w-32 rounded-full bg-slate-100 animate-pulse" />
                  </div>
                </div>
                <div className="border-t border-slate-100" />
                <div className="p-6 flex flex-col flex-1 space-y-3">
                  {[0, 1, 2].map((j) => (
                    <div key={j} className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full bg-slate-200 animate-pulse shrink-0" />
                      <div className="h-3.5 rounded bg-slate-100 animate-pulse" style={{ width: `${60 + j * 8}%` }} />
                    </div>
                  ))}
                  <div className="h-10 w-full rounded-xl bg-slate-200 animate-pulse mt-4" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Comparison table skeleton */}
        <section className="space-y-6">
          <div className="flex flex-col items-center gap-3">
            <div className="h-7 w-48 rounded-full bg-slate-200 animate-pulse" />
            <div className="h-8 w-52 rounded-xl bg-slate-200 animate-pulse" />
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-lg">
            <div className="overflow-x-auto">
              <div className="min-w-[700px] p-6 space-y-3">
                {/* Table header row */}
                <div className="grid grid-cols-7 gap-3 pb-4 border-b border-slate-100">
                  <div className="h-8 rounded bg-slate-100 animate-pulse" />
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex flex-col items-center gap-2">
                      <div className="h-4 w-14 rounded-full bg-slate-200 animate-pulse" />
                      <div className="h-5 w-16 rounded-lg bg-slate-200 animate-pulse" />
                      <div className="h-6 w-12 rounded-lg bg-slate-200 animate-pulse" />
                      <div className="h-4 w-10 rounded-full bg-slate-100 animate-pulse" />
                    </div>
                  ))}
                </div>
                {/* Table body rows */}
                {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                  <div key={i} className={`grid grid-cols-7 gap-3 py-2 ${i % 2 === 0 ? "bg-white" : "bg-slate-50/50"} rounded`}>
                    <div className="h-4 w-28 rounded bg-slate-100 animate-pulse" />
                    {[0, 1, 2, 3, 4, 5].map((j) => (
                      <div key={j} className="flex justify-center">
                        <div className="h-6 w-6 rounded-full bg-slate-200 animate-pulse" />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials skeleton */}
        <section className="space-y-6">
          <div className="flex flex-col items-center gap-3">
            <div className="h-7 w-36 rounded-full bg-slate-200 animate-pulse" />
            <div className="h-8 w-56 rounded-xl bg-slate-200 animate-pulse" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[0, 1, 2].map((i) => (
              <div key={i} className="rounded-3xl border border-slate-200 bg-white p-6 space-y-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex gap-0.5">
                    {[0, 1, 2, 3, 4].map((s) => (
                      <div key={s} className="h-3.5 w-3.5 rounded-sm bg-slate-200 animate-pulse" />
                    ))}
                  </div>
                  <div className="h-7 w-7 rounded bg-slate-100 animate-pulse" />
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-full rounded bg-slate-100 animate-pulse" />
                  <div className="h-4 w-full rounded bg-slate-100 animate-pulse" />
                  <div className="h-4 w-3/4 rounded bg-slate-100 animate-pulse" />
                </div>
                <div className="border-t border-slate-100 pt-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-200 animate-pulse shrink-0" />
                  <div className="space-y-1.5">
                    <div className="h-4 w-24 rounded bg-slate-200 animate-pulse" />
                    <div className="h-3.5 w-20 rounded-full bg-slate-100 animate-pulse" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
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

  const additionalPlanStyles = [
    {
      headerBg: "bg-gradient-to-br from-sky-50 to-cyan-50",
      topBorder: "border-t-4 border-sky-400",
      badgeClass: "bg-sky-100 text-sky-700 border-sky-200",
      iconColor: "text-sky-500",
      priceColor: "text-sky-700",
      ctaBg: "bg-sky-600 hover:bg-sky-700",
      discountBadge: "bg-sky-100 text-sky-700",
    },
    {
      headerBg: "bg-gradient-to-br from-amber-50 to-orange-50",
      topBorder: "border-t-4 border-amber-400",
      badgeClass: "bg-amber-100 text-amber-700 border-amber-200",
      iconColor: "text-amber-500",
      priceColor: "text-amber-700",
      ctaBg: "bg-orange-500 hover:bg-orange-600",
      discountBadge: "bg-amber-100 text-amber-700",
    },
    {
      headerBg: "bg-gradient-to-br from-teal-50 to-cyan-50",
      topBorder: "border-t-4 border-teal-400",
      badgeClass: "bg-teal-100 text-teal-700 border-teal-200",
      iconColor: "text-teal-500",
      priceColor: "text-teal-700",
      ctaBg: "bg-teal-600 hover:bg-teal-700",
      discountBadge: "bg-teal-100 text-teal-700",
    },
  ] as const;

  const additionalPlans = pricing.additionalPlans.map((plan, index) => ({
    ...plan,
    ...additionalPlanStyles[index % additionalPlanStyles.length],
  }));

  return (
    <main className="max-w-7xl mx-auto px-4 md:px-6 py-14 md:py-20 space-y-20">
      <section className="text-center space-y-5">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 text-blue-700 px-5 py-1.5 text-sm font-semibold shadow-sm">
          <Sparkles className="w-4 h-4" />
          Flexible Plans for Every Student
        </div>
        <h1 className="text-4xl py-2 md:text-5xl font-extrabold text-slate-900 tracking-tight">Pricing & Subscription Plans</h1>
       
        
        
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
                  className={`inline-flex items-center gap-1.5 rounded-lg px-8 py-1.5 text-sm font-medium transition-colors ${
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
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-7 space-y-4 shadow-sm">
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

        <div className="rounded-2xl border border-blue-200 bg-blue-50 p-7 space-y-4 shadow-sm">
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
      <section className="space-y-8">
        <div className="text-center space-y-3">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 text-slate-600 px-5 py-1.5 text-sm font-semibold shadow-sm">
            <Sparkles className="w-4 h-4 text-blue-500" />
            Core Subscription Plans
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Pick Your Perfect Plan</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {corePlans.map((plan) => {
          const original = toCurrencyValue(plan.priceINR, plan.priceUSD, currency);
          const discounted = applyDiscount(original);
          const orig99 = toEnding99(original, currency);
          const disc99 = toEnding99(discounted, currency);
            return (
            <div key={plan.key} className={`rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden flex flex-col ${plan.topBorder}`}>
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
                  <span className={`inline-block mt-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${plan.discountBadge}`}>{firstSubscriptionDiscount}% OFF — First subscription</span>
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
                <button className={`mt-6 w-full rounded-full border ${plan.badgeClass} py-2.5 text-sm font-semibold transition-all shadow-sm hover:shadow-md`}>
                  {plan.ctaLabel || "Get Started"}
                </button>
              </div>
            </div>
          );
          })}
        </div>
      </section>

      {/* Additional Smart Plans */}
      <section className="space-y-8">
        <div className="text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 text-slate-600 px-4 py-1 text-sm font-medium">
            <Sparkles className="w-4 h-4 text-amber-500" />
            More Smart Plans
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mt-2">Power Packs for Every Goal</h2>
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
                    <span className={`inline-block mt-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${plan.discountBadge}`}>{firstSubscriptionDiscount}% OFF — First subscription</span>
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
                  <button className={`mt-6 w-full rounded-full border ${plan.badgeClass} py-2.5 text-sm font-semibold transition-all shadow-sm hover:shadow-md`}>
                    {plan.ctaLabel || "Get Started"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="space-y-8">
        <div className="text-center space-y-3">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 text-slate-600 px-5 py-1.5 text-sm font-semibold shadow-sm">
            <Sparkles className="w-4 h-4 text-amber-500" />
            Side-by-Side Comparison
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Compare All Plans</h2>
          
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

          const quarterlyPlan = pricing.additionalPlans[0];
          const boosterPlan = pricing.additionalPlans[1];
          const sprintPlan = pricing.additionalPlans[2];

          // index: 0=booster, 1=single, 2=monthly, 3=quarterly, 4=sprint, 5=yearly
          const colPlans: ColPlan[] = [
            {
              key: "booster",
              name: boosterPlan.name,
              tag: boosterPlan.tag,
              priceINR: boosterPlan.priceINR,
              priceUSD: boosterPlan.priceUSD,
              headerBg: "bg-gradient-to-b from-amber-50 to-white",
              topBorder: "border-t-4 border-amber-400",
              badgeClass: "bg-amber-100 text-amber-700 border-amber-200",
              checkBg: "bg-amber-50 border-amber-200",
              checkText: "text-amber-600",
              ctaBg: "bg-orange-500 hover:bg-orange-600",
              ctaLabel: boosterPlan.ctaLabel || "Boost Now",
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
              name: quarterlyPlan.name,
              tag: quarterlyPlan.tag,
              priceINR: quarterlyPlan.priceINR,
              priceUSD: quarterlyPlan.priceUSD,
              headerBg: "bg-gradient-to-b from-sky-50 to-white",
              topBorder: "border-t-4 border-sky-400",
              badgeClass: "bg-sky-100 text-sky-700 border-sky-200",
              checkBg: "bg-sky-50 border-sky-200",
              checkText: "text-sky-600",
              ctaBg: "bg-sky-600 hover:bg-sky-700",
              ctaLabel: quarterlyPlan.ctaLabel || "Start Mentorship",
            },
            {
              key: "sprint",
              name: sprintPlan.name,
              tag: sprintPlan.tag,
              priceINR: sprintPlan.priceINR,
              priceUSD: sprintPlan.priceUSD,
              headerBg: "bg-gradient-to-b from-teal-100 to-teal-50",
              topBorder: "border-t-4 border-teal-500",
              badgeClass: "bg-teal-100 text-teal-700 border-teal-300",
              checkBg: "bg-teal-50 border-teal-200",
              checkText: "text-teal-600",
              ctaBg: "bg-teal-600 hover:bg-teal-700",
              ctaLabel: sprintPlan.ctaLabel || "Get Bundle",
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
          ];

          const featureRows = pricing.fullComparisonRows;

          const isNeg = (v: string) => !v || v.trim() === "-" || v.trim() === "";
          const highlightCol = 5; // yearly = last column (index 5)

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
                        const origFull = toEnding99(orig, currency);
                        const disc = toEnding99(applyDiscount(orig), currency);
                        const isHighlight = ci === highlightCol;
                        return (
                          <th
                            key={plan.key}
                            className={`border-b-2 border-r border-slate-200 px-0 py-0 text-center align-bottom min-w-[9.5rem] ${
                              isHighlight ? "border-x-2 border-indigo-200" : ""
                            }`}
                          >
                            {/* Fixed 4-zone header — every zone same height across all columns */}
                            <div className={`flex flex-col ${plan.headerBg} ${plan.topBorder} border-t-4 pb-3`}>

                              {/* Zone 1 — badge (fixed h-8, always present) */}
                              <div className="h-8 flex items-center justify-center px-2 pt-2">
                                {plan.popularTag ? (
                                  <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${plan.badgeClass}`}>
                                    <Star className="w-2.5 h-2.5" />{plan.popularTag}
                                  </span>
                                ) : plan.tag ? (
                                  <span className={`inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded-full border ${plan.badgeClass}`}>
                                    {plan.tag}
                                  </span>
                                ) : null}
                              </div>

                              {/* Zone 2 — plan name (fixed h-10, 2-line cap) */}
                              <div className="h-10 flex items-center justify-center px-2">
                                <p className={`font-bold text-[13px] leading-tight text-center line-clamp-2 ${isHighlight ? "text-indigo-700" : "text-slate-800"}`}>
                                  {plan.name}
                                </p>
                              </div>

                              {/* Zone 3 — price block (original strikethrough + discounted, fixed h-14) */}
                              <div className="h-14 flex flex-col items-center justify-center px-2">
                                <p className="text-[11px] text-slate-400 line-through leading-none">
                                  {formatCurrency(origFull, currency)}
                                </p>
                                <p className={`text-[22px] font-extrabold leading-tight mt-0.5 ${isHighlight ? "text-indigo-700" : "text-slate-900"}`}>
                                  {formatCurrency(disc, currency)}
                                </p>
                              </div>

                              {/* Zone 4 — % OFF badge (fixed h-6, always at bottom) */}
                              <div className="h-6 flex items-center justify-center px-2">
                                <span className={`inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full border ${plan.badgeClass}`}>
                                  {firstSubscriptionDiscount}% OFF
                                </span>
                              </div>

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
                          <td className="sticky left-0 z-10 bg-inherit border-r-2 border-slate-100 px-5 py-3 font-medium text-slate-700 text-[13px] align-middle">
                            {row.label}
                          </td>
                          {row.values.map((val, ci) => {
                            const isHighlight = ci === highlightCol;
                            const neg = isNeg(val);
                            return (
                              <td
                                key={ci}
                                className={`border-r border-slate-100 px-3 py-2.5 text-center align-middle ${
                                  isHighlight ? "bg-indigo-50/40 border-x border-indigo-100" : ""
                                }`}
                              >
                                {neg ? (
                                  <div className="flex items-center justify-center h-9">
                                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-rose-50 border border-rose-200">
                                      <X className="w-3.5 h-3.5 text-rose-500 stroke-[2.5]" />
                                    </span>
                                  </div>
                                ) : (
                                  <div className="flex flex-col items-center justify-center gap-0.5 min-h-[2.25rem]">
                                    <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full border ${colPlans[ci].checkBg}`}>
                                      <Check className={`w-3.5 h-3.5 stroke-[2.5] ${colPlans[ci].checkText}`} />
                                    </span>
                                    {val !== "Included" && (
                                      <span className={`text-[11px] font-semibold leading-tight text-center ${
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
                              className={`rounded-full border text-xs font-semibold px-4 py-2 transition-all shadow-sm hover:shadow-md ${
                                plan.badgeClass
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

      <section className="space-y-10">
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
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mt-2">What Students Say</h2>
          
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
