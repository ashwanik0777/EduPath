"use client";

import React from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Calendar,
  Users,
  MessageSquare,
  Clock,
  Sparkles,
  RefreshCw,
  Video,
  Phone,
  MapPin,
  CheckCircle2,
  UserCircle2,
  Star,
  GraduationCap,
  Award,
  Target,
  Briefcase,
  Activity,
  BarChart3,
  Timer,
  BadgeCheck,
  AlertTriangle,
  Save,
  Search,
  ShieldCheck,
  BookOpen,
  Send,
  ArrowUpRight,
} from "lucide-react";
import { Sidebar, MenuItem } from "@/app/components/Sidebar";

type CoreCounselorTab = "overview" | "sessions" | "students" | "messages";
type ExtendedCounselorTab =
  | "profile"
  | "progressTracker"
  | "psychometricTest"
  | "govCollege"
  | "shortListedColleges"
  | "carrerOption"
  | "counselingBooking"
  | "competitiveExams"
  | "scholarships"
  | "feedback&Suggestions";

type CounselorTab = CoreCounselorTab | ExtendedCounselorTab;

type MeResponse = {
  success: boolean;
  user?: {
    name?: string;
    email?: string;
    role?: "student" | "counselor" | "admin";
    profile?: {
      profileImage?: string;
    };
  };
};

type SessionItem = {
  _id: string;
  studentId?: string;
  type: string;
  scheduledAt: string;
  duration: number;
  status: "scheduled" | "in-progress" | "completed" | "cancelled" | "no-show";
  studentName: string;
  studentEmail: string;
  platform: string;
  location?: string;
  counselorNotes?: string;
  actionItems?: string[];
};

type CounselorStudentItem = {
  studentId: string;
  name: string;
  email: string;
  profileImage?: string;
  totalSessions: number;
  completedSessions: number;
  upcomingSessions: number;
  completionRate: number;
  lastSessionAt: string | null;
};

type CounselorStudentsResponse = {
  success: boolean;
  data: CounselorStudentItem[];
};

type CounselorOverview = {
  success: boolean;
  data: {
    counselorProfile: {
      displayName: string;
      bio: string;
      profileImage?: string;
      specializations: string[];
      languages: string[];
      rating: number;
    } | null;
    counters: {
      todaySessions: number;
      upcomingSessions: number;
      completedSessions: number;
      totalStudents: number;
    };
    recentSessions: SessionItem[];
  };
};

type SessionsResponse = {
  success: boolean;
  data: SessionItem[];
};

type CounselorProfileResponse = {
  success: boolean;
  data: {
    name: string;
    email: string;
    phone: string;
    profileImage: string;
    bio: string;
    displayName: string;
    specializations: string[];
    languages: string[];
    availability: {
      timezone: string;
      start: string;
      end: string;
      workingDays: string[];
      isAvailable: boolean;
    };
  };
};

type ResourceItem = Record<string, unknown> & { _id: string };

type CounselorResourcesResponse = {
  success: boolean;
  data: {
    colleges: ResourceItem[];
    careers: ResourceItem[];
    exams: ResourceItem[];
    scholarships: ResourceItem[];
    counters: {
      colleges: number;
      careers: number;
      exams: number;
      scholarships: number;
    };
  };
};

type CounselorPsychometricResponse = {
  success: boolean;
  data: {
    totalAttempts: number;
    studentsCovered: number;
    averageScore: number;
    topCategories: Array<{ category: string; average: number; attempts: number }>;
    recentResults: Array<{
      id: string;
      studentName: string;
      assessmentTitle: string;
      score: number;
      completedAt: string;
    }>;
  };
};

type CounselorFeedbackItem = {
  _id: string;
  type: string;
  message: string;
  status: "Pending" | "Reviewed" | "Responded";
  suggestionCategory?: string;
  submitted_on?: string;
};

type CounselorFeedbackResponse = {
  success: boolean;
  data: CounselorFeedbackItem[];
};

type ProfileDraft = {
  name: string;
  email: string;
  phone: string;
  profileImage: string;
  bio: string;
  displayName: string;
  specializationsText: string;
  languagesText: string;
  availability: {
    timezone: string;
    start: string;
    end: string;
    workingDaysText: string;
    isAvailable: boolean;
  };
};

const tabsMeta: Record<CounselorTab, { title: string; subtitle: string }> = {
  overview: { title: "Counselor Dashboard", subtitle: "Live operational overview for counseling workflows" },
  sessions: { title: "Sessions", subtitle: "Manage every counseling session in one place" },
  students: { title: "Students", subtitle: "Track engagement and follow-up readiness" },
  messages: { title: "Messages", subtitle: "Student communication and follow-up templates" },
  profile: { title: "Profile", subtitle: "Update counselor profile and availability" },
  progressTracker: { title: "Progress Tracker", subtitle: "Performance trends and completion metrics" },
  psychometricTest: { title: "Psychometric Insights", subtitle: "Assessment trends for your guided students" },
  govCollege: { title: "Government Colleges", subtitle: "Reference government college opportunities" },
  shortListedColleges: { title: "Short Listed Colleges", subtitle: "High-priority shortlist recommendations" },
  carrerOption: { title: "Career Options", subtitle: "Curated career pathways for counseling" },
  counselingBooking: { title: "Counseling Booking", subtitle: "Operational board for upcoming and active bookings" },
  competitiveExams: { title: "Competitive Exams", subtitle: "Exam advisory references and eligibility signals" },
  scholarships: { title: "Scholarships", subtitle: "Scholarship opportunities for student guidance" },
  "feedback&Suggestions": { title: "Feedback & Suggestions", subtitle: "Share platform improvement suggestions" },
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

function getPlatformIcon(platform: string) {
  if (platform === "zoom" || platform === "google-meet" || platform === "video") return Video;
  if (platform === "phone" || platform === "audio") return Phone;
  return MapPin;
}

function formatStatus(status: string) {
  return status.replace("-", " ");
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
  const [feedbackItems, setFeedbackItems] = React.useState<CounselorFeedbackItem[]>([]);
  const [students, setStudents] = React.useState<CounselorStudentItem[]>([]);

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

  const panelClass =
    "bg-white/90 backdrop-blur rounded-2xl border border-slate-200 shadow-sm";
  const inputClass =
    "w-full border border-slate-300 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400";
  const primaryButtonClass =
    "inline-flex items-center gap-2 rounded-xl bg-slate-900 text-white px-4 py-2.5 text-sm font-medium hover:bg-slate-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed";
  const secondaryButtonClass =
    "inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors";

  const menuItems: MenuItem[] = [
    { id: "overview", label: "Overview", icon: LayoutDashboard, color: "text-indigo-500" },
    {
      id: "sessionOpsGroup",
      label: "Session Operations",
      icon: Calendar,
      color: "text-blue-500",
      children: [
        { id: "sessions", label: "Sessions", icon: Calendar, color: "text-blue-500" },
        { id: "counselingBooking", label: "Counseling Booking", icon: Clock, color: "text-cyan-500" },
        { id: "messages", label: "Messages", icon: MessageSquare, color: "text-cyan-500" },
      ],
    },
    {
      id: "studentGuidanceGroup",
      label: "Student Guidance",
      icon: Users,
      color: "text-emerald-500",
      children: [
        { id: "students", label: "Students", icon: Users, color: "text-emerald-500" },
        { id: "progressTracker", label: "Progress Tracker", icon: RefreshCw, color: "text-rose-500" },
        { id: "psychometricTest", label: "Psychometric Test", icon: Target, color: "text-purple-500" },
        { id: "shortListedColleges", label: "Short Listed Colleges", icon: GraduationCap, color: "text-teal-500" },
        { id: "carrerOption", label: "Career Options", icon: Briefcase, color: "text-emerald-500" },
      ],
    },
    {
      id: "govOpportunityGroup",
      label: "Gov & Opportunities",
      icon: GraduationCap,
      color: "text-blue-500",
      children: [
        { id: "govCollege", label: "Government Colleges", icon: GraduationCap, color: "text-blue-500" },
        { id: "scholarships", label: "Scholarships", icon: Award, color: "text-yellow-500" },
        { id: "competitiveExams", label: "Competitive Exams", icon: Award, color: "text-orange-500" },
      ],
    },
    {
      id: "qualityGroup",
      label: "Quality & Feedback",
      icon: MessageSquare,
      color: "text-violet-500",
      children: [
        { id: "profile", label: "Profile", icon: UserCircle2, color: "text-violet-500" },
        { id: "feedback&Suggestions", label: "Feedback & Suggestions", icon: MessageSquare, color: "text-violet-500" },
      ],
    },
  ];

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

  const studentInsights = React.useMemo(() => {
    return students;
  }, [students]);

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

  const shortListedRecommendations = React.useMemo(() => {
    const colleges = resources?.colleges || [];
    return colleges
      .slice(0, 8)
      .map((college, index) => ({
        id: college._id,
        name: String(college.name || "College"),
        location: `${String((college as any)?.location?.city || "-")} • ${String((college as any)?.location?.state || "-")}`,
        score: Math.max(55, 92 - index * 4),
        type: String(college.type || "-")
      }));
  }, [resources]);

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
        <div className="rounded-2xl border border-slate-200 bg-white/90 backdrop-blur shadow-sm p-5 mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-600 to-cyan-600 text-white flex items-center justify-center shadow-md">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">{tabsMeta[activeTab].title}</h2>
              <p className="text-slate-600">{tabsMeta[activeTab].subtitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden md:inline-flex text-xs px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
              Counselor-only access
            </span>
            <button onClick={refreshAll} className={secondaryButtonClass}>
              <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
              Refresh
            </button>
          </div>
        </div>

        {error ? (
          <div className="mb-6 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-rose-700 text-sm">{error}</div>
        ) : null}

        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-indigo-700 via-blue-700 to-cyan-700 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10" />
              <div className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full bg-white/10" />
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                  <p className="text-sm text-indigo-100">Counseling Command Center</p>
                  <h2 className="text-2xl font-bold mt-1">Welcome back, {overview?.counselorProfile?.displayName || name}</h2>
                  <p className="text-indigo-100 mt-2 text-sm">Secure workspace for sessions, students, and performance.</p>
                </div>
                <div className="grid grid-cols-2 gap-3 min-w-[280px]">
                  <div className="rounded-xl bg-white/10 border border-white/20 px-4 py-3">
                    <p className="text-xs text-indigo-100">Completion</p>
                    <p className="text-2xl font-semibold">{overviewInsights.completionRate}%</p>
                  </div>
                  <div className="rounded-xl bg-white/10 border border-white/20 px-4 py-3">
                    <p className="text-xs text-indigo-100">Avg. Duration</p>
                    <p className="text-2xl font-semibold">{overviewInsights.avgDuration} min</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
              <div className={`${panelClass} p-5`}><div className="flex items-center justify-between"><p className="text-slate-600 text-sm">Today Sessions</p><Clock className="w-5 h-5 text-indigo-500"/></div><p className="text-3xl font-bold text-slate-900 mt-2">{overview?.counters.todaySessions ?? 0}</p></div>
              <div className={`${panelClass} p-5`}><div className="flex items-center justify-between"><p className="text-slate-600 text-sm">Upcoming</p><Calendar className="w-5 h-5 text-blue-500"/></div><p className="text-3xl font-bold text-slate-900 mt-2">{overview?.counters.upcomingSessions ?? 0}</p></div>
              <div className={`${panelClass} p-5`}><div className="flex items-center justify-between"><p className="text-slate-600 text-sm">Completed</p><CheckCircle2 className="w-5 h-5 text-emerald-500"/></div><p className="text-3xl font-bold text-slate-900 mt-2">{overview?.counters.completedSessions ?? 0}</p></div>
              <div className={`${panelClass} p-5`}><div className="flex items-center justify-between"><p className="text-slate-600 text-sm">Students Guided</p><Users className="w-5 h-5 text-cyan-500"/></div><p className="text-3xl font-bold text-slate-900 mt-2">{overview?.counters.totalStudents ?? 0}</p></div>
              <div className={`${panelClass} p-5`}><div className="flex items-center justify-between"><p className="text-slate-600 text-sm">Active Cases</p><Activity className="w-5 h-5 text-violet-500"/></div><p className="text-3xl font-bold text-slate-900 mt-2">{overviewInsights.activeCount}</p></div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className={`xl:col-span-2 ${panelClass} p-5`}>
                <div className="flex items-center justify-between mb-3"><h3 className="font-semibold text-slate-900">Next Priority Session</h3><BadgeCheck className="w-5 h-5 text-emerald-600"/></div>
                {!overviewInsights.nextSession ? (
                  <div className="rounded-lg border border-dashed border-slate-300 p-6 text-center text-slate-500 text-sm">No upcoming session right now.</div>
                ) : (
                  <div className="rounded-xl border border-indigo-100 bg-indigo-50 p-4">
                    <p className="font-semibold text-slate-900">{overviewInsights.nextSession.studentName}</p>
                    <p className="text-xs text-slate-600">{overviewInsights.nextSession.studentEmail}</p>
                    <p className="text-sm text-slate-700 mt-1">{new Date(overviewInsights.nextSession.scheduledAt).toLocaleString()}</p>
                  </div>
                )}
              </div>
              <div className={`${panelClass} p-5`}>
                <div className="flex items-center gap-2 mb-3"><BarChart3 className="w-5 h-5 text-indigo-600"/><h3 className="font-semibold text-slate-900">Session Health</h3></div>
                <div className="space-y-2 text-sm text-slate-700">
                  <div className="flex items-center justify-between"><span>Total Sessions</span><span className="font-semibold">{overviewInsights.totalSessions}</span></div>
                  <div className="flex items-center justify-between"><span>Completion Rate</span><span className="font-semibold">{overviewInsights.completionRate}%</span></div>
                  <div className="flex items-center justify-between"><span>Cancelled / No-show</span><span className="font-semibold">{overviewInsights.cancelledOrNoShowCount}</span></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "sessions" && (
          <div className={`${panelClass} p-5`}>
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">Session Management</h3>
              <select
                value={sessionFilter}
                onChange={async (event) => {
                  const next = event.target.value as "All" | SessionItem["status"];
                  setSessionFilter(next);
                  await loadSessions(next);
                }}
                className="border border-slate-300 rounded px-3 py-2 text-sm"
              >
                <option value="All">All</option>
                <option value="scheduled">Scheduled</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
                <option value="no-show">No Show</option>
              </select>
            </div>

            {sessions.length === 0 ? (
              <div className="rounded-lg border border-dashed border-slate-300 p-8 text-center text-slate-500">No sessions found for selected filter.</div>
            ) : (
              <div className="space-y-3">
                {sessions.map((session) => {
                  const PlatformIcon = getPlatformIcon(session.platform);
                  return (
                    <div key={session._id} className="rounded-xl border border-slate-200 p-4">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2">
                        <div>
                          <p className="font-semibold text-slate-900">{session.studentName}</p>
                          <p className="text-xs text-slate-500">{session.studentEmail}</p>
                          <p className="text-xs text-slate-600 mt-1">{new Date(session.scheduledAt).toLocaleString()} • {session.duration} min</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center gap-1 text-xs text-slate-600 capitalize"><PlatformIcon className="w-4 h-4" />{session.platform}</span>
                          <select
                            value={session.status}
                            onChange={(event) => updateSessionStatus(session._id, event.target.value as SessionItem["status"])}
                            className="border border-slate-300 rounded px-2 py-1 text-xs"
                          >
                            <option value="scheduled">scheduled</option>
                            <option value="in-progress">in-progress</option>
                            <option value="completed">completed</option>
                            <option value="cancelled">cancelled</option>
                            <option value="no-show">no-show</option>
                          </select>
                        </div>
                      </div>
                      <div className="mt-3">
                        <label className="text-xs text-slate-600">Counselor Notes</label>
                        <textarea
                          value={sessionNotesDraft[session._id] || session.counselorNotes || ""}
                          onChange={(event) =>
                            setSessionNotesDraft((prev) => ({ ...prev, [session._id]: event.target.value }))
                          }
                          className="mt-1 w-full min-h-[70px] border border-slate-300 rounded-lg px-3 py-2 text-sm"
                          placeholder="Add session summary / follow-up plan"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {activeTab === "students" && (
          <div className={`${panelClass} p-5`}>
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">Student Insights</h3>
              <div className="flex items-center gap-2">
                <input
                  value={studentSearch}
                  onChange={(event) => setStudentSearch(event.target.value)}
                  className={inputClass}
                  placeholder="Search by student name/email"
                />
                <button className={secondaryButtonClass} onClick={() => loadStudents(studentSearch)}>
                  <Search className="w-4 h-4" /> Search
                </button>
              </div>
            </div>
            {studentInsights.length === 0 ? (
              <div className="rounded-lg border border-dashed border-slate-300 p-8 text-center text-slate-500">No assigned students found for this counselor.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                {studentInsights.map((student) => (
                  <div key={student.studentId} className="border border-slate-200 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1"><UserCircle2 className="w-4 h-4 text-slate-500"/><p className="font-medium text-slate-800">{student.name}</p></div>
                    <p className="text-xs text-slate-500 truncate">{student.email}</p>
                    <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-slate-600">
                      <span>Sessions: {student.totalSessions}</span>
                      <span>Completed: {student.completedSessions}</span>
                      <span>Upcoming: {student.upcomingSessions}</span>
                      <span>Rate: {student.completionRate}%</span>
                    </div>
                    <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                      <span>{student.lastSessionAt ? `Last session: ${new Date(student.lastSessionAt).toLocaleDateString()}` : "No session date"}</span>
                      <Link href={`/counselorDashboard/students/${student.studentId}`} className="inline-flex items-center gap-1 text-indigo-700 font-medium hover:text-indigo-900">
                        View More <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "messages" && (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div className={`${panelClass} p-5`}>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Follow-up Queue</h3>
              {allSessions.filter((session) => session.status === "completed").slice(0, 8).map((session) => (
                <div key={session._id} className="border border-slate-200 rounded-lg p-3 mb-2">
                  <p className="font-medium text-slate-800">{session.studentName}</p>
                  <p className="text-xs text-slate-500">Last session: {new Date(session.scheduledAt).toLocaleDateString()}</p>
                  <p className="text-sm text-slate-700 mt-1">Suggested message: Thank you for attending. Share your action plan in next 48 hours.</p>
                </div>
              ))}
            </div>
            <div className={`${panelClass} p-5`}>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Communication Templates</h3>
              <div className="space-y-3 text-sm text-slate-700">
                <div className="rounded-lg border border-slate-200 p-3">Session Reminder: “Your counseling session is scheduled tomorrow. Please keep your goals and questions ready.”</div>
                <div className="rounded-lg border border-slate-200 p-3">Post Session Follow-up: “Please share your progress on the discussed action points by this week.”</div>
                <div className="rounded-lg border border-slate-200 p-3">No-show Outreach: “We missed you today. Let’s reschedule to continue your guidance journey.”</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "profile" && (
          <div className={`${panelClass} p-6 space-y-5`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className="text-sm text-slate-600">Full Name</label><input value={profileDraft.name} onChange={(event) => setProfileDraft((prev) => ({ ...prev, name: event.target.value }))} className={`mt-1 ${inputClass}`} /></div>
              <div><label className="text-sm text-slate-600">Display Name</label><input value={profileDraft.displayName} onChange={(event) => setProfileDraft((prev) => ({ ...prev, displayName: event.target.value }))} className={`mt-1 ${inputClass}`} /></div>
              <div><label className="text-sm text-slate-600">Email</label><input value={profileDraft.email} disabled className={`mt-1 ${inputClass} bg-slate-50`} /></div>
              <div><label className="text-sm text-slate-600">Phone</label><input value={profileDraft.phone} onChange={(event) => setProfileDraft((prev) => ({ ...prev, phone: event.target.value }))} className={`mt-1 ${inputClass}`} /></div>
            </div>
            <div><label className="text-sm text-slate-600">Profile Image URL</label><input value={profileDraft.profileImage} onChange={(event) => setProfileDraft((prev) => ({ ...prev, profileImage: event.target.value }))} className={`mt-1 ${inputClass}`} /></div>
            <div><label className="text-sm text-slate-600">Bio</label><textarea value={profileDraft.bio} onChange={(event) => setProfileDraft((prev) => ({ ...prev, bio: event.target.value }))} className={`mt-1 min-h-[90px] ${inputClass}`} /></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className="text-sm text-slate-600">Specializations (comma separated)</label><input value={profileDraft.specializationsText} onChange={(event) => setProfileDraft((prev) => ({ ...prev, specializationsText: event.target.value }))} className={`mt-1 ${inputClass}`} /></div>
              <div><label className="text-sm text-slate-600">Languages (comma separated)</label><input value={profileDraft.languagesText} onChange={(event) => setProfileDraft((prev) => ({ ...prev, languagesText: event.target.value }))} className={`mt-1 ${inputClass}`} /></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div><label className="text-sm text-slate-600">Timezone</label><input value={profileDraft.availability.timezone} onChange={(event) => setProfileDraft((prev) => ({ ...prev, availability: { ...prev.availability, timezone: event.target.value } }))} className={`mt-1 ${inputClass}`} /></div>
              <div><label className="text-sm text-slate-600">Start Time</label><input type="time" value={profileDraft.availability.start} onChange={(event) => setProfileDraft((prev) => ({ ...prev, availability: { ...prev.availability, start: event.target.value } }))} className={`mt-1 ${inputClass}`} /></div>
              <div><label className="text-sm text-slate-600">End Time</label><input type="time" value={profileDraft.availability.end} onChange={(event) => setProfileDraft((prev) => ({ ...prev, availability: { ...prev.availability, end: event.target.value } }))} className={`mt-1 ${inputClass}`} /></div>
              <div className="flex items-end"><label className="inline-flex items-center gap-2 text-sm"><input type="checkbox" checked={profileDraft.availability.isAvailable} onChange={(event) => setProfileDraft((prev) => ({ ...prev, availability: { ...prev.availability, isAvailable: event.target.checked } }))} />Available for booking</label></div>
            </div>
            <div><label className="text-sm text-slate-600">Working Days (comma separated)</label><input value={profileDraft.availability.workingDaysText} onChange={(event) => setProfileDraft((prev) => ({ ...prev, availability: { ...prev.availability, workingDaysText: event.target.value } }))} className={`mt-1 ${inputClass}`} /></div>
            <button onClick={saveProfile} disabled={saving} className={primaryButtonClass}><Save className="w-4 h-4"/>Save Counselor Profile</button>
          </div>
        )}

        {activeTab === "progressTracker" && (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div className={`${panelClass} p-5`}>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Weekly Session Trend</h3>
              <div className="space-y-2">
                {overviewInsights.weekBuckets.map((bucket, index) => (
                  <div key={`${bucket.label}-${index}`}>
                    <div className="flex items-center justify-between text-xs text-slate-600 mb-1"><span>Week {index + 1} ({bucket.label})</span><span>{bucket.count}</span></div>
                    <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full bg-indigo-500" style={{ width: `${Math.max(6, Math.min(100, bucket.count * 12))}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className={`${panelClass} p-5`}>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Progress KPIs</h3>
              <div className="space-y-2 text-sm text-slate-700">
                <div className="flex items-center justify-between"><span>Total Sessions</span><span className="font-semibold">{overviewInsights.totalSessions}</span></div>
                <div className="flex items-center justify-between"><span>Completion Rate</span><span className="font-semibold">{overviewInsights.completionRate}%</span></div>
                <div className="flex items-center justify-between"><span>Average Duration</span><span className="font-semibold">{overviewInsights.avgDuration} min</span></div>
                <div className="flex items-center justify-between"><span>Cancelled / No-show</span><span className="font-semibold">{overviewInsights.cancelledOrNoShowCount}</span></div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "psychometricTest" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className={`${panelClass} p-5`}><p className="text-sm text-slate-500">Total Attempts</p><p className="text-3xl font-bold text-slate-900">{psychometric?.totalAttempts ?? 0}</p></div>
              <div className={`${panelClass} p-5`}><p className="text-sm text-slate-500">Students Covered</p><p className="text-3xl font-bold text-slate-900">{psychometric?.studentsCovered ?? 0}</p></div>
              <div className={`${panelClass} p-5`}><p className="text-sm text-slate-500">Average Score</p><p className="text-3xl font-bold text-slate-900">{psychometric?.averageScore ?? 0}%</p></div>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <div className={`${panelClass} p-5`}>
                <h3 className="font-semibold text-slate-900 mb-3">Top Categories</h3>
                {(psychometric?.topCategories || []).length === 0 ? <div className="text-sm text-slate-500">No psychometric category data yet.</div> : (
                  <div className="space-y-2">
                    {(psychometric?.topCategories || []).map((item) => (
                      <div key={item.category} className="border border-slate-200 rounded-lg p-3">
                        <div className="flex items-center justify-between"><p className="font-medium text-slate-900">{item.category}</p><p className="text-sm text-slate-700">{item.average}%</p></div>
                        <p className="text-xs text-slate-500 mt-1">Attempts: {item.attempts}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className={`${panelClass} p-5`}>
                <h3 className="font-semibold text-slate-900 mb-3">Recent Results</h3>
                {(psychometric?.recentResults || []).length === 0 ? <div className="text-sm text-slate-500">No recent result entries found.</div> : (
                  <div className="space-y-2">
                    {(psychometric?.recentResults || []).map((row) => (
                      <div key={row.id} className="border border-slate-200 rounded-lg p-3">
                        <p className="font-medium text-slate-900">{row.studentName}</p>
                        <p className="text-xs text-slate-500">{row.assessmentTitle}</p>
                        <p className="text-xs text-slate-600 mt-1">Score: {row.score}% • {new Date(row.completedAt).toLocaleDateString()}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === "govCollege" && (
          <div className={`${panelClass} p-5`}>
            <div className="flex items-center justify-between mb-3"><h3 className="font-semibold text-slate-900">Government Colleges</h3><button onClick={() => loadResources(resourceSearch)} className={secondaryButtonClass}><RefreshCw className="w-4 h-4"/>Reload</button></div>
            <div className="flex gap-2 mb-4"><input value={resourceSearch} onChange={(event) => setResourceSearch(event.target.value)} className={inputClass} placeholder="Search resources"/><button className={primaryButtonClass} onClick={() => loadResources(resourceSearch)}><Search className="w-4 h-4"/>Search</button></div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
              {(resources?.colleges || []).map((college) => (
                <div key={college._id} className="border border-slate-200 rounded-lg p-3">
                  <p className="font-medium text-slate-900">{String(college.name || "College")}</p>
                  <p className="text-xs text-slate-500 capitalize">{String(college.type || "-")} • {String((college as any)?.location?.city || "-")}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "shortListedColleges" && (
          <div className={`${panelClass} p-5`}>
            <h3 className="font-semibold text-slate-900 mb-3">Shortlist Recommendations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
              {shortListedRecommendations.map((college) => (
                <div key={college.id} className="border border-slate-200 rounded-lg p-3">
                  <p className="font-medium text-slate-900">{college.name}</p>
                  <p className="text-xs text-slate-500">{college.location}</p>
                  <div className="mt-2 flex items-center justify-between text-xs"><span className="capitalize text-slate-600">{college.type}</span><span className="font-semibold text-indigo-700">Match {college.score}%</span></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "carrerOption" && (
          <div className={`${panelClass} p-5`}>
            <h3 className="font-semibold text-slate-900 mb-3">Career Options</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
              {(resources?.careers || []).map((career) => (
                <div key={career._id} className="border border-slate-200 rounded-lg p-3">
                  <p className="font-medium text-slate-900">{String(career.title || "Career")}</p>
                  <p className="text-xs text-slate-500">{String(career.stream || "-")} • {String(career.career_nature || "-")}</p>
                  <p className="text-xs text-slate-600 mt-1">Salary: {String(career.salary_range || "-")}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "counselingBooking" && (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div className={`${panelClass} p-5`}>
              <h3 className="font-semibold text-slate-900 mb-3">Upcoming / Active</h3>
              <div className="space-y-2">
                {allSessions
                  .filter((session) => session.status === "scheduled" || session.status === "in-progress")
                  .slice(0, 10)
                  .map((session) => (
                    <div key={session._id} className="border border-slate-200 rounded-lg p-3">
                      <p className="font-medium text-slate-900">{session.studentName}</p>
                      <p className="text-xs text-slate-500">{new Date(session.scheduledAt).toLocaleString()}</p>
                      <p className="text-xs text-slate-600 capitalize mt-1">{session.type.replace("-", " ")}</p>
                    </div>
                  ))}
              </div>
            </div>
            <div className={`${panelClass} p-5`}>
              <h3 className="font-semibold text-slate-900 mb-3">Completed Recently</h3>
              <div className="space-y-2">
                {allSessions
                  .filter((session) => session.status === "completed")
                  .slice(0, 10)
                  .map((session) => (
                    <div key={session._id} className="border border-slate-200 rounded-lg p-3">
                      <p className="font-medium text-slate-900">{session.studentName}</p>
                      <p className="text-xs text-slate-500">{new Date(session.scheduledAt).toLocaleString()}</p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "competitiveExams" && (
          <div className={`${panelClass} p-5`}>
            <h3 className="font-semibold text-slate-900 mb-3">Competitive Exams</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
              {(resources?.exams || []).map((exam) => (
                <div key={exam._id} className="border border-slate-200 rounded-lg p-3">
                  <p className="font-medium text-slate-900">{String(exam.name || "Exam")}</p>
                  <p className="text-xs text-slate-500">{String(exam.type || "-")} • {String(exam.state || "-")}</p>
                  <p className="text-xs text-slate-600 mt-1">Date: {String(exam.exam_date || "-")}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "scholarships" && (
          <div className={`${panelClass} p-5`}>
            <h3 className="font-semibold text-slate-900 mb-3">Scholarships</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
              {(resources?.scholarships || []).map((scholarship) => (
                <div key={scholarship._id} className="border border-slate-200 rounded-lg p-3">
                  <p className="font-medium text-slate-900">{String(scholarship.name || "Scholarship")}</p>
                  <p className="text-xs text-slate-500">{String(scholarship.provider || "-")} • {String(scholarship.amount || "-")}</p>
                  <p className="text-xs text-slate-600 mt-1">Deadline: {String(scholarship.deadline || "-")}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "feedback&Suggestions" && (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div className={`${panelClass} p-5`}>
              <h3 className="font-semibold text-slate-900 mb-3">Submit Suggestion</h3>
              <div className="space-y-3">
                <select
                  value={feedbackDraft.suggestionCategory}
                  onChange={(event) => setFeedbackDraft((prev) => ({ ...prev, suggestionCategory: event.target.value }))}
                  className={inputClass}
                >
                  <option value="General">General</option>
                  <option value="UI/UX">UI/UX</option>
                  <option value="Performance">Performance</option>
                  <option value="Counseling Workflow">Counseling Workflow</option>
                  <option value="Data Quality">Data Quality</option>
                </select>
                <textarea
                  value={feedbackDraft.message}
                  onChange={(event) => setFeedbackDraft((prev) => ({ ...prev, message: event.target.value }))}
                  className={`min-h-[120px] ${inputClass}`}
                  placeholder="Share your actionable feedback or feature suggestion"
                />
                <button onClick={submitFeedback} disabled={saving} className={primaryButtonClass}>
                  <Send className="w-4 h-4" /> Submit Suggestion
                </button>
              </div>
            </div>
            <div className={`${panelClass} p-5`}>
              <h3 className="font-semibold text-slate-900 mb-3">Submitted Suggestions</h3>
              <div className="space-y-2 max-h-[460px] overflow-auto pr-1">
                {feedbackItems.length === 0 ? (
                  <div className="rounded-lg border border-dashed border-slate-300 p-6 text-center text-slate-500 text-sm">No suggestions submitted yet.</div>
                ) : (
                  feedbackItems.map((item) => (
                    <div key={item._id} className="border border-slate-200 rounded-lg p-3">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-xs font-semibold text-indigo-700">{item.suggestionCategory || "General"}</p>
                        <span className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-700">{item.status}</span>
                      </div>
                      <p className="text-sm text-slate-800 mt-1">{item.message}</p>
                      <p className="text-xs text-slate-500 mt-1">{item.submitted_on ? new Date(item.submitted_on).toLocaleString() : "-"}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
