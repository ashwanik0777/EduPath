import { Send } from "lucide-react";
import { CounselorFeedbackItem } from "../types";

type FeedbackDraft = {
  message: string;
  suggestionCategory: string;
};

type FeedbackSuggestionsTabProps = {
  panelClass: string;
  inputClass: string;
  primaryButtonClass: string;
  saving: boolean;
  feedbackDraft: FeedbackDraft;
  setFeedbackDraft: React.Dispatch<React.SetStateAction<FeedbackDraft>>;
  submitFeedback: () => Promise<void>;
  feedbackItems: CounselorFeedbackItem[];
};

export function FeedbackSuggestionsTab({
  panelClass,
  inputClass,
  primaryButtonClass,
  saving,
  feedbackDraft,
  setFeedbackDraft,
  submitFeedback,
  feedbackItems,
}: FeedbackSuggestionsTabProps) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      <div className={`${panelClass} p-5`}>
        <h3 className="font-semibold text-slate-900 mb-3">Submit Suggestion</h3>
        <div className="space-y-3">
          <select
            value={feedbackDraft.suggestionCategory}
            onChange={(event) => setFeedbackDraft((prev) => ({ ...prev, suggestionCategory: event.target.value }))}
            className={inputClass}
          >
            <option value="General">General</option>
            <option value="UI/UX">UI/UX</option>
            <option value="Performance">Performance</option>
            <option value="Counseling Workflow">Counseling Workflow</option>
            <option value="Data Quality">Data Quality</option>
          </select>
          <textarea
            value={feedbackDraft.message}
            onChange={(event) => setFeedbackDraft((prev) => ({ ...prev, message: event.target.value }))}
            className={`min-h-[120px] ${inputClass}`}
            placeholder="Share your actionable feedback or feature suggestion"
          />
          <button onClick={submitFeedback} disabled={saving} className={primaryButtonClass}>
            <Send className="w-4 h-4" /> Submit Suggestion
          </button>
        </div>
      </div>
      <div className={`${panelClass} p-5`}>
        <h3 className="font-semibold text-slate-900 mb-3">Submitted Suggestions</h3>
        <div className="space-y-2 max-h-[460px] overflow-auto pr-1">
          {feedbackItems.length === 0 ? (
            <div className="rounded-lg border border-dashed border-slate-300 p-6 text-center text-slate-500 text-sm">No suggestions submitted yet.</div>
          ) : (
            feedbackItems.map((item) => (
              <div key={item._id} className="border border-slate-200 rounded-lg p-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-semibold text-indigo-700">{item.suggestionCategory || "General"}</p>
                  <span className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-700">{item.status}</span>
                </div>
                <p className="text-sm text-slate-800 mt-1">{item.message}</p>
                <p className="text-xs text-slate-500 mt-1">{item.submitted_on ? new Date(item.submitted_on).toLocaleString() : "-"}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
