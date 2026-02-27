"use client";

import { useMemo, useState } from "react";
import { AlertTriangle, ShieldCheck, UserCheck, Users, CalendarClock } from "lucide-react";
import AnalyticsFilters from "../websiteStatistics/AnalyticsFilters";
import AnalyticsOverview from "../websiteStatistics/AnalyticsOverview";
import AnalyticsCharts from "../websiteStatistics/AnalyticsCharts";
import AnalyticsTables from "../websiteStatistics/AnalyticsTables";
import type {
  AnalyticsFiltersState,
  RoleDistributionPoint,
  SessionStatusPoint,
  StudentJourneyPoint,
  AssessmentAttemptPoint,
  ScoreTrendPoint,
  TopCollegePoint,
  RecentResultPoint,
  WebsitePagePoint,
} from "../websiteStatistics/analyticsTypes";
import { formatDate, formatNumber } from "../websiteStatistics/analyticsUtils";

type WebsitePage = {
  id: string;
  name: string;
  route: string;
  status: "published" | "draft";
  records: number;
  lastUpdated?: string;
  owner?: string;
};

type WebsiteStatisticsTabProps = {
  focusedWebsitePages: WebsitePage[];
  websiteSettings: { maintenanceMode: boolean };
  overview: {
    counters: {
      users: number;
      students: number;
      counselors: number;
      admins: number;
    };
  } | null;
  analytics: {
    progress: {
      totalStudents: number;
      studentsWithAssessments: number;
      studentsWithSessions: number;
    };
    psychometric: {
      totalAssessments: number;
      activeAssessments: number;
      totalResults: number;
      topAssessments: { id: string; title: string; attempts: number }[];
      recentResults: {
        id: string;
        assessmentTitle: string;
        studentName: string;
        overallScore: number;
        completedAt: string;
      }[];
    };
    shortlists: {
      topColleges: { name: string; count: number; applied: number }[];
    };
    counseling: {
      totalSessions: number;
      upcomingSessions: number;
      completedSessions: number;
      cancelledSessions: number;
    };
  } | null;
};

export function WebsiteStatisticsTab({ focusedWebsitePages, websiteSettings, overview, analytics }: WebsiteStatisticsTabProps) {
  const [filters, setFilters] = useState<AnalyticsFiltersState>({ period: "30d", segment: "all" });
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 500);
  };

  const periodDays = useMemo(() => {
    if (filters.period === "7d") return 7;
    if (filters.period === "30d") return 30;
    if (filters.period === "90d") return 90;
    return null;
  }, [filters.period]);

  const filteredRecentResults = useMemo(() => {
    const source = analytics?.psychometric.recentResults || [];
    if (!periodDays) return source;

    const threshold = Date.now() - periodDays * 24 * 60 * 60 * 1000;
    return source.filter((item) => new Date(item.completedAt).getTime() >= threshold);
  }, [analytics, periodDays]);

  const pagesData: WebsitePagePoint[] = useMemo(
    () =>
      focusedWebsitePages.map((page) => ({
        id: page.id,
        name: page.name,
        route: page.route,
        status: page.status,
        records: page.records,
        owner: page.owner,
        lastUpdated: page.lastUpdated,
      })),
    [focusedWebsitePages],
  );

  const totalRecords = useMemo(() => pagesData.reduce((sum, page) => sum + (page.records || 0), 0), [pagesData]);

  const roleDistribution: RoleDistributionPoint[] = useMemo(() => {
    const students = overview?.counters.students ?? 0;
    const counselors = overview?.counters.counselors ?? 0;
    const admins = overview?.counters.admins ?? 0;

    if (filters.segment === "students") {
      return [{ name: "Students", value: students, color: "#3b82f6" }];
    }

    if (filters.segment === "counselors") {
      return [{ name: "Counselors", value: counselors, color: "#10b981" }];
    }

    return [
      { name: "Students", value: students, color: "#3b82f6" },
      { name: "Counselors", value: counselors, color: "#10b981" },
      { name: "Admins", value: admins, color: "#f59e0b" },
    ];
  }, [overview, filters.segment]);

  const sessionStatus: SessionStatusPoint[] = useMemo(
    () => [
      { name: "Upcoming", value: analytics?.counseling.upcomingSessions ?? 0, color: "#0ea5e9" },
      { name: "Completed", value: analytics?.counseling.completedSessions ?? 0, color: "#22c55e" },
      { name: "Cancelled", value: analytics?.counseling.cancelledSessions ?? 0, color: "#ef4444" },
    ],
    [analytics],
  );

  const studentJourney: StudentJourneyPoint[] = useMemo(
    () => [
      { stage: "Registered", count: analytics?.progress.totalStudents ?? 0 },
      { stage: "Assessed", count: analytics?.progress.studentsWithAssessments ?? 0 },
      { stage: "Counseled", count: analytics?.progress.studentsWithSessions ?? 0 },
      { stage: "Completed", count: analytics?.counseling.completedSessions ?? 0 },
    ],
    [analytics],
  );

  const topAssessments: AssessmentAttemptPoint[] = useMemo(
    () =>
      (analytics?.psychometric.topAssessments || []).map((item) => ({
        title: item.title,
        attempts: item.attempts,
      })),
    [analytics],
  );

  const scoreTrend: ScoreTrendPoint[] = useMemo(
    () =>
      filteredRecentResults
        .slice()
        .reverse()
        .map((item) => ({
          label: formatDate(item.completedAt),
          score: item.overallScore,
        })),
    [filteredRecentResults],
  );

  const topColleges: TopCollegePoint[] = useMemo(
    () => (analytics?.shortlists.topColleges || []).slice(0, 8),
    [analytics],
  );

  const recentResults: RecentResultPoint[] = useMemo(
    () => filteredRecentResults,
    [filteredRecentResults],
  );

  const dashboardOverview = {
    totalUsers: overview?.counters.users ?? 0,
    students: overview?.counters.students ?? 0,
    counselors: overview?.counters.counselors ?? 0,
    admins: overview?.counters.admins ?? 0,
    publishedPages: pagesData.filter((page) => page.status === "published").length,
    totalPages: pagesData.length,
    totalRecords,
    maintenanceMode: websiteSettings.maintenanceMode,
    totalAssessments: analytics?.psychometric.totalAssessments ?? 0,
    activeAssessments: analytics?.psychometric.activeAssessments ?? 0,
    totalResults: analytics?.psychometric.totalResults ?? 0,
    upcomingSessions: analytics?.counseling.upcomingSessions ?? 0,
    completedSessions: analytics?.counseling.completedSessions ?? 0,
    cancelledSessions: analytics?.counseling.cancelledSessions ?? 0,
    totalSessions: analytics?.counseling.totalSessions ?? 0,
    assessmentCoverage:
      (analytics?.progress.totalStudents ?? 0) > 0
        ? Math.round(((analytics?.progress.studentsWithAssessments ?? 0) / (analytics?.progress.totalStudents ?? 0)) * 100)
        : 0,
    counselingCoverage:
      (analytics?.progress.totalStudents ?? 0) > 0
        ? Math.round(((analytics?.progress.studentsWithSessions ?? 0) / (analytics?.progress.totalStudents ?? 0)) * 100)
        : 0,
    cancellationRate:
      (analytics?.counseling.totalSessions ?? 0) > 0
        ? Math.round(((analytics?.counseling.cancelledSessions ?? 0) / (analytics?.counseling.totalSessions ?? 0)) * 100)
        : 0,
    publishRate:
      pagesData.length > 0
        ? Math.round((pagesData.filter((page) => page.status === "published").length / pagesData.length) * 100)
        : 0,
    shortlistAppliedCount: analytics?.shortlists.topColleges.reduce((sum, item) => sum + (item.applied || 0), 0) ?? 0,
    shortlistTotalCount: analytics?.shortlists.topColleges.reduce((sum, item) => sum + (item.count || 0), 0) ?? 0,
    shortlistConversionRate:
      (analytics?.shortlists.topColleges.reduce((sum, item) => sum + (item.count || 0), 0) ?? 0) > 0
        ? Math.round(
            ((analytics?.shortlists.topColleges.reduce((sum, item) => sum + (item.applied || 0), 0) ?? 0) /
              (analytics?.shortlists.topColleges.reduce((sum, item) => sum + (item.count || 0), 0) ?? 1)) *
              100,
          )
        : 0,
  };

  const alertItems = [
    {
      label: "High cancellation risk",
      value: `${dashboardOverview.cancellationRate}%`,
      danger: dashboardOverview.cancellationRate > 20,
      detail: "Counseling cancellations over total sessions",
    },
    {
      label: "Low page publish rate",
      value: `${dashboardOverview.publishRate}%`,
      danger: dashboardOverview.publishRate < 70,
      detail: "Published website pages out of total",
    },
    {
      label: "Assessment coverage",
      value: `${dashboardOverview.assessmentCoverage}%`,
      danger: dashboardOverview.assessmentCoverage < 60,
      detail: "Students with assessment submissions",
    },
  ];

  const counselorLoad = (analytics?.counseling.totalSessions ?? 0) / Math.max(overview?.counters.counselors ?? 1, 1);

  return (
    <div className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-1 duration-300">
      <div className="rounded-2xl border border-slate-200 bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 text-white p-6 shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-indigo-100">Advanced Analytics Suite</p>
            <h2 className="text-2xl font-bold mt-1">Student, Counselor & Website Intelligence</h2>
            <p className="text-indigo-100 mt-2 text-sm">Unified command view for engagement funnel, counseling efficiency, psychometric outcomes, and content operations.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm min-w-[280px]">
            <div className="rounded-xl bg-white/15 px-3 py-2">Total users: <span className="font-semibold">{formatNumber(dashboardOverview.totalUsers)}</span></div>
            <div className="rounded-xl bg-white/15 px-3 py-2">Assessment coverage: <span className="font-semibold">{dashboardOverview.assessmentCoverage}%</span></div>
            <div className="rounded-xl bg-white/15 px-3 py-2">Counseling coverage: <span className="font-semibold">{dashboardOverview.counselingCoverage}%</span></div>
            <div className="rounded-xl bg-white/15 px-3 py-2">Shortlist conversion: <span className="font-semibold">{dashboardOverview.shortlistConversionRate}%</span></div>
          </div>
        </div>
      </div>

      <AnalyticsFilters filters={filters} onChange={setFilters} onRefresh={handleRefresh} refreshing={refreshing} />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2 bg-white rounded-2xl border border-slate-200 p-4">
          <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-2 mb-3"><AlertTriangle className="w-4 h-4 text-amber-600" /> Priority Watchlist</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {alertItems.map((item) => (
              <div key={item.label} className={`rounded-xl border p-3 ${item.danger ? "border-rose-200 bg-rose-50" : "border-emerald-200 bg-emerald-50"}`}>
                <p className={`text-xs font-semibold ${item.danger ? "text-rose-700" : "text-emerald-700"}`}>{item.label}</p>
                <p className="text-xl font-bold text-slate-900 mt-1">{item.value}</p>
                <p className="text-xs text-slate-500 mt-1">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3">
          <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-indigo-600" /> Delivery Pulse</h3>
          <div className="rounded-xl border border-slate-200 p-3 bg-slate-50">
            <p className="text-xs text-slate-500 flex items-center gap-1"><Users className="w-3.5 h-3.5" /> Avg sessions per counselor</p>
            <p className="text-2xl font-bold text-slate-900">{counselorLoad.toFixed(1)}</p>
          </div>
          <div className="rounded-xl border border-slate-200 p-3 bg-slate-50">
            <p className="text-xs text-slate-500 flex items-center gap-1"><UserCheck className="w-3.5 h-3.5" /> Students with sessions</p>
            <p className="text-2xl font-bold text-slate-900">{formatNumber(analytics?.progress.studentsWithSessions ?? 0)}</p>
          </div>
          <div className="rounded-xl border border-slate-200 p-3 bg-slate-50">
            <p className="text-xs text-slate-500 flex items-center gap-1"><CalendarClock className="w-3.5 h-3.5" /> Upcoming sessions</p>
            <p className="text-2xl font-bold text-slate-900">{formatNumber(analytics?.counseling.upcomingSessions ?? 0)}</p>
          </div>
        </div>
      </div>

      <AnalyticsOverview data={dashboardOverview} />

      <AnalyticsCharts
        roleDistribution={roleDistribution}
        sessionStatus={sessionStatus}
        studentJourney={studentJourney}
        topAssessments={topAssessments}
        scoreTrend={scoreTrend}
        pageStats={pagesData}
      />

      <AnalyticsTables topColleges={topColleges} recentResults={recentResults} pages={pagesData} />
    </div>
  );
}
