import { SessionItem } from "../types";

type MessagesTabProps = {
  panelClass: string;
  allSessions: SessionItem[];
};

export function MessagesTab({ panelClass, allSessions }: MessagesTabProps) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      <div className={`${panelClass} p-5`}>
        <h3 className="text-lg font-semibold text-slate-900 mb-3">Follow-up Queue</h3>
        {allSessions.filter((session) => session.status === "completed").slice(0, 8).map((session) => (
          <div key={session._id} className="border border-slate-200 rounded-lg p-3 mb-2">
            <p className="font-medium text-slate-800">{session.studentName}</p>
            <p className="text-xs text-slate-500">Last session: {new Date(session.scheduledAt).toLocaleDateString()}</p>
            <p className="text-sm text-slate-700 mt-1">Suggested message: Thank you for attending. Share your action plan in next 48 hours.</p>
          </div>
        ))}
      </div>
      <div className={`${panelClass} p-5`}>
        <h3 className="text-lg font-semibold text-slate-900 mb-3">Communication Templates</h3>
        <div className="space-y-3 text-sm text-slate-700">
          <div className="rounded-lg border border-slate-200 p-3">Session Reminder: “Your counseling session is scheduled tomorrow. Please keep your goals and questions ready.”</div>
          <div className="rounded-lg border border-slate-200 p-3">Post Session Follow-up: “Please share your progress on the discussed action points by this week.”</div>
          <div className="rounded-lg border border-slate-200 p-3">No-show Outreach: “We missed you today. Let’s reschedule to continue your guidance journey.”</div>
        </div>
      </div>
    </div>
  );
}
