import { Pencil, Trash2, X } from "lucide-react";
import { useState } from "react";

type Item = Record<string, unknown> & { _id: string };

type GovCollegeTabProps = {
  collegeForm: {
    name: string;
    type: string;
    governingBody: string;
    category: string;
    city: string;
    state: string;
    eligibilitySummary: string;
    admissionProcess: string;
    eligibilityPageUrl: string;
    isRecommended: boolean;
    recommendationScore: number;
    recommendationNote: string;
  };
  setCollegeForm: React.Dispatch<React.SetStateAction<{
    name: string;
    type: string;
    governingBody: string;
    category: string;
    city: string;
    state: string;
    eligibilitySummary: string;
    admissionProcess: string;
    eligibilityPageUrl: string;
    isRecommended: boolean;
    recommendationScore: number;
    recommendationNote: string;
  }>>;
  createContent: (resource: "colleges" | "careers" | "exams" | "scholarships", payload: Record<string, unknown>) => Promise<void>;
  updateContent: (resource: "colleges" | "careers" | "exams" | "scholarships", id: string, payload: Record<string, unknown>) => Promise<void>;
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
  updateContent,
  getResourceRows,
  contentSearch,
  setContentSearch,
  loadContent,
  askConfirmation,
  deleteContent,
}: GovCollegeTabProps) {
  const [editingId, setEditingId] = useState<string | null>(null);

  const resetForm = () => {
    setCollegeForm({
      name: "",
      type: "government",
      governingBody: "state-government",
      category: "engineering",
      city: "",
      state: "",
      eligibilitySummary: "",
      admissionProcess: "",
      eligibilityPageUrl: "",
      isRecommended: true,
      recommendationScore: 85,
      recommendationNote: "Strong academics and placements",
    });
    setEditingId(null);
  };

  const submitCollege = async () => {
    if (editingId) {
      await updateContent("colleges", editingId, collegeForm);
      resetForm();
      return;
    }

    await createContent("colleges", collegeForm);
    resetForm();
  };

  const startEditing = (item: Item) => {
    setEditingId(item._id);
    setCollegeForm((previous) => ({
      ...previous,
      name: String(item.name || ""),
      type: String(item.type || "government"),
      governingBody: String((item as Record<string, unknown>).governingBody || (item.type === "private" ? "private" : "state-government")),
      category: String(item.category || "engineering"),
      city: String((item as Record<string, any>).location?.city || ""),
      state: String((item as Record<string, any>).location?.state || ""),
      eligibilitySummary: String((item as Record<string, unknown>).eligibilitySummary || ""),
      admissionProcess: String((item as Record<string, unknown>).admissionProcess || ""),
      eligibilityPageUrl: String((item as Record<string, unknown>).eligibilityPageUrl || (item as Record<string, any>).contact?.website || ""),
      isRecommended: Boolean((item as Record<string, unknown>).isRecommended),
      recommendationScore: Number((item as Record<string, unknown>).recommendationScore || 0),
      recommendationNote: String((item as Record<string, unknown>).recommendationNote || ""),
    }));
  };

  return (
    <div className="space-y-5 animate-in fade-in-0 slide-in-from-bottom-1 duration-300">
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold">{editingId ? "Update College" : "Add College"} (Private / State Government / Central Government)</h4>
          {editingId ? (
            <button onClick={resetForm} className="inline-flex items-center gap-1 rounded-md border border-slate-300 px-2.5 py-1.5 text-xs text-slate-700 hover:bg-slate-50">
              <X className="w-3.5 h-3.5" />
              Cancel Edit
            </button>
          ) : null}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <input value={collegeForm.name} onChange={(event) => setCollegeForm((p) => ({ ...p, name: event.target.value }))} placeholder="College Name" className="border border-slate-300 rounded-lg px-3 py-2" />
          <select value={collegeForm.type} onChange={(event) => setCollegeForm((p) => ({ ...p, type: event.target.value }))} className="border border-slate-300 rounded-lg px-3 py-2"><option value="government">government</option><option value="private">private</option></select>
          <select value={collegeForm.governingBody} onChange={(event) => setCollegeForm((p) => ({ ...p, governingBody: event.target.value, type: event.target.value === "private" ? "private" : "government" }))} className="border border-slate-300 rounded-lg px-3 py-2"><option value="private">private</option><option value="state-government">state government</option><option value="central-government">central government</option></select>
          <select value={collegeForm.category} onChange={(event) => setCollegeForm((p) => ({ ...p, category: event.target.value }))} className="border border-slate-300 rounded-lg px-3 py-2"><option value="engineering">engineering</option><option value="medical">medical</option><option value="arts">arts</option><option value="science">science</option><option value="commerce">commerce</option><option value="law">law</option><option value="management">management</option></select>
          <input value={collegeForm.city} onChange={(event) => setCollegeForm((p) => ({ ...p, city: event.target.value }))} placeholder="City" className="border border-slate-300 rounded-lg px-3 py-2" />
          <input value={collegeForm.state} onChange={(event) => setCollegeForm((p) => ({ ...p, state: event.target.value }))} placeholder="State" className="border border-slate-300 rounded-lg px-3 py-2" />
          <input value={collegeForm.eligibilitySummary} onChange={(event) => setCollegeForm((p) => ({ ...p, eligibilitySummary: event.target.value }))} placeholder="Eligibility summary" className="border border-slate-300 rounded-lg px-3 py-2 md:col-span-2" />
          <input value={collegeForm.admissionProcess} onChange={(event) => setCollegeForm((p) => ({ ...p, admissionProcess: event.target.value }))} placeholder="Admission process" className="border border-slate-300 rounded-lg px-3 py-2 md:col-span-2" />
          <input value={collegeForm.eligibilityPageUrl} onChange={(event) => setCollegeForm((p) => ({ ...p, eligibilityPageUrl: event.target.value }))} placeholder="Eligibility page URL (https://...)" className="border border-slate-300 rounded-lg px-3 py-2 md:col-span-2" />
          <select value={String(collegeForm.isRecommended)} onChange={(event) => setCollegeForm((p) => ({ ...p, isRecommended: event.target.value === "true" }))} className="border border-slate-300 rounded-lg px-3 py-2"><option value="true">recommended</option><option value="false">normal</option></select>
          <input type="number" min={0} max={100} value={collegeForm.recommendationScore} onChange={(event) => setCollegeForm((p) => ({ ...p, recommendationScore: Number(event.target.value) || 0 }))} placeholder="Recommendation Score (0-100)" className="border border-slate-300 rounded-lg px-3 py-2" />
          <input value={collegeForm.recommendationNote} onChange={(event) => setCollegeForm((p) => ({ ...p, recommendationNote: event.target.value }))} placeholder="Recommendation Note" className="border border-slate-300 rounded-lg px-3 py-2" />
        </div>
        <button
          onClick={submitCollege}
          className="mt-3 rounded-lg bg-slate-900 text-white px-4 py-2"
        >
          {editingId ? "Update College" : "Add College"}
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
                <p className="text-xs text-slate-500 capitalize">{String((item as Record<string, unknown>).governingBody || item.type || "-").replace(/-/g, " ")} • {String(item.category || "-")} • {String((item as Record<string, unknown>).isRecommended ? "recommended" : "normal")}</p>
                {(item as Record<string, unknown>).eligibilitySummary ? (
                  <p className="text-[11px] text-slate-600 mt-1">Eligibility: {String((item as Record<string, unknown>).eligibilitySummary)}</p>
                ) : null}
                {(item as Record<string, unknown>).eligibilityPageUrl ? (
                  <a href={String((item as Record<string, unknown>).eligibilityPageUrl)} target="_blank" rel="noopener noreferrer" className="text-[11px] text-indigo-600 mt-1 inline-block hover:underline">Open eligibility page</a>
                ) : null}
                {(item as Record<string, unknown>).recommendationScore ? (
                  <p className="text-[11px] text-indigo-600 mt-1">Score: {String((item as Record<string, unknown>).recommendationScore)} / 100</p>
                ) : null}
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => startEditing(item)}
                  className="text-indigo-600 hover:text-indigo-700"
                  title="Edit college"
                ><Pencil className="w-4 h-4" /></button>
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
