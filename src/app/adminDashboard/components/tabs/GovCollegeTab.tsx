import { Trash2 } from "lucide-react";

type Item = Record<string, unknown> & { _id: string };

type GovCollegeTabProps = {
  collegeForm: {
    name: string;
    type: string;
    category: string;
    city: string;
    state: string;
    isRecommended: boolean;
    recommendationScore: number;
    recommendationNote: string;
  };
  setCollegeForm: React.Dispatch<React.SetStateAction<{
    name: string;
    type: string;
    category: string;
    city: string;
    state: string;
    isRecommended: boolean;
    recommendationScore: number;
    recommendationNote: string;
  }>>;
  createContent: (resource: "colleges" | "careers" | "exams" | "scholarships", payload: Record<string, unknown>) => Promise<void>;
  getResourceRows: (resource: "colleges" | "careers" | "exams" | "scholarships") => Item[];
  contentSearch: Record<"colleges" | "careers" | "exams" | "scholarships", string>;
  setContentSearch: React.Dispatch<React.SetStateAction<Record<"colleges" | "careers" | "exams" | "scholarships", string>>>;
  loadContent: (resource: "colleges" | "careers" | "exams" | "scholarships", query?: string) => Promise<void>;
  askConfirmation: (config: {
    title: string;
    description: string;
    confirmLabel: string;
    confirmVariant?: "default" | "destructive";
    action: () => Promise<void>;
  }) => void;
  deleteContent: (resource: "colleges" | "careers" | "exams" | "scholarships", id: string) => Promise<void>;
};

export function GovCollegeTab({
  collegeForm,
  setCollegeForm,
  createContent,
  getResourceRows,
  contentSearch,
  setContentSearch,
  loadContent,
  askConfirmation,
  deleteContent,
}: GovCollegeTabProps) {
  return (
    <div className="space-y-5 animate-in fade-in-0 slide-in-from-bottom-1 duration-300">
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <h4 className="font-semibold mb-3">Add College (Government + Private + Deemed)</h4>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <input value={collegeForm.name} onChange={(event) => setCollegeForm((p) => ({ ...p, name: event.target.value }))} placeholder="College Name" className="border border-slate-300 rounded-lg px-3 py-2" />
          <select value={collegeForm.type} onChange={(event) => setCollegeForm((p) => ({ ...p, type: event.target.value }))} className="border border-slate-300 rounded-lg px-3 py-2"><option value="government">government</option><option value="private">private</option><option value="deemed">deemed</option></select>
          <select value={collegeForm.category} onChange={(event) => setCollegeForm((p) => ({ ...p, category: event.target.value }))} className="border border-slate-300 rounded-lg px-3 py-2"><option value="engineering">engineering</option><option value="medical">medical</option><option value="arts">arts</option><option value="science">science</option><option value="commerce">commerce</option><option value="law">law</option><option value="management">management</option></select>
          <input value={collegeForm.city} onChange={(event) => setCollegeForm((p) => ({ ...p, city: event.target.value }))} placeholder="City" className="border border-slate-300 rounded-lg px-3 py-2" />
          <input value={collegeForm.state} onChange={(event) => setCollegeForm((p) => ({ ...p, state: event.target.value }))} placeholder="State" className="border border-slate-300 rounded-lg px-3 py-2" />
          <select value={String(collegeForm.isRecommended)} onChange={(event) => setCollegeForm((p) => ({ ...p, isRecommended: event.target.value === "true" }))} className="border border-slate-300 rounded-lg px-3 py-2"><option value="true">recommended</option><option value="false">normal</option></select>
          <input type="number" min={0} max={100} value={collegeForm.recommendationScore} onChange={(event) => setCollegeForm((p) => ({ ...p, recommendationScore: Number(event.target.value) || 0 }))} placeholder="Recommendation Score (0-100)" className="border border-slate-300 rounded-lg px-3 py-2" />
          <input value={collegeForm.recommendationNote} onChange={(event) => setCollegeForm((p) => ({ ...p, recommendationNote: event.target.value }))} placeholder="Recommendation Note" className="border border-slate-300 rounded-lg px-3 py-2" />
        </div>
        <button
          onClick={() => createContent("colleges", collegeForm)}
          className="mt-3 rounded-lg bg-slate-900 text-white px-4 py-2"
        >
          Add College
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold">Colleges</h4>
          <div className="flex gap-2">
            <input
              value={contentSearch.colleges}
              onChange={(event) => setContentSearch((previous) => ({ ...previous, colleges: event.target.value }))}
              placeholder="Search"
              className="border border-slate-300 rounded px-2 py-1"
            />
            <button onClick={() => loadContent("colleges", contentSearch.colleges)} className="rounded border border-slate-300 px-2 py-1">Search</button>
          </div>
        </div>
        <div className="space-y-2">
          {getResourceRows("colleges").map((item) => (
            <div key={item._id} className="border border-slate-200 rounded-lg p-3 flex items-center justify-between">
              <div>
                <p className="font-medium">{String(item.name || "-")}</p>
                <p className="text-xs text-slate-500 capitalize">{String(item.type || "-")} • {String(item.category || "-")} • {String((item as Record<string, unknown>).isRecommended ? "recommended" : "normal")}</p>
                {(item as Record<string, unknown>).recommendationScore ? (
                  <p className="text-[11px] text-indigo-600 mt-1">Score: {String((item as Record<string, unknown>).recommendationScore)} / 100</p>
                ) : null}
              </div>
              <button
                onClick={() =>
                  askConfirmation({
                    title: "Delete College",
                    description: `Delete ${String(item.name || "this college")} permanently? This action cannot be undone.`,
                    confirmLabel: "Delete",
                    confirmVariant: "destructive",
                    action: async () => deleteContent("colleges", item._id),
                  })
                }
                className="text-rose-600 hover:text-rose-700"
              ><Trash2 className="w-4 h-4" /></button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
