"use client";

import { GraduationCap, ClipboardList, Globe, TrendingUp, TrendingDown, Minus, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import type { TopCollegePoint, RecentResultPoint, WebsitePagePoint } from "./analyticsTypes";
import { formatDateTime, formatNumber } from "./analyticsUtils";

type AnalyticsTablesProps = {
  topColleges: TopCollegePoint[];
  recentResults: RecentResultPoint[];
  pages: WebsitePagePoint[];
};

function ScoreBadge({ score }: { score: number }) {
  if (score >= 75)
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200">
        <TrendingUp className="w-3 h-3" /> {Math.round(score)}%
      </span>
    );
  if (score >= 50)
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 border border-amber-200">
        <Minus className="w-3 h-3" /> {Math.round(score)}%
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 border border-rose-200">
      <TrendingDown className="w-3 h-3" /> {Math.round(score)}%
    </span>
  );
}

function SectionHeader({ icon, title, count }: { icon: React.ReactNode; title: string; count?: number }) {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white flex-shrink-0">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">{icon}</div>
        <span className="text-sm font-semibold text-slate-800">{title}</span>
      </div>
      {count !== undefined && (
        <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 font-medium">
          {count} items
        </span>
      )}
    </div>
  );
}

export default function AnalyticsTables({ topColleges, recentResults, pages }: AnalyticsTablesProps) {
  const totalShortlisted = topColleges.reduce((s, c) => s + c.count, 0);
  const totalApplied = topColleges.reduce((s, c) => s + (c.applied || 0), 0);
  const avgScore = recentResults.length
    ? recentResults.reduce((s, r) => s + r.overallScore, 0) / recentResults.length
    : 0;
  const publishedPages = pages.filter((p) => p.status === "published").length;

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">

      {/* ── Top Shortlisted Colleges ── */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col overflow-hidden">
        <SectionHeader
          icon={<GraduationCap className="w-4 h-4" />}
          title="Top Shortlisted Colleges"
          count={topColleges.length}
        />

        {/* summary strip */}
        <div className="grid grid-cols-2 gap-px bg-slate-100 flex-shrink-0">
          <div className="bg-white px-4 py-2.5">
            <p className="text-[10px] text-slate-400 uppercase tracking-wide">Total Shortlisted</p>
            <p className="text-lg font-bold text-slate-900">{formatNumber(totalShortlisted)}</p>
          </div>
          <div className="bg-white px-4 py-2.5">
            <p className="text-[10px] text-slate-400 uppercase tracking-wide">Total Applied</p>
            <p className="text-lg font-bold text-indigo-600">{formatNumber(totalApplied)}</p>
          </div>
        </div>

        {/* scrollable list */}
        <div className="overflow-y-auto max-h-64 divide-y divide-slate-100">
          {topColleges.length === 0 ? (
            <div className="p-6 text-center">
              <GraduationCap className="w-8 h-8 text-slate-200 mx-auto mb-2" />
              <p className="text-sm text-slate-400">No shortlist records found.</p>
            </div>
          ) : (
            topColleges.map((college, idx) => {
              const conversionRate = college.count > 0 ? Math.round((college.applied / college.count) * 100) : 0;
              return (
                <div key={college.name} className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors">
                  <span className="w-6 h-6 rounded-full bg-indigo-50 text-indigo-600 text-[11px] font-bold flex items-center justify-center flex-shrink-0">
                    {idx + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-800 truncate">{college.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[11px] text-slate-500">{formatNumber(college.count)} shortlisted</span>
                      <span className="text-slate-300">•</span>
                      <span className="text-[11px] text-indigo-600">{formatNumber(college.applied)} applied</span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span
                      className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                        conversionRate >= 60
                          ? "bg-emerald-100 text-emerald-700"
                          : conversionRate >= 30
                          ? "bg-amber-100 text-amber-700"
                          : "bg-rose-100 text-rose-700"
                      }`}
                    >
                      {conversionRate}%
                    </span>
                    <p className="text-[10px] text-slate-400 mt-0.5">conversion</p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* ── Recent Student Results ── */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col overflow-hidden">
        <SectionHeader
          icon={<ClipboardList className="w-4 h-4" />}
          title="Recent Student Results"
          count={recentResults.length}
        />

        {/* summary strip */}
        <div className="grid grid-cols-3 gap-px bg-slate-100 flex-shrink-0">
          <div className="bg-white px-3 py-2.5">
            <p className="text-[10px] text-slate-400 uppercase tracking-wide">Results</p>
            <p className="text-lg font-bold text-slate-900">{recentResults.length}</p>
          </div>
          <div className="bg-white px-3 py-2.5">
            <p className="text-[10px] text-slate-400 uppercase tracking-wide">Avg Score</p>
            <p className={`text-lg font-bold ${avgScore >= 60 ? "text-emerald-600" : "text-rose-600"}`}>
              {recentResults.length ? Math.round(avgScore) + "%" : "—"}
            </p>
          </div>
          <div className="bg-white px-3 py-2.5">
            <p className="text-[10px] text-slate-400 uppercase tracking-wide">Passed</p>
            <p className="text-lg font-bold text-indigo-600">
              {recentResults.filter((r) => r.overallScore >= 60).length}
            </p>
          </div>
        </div>

        {/* scrollable list */}
        <div className="overflow-y-auto max-h-64 divide-y divide-slate-100">
          {recentResults.length === 0 ? (
            <div className="p-6 text-center">
              <ClipboardList className="w-8 h-8 text-slate-200 mx-auto mb-2" />
              <p className="text-sm text-slate-400">No recent assessment results.</p>
            </div>
          ) : (
            recentResults.map((result) => (
              <div key={result.id} className="px-4 py-3 hover:bg-slate-50 transition-colors">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-800 truncate">{result.studentName}</p>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">{result.assessmentTitle}</p>
                  </div>
                  <ScoreBadge score={result.overallScore} />
                </div>

                {/* progress bar */}
                <div className="mt-2 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      result.overallScore >= 75
                        ? "bg-emerald-500"
                        : result.overallScore >= 50
                        ? "bg-amber-400"
                        : "bg-rose-500"
                    }`}
                    style={{ width: `${Math.min(result.overallScore, 100)}%` }}
                  />
                </div>

                <p className="text-[10px] text-slate-400 mt-1.5 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {formatDateTime(result.completedAt)}
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ── Website Page Ops ── */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col overflow-hidden">
        <SectionHeader
          icon={<Globe className="w-4 h-4" />}
          title="Website Page Ops"
          count={pages.length}
        />

        {/* summary strip */}
        <div className="grid grid-cols-3 gap-px bg-slate-100 flex-shrink-0">
          <div className="bg-white px-3 py-2.5">
            <p className="text-[10px] text-slate-400 uppercase tracking-wide">Total</p>
            <p className="text-lg font-bold text-slate-900">{pages.length}</p>
          </div>
          <div className="bg-white px-3 py-2.5">
            <p className="text-[10px] text-slate-400 uppercase tracking-wide">Published</p>
            <p className="text-lg font-bold text-emerald-600">{publishedPages}</p>
          </div>
          <div className="bg-white px-3 py-2.5">
            <p className="text-[10px] text-slate-400 uppercase tracking-wide">Draft</p>
            <p className="text-lg font-bold text-amber-600">{pages.length - publishedPages}</p>
          </div>
        </div>

        {/* scrollable list */}
        <div className="overflow-y-auto max-h-64 divide-y divide-slate-100">
          {pages.length === 0 ? (
            <div className="p-6 text-center">
              <Globe className="w-8 h-8 text-slate-200 mx-auto mb-2" />
              <p className="text-sm text-slate-400">No website pages available.</p>
            </div>
          ) : (
            pages.map((page) => (
              <div key={page.id} className="px-4 py-3 hover:bg-slate-50 transition-colors">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-slate-800 truncate">{page.name}</p>
                  <span
                    className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full flex-shrink-0 ${
                      page.status === "published"
                        ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                        : "bg-amber-100 text-amber-700 border border-amber-200"
                    }`}
                  >
                    {page.status === "published" ? (
                      <CheckCircle2 className="w-3 h-3" />
                    ) : (
                      <AlertCircle className="w-3 h-3" />
                    )}
                    {page.status}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5 font-mono">{page.route}</p>
                <div className="flex items-center gap-3 mt-1.5">
                  <span className="text-[11px] text-slate-500">
                    <span className="font-medium text-slate-700">{formatNumber(page.records)}</span> records
                  </span>
                  {page.owner && (
                    <>
                      <span className="text-slate-300">•</span>
                      <span className="text-[11px] text-slate-500">@{page.owner}</span>
                    </>
                  )}
                </div>
                {page.lastUpdated && (
                  <p className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {formatDateTime(page.lastUpdated)}
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
}
