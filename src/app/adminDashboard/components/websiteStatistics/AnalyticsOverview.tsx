"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Users, GraduationCap, UserCog, ClipboardCheck, CalendarClock, FileText, ShieldAlert, CheckCircle2, TrendingUp, Activity } from "lucide-react";
import type { PlatformOverview } from "./analyticsTypes";
import { formatNumber } from "./analyticsUtils";

type AnalyticsOverviewProps = {
  data: PlatformOverview;
};

export default function AnalyticsOverview({ data }: AnalyticsOverviewProps) {
  const cards = [
    { title: "Total Users", value: formatNumber(data.totalUsers), subtitle: `Students ${data.students} • Counselors ${data.counselors}`, icon: Users },
    { title: "Student Assessment Coverage", value: `${data.assessmentCoverage}%`, subtitle: `${formatNumber(data.totalResults)} submissions tracked`, icon: GraduationCap },
    { title: "Counseling Completion", value: `${data.totalSessions ? Math.round((data.completedSessions / data.totalSessions) * 100) : 0}%`, subtitle: `${data.completedSessions} completed / ${data.totalSessions} total`, icon: UserCog },
    { title: "Active Assessments", value: formatNumber(data.activeAssessments), subtitle: `${data.totalAssessments} total assessments`, icon: ClipboardCheck },
    { title: "Upcoming Sessions", value: formatNumber(data.upcomingSessions), subtitle: `${data.cancelledSessions} cancelled sessions`, icon: CalendarClock },
    { title: "Website Records", value: formatNumber(data.totalRecords), subtitle: `${data.publishedPages}/${data.totalPages} pages published`, icon: FileText },
  ];

  return (
    <div className="space-y-4">
      <Card className="border-slate-200 bg-white">
        <CardContent className="p-5">
          <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-wide text-indigo-600 font-semibold">Executive Snapshot</p>
              <h3 className="text-xl font-bold text-slate-900 mt-1">Platform Performance Health</h3>
              <p className="text-sm text-slate-600 mt-1">Student progress, counselor delivery and website operations in one unified view.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="text-xs"><TrendingUp className="w-3 h-3 mr-1" />Assessment Coverage {data.assessmentCoverage}%</Badge>
              <Badge variant="secondary" className="text-xs"><Activity className="w-3 h-3 mr-1" />Counseling Coverage {data.counselingCoverage}%</Badge>
              <Badge variant={data.cancellationRate > 20 ? "destructive" : "secondary"} className="text-xs">Cancellation {data.cancellationRate}%</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Card key={card.title} className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-600 flex items-center justify-between">
                  {card.title}
                  <Icon className="w-4 h-4 text-indigo-600" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">{card.value}</div>
                <p className="text-xs text-slate-500 mt-1">{card.subtitle}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="border-slate-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-base text-slate-900">Health Indicators</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex items-center justify-between text-sm text-slate-700 mb-1">
              <span>Student Assessment Coverage</span>
              <span className="font-semibold">{data.assessmentCoverage}%</span>
            </div>
            <div className="h-2.5 rounded-full bg-slate-100 overflow-hidden">
              <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${Math.min(data.assessmentCoverage, 100)}%` }} />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between text-sm text-slate-700 mb-1">
              <span>Counseling Coverage</span>
              <span className="font-semibold">{data.counselingCoverage}%</span>
            </div>
            <div className="h-2.5 rounded-full bg-slate-100 overflow-hidden">
              <div className="h-full bg-cyan-600 rounded-full" style={{ width: `${Math.min(data.counselingCoverage, 100)}%` }} />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between text-sm text-slate-700 mb-1">
              <span>Shortlist Conversion</span>
              <span className="font-semibold">{data.shortlistConversionRate}%</span>
            </div>
            <div className="h-2.5 rounded-full bg-slate-100 overflow-hidden">
              <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${Math.min(data.shortlistConversionRate, 100)}%` }} />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-wrap gap-2">
        <Badge variant={data.maintenanceMode ? "destructive" : "secondary"} className="text-xs">
          {data.maintenanceMode ? <ShieldAlert className="w-3 h-3 mr-1" /> : <CheckCircle2 className="w-3 h-3 mr-1" />}
          Maintenance Mode: {data.maintenanceMode ? "On" : "Off"}
        </Badge>
        <Badge variant="secondary" className="text-xs">Admins: {data.admins}</Badge>
        <Badge variant="secondary" className="text-xs">Published Pages: {data.publishedPages}</Badge>
      </div>
    </div>
  );
}
