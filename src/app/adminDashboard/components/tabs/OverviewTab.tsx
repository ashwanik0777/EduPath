import { Sparkles, Activity, CalendarClock, ShieldCheck } from "lucide-react";
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
    counters: { pendingFeedbacks: number };
    recentUsers: AdminUser[];
    recentFeedbacks: AdminFeedback[];
  } | null;
  analytics: {
    progress: { studentsWithAssessments: number };
    counseling: { upcomingSessions: number };
  } | null;
};

export function OverviewTab({ panelClass, adminName, metricCards, overview, analytics }: OverviewTabProps) {
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
    </div>
  );
}