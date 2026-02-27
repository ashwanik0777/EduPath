"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  LineChart,
  Line,
} from "recharts";
import type {
  RoleDistributionPoint,
  SessionStatusPoint,
  StudentJourneyPoint,
  AssessmentAttemptPoint,
  ScoreTrendPoint,
  WebsitePagePoint,
} from "./analyticsTypes";
import { formatNumber } from "./analyticsUtils";

type AnalyticsChartsProps = {
  roleDistribution: RoleDistributionPoint[];
  sessionStatus: SessionStatusPoint[];
  studentJourney: StudentJourneyPoint[];
  topAssessments: AssessmentAttemptPoint[];
  scoreTrend: ScoreTrendPoint[];
  pageStats: WebsitePagePoint[];
};

export default function AnalyticsCharts({
  roleDistribution,
  sessionStatus,
  studentJourney,
  topAssessments,
  scoreTrend,
  pageStats,
}: AnalyticsChartsProps) {
  const numberFormatter = (value: unknown) => formatNumber(Number(value || 0));
  const percentFormatter = (value: unknown) => `${Math.round(Number(value || 0))}%`;

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      <Card>
        <CardHeader><CardTitle>Audience Distribution</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={roleDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={105} innerRadius={55}>
                {roleDistribution.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={numberFormatter} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Counseling Status</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={sessionStatus}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip formatter={numberFormatter} />
              <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                {sessionStatus.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Student Journey Funnel</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={studentJourney}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="stage" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip formatter={numberFormatter} />
              <Bar dataKey="count" fill="#6366f1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Psychometric Score Trend (Recent)</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={scoreTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="label" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} domain={[0, 100]} />
              <Tooltip formatter={percentFormatter} />
              <Line type="monotone" dataKey="score" stroke="#0ea5e9" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Top Assessment Attempts</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topAssessments} layout="vertical" margin={{ left: 25, right: 12 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis type="number" stroke="#64748b" fontSize={12} />
              <YAxis type="category" dataKey="title" stroke="#64748b" fontSize={11} width={120} />
              <Tooltip formatter={numberFormatter} />
              <Bar dataKey="attempts" fill="#10b981" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Website Page Records</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={pageStats}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip formatter={numberFormatter} />
              <Bar dataKey="records" radius={[6, 6, 0, 0]}>
                {pageStats.map((page) => (
                  <Cell key={page.id} fill={page.status === "published" ? "#22c55e" : "#f59e0b"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
