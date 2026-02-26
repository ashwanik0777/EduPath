import { Calendar, Clock, CheckCircle2, Users, Activity, BadgeCheck, BarChart3, BookOpen, Target, AlertTriangle } from "lucide-react";
import { CounselorOverview, CounselorPsychometricResponse, CounselorResourcesResponse, CounselorStudentItem, OverviewInsights, SessionItem } from "../types";

type OverviewTabProps = {
  panelClass: string;
  name: string;
  overview: CounselorOverview["data"] | null;
  overviewInsights: OverviewInsights;
  allSessions: SessionItem[];
  students: CounselorStudentItem[];
  psychometric: CounselorPsychometricResponse["data"] | null;
  resources: CounselorResourcesResponse["data"] | null;
};

export function OverviewTab({ panelClass, name, overview, overviewInsights, allSessions, students, psychometric, resources }: OverviewTabProps) {
  const recentSessions = allSessions.slice(0, 6);
  const topStudents = students.slice(0, 6);
  const followUpPending = allSessions.filter((session) => session.status === "completed" && !session.counselorNotes?.trim()).length;

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-indigo-700 via-blue-700 to-cyan-700 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10" />
        <div className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full bg-white/10" />
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <p className="text-sm text-indigo-100">Counseling Command Center</p>
            <h2 className="text-2xl font-bold mt-1">Welcome back, {overview?.counselorProfile?.displayName || name}</h2>
            <p className="text-indigo-100 mt-2 text-sm">Secure workspace for sessions, students, and performance.</p>
          </div>
          <div className="grid grid-cols-2 gap-3 min-w-[280px]">
            <div className="rounded-xl bg-white/10 border border-white/20 px-4 py-3">
              <p className="text-xs text-indigo-100">Completion</p>
              <p className="text-2xl font-semibold">{overviewInsights.completionRate}%</p>
            </div>
            <div className="rounded-xl bg-white/10 border border-white/20 px-4 py-3">
              <p className="text-xs text-indigo-100">Avg. Duration</p>
              <p className="text-2xl font-semibold">{overviewInsights.avgDuration} min</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
        <div className={`${panelClass} p-5`}><div className="flex items-center justify-between"><p className="text-slate-600 text-sm">Today Sessions</p><Clock className="w-5 h-5 text-indigo-500"/></div><p className="text-3xl font-bold text-slate-900 mt-2">{overview?.counters.todaySessions ?? 0}</p></div>
        <div className={`${panelClass} p-5`}><div className="flex items-center justify-between"><p className="text-slate-600 text-sm">Upcoming</p><Calendar className="w-5 h-5 text-blue-500"/></div><p className="text-3xl font-bold text-slate-900 mt-2">{overview?.counters.upcomingSessions ?? 0}</p></div>
        <div className={`${panelClass} p-5`}><div className="flex items-center justify-between"><p className="text-slate-600 text-sm">Completed</p><CheckCircle2 className="w-5 h-5 text-emerald-500"/></div><p className="text-3xl font-bold text-slate-900 mt-2">{overview?.counters.completedSessions ?? 0}</p></div>
        <div className={`${panelClass} p-5`}><div className="flex items-center justify-between"><p className="text-slate-600 text-sm">Students Guided</p><Users className="w-5 h-5 text-cyan-500"/></div><p className="text-3xl font-bold text-slate-900 mt-2">{overview?.counters.totalStudents ?? 0}</p></div>
        <div className={`${panelClass} p-5`}><div className="flex items-center justify-between"><p className="text-slate-600 text-sm">Active Cases</p><Activity className="w-5 h-5 text-violet-500"/></div><p className="text-3xl font-bold text-slate-900 mt-2">{overviewInsights.activeCount}</p></div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className={`xl:col-span-2 ${panelClass} p-5`}>
          <div className="flex items-center justify-between mb-3"><h3 className="font-semibold text-slate-900">Next Priority Session</h3><BadgeCheck className="w-5 h-5 text-emerald-600"/></div>
          {!overviewInsights.nextSession ? (
            <div className="rounded-lg border border-dashed border-slate-300 p-6 text-center text-slate-500 text-sm">No upcoming session right now.</div>
          ) : (
            <div className="rounded-xl border border-indigo-100 bg-indigo-50 p-4">
              <p className="font-semibold text-slate-900">{overviewInsights.nextSession.studentName}</p>
              <p className="text-xs text-slate-600">{overviewInsights.nextSession.studentEmail}</p>
              <p className="text-sm text-slate-700 mt-1">{new Date(overviewInsights.nextSession.scheduledAt).toLocaleString()}</p>
            </div>
          )}
        </div>
        <div className={`${panelClass} p-5`}>
          <div className="flex items-center gap-2 mb-3"><BarChart3 className="w-5 h-5 text-indigo-600"/><h3 className="font-semibold text-slate-900">Session Health</h3></div>
          <div className="space-y-2 text-sm text-slate-700">
            <div className="flex items-center justify-between"><span>Total Sessions</span><span className="font-semibold">{overviewInsights.totalSessions}</span></div>
            <div className="flex items-center justify-between"><span>Completion Rate</span><span className="font-semibold">{overviewInsights.completionRate}%</span></div>
            <div className="flex items-center justify-between"><span>Cancelled / No-show</span><span className="font-semibold">{overviewInsights.cancelledOrNoShowCount}</span></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className={`${panelClass} p-5`}>
          <div className="flex items-center justify-between"><p className="text-slate-600 text-sm">Follow-up Pending</p><AlertTriangle className="w-5 h-5 text-amber-500"/></div>
          <p className="text-3xl font-bold text-slate-900 mt-2">{followUpPending}</p>
          <p className="text-xs text-slate-500 mt-1">Completed sessions without counselor notes</p>
        </div>
        <div className={`${panelClass} p-5`}>
          <div className="flex items-center justify-between"><p className="text-slate-600 text-sm">Psychometric Avg.</p><Target className="w-5 h-5 text-violet-500"/></div>
          <p className="text-3xl font-bold text-slate-900 mt-2">{psychometric?.averageScore ?? 0}%</p>
          <p className="text-xs text-slate-500 mt-1">Attempts: {psychometric?.totalAttempts ?? 0}</p>
        </div>
        <div className={`${panelClass} p-5`}>
          <div className="flex items-center justify-between"><p className="text-slate-600 text-sm">Guidance Library</p><BookOpen className="w-5 h-5 text-cyan-500"/></div>
          <p className="text-3xl font-bold text-slate-900 mt-2">
            {(resources?.counters.colleges || 0) + (resources?.counters.careers || 0) + (resources?.counters.exams || 0) + (resources?.counters.scholarships || 0)}
          </p>
          <p className="text-xs text-slate-500 mt-1">Colleges/Careers/Exams/Scholarships available</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className={`${panelClass} p-5`}>
          <h3 className="font-semibold text-slate-900 mb-3">Today Timeline</h3>
          {overviewInsights.todayTimeline.length === 0 ? (
            <div className="rounded-lg border border-dashed border-slate-300 p-6 text-center text-slate-500 text-sm">No sessions scheduled for today.</div>
          ) : (
            <div className="space-y-2">
              {overviewInsights.todayTimeline.slice(0, 6).map((session) => (
                <div key={session._id} className="border border-slate-200 rounded-lg p-3">
                  <p className="font-medium text-slate-900">{session.studentName}</p>
                  <p className="text-xs text-slate-500">{new Date(session.scheduledAt).toLocaleTimeString()} • {session.duration} min</p>
                  <span className="inline-flex mt-1 text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 capitalize">{session.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={`${panelClass} p-5`}>
          <h3 className="font-semibold text-slate-900 mb-3">Top Engaged Students</h3>
          {topStudents.length === 0 ? (
            <div className="rounded-lg border border-dashed border-slate-300 p-6 text-center text-slate-500 text-sm">No student engagement data yet.</div>
          ) : (
            <div className="space-y-2">
              {topStudents.map((student) => (
                <div key={student.studentId} className="border border-slate-200 rounded-lg p-3">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-medium text-slate-900 truncate">{student.name}</p>
                    <span className="text-xs px-2 py-0.5 rounded bg-indigo-50 text-indigo-700">{student.completionRate}%</span>
                  </div>
                  <p className="text-xs text-slate-500 truncate">{student.email}</p>
                  <p className="text-xs text-slate-600 mt-1">Sessions: {student.totalSessions} • Upcoming: {student.upcomingSessions}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className={`${panelClass} p-5`}>
          <h3 className="font-semibold text-slate-900 mb-3">Recent Sessions</h3>
          {recentSessions.length === 0 ? (
            <div className="rounded-lg border border-dashed border-slate-300 p-6 text-center text-slate-500 text-sm">No recent sessions found.</div>
          ) : (
            <div className="space-y-2">
              {recentSessions.map((session) => (
                <div key={session._id} className="border border-slate-200 rounded-lg p-3">
                  <p className="font-medium text-slate-900">{session.studentName}</p>
                  <p className="text-xs text-slate-500">{new Date(session.scheduledAt).toLocaleString()}</p>
                  <p className="text-xs text-slate-600 mt-1 capitalize">{session.type.replace("-", " ")} • {session.platform}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={`${panelClass} p-5`}>
          <h3 className="font-semibold text-slate-900 mb-3">Resource Coverage</h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-lg border border-slate-200 p-3"><p className="text-slate-500 text-xs">Colleges</p><p className="text-lg font-semibold text-slate-900">{resources?.counters.colleges ?? 0}</p></div>
            <div className="rounded-lg border border-slate-200 p-3"><p className="text-slate-500 text-xs">Careers</p><p className="text-lg font-semibold text-slate-900">{resources?.counters.careers ?? 0}</p></div>
            <div className="rounded-lg border border-slate-200 p-3"><p className="text-slate-500 text-xs">Exams</p><p className="text-lg font-semibold text-slate-900">{resources?.counters.exams ?? 0}</p></div>
            <div className="rounded-lg border border-slate-200 p-3"><p className="text-slate-500 text-xs">Scholarships</p><p className="text-lg font-semibold text-slate-900">{resources?.counters.scholarships ?? 0}</p></div>
          </div>
          <p className="text-xs text-slate-500 mt-3">Use these references while creating action plans in sessions and student detail view.</p>
        </div>
      </div>
    </div>
  );
}
