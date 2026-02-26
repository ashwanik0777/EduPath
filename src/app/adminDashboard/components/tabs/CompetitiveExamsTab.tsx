import { Trash2 } from "lucide-react";

type Item = Record<string, unknown> & { _id: string };

type CompetitiveExamsTabProps = {
  examForm: { name: string; type: string; eligibility: string; exam_date: string; state: string };
  setExamForm: React.Dispatch<React.SetStateAction<{ name: string; type: string; eligibility: string; exam_date: string; state: string }>>;
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

export function CompetitiveExamsTab({ examForm, setExamForm, createContent, getResourceRows, askConfirmation, deleteContent }: CompetitiveExamsTabProps) {
  return (
    <div className="space-y-5 animate-in fade-in-0 slide-in-from-bottom-1 duration-300">
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <h4 className="font-semibold mb-3">Add Exam</h4>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          <input value={examForm.name} onChange={(event) => setExamForm((p) => ({ ...p, name: event.target.value }))} placeholder="Exam Name" className="border border-slate-300 rounded-lg px-3 py-2" />
          <input value={examForm.type} onChange={(event) => setExamForm((p) => ({ ...p, type: event.target.value }))} placeholder="Type" className="border border-slate-300 rounded-lg px-3 py-2" />
          <input value={examForm.eligibility} onChange={(event) => setExamForm((p) => ({ ...p, eligibility: event.target.value }))} placeholder="Eligibility" className="border border-slate-300 rounded-lg px-3 py-2" />
          <input value={examForm.exam_date} onChange={(event) => setExamForm((p) => ({ ...p, exam_date: event.target.value }))} placeholder="Exam Date" className="border border-slate-300 rounded-lg px-3 py-2" />
          <input value={examForm.state} onChange={(event) => setExamForm((p) => ({ ...p, state: event.target.value }))} placeholder="State" className="border border-slate-300 rounded-lg px-3 py-2" />
        </div>
        <button onClick={() => createContent("exams", examForm)} className="mt-3 rounded-lg bg-slate-900 text-white px-4 py-2">Add Exam</button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-2">
        {getResourceRows("exams").map((item) => (
          <div key={item._id} className="border border-slate-200 rounded-lg p-3 flex items-center justify-between">
            <div>
              <p className="font-medium">{String(item.name || "-")}</p>
              <p className="text-xs text-slate-500">{String(item.type || "-")} • {String(item.state || "-")}</p>
            </div>
            <button
              onClick={() =>
                askConfirmation({
                  title: "Delete Exam",
                  description: `Delete ${String(item.name || "this exam")} permanently? This action cannot be undone.`,
                  confirmLabel: "Delete",
                  confirmVariant: "destructive",
                  action: async () => deleteContent("exams", item._id),
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
