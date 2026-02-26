import { Trash2 } from "lucide-react";

type Item = Record<string, unknown> & { _id: string };

type CareerOptionTabProps = {
  careerForm: { title: string; stream: string; salary_range: string; career_nature: string };
  setCareerForm: React.Dispatch<React.SetStateAction<{ title: string; stream: string; salary_range: string; career_nature: string }>>;
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

export function CareerOptionTab({ careerForm, setCareerForm, createContent, getResourceRows, askConfirmation, deleteContent }: CareerOptionTabProps) {
  return (
    <div className="space-y-5 animate-in fade-in-0 slide-in-from-bottom-1 duration-300">
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <h4 className="font-semibold mb-3">Add Career</h4>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <input value={careerForm.title} onChange={(event) => setCareerForm((p) => ({ ...p, title: event.target.value }))} placeholder="Career Title" className="border border-slate-300 rounded-lg px-3 py-2" />
          <input value={careerForm.stream} onChange={(event) => setCareerForm((p) => ({ ...p, stream: event.target.value }))} placeholder="Stream" className="border border-slate-300 rounded-lg px-3 py-2" />
          <input value={careerForm.salary_range} onChange={(event) => setCareerForm((p) => ({ ...p, salary_range: event.target.value }))} placeholder="Salary Range" className="border border-slate-300 rounded-lg px-3 py-2" />
          <input value={careerForm.career_nature} onChange={(event) => setCareerForm((p) => ({ ...p, career_nature: event.target.value }))} placeholder="Career Nature" className="border border-slate-300 rounded-lg px-3 py-2" />
        </div>
        <button onClick={() => createContent("careers", careerForm)} className="mt-3 rounded-lg bg-slate-900 text-white px-4 py-2">Add Career</button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-2">
        {getResourceRows("careers").map((item) => (
          <div key={item._id} className="border border-slate-200 rounded-lg p-3 flex items-center justify-between">
            <div>
              <p className="font-medium">{String(item.title || "-")}</p>
              <p className="text-xs text-slate-500">{String(item.stream || "-")} • {String(item.salary_range || "-")}</p>
            </div>
            <button
              onClick={() =>
                askConfirmation({
                  title: "Delete Career",
                  description: `Delete ${String(item.title || "this career")} permanently? This action cannot be undone.`,
                  confirmLabel: "Delete",
                  confirmVariant: "destructive",
                  action: async () => deleteContent("careers", item._id),
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
