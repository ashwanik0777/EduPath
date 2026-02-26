import Link from "next/link";
import { Save } from "lucide-react";

type WebsitePage = {
  id: string;
  name: string;
  route: string;
  status: "published" | "draft";
  records: number;
  lastUpdated: string;
  owner: string;
  title: string;
  subtitle: string;
  seoTitle: string;
  seoDescription: string;
};

type WebsitePageDetailsTabProps = {
  selectedWebsitePage: WebsitePage | null;
  inputClass: string;
  primaryButtonClass: string;
  toggleWebsitePageStatus: (id: string) => Promise<void>;
  updateWebsitePageDraft: (id: string, field: "title" | "subtitle" | "seoTitle" | "seoDescription" | "owner", value: string) => void;
  saveWebsitePage: (id: string) => Promise<void>;
};

export function WebsitePageDetailsTab({ selectedWebsitePage, inputClass, primaryButtonClass, toggleWebsitePageStatus, updateWebsitePageDraft, saveWebsitePage }: WebsitePageDetailsTabProps) {
  return (
    <div className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-1 duration-300">
      {!selectedWebsitePage ? (
        <div className="rounded-xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500">
          Page details are not available right now. Please refresh.
        </div>
      ) : (
        <>
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-lg font-semibold text-slate-900">{selectedWebsitePage.name}</h4>
                  <span className={`text-[11px] px-2 py-0.5 rounded-full border ${selectedWebsitePage.status === "published" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-amber-50 text-amber-700 border-amber-200"}`}>
                    {selectedWebsitePage.status === "published" ? "Published" : "Draft"}
                  </span>
                </div>
                <p className="text-sm text-slate-600 mt-1">
                  Route: {selectedWebsitePage.route} • Records: {selectedWebsitePage.records} • Updated: {new Date(selectedWebsitePage.lastUpdated).toLocaleString()}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleWebsitePageStatus(selectedWebsitePage.id)}
                  className="text-xs rounded-lg border border-slate-300 px-2.5 py-1.5 hover:bg-slate-50"
                >
                  {selectedWebsitePage.status === "published" ? "Move to Draft" : "Publish"}
                </button>
                <Link href={selectedWebsitePage.route} className="text-xs rounded-lg border border-slate-300 px-2.5 py-1.5 hover:bg-slate-50">
                  Open Live Page
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-slate-600">Page Owner</label>
                <input
                  value={selectedWebsitePage.owner}
                  onChange={(event) => updateWebsitePageDraft(selectedWebsitePage.id, "owner", event.target.value)}
                  className={`mt-1 ${inputClass}`}
                />
              </div>
              <div>
                <label className="text-sm text-slate-600">Page Title</label>
                <input
                  value={selectedWebsitePage.title}
                  onChange={(event) => updateWebsitePageDraft(selectedWebsitePage.id, "title", event.target.value)}
                  className={`mt-1 ${inputClass}`}
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-slate-600">Page Subtitle</label>
              <textarea
                value={selectedWebsitePage.subtitle}
                onChange={(event) => updateWebsitePageDraft(selectedWebsitePage.id, "subtitle", event.target.value)}
                className={`mt-1 min-h-[100px] ${inputClass}`}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-slate-600">SEO Title</label>
                <input
                  value={selectedWebsitePage.seoTitle}
                  onChange={(event) => updateWebsitePageDraft(selectedWebsitePage.id, "seoTitle", event.target.value)}
                  className={`mt-1 ${inputClass}`}
                />
              </div>
              <div>
                <label className="text-sm text-slate-600">SEO Description</label>
                <textarea
                  value={selectedWebsitePage.seoDescription}
                  onChange={(event) => updateWebsitePageDraft(selectedWebsitePage.id, "seoDescription", event.target.value)}
                  className={`mt-1 min-h-[100px] ${inputClass}`}
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button onClick={() => saveWebsitePage(selectedWebsitePage.id)} className={primaryButtonClass}>
                <Save className="w-4 h-4" /> Save Page Details
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
