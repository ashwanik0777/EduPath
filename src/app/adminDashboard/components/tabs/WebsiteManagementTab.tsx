import { MonitorSmartphone, Settings2, Megaphone, Trash2, Palette, Globe, Save, BadgeDollarSign } from "lucide-react";

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
  pricing: {
    freeTier: {
      enabled: boolean;
      durationDays: number;
      maxAssessments: number;
      maxCounselingSessions: number;
      features: string[];
      alwaysFreeFeatures: string[];
    };
    monthlyPlan: {
      name: string;
      description: string;
      priceINR: number;
      priceUSD: number;
      features: string[];
    };
    yearlyPlan: {
      name: string;
      description: string;
      priceINR: number;
      priceUSD: number;
      features: string[];
    };
    singleCounselingPlan: {
      name: string;
      description: string;
      priceINR: number;
      priceUSD: number;
      durationMinutes: number;
      features: string[];
    };
    firstSubscriptionDiscount: number;
  };
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
  focusedWebsitePages,
  websiteSettings,
  setWebsiteSettings,
  websiteAnnouncements,
  announcementInput,
  setAnnouncementInput,
  inputClass,
  primaryButtonClass,
  activeTabSetter,
  pageIdToWebsiteTab,
  toggleWebsitePageStatus,
  addAnnouncement,
  toggleAnnouncement,
  askConfirmation,
  removeAnnouncement,
  reindexCollegesSearch,
  switchCollegeSearchProvider,
  saveWebsiteManagement,
}: WebsiteManagementTabProps) {
  const toLines = (items: string[]) => items.join("\n");
  const fromLines = (value: string) =>
    value
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

  return (
    <div className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-1 duration-300">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-xs text-slate-500 uppercase tracking-wide">Website Status</p>
          <p className={`text-xl font-bold mt-1 ${websiteSettings.maintenanceMode ? "text-rose-600" : "text-emerald-600"}`}>
            {websiteSettings.maintenanceMode ? "Maintenance" : "Live"}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-xs text-slate-500 uppercase tracking-wide">Announcements</p>
          <p className="text-xl font-bold mt-1 text-slate-900">{websiteAnnouncements.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-xs text-slate-500 uppercase tracking-wide">Active Alerts</p>
          <p className="text-xl font-bold mt-1 text-cyan-700">{websiteAnnouncements.filter((item) => item.active).length}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-xs text-slate-500 uppercase tracking-wide">Support Email</p>
          <p className="text-sm font-semibold mt-2 text-slate-900 truncate">{websiteSettings.supportEmail}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-xs text-slate-500 uppercase tracking-wide">College Search Engine</p>
          <p className="text-sm font-semibold mt-2 text-slate-900 capitalize">{websiteSettings.collegeSearchProvider}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h4 className="font-semibold text-slate-900">Website Pages Tabs</h4>
            <p className="text-sm text-slate-600">Har website page ka data yahin se edit/update karein. Yeh sab database se connected hai.</p>
          </div>
          <span className="text-xs px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700">
            Total Pages: {focusedWebsitePages.length}
          </span>
        </div>

        <div className="space-y-2">
          {focusedWebsitePages.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500">
              No website pages found.
            </div>
          ) : (
            focusedWebsitePages.map((page) => (
              <div key={page.id} className="rounded-xl border border-slate-200 p-3 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-slate-900">{page.name}</p>
                    <span
                      className={`text-[11px] px-2 py-0.5 rounded-full border ${
                        page.status === "published"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : "bg-amber-50 text-amber-700 border-amber-200"
                      }`}
                    >
                      {page.status === "published" ? "Published" : "Draft"}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Route: {page.route} • Records: {page.records} • Owner: {page.owner} • Updated: {new Date(page.lastUpdated).toLocaleString()}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleWebsitePageStatus(page.id)}
                    className="text-xs rounded-lg border border-slate-300 px-2.5 py-1.5 hover:bg-slate-50"
                  >
                    {page.status === "published" ? "Move to Draft" : "Publish"}
                  </button>
                  <button
                    onClick={() => activeTabSetter(pageIdToWebsiteTab[page.id] || "websiteManagement")}
                    className="text-xs rounded-lg bg-slate-900 text-white px-3 py-1.5 hover:bg-slate-800"
                  >
                    Open Details
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
          <div className="flex items-center gap-2 text-slate-900 font-semibold">
            <MonitorSmartphone className="w-4 h-4 text-indigo-600" />
            Homepage & Branding
          </div>

          <div>
            <label className="text-sm text-slate-600">Hero Title</label>
            <input
              value={websiteSettings.heroTitle}
              onChange={(event) => setWebsiteSettings((previous) => ({ ...previous, heroTitle: event.target.value }))}
              className={`mt-1 ${inputClass}`}
              placeholder="Homepage main title"
            />
          </div>

          <div>
            <label className="text-sm text-slate-600">Hero Subtitle</label>
            <textarea
              value={websiteSettings.heroSubtitle}
              onChange={(event) => setWebsiteSettings((previous) => ({ ...previous, heroSubtitle: event.target.value }))}
              className={`mt-1 min-h-[96px] ${inputClass}`}
              placeholder="Homepage subtitle"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="text-sm text-slate-600">Primary Color</label>
              <input
                type="color"
                value={websiteSettings.primaryColor}
                onChange={(event) => setWebsiteSettings((previous) => ({ ...previous, primaryColor: event.target.value }))}
                className="mt-1 h-10 w-full rounded-lg border border-slate-300"
              />
            </div>
            <div>
              <label className="text-sm text-slate-600">Support Email</label>
              <input
                value={websiteSettings.supportEmail}
                onChange={(event) => setWebsiteSettings((previous) => ({ ...previous, supportEmail: event.target.value }))}
                className={`mt-1 ${inputClass}`}
                placeholder="support@..."
              />
            </div>
          </div>

          <div className="flex items-center justify-between rounded-xl border border-slate-200 px-3 py-2">
            <div className="flex items-center gap-2 text-slate-700">
              <Settings2 className="w-4 h-4 text-rose-500" />
              Enable Maintenance Mode
            </div>
            <button
              onClick={() => setWebsiteSettings((previous) => ({ ...previous, maintenanceMode: !previous.maintenanceMode }))}
              className={`w-12 h-7 rounded-full p-1 transition-colors ${websiteSettings.maintenanceMode ? "bg-rose-500" : "bg-slate-300"}`}
            >
              <span className={`block h-5 w-5 rounded-full bg-white transition-transform ${websiteSettings.maintenanceMode ? "translate-x-5" : "translate-x-0"}`} />
            </button>
          </div>

          <div className="rounded-xl border border-slate-200 p-3 space-y-3">
            <div>
              <label className="text-sm text-slate-600">College Search Technique</label>
              <select
                value={websiteSettings.collegeSearchProvider}
                onChange={(event) =>
                  setWebsiteSettings((previous) => ({
                    ...previous,
                    collegeSearchProvider: event.target.value as "algolia" | "database",
                  }))
                }
                className={`mt-1 ${inputClass}`}
              >
                <option value="algolia">Algolia Search</option>
                <option value="database">Database Search (Backup)</option>
              </select>
             
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => switchCollegeSearchProvider("algolia")}
                className={`rounded-lg px-3 py-2 text-sm border transition-colors ${websiteSettings.collegeSearchProvider === "algolia" ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"}`}
              >
                Use Algolia Now
              </button>
              <button
                onClick={() => switchCollegeSearchProvider("database")}
                className={`rounded-lg px-3 py-2 text-sm border transition-colors ${websiteSettings.collegeSearchProvider === "database" ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"}`}
              >
                Use Database Now
              </button>
            </div>

            <button
              onClick={() => reindexCollegesSearch()}
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
            >
              Reindex Colleges to Algolia
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
          <div className="flex items-center gap-2 text-slate-900 font-semibold">
            <Megaphone className="w-4 h-4 text-cyan-600" />
            Announcement Center
          </div>

          <div className="flex gap-2">
            <input
              value={announcementInput}
              onChange={(event) => setAnnouncementInput(event.target.value)}
              className={inputClass}
              placeholder="Write new website announcement"
            />
            <button onClick={() => addAnnouncement()} className={primaryButtonClass}>Add</button>
          </div>

          <div className="space-y-2 max-h-[280px] overflow-auto pr-1">
            {websiteAnnouncements.length === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500">
                No announcements added yet.
              </div>
            ) : (
              websiteAnnouncements.map((announcement) => (
                <div key={announcement.id} className="rounded-xl border border-slate-200 p-3 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm text-slate-800">{announcement.text}</p>
                    <p className={`text-xs mt-1 ${announcement.active ? "text-emerald-600" : "text-slate-500"}`}>
                      {announcement.active ? "Active on website" : "Hidden"}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleAnnouncement(announcement.id)}
                      className="text-xs rounded-lg border border-slate-300 px-2 py-1 hover:bg-slate-50"
                    >
                      {announcement.active ? "Hide" : "Show"}
                    </button>
                    <button
                      onClick={() =>
                        askConfirmation({
                          title: "Delete announcement",
                          description: "This announcement will be removed from website management.",
                          confirmLabel: "Delete",
                          confirmVariant: "destructive",
                          action: async () => {
                            await removeAnnouncement(announcement.id);
                          },
                        })
                      }
                      className="text-rose-600 hover:text-rose-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-slate-900 font-semibold">
              <BadgeDollarSign className="w-4 h-4 text-emerald-600" />
              Pricing, Subscription & Free-Tier Management
            </div>
            
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 p-4 space-y-4 bg-slate-50/60">
          <div className="flex items-center justify-between">
            <p className="font-medium text-slate-900">Limited Free Tier</p>
            <button
              onClick={() =>
                setWebsiteSettings((previous) => ({
                  ...previous,
                  pricing: {
                    ...previous.pricing,
                    freeTier: {
                      ...previous.pricing.freeTier,
                      enabled: !previous.pricing.freeTier.enabled,
                    },
                  },
                }))
              }
              className={`w-12 h-7 rounded-full p-1 transition-colors ${websiteSettings.pricing.freeTier.enabled ? "bg-emerald-500" : "bg-slate-300"}`}
            >
              <span className={`block h-5 w-5 rounded-full bg-white transition-transform ${websiteSettings.pricing.freeTier.enabled ? "translate-x-5" : "translate-x-0"}`} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="text-sm text-slate-600">Free Tier Duration (days)</label>
              <input
                type="number"
                min={0}
                value={websiteSettings.pricing.freeTier.durationDays}
                onChange={(event) =>
                  setWebsiteSettings((previous) => ({
                    ...previous,
                    pricing: {
                      ...previous.pricing,
                      freeTier: {
                        ...previous.pricing.freeTier,
                        durationDays: Number(event.target.value) || 0,
                      },
                    },
                  }))
                }
                className={`mt-1 ${inputClass}`}
              />
            </div>
            <div>
              <label className="text-sm text-slate-600">Max Assessments</label>
              <input
                type="number"
                min={0}
                value={websiteSettings.pricing.freeTier.maxAssessments}
                onChange={(event) =>
                  setWebsiteSettings((previous) => ({
                    ...previous,
                    pricing: {
                      ...previous.pricing,
                      freeTier: {
                        ...previous.pricing.freeTier,
                        maxAssessments: Number(event.target.value) || 0,
                      },
                    },
                  }))
                }
                className={`mt-1 ${inputClass}`}
              />
            </div>
            <div>
              <label className="text-sm text-slate-600">Max Counseling Sessions</label>
              <input
                type="number"
                min={0}
                value={websiteSettings.pricing.freeTier.maxCounselingSessions}
                onChange={(event) =>
                  setWebsiteSettings((previous) => ({
                    ...previous,
                    pricing: {
                      ...previous.pricing,
                      freeTier: {
                        ...previous.pricing.freeTier,
                        maxCounselingSessions: Number(event.target.value) || 0,
                      },
                    },
                  }))
                }
                className={`mt-1 ${inputClass}`}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
            <div>
              <label className="text-sm text-slate-600">Limited Free Tier Features (one per line)</label>
              <textarea
                value={toLines(websiteSettings.pricing.freeTier.features)}
                onChange={(event) =>
                  setWebsiteSettings((previous) => ({
                    ...previous,
                    pricing: {
                      ...previous.pricing,
                      freeTier: {
                        ...previous.pricing.freeTier,
                        features: fromLines(event.target.value),
                      },
                    },
                  }))
                }
                className={`mt-1 min-h-[110px] ${inputClass}`}
              />
            </div>
            <div>
              <label className="text-sm text-slate-600">Completely Free Features (always free)</label>
              <textarea
                value={toLines(websiteSettings.pricing.freeTier.alwaysFreeFeatures)}
                onChange={(event) =>
                  setWebsiteSettings((previous) => ({
                    ...previous,
                    pricing: {
                      ...previous.pricing,
                      freeTier: {
                        ...previous.pricing.freeTier,
                        alwaysFreeFeatures: fromLines(event.target.value),
                      },
                    },
                  }))
                }
                className={`mt-1 min-h-[110px] ${inputClass}`}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          {[
            { key: "monthlyPlan", title: "Monthly Subscription" },
            { key: "yearlyPlan", title: "Yearly Subscription" },
            { key: "singleCounselingPlan", title: "Single Counseling" },
          ].map((planItem) => {
            const plan = websiteSettings.pricing[planItem.key as "monthlyPlan" | "yearlyPlan" | "singleCounselingPlan"];
            const isSingle = planItem.key === "singleCounselingPlan";
            return (
              <div key={planItem.key} className="rounded-xl border border-slate-200 p-4 space-y-3">
                <p className="font-medium text-slate-900">{planItem.title}</p>
                <div>
                  <label className="text-sm text-slate-600">Plan Name</label>
                  <input
                    value={plan.name}
                    onChange={(event) =>
                      setWebsiteSettings((previous) => ({
                        ...previous,
                        pricing: {
                          ...previous.pricing,
                          [planItem.key]: {
                            ...previous.pricing[planItem.key as "monthlyPlan" | "yearlyPlan" | "singleCounselingPlan"],
                            name: event.target.value,
                          },
                        },
                      }))
                    }
                    className={`mt-1 ${inputClass}`}
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-600">Description</label>
                  <textarea
                    value={plan.description}
                    onChange={(event) =>
                      setWebsiteSettings((previous) => ({
                        ...previous,
                        pricing: {
                          ...previous.pricing,
                          [planItem.key]: {
                            ...previous.pricing[planItem.key as "monthlyPlan" | "yearlyPlan" | "singleCounselingPlan"],
                            description: event.target.value,
                          },
                        },
                      }))
                    }
                    className={`mt-1 min-h-[80px] ${inputClass}`}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm text-slate-600">Price (₹)</label>
                    <input
                      type="number"
                      min={0}
                      value={plan.priceINR}
                      onChange={(event) =>
                        setWebsiteSettings((previous) => ({
                          ...previous,
                          pricing: {
                            ...previous.pricing,
                            [planItem.key]: {
                              ...previous.pricing[planItem.key as "monthlyPlan" | "yearlyPlan" | "singleCounselingPlan"],
                              priceINR: Number(event.target.value) || 0,
                            },
                          },
                        }))
                      }
                      className={`mt-1 ${inputClass}`}
                    />
                  </div>
                  <div>
                    <label className="text-sm text-slate-600">Price ($)</label>
                    <input
                      type="number"
                      min={0}
                      value={plan.priceUSD}
                      onChange={(event) =>
                        setWebsiteSettings((previous) => ({
                          ...previous,
                          pricing: {
                            ...previous.pricing,
                            [planItem.key]: {
                              ...previous.pricing[planItem.key as "monthlyPlan" | "yearlyPlan" | "singleCounselingPlan"],
                              priceUSD: Number(event.target.value) || 0,
                            },
                          },
                        }))
                      }
                      className={`mt-1 ${inputClass}`}
                    />
                  </div>
                </div>

                {isSingle ? (
                  <div>
                    <label className="text-sm text-slate-600">Session Duration (minutes)</label>
                    <input
                      type="number"
                      min={15}
                      value={(plan as WebsiteSettings["pricing"]["singleCounselingPlan"]).durationMinutes}
                      onChange={(event) =>
                        setWebsiteSettings((previous) => ({
                          ...previous,
                          pricing: {
                            ...previous.pricing,
                            singleCounselingPlan: {
                              ...previous.pricing.singleCounselingPlan,
                              durationMinutes: Number(event.target.value) || 45,
                            },
                          },
                        }))
                      }
                      className={`mt-1 ${inputClass}`}
                    />
                  </div>
                ) : null}

                <div>
                  <label className="text-sm text-slate-600">Plan Features (one per line)</label>
                  <textarea
                    value={toLines(plan.features)}
                    onChange={(event) =>
                      setWebsiteSettings((previous) => ({
                        ...previous,
                        pricing: {
                          ...previous.pricing,
                          [planItem.key]: {
                            ...previous.pricing[planItem.key as "monthlyPlan" | "yearlyPlan" | "singleCounselingPlan"],
                            features: fromLines(event.target.value),
                          },
                        },
                      }))
                    }
                    className={`mt-1 min-h-[90px] ${inputClass}`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="rounded-xl border border-slate-200 p-4 bg-amber-50/70">
          <p className="text-sm font-medium text-amber-800">First Subscription Discount </p>
         
          <div className="mt-3 inline-flex items-center rounded-full bg-white border border-amber-200 text-amber-800 px-3 py-1 text-sm font-semibold">
            {websiteSettings.pricing.firstSubscriptionDiscount}% OFF (Fixed)
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
          <div className="flex items-center gap-2 text-slate-900 font-semibold">
            <Palette className="w-4 h-4 text-violet-600" />
            Footer & Contact Settings
          </div>
          <div>
            <label className="text-sm text-slate-600">Footer Text</label>
            <input
              value={websiteSettings.footerText}
              onChange={(event) => setWebsiteSettings((previous) => ({ ...previous, footerText: event.target.value }))}
              className={`mt-1 ${inputClass}`}
            />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
          <div className="flex items-center gap-2 text-slate-900 font-semibold">
            <Globe className="w-4 h-4 text-emerald-600" />
            SEO Configuration
          </div>
          <div>
            <label className="text-sm text-slate-600">SEO Title</label>
            <input
              value={websiteSettings.seoTitle}
              onChange={(event) => setWebsiteSettings((previous) => ({ ...previous, seoTitle: event.target.value }))}
              className={`mt-1 ${inputClass}`}
            />
          </div>
          <div>
            <label className="text-sm text-slate-600">SEO Description</label>
            <textarea
              value={websiteSettings.seoDescription}
              onChange={(event) => setWebsiteSettings((previous) => ({ ...previous, seoDescription: event.target.value }))}
              className={`mt-1 min-h-[90px] ${inputClass}`}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button onClick={() => saveWebsiteManagement()} className={primaryButtonClass}>
          <Save className="w-4 h-4" /> Save Website Settings
        </button>
      </div>
    </div>
  );
}
