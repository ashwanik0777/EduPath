"use client";

import React from "react";
import { Sidebar } from "@/app/components/Sidebar";
import { tabsMeta, menuItems } from "./components/constants";
import {
  CounselorFeedbackResponse,
  CounselorOverview,
  CounselorProfileResponse,
  CounselorPsychometricResponse,
  CounselorResourcesResponse,
  CounselorStudentsResponse,
  CounselorTab,
  MeResponse,
  ProfileDraft,
  RecommendationItem,
  SessionItem,
  SessionsResponse,
} from "./components/types";
import { DashboardHeader } from "./components/shared/DashboardHeader";
import { OverviewTab } from "./components/tabs/OverviewTab";
import { SessionsTab } from "./components/tabs/SessionsTab";
import { StudentsTab } from "./components/tabs/StudentsTab";
import { MessagesTab } from "./components/tabs/MessagesTab";
import { ProfileTab } from "./components/tabs/ProfileTab";
import { ProgressTrackerTab } from "./components/tabs/ProgressTrackerTab";
import { PsychometricTab } from "./components/tabs/PsychometricTab";
import { GovernmentCollegesTab } from "./components/tabs/GovernmentCollegesTab";
import { ShortListedCollegesTab } from "./components/tabs/ShortListedCollegesTab";
import { CareerOptionsTab } from "./components/tabs/CareerOptionsTab";
import { CounselingBookingTab } from "./components/tabs/CounselingBookingTab";
import { CompetitiveExamsTab } from "./components/tabs/CompetitiveExamsTab";
import { ScholarshipsTab } from "./components/tabs/ScholarshipsTab";
import { FeedbackSuggestionsTab } from "./components/tabs/FeedbackSuggestionsTab";

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

export default function CounselorDashboardPage() {
  const [activeTab, setActiveTab] = React.useState<CounselorTab>("overview");
  const [loading, setLoading] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState("");

  const [name, setName] = React.useState("Counselor");
  const [role, setRole] = React.useState("Counselor");
  const [profileImage, setProfileImage] = React.useState<string | undefined>(undefined);

  const [overview, setOverview] = React.useState<CounselorOverview["data"] | null>(null);
  const [sessions, setSessions] = React.useState<SessionItem[]>([]);
  const [allSessions, setAllSessions] = React.useState<SessionItem[]>([]);
  const [resources, setResources] = React.useState<CounselorResourcesResponse["data"] | null>(null);
  const [psychometric, setPsychometric] = React.useState<CounselorPsychometricResponse["data"] | null>(null);
  const [feedbackItems, setFeedbackItems] = React.useState<CounselorFeedbackResponse["data"]>([]);
  const [students, setStudents] = React.useState<CounselorStudentsResponse["data"]>([]);

  const [sessionFilter, setSessionFilter] = React.useState<"All" | SessionItem["status"]>("All");
  const [resourceSearch, setResourceSearch] = React.useState("");
  const [studentSearch, setStudentSearch] = React.useState("");
  const [sessionNotesDraft, setSessionNotesDraft] = React.useState<Record<string, string>>({});

  const [profileDraft, setProfileDraft] = React.useState<ProfileDraft>({
    name: "",
    email: "",
    phone: "",
    profileImage: "",
    bio: "",
    displayName: "",
    specializationsText: "",
    languagesText: "",
    availability: {
      timezone: "Asia/Kolkata",
      start: "09:00",
      end: "18:00",
      workingDaysText: "Monday, Tuesday, Wednesday, Thursday, Friday",
      isAvailable: true,
    },
  });

  const [feedbackDraft, setFeedbackDraft] = React.useState({
    message: "",
    suggestionCategory: "General",
  });

  const panelClass = "bg-white/90 backdrop-blur rounded-2xl border border-slate-200 shadow-sm";
  const inputClass =
    "w-full border border-slate-300 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400";
  const primaryButtonClass =
    "inline-flex items-center gap-2 rounded-xl bg-slate-900 text-white px-4 py-2.5 text-sm font-medium hover:bg-slate-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed";
  const secondaryButtonClass =
    "inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors";

  const loadOverview = async () => {
    const result = await fetchJson<CounselorOverview>("/api/counselor/overview");
    setOverview(result.data);
  };

  const loadSessions = async (status: string = "All") => {
    const query = status !== "All" ? `?status=${encodeURIComponent(status)}` : "";
    const result = await fetchJson<SessionsResponse>(`/api/counselor/sessions${query}`);
    setSessions(result.data || []);
  };

  const loadAllSessions = async () => {
    const result = await fetchJson<SessionsResponse>("/api/counselor/sessions");
    setAllSessions(result.data || []);
  };

  const loadResources = async (query = "") => {
    const q = query.trim() ? `?q=${encodeURIComponent(query.trim())}` : "";
    const result = await fetchJson<CounselorResourcesResponse>(`/api/counselor/resources${q}`);
    setResources(result.data);
  };

  const loadPsychometric = async () => {
    const result = await fetchJson<CounselorPsychometricResponse>("/api/counselor/psychometric");
    setPsychometric(result.data);
  };

  const loadFeedback = async () => {
    const result = await fetchJson<CounselorFeedbackResponse>("/api/counselor/feedback");
    setFeedbackItems(result.data || []);
  };

  const loadStudents = async (query = "") => {
    const q = query.trim() ? `?q=${encodeURIComponent(query.trim())}` : "";
    const result = await fetchJson<CounselorStudentsResponse>(`/api/counselor/students${q}`);
    setStudents(result.data || []);
  };

  const loadProfile = async () => {
    const result = await fetchJson<CounselorProfileResponse>("/api/counselor/profile");
    const data = result.data;

    setProfileDraft({
      name: data.name || "",
      email: data.email || "",
      phone: data.phone || "",
      profileImage: data.profileImage || "",
      bio: data.bio || "",
      displayName: data.displayName || data.name || "",
      specializationsText: (data.specializations || []).join(", "),
      languagesText: (data.languages || []).join(", "),
      availability: {
        timezone: data.availability?.timezone || "Asia/Kolkata",
        start: data.availability?.start || "09:00",
        end: data.availability?.end || "18:00",
        workingDaysText: (data.availability?.workingDays || []).join(", "),
        isAvailable: data.availability?.isAvailable ?? true,
      },
    });
  };

  const loadIdentity = async () => {
    const me = await fetchJson<MeResponse>("/api/auth/me");
    if (me.success && me.user) {
      setName(me.user.name || "Counselor");
      setRole(me.user.role === "counselor" ? "Counselor" : me.user.role || "Counselor");
      setProfileImage(me.user.profile?.profileImage);
    }
  };

  const loadAll = async () => {
    setError("");
    setLoading(true);
    try {
      await Promise.all([
        loadIdentity(),
        loadOverview(),
        loadSessions(sessionFilter),
        loadAllSessions(),
        loadResources(),
        loadPsychometric(),
        loadFeedback(),
        loadStudents(),
        loadProfile(),
      ]);
    } catch {
      setError("Failed to load counselor dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    loadAll();
  }, []);

  const refreshAll = async () => {
    setRefreshing(true);
    setError("");
    try {
      await Promise.all([
        loadOverview(),
        loadSessions(sessionFilter),
        loadAllSessions(),
        loadResources(resourceSearch),
        loadPsychometric(),
        loadFeedback(),
        loadStudents(studentSearch),
      ]);
    } catch {
      setError("Refresh failed.");
    } finally {
      setRefreshing(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    } finally {
      window.location.href = "/login";
    }
  };

  const saveProfile = async () => {
    setSaving(true);
    setError("");
    try {
      await fetchJson("/api/counselor/profile", {
        method: "PATCH",
        body: JSON.stringify({
          name: profileDraft.name,
          phone: profileDraft.phone,
          profileImage: profileDraft.profileImage,
          bio: profileDraft.bio,
          displayName: profileDraft.displayName,
          specializations: profileDraft.specializationsText
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
          languages: profileDraft.languagesText
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
          availability: {
            timezone: profileDraft.availability.timezone,
            start: profileDraft.availability.start,
            end: profileDraft.availability.end,
            workingDays: profileDraft.availability.workingDaysText
              .split(",")
              .map((item) => item.trim())
              .filter(Boolean),
            isAvailable: profileDraft.availability.isAvailable,
          },
        }),
      });
      await Promise.all([loadProfile(), loadOverview(), loadIdentity()]);
    } catch {
      setError("Could not save profile.");
    } finally {
      setSaving(false);
    }
  };

  const updateSessionStatus = async (sessionId: string, status: SessionItem["status"]) => {
    setSaving(true);
    setError("");
    try {
      await fetchJson("/api/counselor/sessions", {
        method: "PATCH",
        body: JSON.stringify({
          sessionId,
          status,
          counselorNotes: sessionNotesDraft[sessionId] || "",
        }),
      });
      await Promise.all([loadSessions(sessionFilter), loadAllSessions(), loadOverview()]);
    } catch {
      setError("Could not update session status.");
    } finally {
      setSaving(false);
    }
  };

  const submitFeedback = async () => {
    if (!feedbackDraft.message.trim()) {
      setError("Please write a feedback/suggestion message.");
      return;
    }

    setSaving(true);
    setError("");
    try {
      await fetchJson("/api/counselor/feedback", {
        method: "POST",
        body: JSON.stringify(feedbackDraft),
      });
      setFeedbackDraft({ message: "", suggestionCategory: "General" });
      await loadFeedback();
    } catch {
      setError("Could not submit feedback.");
    } finally {
      setSaving(false);
    }
  };

  const overviewInsights = React.useMemo(() => {
    const totalSessions = allSessions.length;
    const completedCount = allSessions.filter((session) => session.status === "completed").length;
    const activeCount = allSessions.filter((session) => session.status === "scheduled" || session.status === "in-progress").length;
    const cancelledOrNoShowCount = allSessions.filter(
      (session) => session.status === "cancelled" || session.status === "no-show",
    ).length;

    const completionRate = totalSessions > 0 ? Math.round((completedCount / totalSessions) * 100) : 0;
    const avgDuration =
      totalSessions > 0
        ? Math.round(allSessions.reduce((sum, session) => sum + (session.duration || 0), 0) / totalSessions)
        : 0;

    const now = new Date();
    const nextSession = allSessions
      .filter((session) => new Date(session.scheduledAt) >= now && (session.status === "scheduled" || session.status === "in-progress"))
      .sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime())[0];

    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const todayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

    const todayTimeline = allSessions
      .filter((session) => {
        const scheduledAt = new Date(session.scheduledAt);
        return scheduledAt >= todayStart && scheduledAt < todayEnd;
      })
      .sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime());

    const weekBuckets = Array.from({ length: 8 }).map((_, i) => {
      const weekStart = new Date();
      weekStart.setDate(weekStart.getDate() - (7 * (7 - i)));
      weekStart.setHours(0, 0, 0, 0);
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekEnd.getDate() + 7);

      const count = allSessions.filter((session) => {
        const date = new Date(session.scheduledAt);
        return date >= weekStart && date < weekEnd;
      }).length;

      return {
        label: `${weekStart.getDate()}/${weekStart.getMonth() + 1}`,
        count,
      };
    });

    return {
      totalSessions,
      completedCount,
      activeCount,
      cancelledOrNoShowCount,
      completionRate,
      avgDuration,
      nextSession,
      todayTimeline,
      weekBuckets,
    };
  }, [allSessions]);

  const shortListedRecommendations = React.useMemo<RecommendationItem[]>(() => {
    const colleges = resources?.colleges || [];
    return colleges
      .slice(0, 8)
      .map((college, index) => ({
        id: college._id,
        name: String(college.name || "College"),
        location: `${String((college as any)?.location?.city || "-")} • ${String((college as any)?.location?.state || "-")}`,
        score: Math.max(55, 92 - index * 4),
        type: String(college.type || "-"),
      }));
  }, [resources]);

  const renderActiveTab = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewTab panelClass={panelClass} name={name} overview={overview} overviewInsights={overviewInsights} />;
      case "sessions":
        return (
          <SessionsTab
            panelClass={panelClass}
            sessions={sessions}
            sessionFilter={sessionFilter}
            sessionNotesDraft={sessionNotesDraft}
            setSessionFilter={setSessionFilter}
            loadSessions={loadSessions}
            updateSessionStatus={updateSessionStatus}
            setSessionNotesDraft={setSessionNotesDraft}
          />
        );
      case "students":
        return (
          <StudentsTab
            panelClass={panelClass}
            inputClass={inputClass}
            secondaryButtonClass={secondaryButtonClass}
            students={students}
            studentSearch={studentSearch}
            setStudentSearch={setStudentSearch}
            loadStudents={loadStudents}
          />
        );
      case "messages":
        return <MessagesTab panelClass={panelClass} allSessions={allSessions} />;
      case "profile":
        return (
          <ProfileTab
            panelClass={panelClass}
            inputClass={inputClass}
            primaryButtonClass={primaryButtonClass}
            profileDraft={profileDraft}
            setProfileDraft={setProfileDraft}
            saveProfile={saveProfile}
            saving={saving}
          />
        );
      case "progressTracker":
        return <ProgressTrackerTab panelClass={panelClass} overviewInsights={overviewInsights} />;
      case "psychometricTest":
        return <PsychometricTab panelClass={panelClass} psychometric={psychometric} />;
      case "govCollege":
        return (
          <GovernmentCollegesTab
            panelClass={panelClass}
            inputClass={inputClass}
            primaryButtonClass={primaryButtonClass}
            secondaryButtonClass={secondaryButtonClass}
            resources={resources}
            resourceSearch={resourceSearch}
            setResourceSearch={setResourceSearch}
            loadResources={loadResources}
          />
        );
      case "shortListedColleges":
        return <ShortListedCollegesTab panelClass={panelClass} shortListedRecommendations={shortListedRecommendations} />;
      case "carrerOption":
        return <CareerOptionsTab panelClass={panelClass} resources={resources} />;
      case "counselingBooking":
        return <CounselingBookingTab panelClass={panelClass} allSessions={allSessions} />;
      case "competitiveExams":
        return <CompetitiveExamsTab panelClass={panelClass} resources={resources} />;
      case "scholarships":
        return <ScholarshipsTab panelClass={panelClass} resources={resources} />;
      case "feedback&Suggestions":
        return (
          <FeedbackSuggestionsTab
            panelClass={panelClass}
            inputClass={inputClass}
            primaryButtonClass={primaryButtonClass}
            saving={saving}
            feedbackDraft={feedbackDraft}
            setFeedbackDraft={setFeedbackDraft}
            submitFeedback={submitFeedback}
            feedbackItems={feedbackItems}
          />
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-slate-300 border-t-slate-800 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-[radial-gradient(circle_at_top_right,_#e0e7ff_0%,_#f8fafc_38%,_#ffffff_65%)]">
      <div className="h-screen min-h-screen sticky top-0 left-0 z-20">
        <Sidebar
          menuItems={menuItems}
          activePage={activeTab}
          onPageChange={(id) => setActiveTab(id as CounselorTab)}
          userInfo={{ name, role, profileImage }}
          onLogout={handleLogout}
          onProfileClick={() => setActiveTab("profile")}
        />
      </div>

      <main className="flex-1 h-screen min-h-screen overflow-y-auto p-4 md:p-8">
        <DashboardHeader
          title={tabsMeta[activeTab].title}
          subtitle={tabsMeta[activeTab].subtitle}
          refreshing={refreshing}
          secondaryButtonClass={secondaryButtonClass}
          onRefresh={refreshAll}
        />

        {error ? (
          <div className="mb-6 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-rose-700 text-sm">{error}</div>
        ) : null}

        {renderActiveTab()}
      </main>
    </div>
  );
}
