import {
  MonitorSmartphone,
  Settings2,
  Megaphone,
  Trash2,
  Palette,
  Globe,
  Save,
  Activity,
  Bell,
  BellRing,
  Mail,
  Search,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { type WebsitePricing } from "@/app/lib/pricingDefaults";

type WebsiteAnnouncement = {
  id: string;
  text: string;
  active: boolean;
};

type WebsitePage = {
  id: string;
  name: string;
  route: string;
  status: "published" | "draft";
  records: number;
  lastUpdated: string;
  owner: string;
};

type WebsiteSettings = {
  maintenanceMode: boolean;
  collegeSearchProvider: "algolia" | "database";
  heroTitle: string;
  heroSubtitle: string;
  primaryColor: string;
  supportEmail: string;
  footerText: string;
  seoTitle: string;
  seoDescription: string;
  pricing: WebsitePricing;
};

type WebsiteManagementTabProps = {
  focusedWebsitePages: WebsitePage[];
  websiteSettings: WebsiteSettings;
  setWebsiteSettings: React.Dispatch<React.SetStateAction<WebsiteSettings>>;
  websiteAnnouncements: WebsiteAnnouncement[];
  announcementInput: string;
  setAnnouncementInput: React.Dispatch<React.SetStateAction<string>>;
  inputClass: string;
  primaryButtonClass: string;
  activeTabSetter: (tabId: string) => void;
  pageIdToWebsiteTab: Record<string, string>;
  toggleWebsitePageStatus: (id: string) => Promise<void>;
  addAnnouncement: () => Promise<void>;
  toggleAnnouncement: (id: string) => Promise<void>;
  askConfirmation: (config: {
    title: string;
    description: string;
    confirmLabel: string;
    confirmVariant?: "default" | "destructive";
    action: () => Promise<void>;
  }) => void;
  removeAnnouncement: (id: string) => Promise<void>;
  reindexCollegesSearch: () => Promise<void>;
  switchCollegeSearchProvider: (provider: "algolia" | "database") => Promise<void>;
  saveWebsiteManagement: () => Promise<void>;
};

export function WebsiteManagementTab({
  websiteSettings,
  setWebsiteSettings,
  websiteAnnouncements,
  announcementInput,
  setAnnouncementInput,
  inputClass,
  primaryButtonClass,
  addAnnouncement,
  toggleAnnouncement,
  askConfirmation,
  removeAnnouncement,
  reindexCollegesSearch,
  switchCollegeSearchProvider,
  saveWebsiteManagement,
}: Omit<WebsiteManagementTabProps, "focusedWebsitePages" | "activeTabSetter" | "pageIdToWebsiteTab" | "toggleWebsitePageStatus">) {
  const activeAnnouncements = websiteAnnouncements.filter((a) => a.active).length;

  const stats = [
    {
      label: "Website Status",
      value: websiteSettings.maintenanceMode ? "Maintenance" : "Live",
      icon: <Activity className="w-5 h-5" />,
      iconBg: websiteSettings.maintenanceMode ? "bg-rose-100" : "bg-emerald-100",
      iconColor: websiteSettings.maintenanceMode ? "text-rose-600" : "text-emerald-600",
      valuColor: websiteSettings.maintenanceMode ? "text-rose-600" : "text-emerald-600",
      border: websiteSettings.maintenanceMode ? "border-rose-200" : "border-emerald-200",
      glow: websiteSettings.maintenanceMode ? "shadow-rose-100" : "shadow-emerald-100",
      badge: websiteSettings.maintenanceMode ? (
        <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 border border-rose-200">
          <AlertTriangle className="w-3 h-3" /> Offline
        </span>
      ) : (
        <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200">
          <CheckCircle2 className="w-3 h-3" /> Online
        </span>
      ),
    },
    {
      label: "Total Announcements",
      value: websiteAnnouncements.length,
      icon: <Bell className="w-5 h-5" />,
      iconBg: "bg-indigo-100",
      iconColor: "text-indigo-600",
      valuColor: "text-slate-900",
      border: "border-indigo-200",
      glow: "shadow-indigo-100",
      badge: <span className="text-[11px] px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-200">Total</span>,
    },
    {
      label: "Active Alerts",
      value: activeAnnouncements,
      icon: <BellRing className="w-5 h-5" />,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
      valuColor: "text-amber-700",
      border: "border-amber-200",
      glow: "shadow-amber-100",
      badge: (
        <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-600 border border-amber-200">
          {activeAnnouncements > 0 ? "Broadcasting" : "None Active"}
        </span>
      ),
    },
    {
      label: "Support Email",
      value: websiteSettings.supportEmail || "—",
      icon: <Mail className="w-5 h-5" />,
      iconBg: "bg-violet-100",
      iconColor: "text-violet-600",
      valuColor: "text-slate-900",
      border: "border-violet-200",
      glow: "shadow-violet-100",
      badge: <span className="text-[11px] px-2 py-0.5 rounded-full bg-violet-50 text-violet-600 border border-violet-200">Contact</span>,
      small: true,
    },
    {
      label: "Search Engine",
      value: websiteSettings.collegeSearchProvider === "algolia" ? "Algolia" : "Database",
      icon: <Search className="w-5 h-5" />,
      iconBg: "bg-cyan-100",
      iconColor: "text-cyan-600",
      valuColor: "text-slate-900",
      border: "border-cyan-200",
      glow: "shadow-cyan-100",
      badge: (
        <span className="text-[11px] px-2 py-0.5 rounded-full bg-cyan-50 text-cyan-600 border border-cyan-200 capitalize">
          {websiteSettings.collegeSearchProvider}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-1 duration-300">
      {/* ── Stats Row ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`relative bg-white rounded-2xl border ${stat.border} p-4 shadow-sm hover:shadow-md ${stat.glow} transition-all duration-200 flex flex-col gap-3 overflow-hidden`}
          >
            {/* background blob */}
            <div className={`absolute -top-4 -right-4 w-20 h-20 rounded-full opacity-20 ${stat.iconBg}`} />
            <div className="flex items-center justify-between">
              <div className={`w-10 h-10 flex items-center justify-center rounded-xl ${stat.iconBg} ${stat.iconColor}`}>
                {stat.icon}
              </div>
              {stat.badge}
            </div>
            <div>
              <p className="text-[11px] font-medium text-slate-400 uppercase tracking-widest">{stat.label}</p>
              <p className={`mt-0.5 font-bold ${stat.small ? "text-sm break-all" : "text-2xl"} ${stat.valuColor}`}>
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Main Controls Grid ── */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Homepage & Branding */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
          <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100 bg-gradient-to-r from-indigo-50 to-white">
            <div className="w-9 h-9 flex items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
              <MonitorSmartphone className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 text-sm">Homepage & Branding</h4>
              <p className="text-xs text-slate-500">Hero content, colours & maintenance</p>
            </div>
          </div>

          <div className="p-5 space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Hero Title</label>
              <input
                value={websiteSettings.heroTitle}
                onChange={(e) => setWebsiteSettings((prev) => ({ ...prev, heroTitle: e.target.value }))}
                className={inputClass}
                placeholder="Homepage main title"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Hero Subtitle</label>
              <textarea
                value={websiteSettings.heroSubtitle}
                onChange={(e) => setWebsiteSettings((prev) => ({ ...prev, heroSubtitle: e.target.value }))}
                className={`min-h-[90px] ${inputClass}`}
                placeholder="Homepage subtitle"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Primary Color</label>
                <input
                  type="color"
                  value={websiteSettings.primaryColor}
                  onChange={(e) => setWebsiteSettings((prev) => ({ ...prev, primaryColor: e.target.value }))}
                  className="h-10 w-full rounded-lg border border-slate-300 cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Support Email</label>
                <input
                  value={websiteSettings.supportEmail}
                  onChange={(e) => setWebsiteSettings((prev) => ({ ...prev, supportEmail: e.target.value }))}
                  className={inputClass}
                  placeholder="support@example.com"
                />
              </div>
            </div>

            {/* Maintenance Toggle */}
            <div
              className={`flex items-center justify-between rounded-xl border px-4 py-3 transition-colors ${
                websiteSettings.maintenanceMode ? "bg-rose-50 border-rose-200" : "bg-slate-50 border-slate-200"
              }`}
            >
              <div className="flex items-center gap-2">
                <Settings2 className={`w-4 h-4 ${websiteSettings.maintenanceMode ? "text-rose-500" : "text-slate-400"}`} />
                <div>
                  <p className={`text-sm font-medium ${websiteSettings.maintenanceMode ? "text-rose-700" : "text-slate-700"}`}>
                    Maintenance Mode
                  </p>
                  <p className="text-xs text-slate-500">{websiteSettings.maintenanceMode ? "Site is offline for visitors" : "Site is live for visitors"}</p>
                </div>
              </div>
              <button
                onClick={() => setWebsiteSettings((prev) => ({ ...prev, maintenanceMode: !prev.maintenanceMode }))}
                className={`relative w-12 h-7 rounded-full p-1 transition-colors duration-200 flex-shrink-0 ${
                  websiteSettings.maintenanceMode ? "bg-rose-500" : "bg-slate-300"
                }`}
              >
                <span
                  className={`block h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${
                    websiteSettings.maintenanceMode ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            {/* College Search */}
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3">
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-cyan-600" />
                <p className="text-sm font-medium text-slate-800">College Search Engine</p>
              </div>
              <select
                value={websiteSettings.collegeSearchProvider}
                onChange={(e) =>
                  setWebsiteSettings((prev) => ({ ...prev, collegeSearchProvider: e.target.value as "algolia" | "database" }))
                }
                className={inputClass}
              >
                <option value="algolia">Algolia Search</option>
                <option value="database">Database Search (Backup)</option>
              </select>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => switchCollegeSearchProvider("algolia")}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium border transition-colors ${
                    websiteSettings.collegeSearchProvider === "algolia"
                      ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                      : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  Use Algolia Now
                </button>
                <button
                  onClick={() => switchCollegeSearchProvider("database")}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium border transition-colors ${
                    websiteSettings.collegeSearchProvider === "database"
                      ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                      : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  Use Database Now
                </button>
                <button
                  onClick={() => reindexCollegesSearch()}
                  className="rounded-lg border border-dashed border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  Reindex to Algolia
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Announcement Center */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
          <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100 bg-gradient-to-r from-cyan-50 to-white">
            <div className="w-9 h-9 flex items-center justify-center rounded-xl bg-cyan-100 text-cyan-600">
              <Megaphone className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 text-sm">Announcement Center</h4>
              <p className="text-xs text-slate-500">Manage live website banners & alerts</p>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <span className="text-xs px-2 py-1 rounded-full bg-cyan-100 text-cyan-700 border border-cyan-200 font-medium">
                {activeAnnouncements} Active
              </span>
            </div>
          </div>

          <div className="p-5 space-y-4">
            <div className="flex gap-2">
              <input
                value={announcementInput}
                onChange={(e) => setAnnouncementInput(e.target.value)}
                className={inputClass}
                placeholder="Write a new announcement..."
                onKeyDown={(e) => e.key === "Enter" && addAnnouncement()}
              />
              <button
                onClick={() => addAnnouncement()}
                className="flex-shrink-0 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 transition-colors shadow-sm"
              >
                Post
              </button>
            </div>

            <div className="space-y-2 max-h-[320px] overflow-auto pr-1 scrollbar-thin scrollbar-thumb-slate-200">
              {websiteAnnouncements.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center">
                  <Bell className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  <p className="text-sm text-slate-500">No announcements yet. Post one above!</p>
                </div>
              ) : (
                websiteAnnouncements.map((announcement) => (
                  <div
                    key={announcement.id}
                    className={`rounded-xl border p-3 flex items-start justify-between gap-3 transition-colors ${
                      announcement.active ? "bg-emerald-50 border-emerald-200" : "bg-white border-slate-200"
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-slate-800 break-words">{announcement.text}</p>
                      <span
                        className={`inline-block mt-1 text-[11px] font-medium px-2 py-0.5 rounded-full ${
                          announcement.active
                            ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                            : "bg-slate-100 text-slate-500 border border-slate-200"
                        }`}
                      >
                        {announcement.active ? "● Live on site" : "○ Hidden"}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <button
                        onClick={() => toggleAnnouncement(announcement.id)}
                        className={`text-xs rounded-lg border px-2.5 py-1.5 font-medium transition-colors ${
                          announcement.active
                            ? "bg-white border-slate-300 text-slate-700 hover:bg-slate-50"
                            : "bg-emerald-600 border-emerald-600 text-white hover:bg-emerald-700"
                        }`}
                      >
                        {announcement.active ? "Hide" : "Show"}
                      </button>
                      <button
                        onClick={() =>
                          askConfirmation({
                            title: "Delete announcement",
                            description: "This announcement will be permanently removed.",
                            confirmLabel: "Delete",
                            confirmVariant: "destructive",
                            action: async () => { await removeAnnouncement(announcement.id); },
                          })
                        }
                        className="w-8 h-8 flex items-center justify-center rounded-lg border border-rose-200 bg-rose-50 text-rose-500 hover:bg-rose-100 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Footer & SEO Row ── */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
          <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100 bg-gradient-to-r from-violet-50 to-white">
            <div className="w-9 h-9 flex items-center justify-center rounded-xl bg-violet-100 text-violet-600">
              <Palette className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 text-sm">Footer & Contact</h4>
              <p className="text-xs text-slate-500">Customize footer content</p>
            </div>
          </div>
          <div className="p-5">
            <label className="block text-xs font-medium text-slate-600 mb-1">Footer Text</label>
            <input
              value={websiteSettings.footerText}
              onChange={(e) => setWebsiteSettings((prev) => ({ ...prev, footerText: e.target.value }))}
              className={inputClass}
              placeholder="© 2025 Your Company. All rights reserved."
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
          <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100 bg-gradient-to-r from-emerald-50 to-white">
            <div className="w-9 h-9 flex items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 text-sm">SEO Configuration</h4>
              <p className="text-xs text-slate-500">Meta title & description for search engines</p>
            </div>
          </div>
          <div className="p-5 space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">SEO Title</label>
              <input
                value={websiteSettings.seoTitle}
                onChange={(e) => setWebsiteSettings((prev) => ({ ...prev, seoTitle: e.target.value }))}
                className={inputClass}
                placeholder="My Awesome Website"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">SEO Description</label>
              <textarea
                value={websiteSettings.seoDescription}
                onChange={(e) => setWebsiteSettings((prev) => ({ ...prev, seoDescription: e.target.value }))}
                className={`min-h-[90px] ${inputClass}`}
                placeholder="A short description for search engine results..."
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Save Button ── */}
      <div className="flex justify-end pt-1">
        <button
          onClick={() => saveWebsiteManagement()}
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-sm font-semibold px-6 py-2.5 shadow-md shadow-indigo-200 transition-all duration-150"
        >
          <Save className="w-4 h-4" />
          Save Website Settings
        </button>
      </div>
    </div>
  );
}
