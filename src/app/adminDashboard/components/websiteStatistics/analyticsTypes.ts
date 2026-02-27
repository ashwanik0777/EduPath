export type AnalyticsPeriod = "7d" | "30d" | "90d" | "all";
export type AnalyticsSegment = "all" | "students" | "counselors";

export type AnalyticsFiltersState = {
  period: AnalyticsPeriod;
  segment: AnalyticsSegment;
};

export type PlatformOverview = {
  totalUsers: number;
  students: number;
  counselors: number;
  admins: number;
  publishedPages: number;
  totalPages: number;
  totalRecords: number;
  maintenanceMode: boolean;
  totalAssessments: number;
  activeAssessments: number;
  totalResults: number;
  upcomingSessions: number;
  completedSessions: number;
  cancelledSessions: number;
  totalSessions: number;
  assessmentCoverage: number;
  counselingCoverage: number;
  cancellationRate: number;
  publishRate: number;
  shortlistAppliedCount: number;
  shortlistTotalCount: number;
  shortlistConversionRate: number;
};

export type RoleDistributionPoint = {
  name: string;
  value: number;
  color: string;
};

export type SessionStatusPoint = {
  name: string;
  value: number;
  color: string;
};

export type StudentJourneyPoint = {
  stage: string;
  count: number;
};

export type AssessmentAttemptPoint = {
  title: string;
  attempts: number;
};

export type ScoreTrendPoint = {
  label: string;
  score: number;
};

export type TopCollegePoint = {
  name: string;
  count: number;
  applied: number;
};

export type RecentResultPoint = {
  id: string;
  studentName: string;
  assessmentTitle: string;
  overallScore: number;
  completedAt: string;
};

export type WebsitePagePoint = {
  id: string;
  name: string;
  route: string;
  status: "published" | "draft";
  records: number;
  owner?: string;
  lastUpdated?: string;
};
