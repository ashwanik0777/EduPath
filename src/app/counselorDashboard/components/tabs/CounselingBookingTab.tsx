import { SessionItem } from "../types";

type CounselingBookingTabProps = {
  panelClass: string;
  allSessions: SessionItem[];
};

export function CounselingBookingTab({ panelClass, allSessions }: CounselingBookingTabProps) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      <div className={`${panelClass} p-5`}>
        <h3 className="font-semibold text-slate-900 mb-3">Upcoming / Active</h3>
        <div className="space-y-2">
          {allSessions
            .filter((session) => session.status === "scheduled" || session.status === "in-progress")
            .slice(0, 10)
            .map((session) => (
              <div key={session._id} className="border border-slate-200 rounded-lg p-3">
                <p className="font-medium text-slate-900">{session.studentName}</p>
                <p className="text-xs text-slate-500">{new Date(session.scheduledAt).toLocaleString()}</p>
                <p className="text-xs text-slate-600 capitalize mt-1">{session.type.replace("-", " ")}</p>
              </div>
            ))}
        </div>
      </div>
      <div className={`${panelClass} p-5`}>
        <h3 className="font-semibold text-slate-900 mb-3">Completed Recently</h3>
        <div className="space-y-2">
          {allSessions
            .filter((session) => session.status === "completed")
            .slice(0, 10)
            .map((session) => (
              <div key={session._id} className="border border-slate-200 rounded-lg p-3">
                <p className="font-medium text-slate-900">{session.studentName}</p>
                <p className="text-xs text-slate-500">{new Date(session.scheduledAt).toLocaleString()}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
