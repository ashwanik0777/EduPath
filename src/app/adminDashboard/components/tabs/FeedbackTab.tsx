type AdminFeedback = {
  _id: string;
  name?: string;
  email?: string;
  type?: string;
  message?: string;
  status: "Pending" | "Reviewed" | "Responded";
  submitted_on?: string;
};

type FeedbackTabProps = {
  panelClass: string;
  inputClass: string;
  feedbacks: AdminFeedback[];
  feedbackStatus: "All" | "Pending" | "Reviewed" | "Responded";
  setFeedbackStatus: React.Dispatch<React.SetStateAction<"All" | "Pending" | "Reviewed" | "Responded">>;
  loadFeedbacks: (status?: string) => Promise<void>;
  updateFeedbackStatus: (feedbackId: string, status: AdminFeedback["status"]) => Promise<void>;
};

export function FeedbackTab({
  panelClass,
  inputClass,
  feedbacks,
  feedbackStatus,
  setFeedbackStatus,
  loadFeedbacks,
  updateFeedbackStatus,
}: FeedbackTabProps) {
  return (
    <div className={`${panelClass} p-5 animate-in fade-in-0 slide-in-from-bottom-1 duration-300`}>
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-900">Feedback Management</h3>
        <div className="flex gap-2 items-center">
          <select
            value={feedbackStatus}
            onChange={(event) => {
              const selected = event.target.value as "All" | "Pending" | "Reviewed" | "Responded";
              setFeedbackStatus(selected);
              loadFeedbacks(selected);
            }}
            className={inputClass}
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Reviewed">Reviewed</option>
            <option value="Responded">Responded</option>
          </select>
        </div>
      </div>

      <div className="space-y-3">
        {feedbacks.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500">No feedback records found.</div>
        ) : null}
        {feedbacks.map((item) => (
          <div key={item._id} className="border border-slate-200 rounded-lg p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
              <div>
                <p className="font-medium text-slate-900">{item.name || "Anonymous"}</p>
                <p className="text-xs text-slate-500">{item.email || "No email"}</p>
              </div>
              <select
                value={item.status}
                onChange={(event) => updateFeedbackStatus(item._id, event.target.value as AdminFeedback["status"])}
                className="border border-slate-300 rounded px-2 py-1 text-sm"
              >
                <option value="Pending">Pending</option>
                <option value="Reviewed">Reviewed</option>
                <option value="Responded">Responded</option>
              </select>
            </div>
            <p className="text-sm text-slate-700">{item.message || "No message"}</p>
            <div className="mt-2 text-xs text-slate-500 flex items-center justify-between">
              <span>{item.type || "General"}</span>
              <span>{item.submitted_on ? new Date(item.submitted_on).toLocaleString() : "-"}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
