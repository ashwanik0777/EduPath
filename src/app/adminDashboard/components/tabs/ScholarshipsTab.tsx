import { Trash2 } from "lucide-react";

type Item = Record<string, unknown> & { _id: string };

type ScholarshipsTabProps = {
  scholarshipForm: { name: string; provider: string; amount: string; deadline: string };
  setScholarshipForm: React.Dispatch<React.SetStateAction<{ name: string; provider: string; amount: string; deadline: string }>>;
  createContent: (resource: "colleges" | "careers" | "exams" | "scholarships", payload: Record<string, unknown>) => Promise<void>;
  getResourceRows: (resource: "colleges" | "careers" | "exams" | "scholarships") => Item[];
  askConfirmation: (config: {
    title: string;
    description: string;
    confirmLabel: string;
    confirmVariant?: "default" | "destructive";
    action: () => Promise<void>;
  }) => void;
  deleteContent: (resource: "colleges" | "careers" | "exams" | "scholarships", id: string) => Promise<void>;
};

export function ScholarshipsTab({ scholarshipForm, setScholarshipForm, createContent, getResourceRows, askConfirmation, deleteContent }: ScholarshipsTabProps) {
  return (
    <div className="space-y-5 animate-in fade-in-0 slide-in-from-bottom-1 duration-300">
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <h4 className="font-semibold mb-3">Add Scholarship</h4>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <input value={scholarshipForm.name} onChange={(event) => setScholarshipForm((p) => ({ ...p, name: event.target.value }))} placeholder="Scholarship Name" className="border border-slate-300 rounded-lg px-3 py-2" />
          <input value={scholarshipForm.provider} onChange={(event) => setScholarshipForm((p) => ({ ...p, provider: event.target.value }))} placeholder="Provider" className="border border-slate-300 rounded-lg px-3 py-2" />
          <input value={scholarshipForm.amount} onChange={(event) => setScholarshipForm((p) => ({ ...p, amount: event.target.value }))} placeholder="Amount" className="border border-slate-300 rounded-lg px-3 py-2" />
          <input value={scholarshipForm.deadline} onChange={(event) => setScholarshipForm((p) => ({ ...p, deadline: event.target.value }))} placeholder="Deadline" className="border border-slate-300 rounded-lg px-3 py-2" />
        </div>
        <button onClick={() => createContent("scholarships", scholarshipForm)} className="mt-3 rounded-lg bg-slate-900 text-white px-4 py-2">Add Scholarship</button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-2">
        {getResourceRows("scholarships").map((item) => (
          <div key={item._id} className="border border-slate-200 rounded-lg p-3 flex items-center justify-between">
            <div>
              <p className="font-medium">{String(item.name || "-")}</p>
              <p className="text-xs text-slate-500">{String(item.provider || "-")} • {String(item.amount || "-")}</p>
            </div>
            <button
              onClick={() =>
                askConfirmation({
                  title: "Delete Scholarship",
                  description: `Delete ${String(item.name || "this scholarship")} permanently? This action cannot be undone.`,
                  confirmLabel: "Delete",
                  confirmVariant: "destructive",
                  action: async () => deleteContent("scholarships", item._id),
                })
              }
              className="text-rose-600 hover:text-rose-700"
            ><Trash2 className="w-4 h-4" /></button>
          </div>
        ))}
      </div>
    </div>
  );
}
