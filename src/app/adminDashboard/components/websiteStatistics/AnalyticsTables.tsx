"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import type { TopCollegePoint, RecentResultPoint, WebsitePagePoint } from "./analyticsTypes";
import { formatDateTime, formatNumber } from "./analyticsUtils";

type AnalyticsTablesProps = {
  topColleges: TopCollegePoint[];
  recentResults: RecentResultPoint[];
  pages: WebsitePagePoint[];
};

export default function AnalyticsTables({ topColleges, recentResults, pages }: AnalyticsTablesProps) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <Card className="border-slate-200 shadow-sm">
        <CardHeader><CardTitle>Top Shortlisted Colleges</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {topColleges.length === 0 ? (
            <p className="text-sm text-slate-500">No shortlist records found.</p>
          ) : (
            topColleges.map((college) => (
              <div key={college.name} className="rounded-xl border border-slate-200 p-3 flex items-center justify-between bg-slate-50/70">
                <div>
                  <p className="font-medium text-slate-900 text-sm">{college.name}</p>
                  <p className="text-xs text-slate-500">Applied: {formatNumber(college.applied)}</p>
                </div>
                <Badge variant="secondary">{formatNumber(college.count)}</Badge>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      <Card className="border-slate-200 shadow-sm">
        <CardHeader><CardTitle>Recent Student Results</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {recentResults.length === 0 ? (
            <p className="text-sm text-slate-500">No recent assessment results.</p>
          ) : (
            recentResults.map((result) => (
              <div key={result.id} className="rounded-xl border border-slate-200 p-3 bg-white">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-slate-900 text-sm">{result.studentName}</p>
                    <p className="text-xs text-slate-500">{result.assessmentTitle}</p>
                  </div>
                  <Badge variant={result.overallScore >= 60 ? "secondary" : "destructive"}>{Math.round(result.overallScore)}%</Badge>
                </div>
                <p className="text-xs text-slate-400 mt-2">{formatDateTime(result.completedAt)}</p>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      <Card className="border-slate-200 shadow-sm">
        <CardHeader><CardTitle>Website Page Ops</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {pages.length === 0 ? (
            <p className="text-sm text-slate-500">No website pages available.</p>
          ) : (
            pages.map((page) => (
              <div key={page.id} className="rounded-xl border border-slate-200 p-3 bg-slate-50/50">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-medium text-slate-900 text-sm">{page.name}</p>
                  <Badge variant={page.status === "published" ? "secondary" : "destructive"}>
                    {page.status}
                  </Badge>
                </div>
                <p className="text-xs text-slate-500 mt-1">Route: {page.route}</p>
                <p className="text-xs text-slate-500">Records: {formatNumber(page.records)}</p>
                {page.lastUpdated ? <p className="text-xs text-slate-400">Last updated: {formatDateTime(page.lastUpdated)}</p> : null}
                {page.owner ? <p className="text-xs text-slate-400">Owner: {page.owner}</p> : null}
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
