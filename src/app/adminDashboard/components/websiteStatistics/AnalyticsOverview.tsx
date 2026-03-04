"use client";

import {
  Users, GraduationCap, UserCog, ClipboardCheck,
  CalendarClock, FileText, ShieldAlert, CheckCircle2,
  TrendingUp, Activity, AlertTriangle,
} from "lucide-react";
import type { PlatformOverview } from "./analyticsTypes";
import { formatNumber } from "./analyticsUtils";

type AnalyticsOverviewProps = {
  data: PlatformOverview;
};

type StatCard = {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  accent: string;
};

function HealthBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-slate-600">{label}</span>
        <span
          className={`text-xs font-bold px-2 py-0.5 rounded-full ${
            value >= 70 ? "bg-emerald-100 text-emerald-700" :
            value >= 40 ? "bg-amber-100 text-amber-700" :
            "bg-rose-100 text-rose-700"
          }`}
        >
          {value}%
        </span>
      </div>
      <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${Math.min(value, 100)}%`, background: color }}
        />
      </div>
    </div>
  );
}

export default function AnalyticsOverview({ data }: AnalyticsOverviewProps) {
  const counselingCompletion = data.totalSessions
    ? Math.round((data.completedSessions / data.totalSessions) * 100)
    : 0;

  const cards: StatCard[] = [
    {
      title: "Total Users",
      value: formatNumber(data.totalUsers),
      subtitle: `${data.students} students · ${data.counselors} counselors`,
      icon: Users,
      iconBg: "bg-indigo-50",
      iconColor: "text-indigo-600",
      accent: "border-l-indigo-500",
    },
    {
      title: "Assessment Coverage",
      value: `${data.assessmentCoverage}%`,
      subtitle: `${formatNumber(data.totalResults)} submissions tracked`,
      icon: GraduationCap,
      iconBg: "bg-violet-50",
      iconColor: "text-violet-600",
      accent: "border-l-violet-500",
    },
    {
      title: "Counseling Completion",
      value: `${counselingCompletion}%`,
      subtitle: `${data.completedSessions} completed / ${data.totalSessions} total`,
      icon: UserCog,
      iconBg: "bg-sky-50",
      iconColor: "text-sky-600",
      accent: "border-l-sky-500",
    },
    {
      title: "Active Assessments",
      value: formatNumber(data.activeAssessments),
      subtitle: `${data.totalAssessments} total assessments`,
      icon: ClipboardCheck,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
      accent: "border-l-emerald-500",
    },
    {
      title: "Upcoming Sessions",
      value: formatNumber(data.upcomingSessions),
      subtitle: `${data.cancelledSessions} cancelled sessions`,
      icon: CalendarClock,
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
      accent: "border-l-amber-500",
    },
    {
      title: "Website Records",
      value: formatNumber(data.totalRecords),
      subtitle: `${data.publishedPages}/${data.totalPages} pages published`,
      icon: FileText,
      iconBg: "bg-rose-50",
      iconColor: "text-rose-600",
      accent: "border-l-rose-500",
    },
  ];

  return (
    <div className="space-y-5">

      {/* ── Executive Header ── */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              <p className="text-[11px] font-semibold uppercase tracking-widest text-indigo-600">Executive Snapshot</p>
            </div>
            <h3 className="text-lg font-bold text-slate-900">Platform Performance Health</h3>
            <p className="text-xs text-slate-500 mt-0.5">Student progress, counselor delivery and website ops — unified view.</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
              <TrendingUp className="w-3 h-3" /> Assessment {data.assessmentCoverage}%
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200">
              <Activity className="w-3 h-3" /> Counseling {data.counselingCoverage}%
            </span>
            <span
              className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border ${
                data.cancellationRate > 20
                  ? "bg-rose-50 text-rose-700 border-rose-200"
                  : "bg-emerald-50 text-emerald-700 border-emerald-200"
              }`}
            >
              {data.cancellationRate > 20
                ? <AlertTriangle className="w-3 h-3" />
                : <CheckCircle2 className="w-3 h-3" />}
              Cancellation {data.cancellationRate}%
            </span>
            <span
              className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border ${
                data.maintenanceMode
                  ? "bg-rose-50 text-rose-700 border-rose-200"
                  : "bg-emerald-50 text-emerald-700 border-emerald-200"
              }`}
            >
              {data.maintenanceMode
                ? <ShieldAlert className="w-3 h-3" />
                : <CheckCircle2 className="w-3 h-3" />}
              Site {data.maintenanceMode ? "Maintenance" : "Live"}
            </span>
          </div>
        </div>
      </div>

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className={`bg-white rounded-2xl border border-slate-200 border-l-4 ${card.accent} shadow-sm hover:shadow-md transition-all duration-200 p-4 flex items-start gap-4`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${card.iconBg}`}>
                <Icon className={`w-5 h-5 ${card.iconColor}`} />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-slate-500 font-medium">{card.title}</p>
                <p className="text-2xl font-bold text-slate-900 mt-0.5 leading-none">{card.value}</p>
                <p className="text-[11px] text-slate-400 mt-1 truncate">{card.subtitle}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Health Indicators ── */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
          <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center">
            <Activity className="w-4 h-4 text-indigo-600" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-900">Health Indicators</h4>
            <p className="text-xs text-slate-500">Key coverage and conversion metrics at a glance</p>
          </div>
        </div>

        <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-6">
          <HealthBar
            label="Student Assessment Coverage"
            value={data.assessmentCoverage}
            color="linear-gradient(90deg, #6366f1, #818cf8)"
          />
          <HealthBar
            label="Counseling Coverage"
            value={data.counselingCoverage}
            color="linear-gradient(90deg, #0ea5e9, #38bdf8)"
          />
          <HealthBar
            label="Shortlist Conversion"
            value={data.shortlistConversionRate}
            color="linear-gradient(90deg, #10b981, #34d399)"
          />
        </div>

        {/* footer meta strip */}
        <div className="px-5 py-3 border-t border-slate-100 bg-slate-50 flex flex-wrap gap-4 text-xs text-slate-500">
          <span><span className="font-semibold text-slate-700">{data.admins}</span> Admins</span>
          <span className="text-slate-300">|</span>
          <span><span className="font-semibold text-slate-700">{data.publishedPages}</span> Published Pages</span>
          <span className="text-slate-300">|</span>
          <span><span className="font-semibold text-slate-700">{data.totalPages}</span> Total Pages</span>
          <span className="text-slate-300">|</span>
          <span><span className="font-semibold text-slate-700">{data.shortlistAppliedCount}</span> Shortlists Applied</span>
        </div>
      </div>

    </div>
  );
}
