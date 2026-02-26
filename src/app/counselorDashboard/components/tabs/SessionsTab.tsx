import { MapPin, Phone, Video } from "lucide-react";
import { SessionItem } from "../types";

type SessionsTabProps = {
  panelClass: string;
  sessions: SessionItem[];
  sessionFilter: "All" | SessionItem["status"];
  sessionNotesDraft: Record<string, string>;
  setSessionFilter: (next: "All" | SessionItem["status"]) => void;
  loadSessions: (status?: string) => Promise<void>;
  updateSessionStatus: (sessionId: string, status: SessionItem["status"]) => Promise<void>;
  setSessionNotesDraft: React.Dispatch<React.SetStateAction<Record<string, string>>>;
};

function getPlatformIcon(platform: string) {
  if (platform === "zoom" || platform === "google-meet" || platform === "video") return Video;
  if (platform === "phone" || platform === "audio") return Phone;
  return MapPin;
}

export function SessionsTab({
  panelClass,
  sessions,
  sessionFilter,
  sessionNotesDraft,
  setSessionFilter,
  loadSessions,
  updateSessionStatus,
  setSessionNotesDraft,
}: SessionsTabProps) {
  return (
    <div className={`${panelClass} p-5`}>
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-900">Session Management</h3>
        <select
          value={sessionFilter}
          onChange={async (event) => {
            const next = event.target.value as "All" | SessionItem["status"];
            setSessionFilter(next);
            await loadSessions(next);
          }}
          className="border border-slate-300 rounded px-3 py-2 text-sm"
        >
          <option value="All">All</option>
          <option value="scheduled">Scheduled</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
          <option value="no-show">No Show</option>
        </select>
      </div>

      {sessions.length === 0 ? (
        <div className="rounded-lg border border-dashed border-slate-300 p-8 text-center text-slate-500">No sessions found for selected filter.</div>
      ) : (
        <div className="space-y-3">
          {sessions.map((session) => {
            const PlatformIcon = getPlatformIcon(session.platform);
            return (
              <div key={session._id} className="rounded-xl border border-slate-200 p-4">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2">
                  <div>
                    <p className="font-semibold text-slate-900">{session.studentName}</p>
                    <p className="text-xs text-slate-500">{session.studentEmail}</p>
                    <p className="text-xs text-slate-600 mt-1">{new Date(session.scheduledAt).toLocaleString()} • {session.duration} min</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 text-xs text-slate-600 capitalize"><PlatformIcon className="w-4 h-4" />{session.platform}</span>
                    <select
                      value={session.status}
                      onChange={(event) => updateSessionStatus(session._id, event.target.value as SessionItem["status"])}
                      className="border border-slate-300 rounded px-2 py-1 text-xs"
                    >
                      <option value="scheduled">scheduled</option>
                      <option value="in-progress">in-progress</option>
                      <option value="completed">completed</option>
                      <option value="cancelled">cancelled</option>
                      <option value="no-show">no-show</option>
                    </select>
                  </div>
                </div>
                <div className="mt-3">
                  <label className="text-xs text-slate-600">Counselor Notes</label>
                  <textarea
                    value={sessionNotesDraft[session._id] || session.counselorNotes || ""}
                    onChange={(event) =>
                      setSessionNotesDraft((prev) => ({ ...prev, [session._id]: event.target.value }))
                    }
                    className="mt-1 w-full min-h-[70px] border border-slate-300 rounded-lg px-3 py-2 text-sm"
                    placeholder="Add session summary / follow-up plan"
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
