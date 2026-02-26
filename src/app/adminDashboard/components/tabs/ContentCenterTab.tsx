import Link from "next/link";
import { BookOpen, LineChart, CalendarClock } from "lucide-react";

type ContentCenterTabProps = {
  overview: {
    counters: { colleges: number; careers: number; exams: number; scholarships: number };
  } | null;
  analytics: {
    psychometric: { totalResults: number };
    counseling: { upcomingSessions: number };
  } | null;
};

export function ContentCenterTab({ overview, analytics }: ContentCenterTabProps) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 animate-in fade-in-0 slide-in-from-bottom-1 duration-300">
        <Link href="/notifications/scholarship" className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all">
          <h4 className="font-semibold text-slate-900 mb-1">Scholarship Notifications</h4>
          <p className="text-sm text-slate-600">Manage scholarship updates visible to students.</p>
        </Link>
        <Link href="/notifications/examDate" className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all">
          <h4 className="font-semibold text-slate-900 mb-1">Exam Notifications</h4>
          <p className="text-sm text-slate-600">Review exam dates and important announcements.</p>
        </Link>
        <Link href="/notifications/counselingSchedule" className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all">
          <h4 className="font-semibold text-slate-900 mb-1">Counseling Notifications</h4>
          <p className="text-sm text-slate-600">Track counseling sessions and schedules.</p>
        </Link>
        <a href="/api/careers" className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all">
          <h4 className="font-semibold text-slate-900 mb-1">Careers Data API</h4>
          <p className="text-sm text-slate-600">View current career catalog records.</p>
        </a>
        <a href="/api/exams" className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all">
          <h4 className="font-semibold text-slate-900 mb-1">Exams Data API</h4>
          <p className="text-sm text-slate-600">View exam records used on website modules.</p>
        </a>
        <a href="/api/scholarships" className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all">
          <h4 className="font-semibold text-slate-900 mb-1">Scholarships Data API</h4>
          <p className="text-sm text-slate-600">View scholarship records used on website modules.</p>
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-4 animate-in fade-in-0 slide-in-from-bottom-1 duration-300">
        <div className="bg-gradient-to-br from-indigo-600 to-blue-600 text-white rounded-xl p-5">
          <div className="flex items-center gap-2 text-indigo-100 mb-2"><BookOpen className="w-4 h-4" /> Content Coverage</div>
          <p className="text-3xl font-bold">{(overview?.counters.colleges ?? 0) + (overview?.counters.careers ?? 0) + (overview?.counters.exams ?? 0) + (overview?.counters.scholarships ?? 0)}</p>
          <p className="text-sm text-indigo-100">Total active catalog records</p>
        </div>
        <div className="bg-gradient-to-br from-cyan-600 to-sky-600 text-white rounded-xl p-5">
          <div className="flex items-center gap-2 text-cyan-100 mb-2"><LineChart className="w-4 h-4" /> Assessment Insights</div>
          <p className="text-3xl font-bold">{analytics?.psychometric.totalResults ?? 0}</p>
          <p className="text-sm text-cyan-100">Assessment submissions tracked</p>
        </div>
        <div className="bg-gradient-to-br from-emerald-600 to-green-600 text-white rounded-xl p-5">
          <div className="flex items-center gap-2 text-emerald-100 mb-2"><CalendarClock className="w-4 h-4" /> Counseling Health</div>
          <p className="text-3xl font-bold">{analytics?.counseling.upcomingSessions ?? 0}</p>
          <p className="text-sm text-emerald-100">Upcoming counseling sessions</p>
        </div>
      </div>
    </>
  );
}
