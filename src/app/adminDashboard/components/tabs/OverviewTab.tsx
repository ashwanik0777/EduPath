import {
  Sparkles,
  Activity,
  CalendarClock,
  ShieldCheck,
  Users,
  GraduationCap,
  Briefcase,
  Award,
  Bell,
  MessageSquare,
  Target,
  LineChart,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { LucideIcon } from "lucide-react";

type AdminUser = {
  _id: string;
  name: string;
  email: string;
  role: "student" | "counselor" | "admin";
  isActive: boolean;
};

type AdminFeedback = {
  _id: string;
  type?: string;
  message?: string;
  status: "Pending" | "Reviewed" | "Responded";
};

type MetricCard = {
  label: string;
  value: number;
  icon: LucideIcon;
  color: string;
};

type OverviewTabProps = {
  panelClass: string;
  adminName: string;
  metricCards: MetricCard[];
  overview: {
    counters: {
      users: number;
      students: number;
      counselors: number;
      admins: number;
      colleges: number;
      careers: number;
      exams: number;
      scholarships: number;
      feedbacks: number;
      pendingFeedbacks: number;
    };
    recentUsers: AdminUser[];
    recentFeedbacks: AdminFeedback[];
  } | null;
  analytics: {
    progress: {
      totalStudents: number;
      studentsWithAssessments: number;
      studentsWithSessions: number;
      averageAssessmentScore: number;
      completedSessions: number;
      scheduledSessions: number;
    };
    psychometric: {
      totalAssessments: number;
      activeAssessments: number;
      totalResults: number;
      averageScore: number;
    };
    shortlists: {
      totalShortlisted: number;
      appliedCount: number;
      uniqueCollegeCount: number;
    };
    counseling: {
      totalSessions: number;
      upcomingSessions: number;
      completedSessions: number;
      cancelledSessions: number;
    };
  } | null;
};

export function OverviewTab({ panelClass, adminName, metricCards, overview, analytics }: OverviewTabProps) {
  const progressTotalStudents = analytics?.progress.totalStudents ?? 0;
  const progressStudentsWithAssessments = analytics?.progress.studentsWithAssessments ?? 0;
  const progressStudentsWithSessions = analytics?.progress.studentsWithSessions ?? 0;
  const counselingTotalSessions = analytics?.counseling.totalSessions ?? 0;
  const counselingCompletedSessions = analytics?.counseling.completedSessions ?? 0;

  const users = overview?.counters.users ?? 0;
  const students = overview?.counters.students ?? 0;
  const counselors = overview?.counters.counselors ?? 0;
  const admins = overview?.counters.admins ?? 0;

  const totalContent =
    (overview?.counters.colleges ?? 0) +
    (overview?.counters.careers ?? 0) +
    (overview?.counters.exams ?? 0) +
    (overview?.counters.scholarships ?? 0);

  const studentAssessmentCoverage = progressTotalStudents
    ? Math.round((progressStudentsWithAssessments / progressTotalStudents) * 100)
    : 0;

  const studentSessionCoverage = progressTotalStudents
    ? Math.round((progressStudentsWithSessions / progressTotalStudents) * 100)
    : 0;

  const counselingCompletionRate = counselingTotalSessions
    ? Math.round((counselingCompletedSessions / counselingTotalSessions) * 100)
    : 0;

  const pendingFeedbackRisk = (overview?.counters.pendingFeedbacks ?? 0) >= 10;
  const highCancellationRisk = (analytics?.counseling.cancelledSessions ?? 0) >= 5;
  const criticalActions = Number(pendingFeedbackRisk) + Number(highCancellationRisk);

  return (
    <div className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-1 duration-300">
      <div className="bg-gradient-to-r from-indigo-700 via-blue-700 to-cyan-700 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10" />
        <div className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full bg-white/10" />
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-indigo-100">Platform command center</p>
            <h3 className="text-2xl font-bold mt-1">Welcome back, {adminName}</h3>
            <p className="text-indigo-100 mt-2 max-w-2xl">
              Quick view of user growth, content scale, counseling activity, and feedback queue in one dashboard.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2 bg-white/15 px-3 py-2 rounded-lg">
            <Sparkles className="w-5 h-5" />
            <span className="text-sm">Admin Pro Mode</span>
          </div>
        </div>
      </div>

      <div className={`${panelClass} p-5`}>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <h3 className="font-semibold text-slate-900 flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-amber-600" /> Action Center</h3>
          <span className={`text-xs px-2.5 py-1 rounded-full ${criticalActions > 0 ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-700"}`}>
            {criticalActions > 0 ? `${criticalActions} critical checks need review` : "All critical checks are healthy"}
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
          <div className={`rounded-lg border px-3 py-2 ${pendingFeedbackRisk ? "border-amber-200 bg-amber-50 text-amber-800" : "border-emerald-200 bg-emerald-50 text-emerald-800"}`}>
            Pending feedback {overview?.counters.pendingFeedbacks ?? 0} {pendingFeedbackRisk ? "requires attention" : "is under control"}.
          </div>
          <div className={`rounded-lg border px-3 py-2 ${highCancellationRisk ? "border-rose-200 bg-rose-50 text-rose-800" : "border-emerald-200 bg-emerald-50 text-emerald-800"}`}>
            Cancelled sessions {analytics?.counseling.cancelledSessions ?? 0} {highCancellationRisk ? "are high, review counselor scheduling" : "are in healthy range"}.
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-slate-700">
            Upcoming sessions {analytics?.counseling.upcomingSessions ?? 0} • Applied shortlists {analytics?.shortlists.appliedCount ?? 0}.
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {metricCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">{card.label}</p>
                  <p className="text-3xl font-bold text-slate-900">{card.value}</p>
                </div>
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${card.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-2 text-slate-700 font-semibold mb-2"><Users className="w-4 h-4 text-indigo-600" /> User Base</div>
          <p className="text-2xl font-bold text-slate-900">{users}</p>
          <p className="text-xs text-slate-500 mt-1">Students: {students} • Counselors: {counselors} • Admins: {admins}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-2 text-slate-700 font-semibold mb-2"><Target className="w-4 h-4 text-violet-600" /> Student Coverage</div>
          <p className="text-2xl font-bold text-slate-900">{studentAssessmentCoverage}%</p>
          <p className="text-xs text-slate-500 mt-1">Assessment coverage • Session coverage: {studentSessionCoverage}%</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-2 text-slate-700 font-semibold mb-2"><LineChart className="w-4 h-4 text-cyan-600" /> Counseling Completion</div>
          <p className="text-2xl font-bold text-slate-900">{counselingCompletionRate}%</p>
          <p className="text-xs text-slate-500 mt-1">Completed {analytics?.counseling.completedSessions ?? 0} / {analytics?.counseling.totalSessions ?? 0} total sessions</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-2 text-slate-700 font-semibold mb-2"><MessageSquare className="w-4 h-4 text-amber-600" /> Feedback Queue</div>
          <p className="text-2xl font-bold text-slate-900">{overview?.counters.pendingFeedbacks ?? 0}</p>
          <p className="text-xs text-slate-500 mt-1">Total feedback: {overview?.counters.feedbacks ?? 0}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={`${panelClass} p-5`}>
          <h3 className="font-semibold text-slate-900 mb-3">Recent Users</h3>
          <div className="space-y-2">
            {(overview?.recentUsers || []).length === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500">No recent users available.</div>
            ) : (overview?.recentUsers || []).map((user) => (
              <div key={user._id} className="border border-slate-200 rounded-lg p-3">
                <p className="font-medium text-slate-800">{user.name}</p>
                <p className="text-xs text-slate-500">{user.email}</p>
                <div className="mt-1 flex items-center justify-between text-xs">
                  <span className="px-2 py-1 rounded bg-slate-100 text-slate-700">{user.role}</span>
                  <span className={user.isActive ? "text-emerald-600" : "text-rose-600"}>
                    {user.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`${panelClass} p-5`}>
          <h3 className="font-semibold text-slate-900 mb-3">Recent Feedback</h3>
          <div className="space-y-2">
            {(overview?.recentFeedbacks || []).length === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500">No recent feedback found.</div>
            ) : (overview?.recentFeedbacks || []).map((item) => (
              <div key={item._id} className="border border-slate-200 rounded-lg p-3">
                <p className="text-sm text-slate-700 line-clamp-2">{item.message || "No message"}</p>
                <div className="mt-1 flex items-center justify-between text-xs">
                  <span>{item.type || "General"}</span>
                  <span className="px-2 py-1 rounded bg-slate-100">{item.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-2 text-slate-700 font-semibold mb-2">
            <Activity className="w-4 h-4 text-blue-600" />
            Student Activity
          </div>
          <p className="text-2xl font-bold text-slate-900">{analytics?.progress.studentsWithAssessments ?? 0}</p>
          <p className="text-xs text-slate-500">Students with completed assessments</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-2 text-slate-700 font-semibold mb-2">
            <CalendarClock className="w-4 h-4 text-cyan-600" />
            Counseling Queue
          </div>
          <p className="text-2xl font-bold text-slate-900">{analytics?.counseling.upcomingSessions ?? 0}</p>
          <p className="text-xs text-slate-500">Upcoming sessions to monitor</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-2 text-slate-700 font-semibold mb-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Platform Health
          </div>
          <p className="text-2xl font-bold text-slate-900">{overview?.counters.pendingFeedbacks ?? 0}</p>
          <p className="text-xs text-slate-500">Pending feedback items</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className={`${panelClass} p-5`}>
          <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2"><GraduationCap className="w-4 h-4 text-blue-600" /> Content Inventory</h3>
          <div className="space-y-2 text-sm text-slate-700">
            <div className="flex items-center justify-between"><span>Government Colleges</span><span className="font-semibold">{overview?.counters.colleges ?? 0}</span></div>
            <div className="flex items-center justify-between"><span>Career Options</span><span className="font-semibold">{overview?.counters.careers ?? 0}</span></div>
            <div className="flex items-center justify-between"><span>Competitive Exams</span><span className="font-semibold">{overview?.counters.exams ?? 0}</span></div>
            <div className="flex items-center justify-between"><span>Scholarships</span><span className="font-semibold">{overview?.counters.scholarships ?? 0}</span></div>
            <div className="pt-2 mt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="font-medium">Total Content</span>
              <span className="font-bold text-slate-900">{totalContent}</span>
            </div>
          </div>
        </div>

        <div className={`${panelClass} p-5`}>
          <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Assessment & Counseling Quality</h3>
          <div className="space-y-2 text-sm text-slate-700">
            <div className="flex items-center justify-between"><span>Average Assessment Score</span><span className="font-semibold">{Math.round(analytics?.psychometric.averageScore ?? 0)}%</span></div>
            <div className="flex items-center justify-between"><span>Total Assessments</span><span className="font-semibold">{analytics?.psychometric.totalAssessments ?? 0}</span></div>
            <div className="flex items-center justify-between"><span>Active Assessments</span><span className="font-semibold">{analytics?.psychometric.activeAssessments ?? 0}</span></div>
            <div className="flex items-center justify-between"><span>Assessment Submissions</span><span className="font-semibold">{analytics?.psychometric.totalResults ?? 0}</span></div>
            <div className="flex items-center justify-between"><span>Total Shortlisted Colleges</span><span className="font-semibold">{analytics?.shortlists.totalShortlisted ?? 0}</span></div>
          </div>
        </div>

        <div className={`${panelClass} p-5`}>
          <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-amber-600" /> Operational Watchlist</h3>
          <div className="space-y-2 text-sm text-slate-700">
            <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
              Upcoming sessions to monitor: <span className="font-semibold">{analytics?.counseling.upcomingSessions ?? 0}</span>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
              Applied shortlists: <span className="font-semibold">{analytics?.shortlists.appliedCount ?? 0}</span> • Unique colleges: <span className="font-semibold">{analytics?.shortlists.uniqueCollegeCount ?? 0}</span>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
              Scheduled sessions in progress pipeline: <span className="font-semibold">{analytics?.progress.scheduledSessions ?? 0}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={`${panelClass} p-5`}>
          <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2"><Bell className="w-4 h-4 text-indigo-600" /> Feedback Status Snapshot</h3>
          <div className="space-y-2 text-sm text-slate-700">
            <div className="flex items-center justify-between"><span>Pending (overall)</span><span className="font-semibold">{overview?.counters.pendingFeedbacks ?? 0}</span></div>
            <div className="flex items-center justify-between"><span>Reviewed (recent)</span><span className="font-semibold">{(overview?.recentFeedbacks || []).filter((item) => item.status === "Reviewed").length}</span></div>
            <div className="flex items-center justify-between"><span>Responded (recent)</span><span className="font-semibold">{(overview?.recentFeedbacks || []).filter((item) => item.status === "Responded").length}</span></div>
          </div>
        </div>

        <div className={`${panelClass} p-5`}>
          <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2"><Award className="w-4 h-4 text-violet-600" /> Guidance Outcome Snapshot</h3>
          <div className="space-y-2 text-sm text-slate-700">
            <div className="flex items-center justify-between"><span>Shortlists Total</span><span className="font-semibold">{analytics?.shortlists.totalShortlisted ?? 0}</span></div>
            <div className="flex items-center justify-between"><span>Applied Count</span><span className="font-semibold">{analytics?.shortlists.appliedCount ?? 0}</span></div>
            <div className="flex items-center justify-between"><span>Unique Colleges</span><span className="font-semibold">{analytics?.shortlists.uniqueCollegeCount ?? 0}</span></div>
            <div className="flex items-center justify-between"><span>Avg Student Assessment</span><span className="font-semibold">{Math.round(analytics?.progress.averageAssessmentScore ?? 0)}%</span></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4"><p className="text-xs text-slate-500">Students</p><p className="text-2xl font-bold text-slate-900">{students}</p></div>
        <div className="bg-white rounded-xl border border-slate-200 p-4"><p className="text-xs text-slate-500">Counselors</p><p className="text-2xl font-bold text-slate-900">{counselors}</p></div>
        <div className="bg-white rounded-xl border border-slate-200 p-4"><p className="text-xs text-slate-500">Admins</p><p className="text-2xl font-bold text-slate-900">{admins}</p></div>
        <div className="bg-white rounded-xl border border-slate-200 p-4"><p className="text-xs text-slate-500">Users Total</p><p className="text-2xl font-bold text-slate-900">{users}</p></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-2 text-slate-700 font-semibold mb-2"><Briefcase className="w-4 h-4 text-emerald-600" /> Careers Impact</div>
          <p className="text-2xl font-bold text-slate-900">{overview?.counters.careers ?? 0}</p>
          <p className="text-xs text-slate-500">Career entries available for recommendations</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-2 text-slate-700 font-semibold mb-2"><Target className="w-4 h-4 text-blue-600" /> Exams Readiness</div>
          <p className="text-2xl font-bold text-slate-900">{overview?.counters.exams ?? 0}</p>
          <p className="text-xs text-slate-500">Exam records supporting planning journeys</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-2 text-slate-700 font-semibold mb-2"><Award className="w-4 h-4 text-amber-600" /> Scholarship Reach</div>
          <p className="text-2xl font-bold text-slate-900">{overview?.counters.scholarships ?? 0}</p>
          <p className="text-xs text-slate-500">Scholarship opportunities in current catalog</p>
        </div>
      </div>
    </div>
  );
}