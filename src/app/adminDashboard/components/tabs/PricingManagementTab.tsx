"use client";

import { useState } from "react";
import {
  BadgeDollarSign,
  Save,
  IndianRupee,
  DollarSign,
  Gift,
  Star,
  Users,
  Calendar,
  Clock,
  CheckCircle2,
  Percent,
  BarChart3,
  Quote,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  Eye,
  TrendingUp,
  Zap,
  Shield,
  Phone,
} from "lucide-react";

type PricingPlan = {
  name: string;
  description: string;
  benefitLine: string;
  popularTag: string;
  ctaLabel: string;
  priceINR: number;
  priceUSD: number;
  features: string[];
};

type SingleCounselingPlan = PricingPlan & { durationMinutes: number };

type PricingSettings = {
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

type PricingManagementTabProps = {
  pricing: PricingSettings;
  setPricing: (updater: (prev: PricingSettings) => PricingSettings) => void;
  inputClass: string;
  primaryButtonClass: string;
  saveWebsiteManagement: () => Promise<void>;
};

type ActiveSection = "overview" | "freeTier" | "plans" | "discount" | "comparison" | "testimonials";

function SectionCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`bg-white rounded-2xl border border-slate-200 shadow-sm ${className}`}>
      {children}
    </div>
  );
}

function SectionHeader({
  icon: Icon,
  iconColor,
  title,
  subtitle,
  badge,
}: {
  icon: React.ElementType;
  iconColor: string;
  title: string;
  subtitle?: string;
  badge?: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-3 px-5 pt-5 pb-4 border-b border-slate-100">
      <div className="flex items-start gap-3">
        <span className={`mt-0.5 p-2 rounded-xl bg-slate-50 border border-slate-200 ${iconColor}`}>
          <Icon className="w-4 h-4" />
        </span>
        <div>
          <h3 className="font-semibold text-slate-900 text-sm">{title}</h3>
          {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
        </div>
      </div>
      {badge}
    </div>
  );
}

export function PricingManagementTab({
  pricing,
  setPricing,
  inputClass,
  primaryButtonClass,
  saveWebsiteManagement,
}: PricingManagementTabProps) {
  const [activeSection, setActiveSection] = useState<ActiveSection>("overview");
  const [saving, setSaving] = useState(false);
  const [expandedPlan, setExpandedPlan] = useState<string | null>("monthlyPlan");

  /* ---- helpers ---- */
  const toLines = (items: string[]) => items.join("\n");
  const fromLines = (value: string) =>
    value
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);

  const setPlanField = <K extends "monthlyPlan" | "yearlyPlan" | "singleCounselingPlan">(
    planKey: K,
    field: keyof PricingSettings[K],
    value: unknown,
  ) =>
    setPricing((prev) => ({
      ...prev,
      [planKey]: { ...prev[planKey], [field]: value },
    }));

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveWebsiteManagement();
    } finally {
      setSaving(false);
    }
  };

  /* ---- nav sections ---- */
  const navSections: { id: ActiveSection; label: string; icon: React.ElementType; color: string }[] = [
    { id: "overview", label: "Overview", icon: BarChart3, color: "text-slate-700" },
    { id: "freeTier", label: "Free Tier", icon: Gift, color: "text-emerald-600" },
    { id: "plans", label: "Paid Plans", icon: Star, color: "text-amber-600" },
    { id: "discount", label: "Discount", icon: Percent, color: "text-rose-500" },
    { id: "comparison", label: "Comparison Table", icon: BarChart3, color: "text-indigo-600" },
    { id: "testimonials", label: "Testimonials", icon: Quote, color: "text-violet-600" },
  ];

  const EUR_PER_USD = 0.92;
  const formatINR = (n: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
  const formatUSD = (n: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(n);

  /* ========================== RENDER ========================== */
  return (
    <div className="space-y-5 animate-in fade-in-0 slide-in-from-bottom-1 duration-300">
      {/* Top summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-4">
          <div className="flex items-center gap-2 text-emerald-700 mb-1">
            <Gift className="w-4 h-4" />
            <span className="text-xs font-medium uppercase tracking-wide">Free Tier</span>
          </div>
          <p className="text-lg font-bold text-emerald-800">
            {pricing.freeTier.enabled ? `${pricing.freeTier.durationDays} Days` : "Disabled"}
          </p>
          <p className="text-xs text-emerald-600 mt-0.5">
            {pricing.freeTier.maxAssessments} assessment · {pricing.freeTier.maxCounselingSessions} session
          </p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-4">
          <div className="flex items-center gap-2 text-blue-700 mb-1">
            <Calendar className="w-4 h-4" />
            <span className="text-xs font-medium uppercase tracking-wide">Monthly</span>
          </div>
          <p className="text-lg font-bold text-blue-800">{formatINR(pricing.monthlyPlan.priceINR)}</p>
          <p className="text-xs text-blue-600 mt-0.5">{formatUSD(pricing.monthlyPlan.priceUSD)} · {pricing.monthlyPlan.popularTag || "—"}</p>
        </div>

        <div className="bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-200 rounded-2xl p-4">
          <div className="flex items-center gap-2 text-violet-700 mb-1">
            <TrendingUp className="w-4 h-4" />
            <span className="text-xs font-medium uppercase tracking-wide">Yearly</span>
          </div>
          <p className="text-lg font-bold text-violet-800">{formatINR(pricing.yearlyPlan.priceINR)}</p>
          <p className="text-xs text-violet-600 mt-0.5">{formatUSD(pricing.yearlyPlan.priceUSD)} · {pricing.yearlyPlan.popularTag || "—"}</p>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-4">
          <div className="flex items-center gap-2 text-amber-700 mb-1">
            <Phone className="w-4 h-4" />
            <span className="text-xs font-medium uppercase tracking-wide">Single Session</span>
          </div>
          <p className="text-lg font-bold text-amber-800">{formatINR(pricing.singleCounselingPlan.priceINR)}</p>
          <p className="text-xs text-amber-600 mt-0.5">
            {formatUSD(pricing.singleCounselingPlan.priceUSD)} · {pricing.singleCounselingPlan.durationMinutes} min
          </p>
        </div>
      </div>

      {/* First sub discount banner */}
      <div className="flex items-center gap-3 rounded-2xl border border-rose-200 bg-rose-50 px-5 py-3">
        <div className="flex items-center justify-center w-9 h-9 rounded-full bg-rose-500 text-white shrink-0">
          <Percent className="w-4 h-4" />
        </div>
        <div>
          <p className="font-semibold text-rose-800 text-sm">First Subscription Discount: {pricing.firstSubscriptionDiscount}% OFF</p>
          <p className="text-xs text-rose-600">Applied automatically for new subscribers on their first payment. Edit below in Discount section.</p>
        </div>
      </div>

      {/* Section Navigation */}
      <div className="flex flex-wrap gap-2">
        {navSections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium border transition-all ${
              activeSection === section.id
                ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <section.icon className={`w-3.5 h-3.5 ${activeSection === section.id ? "text-white" : section.color}`} />
            {section.label}
          </button>
        ))}
      </div>

      {/* ========================== OVERVIEW ========================== */}
      {activeSection === "overview" && (
        <div className="space-y-4">
          <SectionCard>
            <SectionHeader icon={Eye} iconColor="text-slate-600" title="Pricing Overview" subtitle="Live snapshot of all plans as they appear on the website" />
            <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { key: "monthlyPlan", plan: pricing.monthlyPlan, accent: "border-blue-400 from-blue-50 to-indigo-50", badge: "bg-blue-100 text-blue-700", icon: Calendar },
                { key: "yearlyPlan", plan: pricing.yearlyPlan, accent: "border-violet-400 from-violet-50 to-purple-50", badge: "bg-violet-100 text-violet-700", icon: TrendingUp },
                { key: "singleCounselingPlan", plan: pricing.singleCounselingPlan as PricingPlan, accent: "border-amber-400 from-amber-50 to-orange-50", badge: "bg-amber-100 text-amber-700", icon: Phone },
              ].map(({ key, plan, accent, badge, icon: PlanIcon }) => (
                <div key={key} className={`rounded-2xl border-t-4 bg-gradient-to-b ${accent} border border-slate-200 overflow-hidden shadow-sm`}>
                  <div className="p-4 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-semibold text-slate-900 text-sm">{plan.name}</p>
                      {plan.popularTag && (
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold shrink-0 ${badge}`}>
                          {plan.popularTag}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500">{plan.description}</p>
                    <div className="pt-1">
                      <p className="text-2xl font-bold text-slate-900">{formatINR(plan.priceINR)}</p>
                      <p className="text-xs text-slate-500">{formatUSD(plan.priceUSD)} · ≈ €{(plan.priceUSD * EUR_PER_USD).toFixed(2)}</p>
                    </div>
                    <p className="text-xs text-slate-600 italic">"{plan.benefitLine}"</p>
                  </div>
                  <div className="border-t border-slate-200 bg-white/60 p-4 space-y-1.5">
                    {plan.features.map((f, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                        {f}
                      </div>
                    ))}
                    <button className={`mt-3 w-full text-center text-xs py-2 rounded-lg font-medium border border-slate-300 bg-white hover:bg-slate-50`}>
                      {plan.ctaLabel || "Get Started"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard>
            <SectionHeader icon={Gift} iconColor="text-emerald-600" title="Free Tier Preview" />
            <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-emerald-800 text-sm">Limited Free Trial</p>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${pricing.freeTier.enabled ? "bg-emerald-200 text-emerald-800" : "bg-slate-200 text-slate-600"}`}>
                    {pricing.freeTier.enabled ? "Enabled" : "Disabled"}
                  </span>
                </div>
                <p className="text-xs text-emerald-700">{pricing.freeTier.durationDays} days · {pricing.freeTier.maxAssessments} assessment · {pricing.freeTier.maxCounselingSessions} counseling session</p>
                <div className="space-y-1">
                  {pricing.freeTier.features.map((f, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-emerald-800">
                      <CheckCircle2 className="w-3 h-3 mt-0.5 shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3">
                <p className="font-semibold text-slate-800 text-sm">Always Free Features</p>
                <div className="space-y-1">
                  {pricing.freeTier.alwaysFreeFeatures.map((f, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                      <Shield className="w-3 h-3 mt-0.5 shrink-0 text-slate-500" />
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SectionCard>
        </div>
      )}

      {/* ========================== FREE TIER ========================== */}
      {activeSection === "freeTier" && (
        <SectionCard>
          <SectionHeader
            icon={Gift}
            iconColor="text-emerald-600"
            title="Free Tier Settings"
            subtitle="Control the limited free trial and permanently free features visible to all users"
            badge={
              <button
                onClick={() =>
                  setPricing((prev) => ({
                    ...prev,
                    freeTier: { ...prev.freeTier, enabled: !prev.freeTier.enabled },
                  }))
                }
                className={`w-12 h-7 rounded-full p-1 transition-colors shrink-0 ${pricing.freeTier.enabled ? "bg-emerald-500" : "bg-slate-300"}`}
              >
                <span className={`block h-5 w-5 rounded-full bg-white transition-transform ${pricing.freeTier.enabled ? "translate-x-5" : "translate-x-0"}`} />
              </button>
            }
          />
          <div className="p-5 space-y-5">
            {/* Status Banner */}
            <div className={`rounded-xl border px-4 py-3 flex items-center gap-3 ${pricing.freeTier.enabled ? "bg-emerald-50 border-emerald-200" : "bg-slate-50 border-slate-200"}`}>
              <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${pricing.freeTier.enabled ? "bg-emerald-500" : "bg-slate-400"}`} />
              <p className="text-sm font-medium text-slate-700">
                Free tier is currently <span className={pricing.freeTier.enabled ? "text-emerald-700 font-semibold" : "text-slate-500 font-semibold"}>{pricing.freeTier.enabled ? "enabled" : "disabled"}</span>. Toggle above to change.
              </p>
            </div>

            {/* Numeric limits */}
            <div>
              <p className="text-sm font-medium text-slate-800 mb-3">Trial Limits</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-medium text-slate-600 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" /> Trial Duration (days)
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={pricing.freeTier.durationDays}
                    onChange={(e) =>
                      setPricing((prev) => ({
                        ...prev,
                        freeTier: { ...prev.freeTier, durationDays: Number(e.target.value) || 0 },
                      }))
                    }
                    className={`mt-1.5 ${inputClass}`}
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-600 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-slate-400" /> Max Assessments
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={pricing.freeTier.maxAssessments}
                    onChange={(e) =>
                      setPricing((prev) => ({
                        ...prev,
                        freeTier: { ...prev.freeTier, maxAssessments: Number(e.target.value) || 0 },
                      }))
                    }
                    className={`mt-1.5 ${inputClass}`}
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-600 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-slate-400" /> Max Counseling Sessions
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={pricing.freeTier.maxCounselingSessions}
                    onChange={(e) =>
                      setPricing((prev) => ({
                        ...prev,
                        freeTier: { ...prev.freeTier, maxCounselingSessions: Number(e.target.value) || 0 },
                      }))
                    }
                    className={`mt-1.5 ${inputClass}`}
                  />
                </div>
              </div>
            </div>

            {/* Feature lists */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
              <div>
                <label className="text-xs font-medium text-slate-700 flex items-center gap-1.5 mb-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-500" />
                  Trial Features <span className="text-slate-400">(one per line)</span>
                </label>
                <p className="text-[11px] text-slate-500 mb-2">These features are available during the free trial period only.</p>
                <textarea
                  value={toLines(pricing.freeTier.features)}
                  onChange={(e) =>
                    setPricing((prev) => ({
                      ...prev,
                      freeTier: { ...prev.freeTier, features: fromLines(e.target.value) },
                    }))
                  }
                  className={`min-h-[140px] ${inputClass}`}
                  placeholder={"Career discovery starter assessment\n1 counseling session with mentor\nBasic progress dashboard"}
                />
                <p className="text-[11px] text-slate-400 mt-1">{pricing.freeTier.features.length} features listed</p>
              </div>
              <div>
                <label className="text-xs font-medium text-slate-700 flex items-center gap-1.5 mb-1.5">
                  <Shield className="w-3.5 h-3.5 text-emerald-500" />
                  Always Free Features <span className="text-slate-400">(one per line)</span>
                </label>
                <p className="text-[11px] text-slate-500 mb-2">These are permanently free for all users, even without a plan.</p>
                <textarea
                  value={toLines(pricing.freeTier.alwaysFreeFeatures)}
                  onChange={(e) =>
                    setPricing((prev) => ({
                      ...prev,
                      freeTier: { ...prev.freeTier, alwaysFreeFeatures: fromLines(e.target.value) },
                    }))
                  }
                  className={`min-h-[140px] ${inputClass}`}
                  placeholder={"Study resources access\nGovernment college listings\nScholarship and exam notifications"}
                />
                <p className="text-[11px] text-slate-400 mt-1">{pricing.freeTier.alwaysFreeFeatures.length} features listed</p>
              </div>
            </div>
          </div>
        </SectionCard>
      )}

      {/* ========================== PAID PLANS ========================== */}
      {activeSection === "plans" && (
        <div className="space-y-4">
          {[
            {
              key: "monthlyPlan" as const,
              title: "Monthly Subscription Plan",
              icon: Calendar,
              iconColor: "text-blue-600",
              accentColor: "border-blue-400",
              badgeColor: "bg-blue-100 text-blue-700",
            },
            {
              key: "yearlyPlan" as const,
              title: "Yearly Subscription Plan",
              icon: TrendingUp,
              iconColor: "text-violet-600",
              accentColor: "border-violet-400",
              badgeColor: "bg-violet-100 text-violet-700",
            },
            {
              key: "singleCounselingPlan" as const,
              title: "Single Counseling Session",
              icon: Phone,
              iconColor: "text-amber-600",
              accentColor: "border-amber-400",
              badgeColor: "bg-amber-100 text-amber-700",
            },
          ].map(({ key, title, icon: Icon, iconColor, accentColor, badgeColor }) => {
            const plan = pricing[key];
            const isExpanded = expandedPlan === key;
            const isSingle = key === "singleCounselingPlan";

            return (
              <SectionCard key={key}>
                {/* Accordion Header */}
                <button
                  onClick={() => setExpandedPlan(isExpanded ? null : key)}
                  className="w-full text-left"
                >
                  <div className={`flex items-center justify-between gap-4 px-5 py-4 border-l-4 rounded-t-2xl ${accentColor} ${isExpanded ? "border-b border-slate-100" : "rounded-b-2xl"}`}>
                    <div className="flex items-center gap-3">
                      <span className={`p-2 rounded-xl bg-slate-50 border border-slate-200 ${iconColor}`}>
                        <Icon className="w-4 h-4" />
                      </span>
                      <div>
                        <p className="font-semibold text-slate-900 text-sm">{title}</p>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {formatINR(plan.priceINR)} · {formatUSD(plan.priceUSD)}
                          {isSingle ? ` · ${(plan as SingleCounselingPlan).durationMinutes} min` : ""}
                          {plan.popularTag ? (
                            <span className={`ml-2 px-2 py-0.5 rounded-full text-[10px] font-semibold ${badgeColor}`}>{plan.popularTag}</span>
                          ) : null}
                        </p>
                      </div>
                    </div>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
                  </div>
                </button>

                {isExpanded && (
                  <div className="p-5 space-y-5">
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-medium text-slate-600">Plan Name</label>
                        <input
                          value={plan.name}
                          onChange={(e) => setPlanField(key, "name", e.target.value)}
                          className={`mt-1.5 ${inputClass}`}
                          placeholder="e.g. Pro Monthly"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-slate-600">Popular / Badge Tag</label>
                        <input
                          value={plan.popularTag}
                          onChange={(e) => setPlanField(key, "popularTag", e.target.value)}
                          className={`mt-1.5 ${inputClass}`}
                          placeholder="Most Popular / Best Value"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-medium text-slate-600">Plan Description</label>
                      <textarea
                        value={plan.description}
                        onChange={(e) => setPlanField(key, "description", e.target.value)}
                        className={`mt-1.5 min-h-[72px] ${inputClass}`}
                        placeholder="Short description visible under plan name on pricing page"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-medium text-slate-600">One-line Benefit Tagline</label>
                      <input
                        value={plan.benefitLine}
                        onChange={(e) => setPlanField(key, "benefitLine", e.target.value)}
                        className={`mt-1.5 ${inputClass}`}
                        placeholder="Perfect for active students who want monthly guidance."
                      />
                    </div>

                    {/* Pricing */}
                    <div>
                      <p className="text-xs font-medium text-slate-700 mb-2">Pricing</p>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs text-slate-600 flex items-center gap-1">
                            <IndianRupee className="w-3 h-3" /> Price (INR ₹)
                          </label>
                          <input
                            type="number"
                            min={0}
                            value={plan.priceINR}
                            onChange={(e) => setPlanField(key, "priceINR", Number(e.target.value) || 0)}
                            className={`mt-1.5 ${inputClass}`}
                          />
                        </div>
                        <div>
                          <label className="text-xs text-slate-600 flex items-center gap-1">
                            <DollarSign className="w-3 h-3" /> Price (USD $)
                          </label>
                          <input
                            type="number"
                            min={0}
                            value={plan.priceUSD}
                            onChange={(e) => setPlanField(key, "priceUSD", Number(e.target.value) || 0)}
                            className={`mt-1.5 ${inputClass}`}
                          />
                        </div>
                      </div>
                      <div className="mt-2 rounded-lg bg-slate-50 border border-slate-200 px-3 py-2 text-xs text-slate-600">
                        EUR (auto-calculated): ≈ €{(plan.priceUSD * EUR_PER_USD).toFixed(2)}
                      </div>
                    </div>

                    {/* Duration for single counseling */}
                    {isSingle && (
                      <div>
                        <label className="text-xs font-medium text-slate-600 flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" /> Session Duration (minutes)
                        </label>
                        <input
                          type="number"
                          min={15}
                          value={(plan as SingleCounselingPlan).durationMinutes}
                          onChange={(e) => setPlanField(key, "durationMinutes" as keyof typeof plan, Number(e.target.value) || 45)}
                          className={`mt-1.5 ${inputClass}`}
                        />
                      </div>
                    )}

                    {/* CTA Label */}
                    <div>
                      <label className="text-xs font-medium text-slate-600">CTA Button Label</label>
                      <input
                        value={plan.ctaLabel}
                        onChange={(e) => setPlanField(key, "ctaLabel", e.target.value)}
                        className={`mt-1.5 ${inputClass}`}
                        placeholder="Get Started / Subscribe"
                      />
                      <p className="text-[11px] text-slate-400 mt-1">This text appears on the call-to-action button on the pricing page.</p>
                    </div>

                    {/* Features */}
                    <div>
                      <label className="text-xs font-medium text-slate-700 flex items-center gap-1.5 mb-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                        Plan Features <span className="text-slate-400">(one per line)</span>
                      </label>
                      <textarea
                        value={toLines(plan.features)}
                        onChange={(e) => setPlanField(key, "features", fromLines(e.target.value))}
                        className={`min-h-[110px] ${inputClass}`}
                        placeholder={"Unlimited assessment attempts\n4 counseling sessions / month\nPersonalized roadmap + reminders"}
                      />
                      <p className="text-[11px] text-slate-400 mt-1">{plan.features.length} features · Each line = one bullet on pricing page</p>
                    </div>
                  </div>
                )}
              </SectionCard>
            );
          })}
        </div>
      )}

      {/* ========================== DISCOUNT ========================== */}
      {activeSection === "discount" && (
        <SectionCard>
          <SectionHeader
            icon={Percent}
            iconColor="text-rose-500"
            title="First Subscription Discount"
            subtitle="Discount applied automatically to a new subscriber's first payment"
          />
          <div className="p-5 space-y-5">
            <div className="rounded-2xl border border-rose-200 bg-gradient-to-br from-rose-50 to-pink-50 p-6 flex flex-col items-center gap-4">
              <div className="w-20 h-20 rounded-full border-4 border-rose-200 bg-white flex items-center justify-center">
                <span className="text-2xl font-black text-rose-600">{pricing.firstSubscriptionDiscount}%</span>
              </div>
              <p className="text-rose-700 font-semibold">First Subscription Discount</p>
              <p className="text-sm text-rose-600 text-center max-w-sm">
                When a new user subscribes for the first time, they automatically get <strong>{pricing.firstSubscriptionDiscount}% off</strong> their first payment.
              </p>
            </div>

            <div>
              <label className="text-xs font-medium text-slate-700 flex items-center gap-1.5">
                <Percent className="w-3.5 h-3.5 text-rose-500" />
                Discount Percentage
              </label>
              <div className="mt-2 flex items-center gap-3">
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={5}
                  value={pricing.firstSubscriptionDiscount}
                  onChange={(e) =>
                    setPricing((prev) => ({ ...prev, firstSubscriptionDiscount: Number(e.target.value) }))
                  }
                  className="flex-1 accent-rose-500"
                />
                <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden w-24">
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={pricing.firstSubscriptionDiscount}
                    onChange={(e) => {
                      const val = Math.min(100, Math.max(0, Number(e.target.value) || 0));
                      setPricing((prev) => ({ ...prev, firstSubscriptionDiscount: val }));
                    }}
                    className="w-full px-3 py-2 text-sm outline-none text-center"
                  />
                  <span className="px-2 text-slate-500 text-sm bg-slate-50 border-l border-slate-300 h-full flex items-center">%</span>
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Slide or type to adjust. Currently showing <strong>{pricing.firstSubscriptionDiscount}%</strong> discount on pricing page.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-medium text-slate-800 mb-3">Effective First-time Prices</p>
              <div className="space-y-2">
                {[
                  { label: "Monthly Plan", priceINR: pricing.monthlyPlan.priceINR, priceUSD: pricing.monthlyPlan.priceUSD },
                  { label: "Yearly Plan", priceINR: pricing.yearlyPlan.priceINR, priceUSD: pricing.yearlyPlan.priceUSD },
                  { label: "Single Counseling", priceINR: pricing.singleCounselingPlan.priceINR, priceUSD: pricing.singleCounselingPlan.priceUSD },
                ].map(({ label, priceINR, priceUSD }) => {
                  const factor = (100 - pricing.firstSubscriptionDiscount) / 100;
                  const effINR = priceINR * factor;
                  const effUSD = priceUSD * factor;
                  return (
                    <div key={label} className="flex items-center justify-between text-xs text-slate-700 gap-2">
                      <span className="font-medium">{label}</span>
                      <div className="flex items-center gap-2">
                        <span className="line-through text-slate-400">{formatINR(priceINR)}</span>
                        <span className="text-emerald-700 font-bold">→ {formatINR(Math.round(effINR))}</span>
                        <span className="text-slate-500">/ {formatUSD(parseFloat(effUSD.toFixed(2)))}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </SectionCard>
      )}

      {/* ========================== COMPARISON TABLE ========================== */}
      {activeSection === "comparison" && (
        <SectionCard>
          <SectionHeader
            icon={BarChart3}
            iconColor="text-indigo-600"
            title="Comparison Table Editor"
            subtitle="These rows appear in the feature comparison table on the pricing page"
          />
          <div className="p-5 space-y-4">
            {/* Column Headers */}
            <div className="rounded-xl border border-slate-200 bg-slate-50 overflow-hidden">
              <div className="grid grid-cols-4 gap-2 px-4 py-2.5 text-[11px] font-semibold text-slate-500 uppercase tracking-wide border-b border-slate-200">
                <span>Feature / Label</span>
                <span>Monthly Plan</span>
                <span>Yearly Plan</span>
                <span>Single Counseling</span>
              </div>

              <div className="divide-y divide-slate-100">
                {pricing.comparisonRows.map((row, idx) => (
                  <div key={idx} className="grid grid-cols-4 gap-2 px-4 py-2 items-center">
                    <input
                      value={row.label}
                      onChange={(e) =>
                        setPricing((prev) => ({
                          ...prev,
                          comparisonRows: prev.comparisonRows.map((r, i) =>
                            i === idx ? { ...r, label: e.target.value } : r,
                          ),
                        }))
                      }
                      className={`text-sm ${inputClass}`}
                      placeholder="Feature name"
                    />
                    <input
                      value={row.monthlyPlanValue}
                      onChange={(e) =>
                        setPricing((prev) => ({
                          ...prev,
                          comparisonRows: prev.comparisonRows.map((r, i) =>
                            i === idx ? { ...r, monthlyPlanValue: e.target.value } : r,
                          ),
                        }))
                      }
                      className={`text-sm ${inputClass}`}
                      placeholder="Monthly value"
                    />
                    <input
                      value={row.yearlyPlanValue}
                      onChange={(e) =>
                        setPricing((prev) => ({
                          ...prev,
                          comparisonRows: prev.comparisonRows.map((r, i) =>
                            i === idx ? { ...r, yearlyPlanValue: e.target.value } : r,
                          ),
                        }))
                      }
                      className={`text-sm ${inputClass}`}
                      placeholder="Yearly value"
                    />
                    <div className="flex items-center gap-2">
                      <input
                        value={row.singleCounselingPlanValue}
                        onChange={(e) =>
                          setPricing((prev) => ({
                            ...prev,
                            comparisonRows: prev.comparisonRows.map((r, i) =>
                              i === idx ? { ...r, singleCounselingPlanValue: e.target.value } : r,
                            ),
                          }))
                        }
                        className={`text-sm flex-1 ${inputClass}`}
                        placeholder="Single value"
                      />
                      <button
                        onClick={() =>
                          setPricing((prev) => ({
                            ...prev,
                            comparisonRows: prev.comparisonRows.filter((_, i) => i !== idx),
                          }))
                        }
                        className="text-rose-500 hover:text-rose-700 shrink-0"
                        title="Remove row"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() =>
                setPricing((prev) => ({
                  ...prev,
                  comparisonRows: [
                    ...prev.comparisonRows,
                    { label: "", monthlyPlanValue: "", yearlyPlanValue: "", singleCounselingPlanValue: "" },
                  ],
                }))
              }
              className="inline-flex items-center gap-2 text-sm text-indigo-700 border border-indigo-300 bg-indigo-50 rounded-xl px-4 py-2 hover:bg-indigo-100 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Comparison Row
            </button>

            {/* Live preview table */}
            {pricing.comparisonRows.length > 0 && (
              <div className="rounded-xl border border-slate-200 overflow-hidden">
                <div className="bg-slate-900 text-white grid grid-cols-4 gap-0 text-xs font-semibold">
                  <div className="px-4 py-3">Feature</div>
                  <div className="px-4 py-3 border-l border-white/10">Monthly</div>
                  <div className="px-4 py-3 border-l border-white/10">Yearly</div>
                  <div className="px-4 py-3 border-l border-white/10">Single</div>
                </div>
                {pricing.comparisonRows.map((row, idx) => (
                  <div key={idx} className={`grid grid-cols-4 gap-0 text-xs ${idx % 2 === 0 ? "bg-white" : "bg-slate-50"}`}>
                    <div className="px-4 py-2.5 font-medium text-slate-700">{row.label || "—"}</div>
                    <div className="px-4 py-2.5 text-slate-600 border-l border-slate-100">{row.monthlyPlanValue || "—"}</div>
                    <div className="px-4 py-2.5 text-slate-600 border-l border-slate-100">{row.yearlyPlanValue || "—"}</div>
                    <div className="px-4 py-2.5 text-slate-600 border-l border-slate-100">{row.singleCounselingPlanValue || "—"}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </SectionCard>
      )}

      {/* ========================== TESTIMONIALS ========================== */}
      {activeSection === "testimonials" && (
        <SectionCard>
          <SectionHeader
            icon={Quote}
            iconColor="text-violet-600"
            title="Plan Testimonials"
            subtitle="Student testimonials displayed at the bottom of the pricing page"
          />
          <div className="p-5 space-y-4">
            {pricing.testimonials.map((testimonial, idx) => (
              <div key={idx} className="rounded-xl border border-slate-200 p-4 bg-slate-50/60 space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-semibold text-slate-700">Testimonial #{idx + 1}</p>
                  <button
                    onClick={() =>
                      setPricing((prev) => ({
                        ...prev,
                        testimonials: prev.testimonials.filter((_, i) => i !== idx),
                      }))
                    }
                    className="text-rose-500 hover:text-rose-700"
                    title="Remove testimonial"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-slate-600">Student Name</label>
                    <input
                      value={testimonial.name}
                      onChange={(e) =>
                        setPricing((prev) => ({
                          ...prev,
                          testimonials: prev.testimonials.map((t, i) =>
                            i === idx ? { ...t, name: e.target.value } : t,
                          ),
                        }))
                      }
                      className={`mt-1 ${inputClass}`}
                      placeholder="e.g. Riya Sharma"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-600">Plan Name (for badge)</label>
                    <input
                      value={testimonial.planName}
                      onChange={(e) =>
                        setPricing((prev) => ({
                          ...prev,
                          testimonials: prev.testimonials.map((t, i) =>
                            i === idx ? { ...t, planName: e.target.value } : t,
                          ),
                        }))
                      }
                      className={`mt-1 ${inputClass}`}
                      placeholder="e.g. Pro Monthly"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-slate-600">Quote / Review</label>
                  <textarea
                    value={testimonial.quote}
                    onChange={(e) =>
                      setPricing((prev) => ({
                        ...prev,
                        testimonials: prev.testimonials.map((t, i) =>
                          i === idx ? { ...t, quote: e.target.value } : t,
                        ),
                      }))
                    }
                    className={`mt-1 min-h-[72px] ${inputClass}`}
                    placeholder="What the student said about this plan..."
                  />
                </div>

                {/* Preview */}
                {(testimonial.name || testimonial.quote) && (
                  <div className="rounded-xl border border-violet-200 bg-violet-50 p-3">
                    <div className="flex items-center gap-2 mb-2">
                      {[...Array(5)].map((_, s) => (
                        <Star key={s} className="w-3 h-3 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-xs text-slate-700 italic">"{testimonial.quote || "..."}"</p>
                    <div className="flex items-center gap-2 mt-2 pt-2 border-t border-violet-200">
                      <div className="w-6 h-6 rounded-full bg-violet-200 text-violet-700 flex items-center justify-center text-[10px] font-bold shrink-0">
                        {testimonial.name?.[0]?.toUpperCase() || "?"}
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-800">{testimonial.name || "Name"}</p>
                        {testimonial.planName && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-violet-100 text-violet-700">{testimonial.planName}</span>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            <button
              onClick={() =>
                setPricing((prev) => ({
                  ...prev,
                  testimonials: [...prev.testimonials, { name: "", planName: "", quote: "" }],
                }))
              }
              className="inline-flex items-center gap-2 text-sm text-violet-700 border border-violet-300 bg-violet-50 rounded-xl px-4 py-2 hover:bg-violet-100 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Testimonial
            </button>

            {pricing.testimonials.length === 0 && (
              <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500">
                No testimonials added yet. Click "Add Testimonial" to get started.
              </div>
            )}
          </div>
        </SectionCard>
      )}

      {/* ========================== SAVE BUTTON ========================== */}
      <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
        <p className="text-sm text-slate-600">
          Changes are saved globally and immediately reflected on the public pricing page.
        </p>
        <button
          onClick={handleSave}
          disabled={saving}
          className={`${primaryButtonClass} ${saving ? "opacity-60 cursor-not-allowed" : ""}`}
        >
          {saving ? (
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          {saving ? "Saving..." : "Save Pricing Settings"}
        </button>
      </div>
    </div>
  );
}
