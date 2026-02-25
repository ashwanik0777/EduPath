"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Save, ExternalLink, RefreshCw } from "lucide-react";

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

type WebsiteManagementResponse = {
  success: boolean;
  data: {
    pages: WebsitePage[];
  };
};

async function fetchJson<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    credentials: "include",
    cache: "no-store",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
  });

  if (!response.ok) {
    throw new Error("Request failed");
  }

  return response.json() as Promise<T>;
}

export default function AdminWebsitePageEditor() {
  const params = useParams<{ pageId: string }>();
  const pageId = params?.pageId || "";

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [allPages, setAllPages] = useState<WebsitePage[]>([]);
  const [draft, setDraft] = useState<WebsitePage | null>(null);

  const loadData = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await fetchJson<WebsiteManagementResponse>("/api/admin/website-management");
      const pages = result.data.pages || [];
      setAllPages(pages);
      const selected = pages.find((item) => item.id === pageId) || null;
      setDraft(selected ? { ...selected } : null);
    } catch {
      setError("Failed to load website page data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [pageId]);

  const pageNotFound = useMemo(() => !loading && !draft, [loading, draft]);

  const savePage = async () => {
    if (!draft) return;
    setSaving(true);
    setError("");
    try {
      await fetchJson("/api/admin/website-management", {
        method: "PATCH",
        body: JSON.stringify({
          action: "updatePage",
          pageId: draft.id,
          payload: {
            owner: draft.owner,
            title: draft.title,
            subtitle: draft.subtitle,
            seoTitle: draft.seoTitle,
            seoDescription: draft.seoDescription,
          },
        }),
      });
      await loadData();
    } catch {
      setError("Could not save page data.");
    } finally {
      setSaving(false);
    }
  };

  const toggleStatus = async () => {
    if (!draft) return;
    setSaving(true);
    setError("");
    try {
      await fetchJson("/api/admin/website-management", {
        method: "PATCH",
        body: JSON.stringify({ action: "togglePageStatus", pageId: draft.id }),
      });
      await loadData();
    } catch {
      setError("Could not update page status.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-slate-300 border-t-slate-800 rounded-full animate-spin" />
      </div>
    );
  }

  if (pageNotFound) {
    return (
      <div className="min-h-screen bg-slate-100 p-6 md:p-10">
        <div className="max-w-4xl mx-auto rounded-2xl border border-slate-200 bg-white p-6">
          <p className="text-lg font-semibold text-slate-900">Website page not found</p>
          <p className="text-sm text-slate-600 mt-1">Invalid page route selected for admin editing.</p>
          <Link href="/adminDashboard" className="inline-flex items-center gap-2 mt-5 rounded-xl bg-slate-900 text-white px-4 py-2 text-sm">
            <ArrowLeft className="w-4 h-4" /> Back to Admin Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_right,_#e0e7ff_0%,_#f8fafc_38%,_#ffffff_65%)] p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-white/90 backdrop-blur shadow-sm p-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-indigo-600 font-bold">Protected Admin Route</p>
            <h1 className="text-2xl font-bold text-slate-900 mt-1">{draft?.name}</h1>
            <p className="text-slate-600 text-sm mt-1">Edit content and SEO for this specific website page.</p>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/adminDashboard" className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">
              <ArrowLeft className="w-4 h-4" /> Dashboard
            </Link>
            <button onClick={loadData} className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">
              <RefreshCw className="w-4 h-4" /> Refresh
            </button>
            <Link href={draft?.route || "/"} className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">
              <ExternalLink className="w-4 h-4" /> Open Page
            </Link>
          </div>
        </div>

        {error ? (
          <div className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-rose-700 text-sm">{error}</div>
        ) : null}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-1 rounded-2xl border border-slate-200 bg-white p-5 space-y-3">
            <p className="text-sm font-semibold text-slate-900">Page Snapshot</p>
            <div className="text-sm text-slate-600 space-y-1">
              <p><span className="text-slate-500">Route:</span> {draft?.route}</p>
              <p><span className="text-slate-500">Records:</span> {draft?.records}</p>
              <p><span className="text-slate-500">Last Updated:</span> {draft?.lastUpdated ? new Date(draft.lastUpdated).toLocaleString() : "-"}</p>
            </div>
            <button
              onClick={toggleStatus}
              disabled={saving}
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm hover:bg-slate-50 disabled:opacity-60"
            >
              {draft?.status === "published" ? "Move to Draft" : "Publish"}
            </button>
            <div className={`text-xs font-medium ${draft?.status === "published" ? "text-emerald-700" : "text-amber-700"}`}>
              Status: {draft?.status === "published" ? "Published" : "Draft"}
            </div>
          </div>

          <div className="xl:col-span-2 rounded-2xl border border-slate-200 bg-white p-5 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="text-sm text-slate-600">Owner</label>
                <input
                  value={draft?.owner || ""}
                  onChange={(event) => setDraft((prev) => (prev ? { ...prev, owner: event.target.value } : prev))}
                  className="mt-1 w-full border border-slate-300 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400"
                />
              </div>
              <div>
                <label className="text-sm text-slate-600">Page Title</label>
                <input
                  value={draft?.title || ""}
                  onChange={(event) => setDraft((prev) => (prev ? { ...prev, title: event.target.value } : prev))}
                  className="mt-1 w-full border border-slate-300 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-slate-600">Subtitle</label>
              <textarea
                value={draft?.subtitle || ""}
                onChange={(event) => setDraft((prev) => (prev ? { ...prev, subtitle: event.target.value } : prev))}
                className="mt-1 min-h-[100px] w-full border border-slate-300 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400"
              />
            </div>

            <div>
              <label className="text-sm text-slate-600">SEO Title</label>
              <input
                value={draft?.seoTitle || ""}
                onChange={(event) => setDraft((prev) => (prev ? { ...prev, seoTitle: event.target.value } : prev))}
                className="mt-1 w-full border border-slate-300 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400"
              />
            </div>

            <div>
              <label className="text-sm text-slate-600">SEO Description</label>
              <textarea
                value={draft?.seoDescription || ""}
                onChange={(event) => setDraft((prev) => (prev ? { ...prev, seoDescription: event.target.value } : prev))}
                className="mt-1 min-h-[100px] w-full border border-slate-300 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400"
              />
            </div>

            <div className="flex justify-end">
              <button
                onClick={savePage}
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 text-white px-4 py-2.5 text-sm font-medium hover:bg-slate-800 disabled:opacity-60"
              >
                <Save className="w-4 h-4" /> {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-sm font-semibold text-slate-900 mb-3">Other Website Pages</p>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
            {allPages
              .filter((item) => item.id !== pageId)
              .map((item) => (
                <Link
                  key={item.id}
                  href={`/adminDashboard/website/${item.id}`}
                  className="rounded-xl border border-slate-200 p-3 hover:bg-slate-50"
                >
                  <p className="text-sm font-medium text-slate-900">{item.name}</p>
                  <p className="text-xs text-slate-500 mt-1">{item.route}</p>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
