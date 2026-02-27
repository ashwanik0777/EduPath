"use client";

import { Button } from "@/app/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { RefreshCw, Filter } from "lucide-react";
import type { AnalyticsFiltersState, AnalyticsPeriod, AnalyticsSegment } from "./analyticsTypes";

type AnalyticsFiltersProps = {
  filters: AnalyticsFiltersState;
  onChange: (next: AnalyticsFiltersState) => void;
  onRefresh: () => void;
  refreshing?: boolean;
};

export default function AnalyticsFilters({ filters, onChange, onRefresh, refreshing }: AnalyticsFiltersProps) {
  const periodLabel =
    filters.period === "7d" ? "Last 7 days" : filters.period === "30d" ? "Last 30 days" : filters.period === "90d" ? "Last 90 days" : "All time";
  const segmentLabel =
    filters.segment === "students" ? "Students" : filters.segment === "counselors" ? "Counselors" : "All audience";

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 md:p-5 space-y-4">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-wide text-indigo-600 font-semibold">Analytics Control Center</p>
          <h3 className="text-lg font-semibold text-slate-900">Filter audience, time range and refresh insights</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            <span className="inline-flex items-center rounded-full bg-indigo-50 border border-indigo-100 px-2.5 py-1 text-xs text-indigo-700">Period: {periodLabel}</span>
            <span className="inline-flex items-center rounded-full bg-cyan-50 border border-cyan-100 px-2.5 py-1 text-xs text-cyan-700">Segment: {segmentLabel}</span>
          </div>
        </div>

        <Button variant="outline" size="sm" onClick={onRefresh} className="w-full sm:w-auto">
          <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
          Refresh Data
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-3 border-t border-slate-100 pt-4">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Filter className="w-4 h-4" />
          Active Filters
        </div>

        <Select
          value={filters.period}
          onValueChange={(period) => onChange({ ...filters, period: period as AnalyticsPeriod })}
        >
          <SelectTrigger className="w-36">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
            <SelectItem value="all">All time</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.segment}
          onValueChange={(segment) => onChange({ ...filters, segment: segment as AnalyticsSegment })}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Select segment" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All audience</SelectItem>
            <SelectItem value="students">Students only</SelectItem>
            <SelectItem value="counselors">Counselors only</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
