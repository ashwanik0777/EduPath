type SessionItem = {
  _id: string;
  type: string;
  status: "scheduled" | "in-progress" | "completed" | "cancelled" | "no-show";
  scheduledAt: string;
  studentName: string;
  counselorName: string;
  platform: string;
};

type CounselingBookingTabProps = {
  analytics: {
    counseling: {
      totalSessions: number;
      upcomingSessions: number;
      completedSessions: number;
      cancelledSessions: number;
    };
  } | null;
  counselingSessions: SessionItem[];
  updateSessionStatus: (sessionId: string, status: SessionItem["status"]) => Promise<void>;
};

export function CounselingBookingTab({ analytics, counselingSessions, updateSessionStatus }: CounselingBookingTabProps) {
  return (
    <div className="space-y-5 animate-in fade-in-0 slide-in-from-bottom-1 duration-300">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4"><p className="text-sm text-slate-500">Total Sessions</p><p className="text-2xl font-bold">{analytics?.counseling.totalSessions ?? 0}</p></div>
        <div className="bg-white rounded-xl border border-slate-200 p-4"><p className="text-sm text-slate-500">Upcoming</p><p className="text-2xl font-bold">{analytics?.counseling.upcomingSessions ?? 0}</p></div>
        <div className="bg-white rounded-xl border border-slate-200 p-4"><p className="text-sm text-slate-500">Completed</p><p className="text-2xl font-bold">{analytics?.counseling.completedSessions ?? 0}</p></div>
        <div className="bg-white rounded-xl border border-slate-200 p-4"><p className="text-sm text-slate-500">Cancelled</p><p className="text-2xl font-bold">{analytics?.counseling.cancelledSessions ?? 0}</p></div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-5 overflow-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left border-b border-slate-200 text-slate-500">
              <th className="p-2">Student</th>
              <th className="p-2">Counselor</th>
              <th className="p-2">Type</th>
              <th className="p-2">Date</th>
              <th className="p-2">Platform</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {counselingSessions.map((session) => (
              <tr key={session._id} className="border-b border-slate-100">
                <td className="p-2 text-slate-700">{session.studentName}</td>
                <td className="p-2 text-slate-700">{session.counselorName}</td>
                <td className="p-2 text-slate-700 capitalize">{session.type.replaceAll("-", " ")}</td>
                <td className="p-2 text-slate-600">{new Date(session.scheduledAt).toLocaleString()}</td>
                <td className="p-2 text-slate-600 capitalize">{session.platform.replaceAll("-", " ")}</td>
                <td className="p-2">
                  <select
                    value={session.status}
                    onChange={(event) => updateSessionStatus(session._id, event.target.value as SessionItem["status"])}
                    className="border border-slate-300 rounded px-2 py-1"
                  >
                    <option value="scheduled">scheduled</option>
                    <option value="in-progress">in-progress</option>
                    <option value="completed">completed</option>
                    <option value="cancelled">cancelled</option>
                    <option value="no-show">no-show</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
