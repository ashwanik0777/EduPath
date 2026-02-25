"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  FileCog,
  RefreshCw,
  GraduationCap,
  Briefcase,
  CalendarDays,
  Award,
  UserCheck,
  Bell,
  Target,
  Clock,
  User,
  CheckCircle2,
  Activity,
  BookOpen,
  Trash2,
  Save,
  Sparkles,
  CalendarClock,
  LineChart,
  ShieldCheck,
  Search,
  WandSparkles,
} from "lucide-react";
import { Sidebar, MenuItem } from "@/app/components/Sidebar";
import { useToast } from "@/app/hooks/use-toast";
import { Toaster } from "@/app/components/ui/toaster";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/components/ui/alert-dialog";

type OverviewResponse = {
  success: boolean;
  data: {
    counters: {
      users: number;
      students: number;
      counselors: number;
      admins: number;
      colleges: number;
      careers: number;
      exams: number;
      scholarships: number;
      feedbacks: number;
      pendingFeedbacks: number;
    };
    recentUsers: AdminUser[];
    recentFeedbacks: AdminFeedback[];
  };
};

type AdminUser = {
  _id: string;
  name: string;
  email: string;
  role: "student" | "counselor" | "admin";
  isActive: boolean;
  createdAt?: string;
  lastLoginAt?: string;
};

type AdminFeedback = {
  _id: string;
  name?: string;
  email?: string;
  type?: string;
  message?: string;
  status: "Pending" | "Reviewed" | "Responded";
  submitted_on?: string;
};

type UsersResponse = {
  success: boolean;
  data: AdminUser[];
};

type FeedbackResponse = {
  success: boolean;
  data: AdminFeedback[];
};

type MeResponse = {
  success: boolean;
  user?: {
    name?: string;
    role?: "student" | "counselor" | "admin";
    email?: string;
    profile?: {
      profileImage?: string;
    };
  };
};

type BaseTabKey = "overview" | "users" | "feedback" | "content";
type PlaceholderTabKey =
  | "profile"
  | "progressTracker"
  | "psychometricTest"
  | "govCollege"
  | "shortListedColleges"
  | "carrerOption"
  | "counselingBooking"
  | "competitiveExams"
  | "scholarships";
type TabKey = BaseTabKey | PlaceholderTabKey;

type ContentResource = "colleges" | "careers" | "exams" | "scholarships";

type AdminProfileResponse = {
  success: boolean;
  data: {
    _id: string;
    name: string;
    email: string;
    role: string;
    profile: {
      phone?: string;
      profileImage?: string;
    };
  };
};

type AdminAnalyticsResponse = {
  success: boolean;
  data: {
    progress: {
      totalStudents: number;
      studentsWithAssessments: number;
      studentsWithSessions: number;
      averageAssessmentScore: number;
      completedSessions: number;
      scheduledSessions: number;
    };
    psychometric: {
      totalAssessments: number;
      activeAssessments: number;
      totalResults: number;
      averageScore: number;
      topAssessments: { id: string; title: string; attempts: number }[];
      recentResults: {
        id: string;
        assessmentTitle: string;
        studentName: string;
        overallScore: number;
        completedAt: string;
      }[];
    };
    shortlists: {
      totalShortlisted: number;
      appliedCount: number;
      uniqueCollegeCount: number;
      topColleges: { name: string; count: number; applied: number }[];
    };
    counseling: {
      totalSessions: number;
      upcomingSessions: number;
      completedSessions: number;
      cancelledSessions: number;
    };
  };
};

type ContentResponse = {
  success: boolean;
  data: Array<Record<string, unknown> & { _id: string }>;
};

type AssessmentsResponse = {
  success: boolean;
  data: {
    _id: string;
    title: string;
    type: string;
    duration: number;
    totalQuestions: number;
    isActive: boolean;
    attempts: number;
  }[];
};

type CounselingResponse = {
  success: boolean;
  data: {
    _id: string;
    type: string;
    status: "scheduled" | "in-progress" | "completed" | "cancelled" | "no-show";
    scheduledAt: string;
    duration: number;
    studentName: string;
    counselorName: string;
    platform: string;
  }[];
};

type ConfirmationState = {
  open: boolean;
  title: string;
  description: string;
  confirmLabel: string;
  confirmVariant?: "default" | "destructive";
  action: (() => Promise<void>) | null;
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

export default function AdminDashboardPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [tabLoading, setTabLoading] = useState(false);
  const [error, setError] = useState("");

  const [overview, setOverview] = useState<OverviewResponse["data"] | null>(null);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [feedbacks, setFeedbacks] = useState<AdminFeedback[]>([]);

  const [profile, setProfile] = useState({ name: "", phone: "", profileImage: "" });
  const [analytics, setAnalytics] = useState<AdminAnalyticsResponse["data"] | null>(null);
  const [assessments, setAssessments] = useState<AssessmentsResponse["data"]>([]);
  const [counselingSessions, setCounselingSessions] = useState<CounselingResponse["data"]>([]);
  const [contentData, setContentData] = useState<Record<ContentResource, ContentResponse["data"]>>({
    colleges: [],
    careers: [],
    exams: [],
    scholarships: [],
  });
  const [loadedTabs, setLoadedTabs] = useState<Record<TabKey, boolean>>({
    overview: true,
    users: true,
    feedback: true,
    content: true,
    profile: false,
    progressTracker: false,
    psychometricTest: false,
    govCollege: false,
    shortListedColleges: false,
    carrerOption: false,
    counselingBooking: false,
    competitiveExams: false,
    scholarships: false,
  });

  const [collegeForm, setCollegeForm] = useState({ name: "", type: "government", category: "engineering", city: "", state: "" });
  const [careerForm, setCareerForm] = useState({ title: "", stream: "", salary_range: "", career_nature: "" });
  const [examForm, setExamForm] = useState({ name: "", type: "", eligibility: "", exam_date: "", state: "" });
  const [scholarshipForm, setScholarshipForm] = useState({ name: "", provider: "", amount: "", deadline: "" });

  const [adminInfo, setAdminInfo] = useState<{ name: string; role: string; profileImage?: string }>({
    name: "Admin",
    role: "Admin",
    profileImage: undefined,
  });

  const [userSearch, setUserSearch] = useState("");
  const [feedbackStatus, setFeedbackStatus] = useState<"All" | "Pending" | "Reviewed" | "Responded">("All");
  const [confirmation, setConfirmation] = useState<ConfirmationState>({
    open: false,
    title: "",
    description: "",
    confirmLabel: "Confirm",
    confirmVariant: "default",
    action: null,
  });
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [contentSearch, setContentSearch] = useState<Record<ContentResource, string>>({
    colleges: "",
    careers: "",
    exams: "",
    scholarships: "",
  });

  const tabToResource: Partial<Record<TabKey, ContentResource>> = {
    govCollege: "colleges",
    carrerOption: "careers",
    competitiveExams: "exams",
    scholarships: "scholarships",
  };

  const showSuccessToast = (title: string, description: string) => {
    toast({ title, description });
  };

  const showErrorToast = (description: string) => {
    toast({ title: "Action failed", description, variant: "destructive" });
  };

  const askConfirmation = (config: Omit<ConfirmationState, "open">) => {
    setConfirmation({ ...config, open: true });
  };

  const closeConfirmation = () => {
    if (confirmLoading) return;
    setConfirmation((prev) => ({ ...prev, open: false, action: null }));
  };

  const runConfirmedAction = async () => {
    if (!confirmation.action) return;
    setConfirmLoading(true);
    try {
      await confirmation.action();
    } finally {
      setConfirmLoading(false);
      setConfirmation((prev) => ({ ...prev, open: false, action: null }));
    }
  };

  const loadOverview = async () => {
    const result = await fetchJson<OverviewResponse>("/api/admin/overview");
    setOverview(result.data);
  };

  const loadProfile = async () => {
    const result = await fetchJson<AdminProfileResponse>("/api/admin/profile");
    setProfile({
      name: result.data.name || "",
      phone: result.data.profile?.phone || "",
      profileImage: result.data.profile?.profileImage || "",
    });
  };

  const loadAnalytics = async () => {
    const result = await fetchJson<AdminAnalyticsResponse>("/api/admin/analytics");
    setAnalytics(result.data);
  };

  const loadAssessments = async () => {
    const result = await fetchJson<AssessmentsResponse>("/api/admin/assessments");
    setAssessments(result.data || []);
  };

  const loadCounseling = async () => {
    const result = await fetchJson<CounselingResponse>("/api/admin/counseling");
    setCounselingSessions(result.data || []);
  };

  const loadContent = async (resource: ContentResource, query?: string) => {
    const q = query?.trim() ? `&q=${encodeURIComponent(query.trim())}` : "";
    const result = await fetchJson<ContentResponse>(`/api/admin/content?resource=${resource}${q}`);
    setContentData((previous) => ({ ...previous, [resource]: result.data || [] }));
  };

  const loadUsers = async (query?: string) => {
    const q = query?.trim() ? `?q=${encodeURIComponent(query.trim())}` : "";
    const result = await fetchJson<UsersResponse>(`/api/admin/users${q}`);
    setUsers(result.data || []);
  };

  const loadFeedbacks = async (status?: string) => {
    const query = status && status !== "All" ? `?status=${encodeURIComponent(status)}` : "";
    const result = await fetchJson<FeedbackResponse>(`/api/admin/feedback${query}`);
    setFeedbacks(result.data || []);
  };

  const loadAll = async () => {
    setError("");
    setLoading(true);
    try {
      const me = await fetchJson<MeResponse>("/api/auth/me");
      if (me.success && me.user) {
        setAdminInfo({
          name: me.user.name || "Admin",
          role: me.user.role === "admin" ? "Admin" : me.user.role || "Admin",
          profileImage: me.user.profile?.profileImage,
        });
      }
      await Promise.all([loadOverview(), loadUsers(), loadFeedbacks(), loadAnalytics(), loadProfile()]);
    } catch {
      setError("Failed to load admin data. Please refresh.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  const refreshAll = async () => {
    setRefreshing(true);
    setError("");
    try {
      await Promise.all([loadOverview(), loadUsers(userSearch), loadFeedbacks(feedbackStatus), loadAnalytics()]);
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

  const updateUserRole = async (userId: string, role: AdminUser["role"]) => {
    try {
      await fetchJson("/api/admin/users", {
        method: "PATCH",
        body: JSON.stringify({ userId, role }),
      });
      await loadUsers(userSearch);
      await loadOverview();
      showSuccessToast("Role updated", "User role has been updated successfully.");
    } catch {
      setError("Could not update user role.");
      showErrorToast("Could not update user role.");
    }
  };

  const toggleUserActive = async (user: AdminUser) => {
    try {
      await fetchJson("/api/admin/users", {
        method: "PATCH",
        body: JSON.stringify({ userId: user._id, isActive: !user.isActive }),
      });
      await loadUsers(userSearch);
      showSuccessToast("User status updated", `${user.name} is now ${user.isActive ? "inactive" : "active"}.`);
    } catch {
      setError("Could not update user status.");
      showErrorToast("Could not update user status.");
    }
  };

  const updateFeedbackStatus = async (feedbackId: string, status: AdminFeedback["status"]) => {
    try {
      await fetchJson("/api/admin/feedback", {
        method: "PATCH",
        body: JSON.stringify({ feedbackId, status }),
      });
      await loadFeedbacks(feedbackStatus);
      await loadOverview();
      showSuccessToast("Feedback updated", `Feedback status changed to ${status}.`);
    } catch {
      setError("Could not update feedback status.");
      showErrorToast("Could not update feedback status.");
    }
  };

  const saveProfile = async () => {
    try {
      await fetchJson("/api/admin/profile", {
        method: "PATCH",
        body: JSON.stringify(profile),
      });
      await loadProfile();
      setAdminInfo((previous) => ({ ...previous, name: profile.name, profileImage: profile.profileImage || undefined }));
      showSuccessToast("Profile saved", "Your admin profile has been updated.");
    } catch {
      setError("Could not save profile.");
      showErrorToast("Could not save admin profile.");
    }
  };

  const updateAssessmentStatus = async (assessmentId: string, isActive: boolean) => {
    try {
      await fetchJson("/api/admin/assessments", {
        method: "PATCH",
        body: JSON.stringify({ assessmentId, isActive }),
      });
      await Promise.all([loadAssessments(), loadAnalytics()]);
      showSuccessToast("Assessment updated", `Assessment marked as ${isActive ? "active" : "inactive"}.`);
    } catch {
      setError("Could not update assessment status.");
      showErrorToast("Could not update assessment status.");
    }
  };

  const updateSessionStatus = async (sessionId: string, status: CounselingResponse["data"][number]["status"]) => {
    try {
      await fetchJson("/api/admin/counseling", {
        method: "PATCH",
        body: JSON.stringify({ sessionId, status }),
      });
      await Promise.all([loadCounseling(), loadAnalytics()]);
      showSuccessToast("Session status updated", `Session moved to ${status}.`);
    } catch {
      setError("Could not update session status.");
      showErrorToast("Could not update session status.");
    }
  };

  const createContent = async (resource: ContentResource, payload: Record<string, unknown>) => {
    try {
      await fetchJson("/api/admin/content", {
        method: "POST",
        body: JSON.stringify({ resource, payload }),
      });
      await Promise.all([loadContent(resource, contentSearch[resource]), loadOverview()]);
      showSuccessToast("Content added", `New ${resource.slice(0, -1)} record created successfully.`);
    } catch {
      setError(`Could not create ${resource.slice(0, -1)}.`);
      showErrorToast(`Could not create ${resource.slice(0, -1)}.`);
    }
  };

  const deleteContent = async (resource: ContentResource, id: string) => {
    try {
      await fetchJson("/api/admin/content", {
        method: "DELETE",
        body: JSON.stringify({ resource, id }),
      });
      await Promise.all([loadContent(resource, contentSearch[resource]), loadOverview(), loadAnalytics()]);
      showSuccessToast("Content deleted", `${resource.slice(0, -1)} has been deleted.`);
    } catch {
      setError(`Could not delete ${resource.slice(0, -1)}.`);
      showErrorToast(`Could not delete ${resource.slice(0, -1)}.`);
    }
  };

  useEffect(() => {
    const loadTab = async () => {
      if (loadedTabs[activeTab]) return;

      setTabLoading(true);
      setError("");

      try {
        if (activeTab === "profile") {
          await loadProfile();
        } else if (activeTab === "progressTracker" || activeTab === "shortListedColleges") {
          await loadAnalytics();
        } else if (activeTab === "psychometricTest") {
          await Promise.all([loadAnalytics(), loadAssessments()]);
        } else if (activeTab === "counselingBooking") {
          await Promise.all([loadCounseling(), loadAnalytics()]);
        } else {
          const resource = tabToResource[activeTab];
          if (resource) {
            await loadContent(resource, contentSearch[resource]);
          }
        }

        setLoadedTabs((previous) => ({ ...previous, [activeTab]: true }));
      } catch {
        setError("Failed to load this module.");
      } finally {
        setTabLoading(false);
      }
    };

    loadTab();
  }, [activeTab]);

  const menuItems: MenuItem[] = [
    { id: "overview", label: "Overview", icon: LayoutDashboard, color: "text-indigo-400" },
    { id: "users", label: "Users", icon: Users, color: "text-blue-400" },
    { id: "feedback", label: "Feedback", icon: MessageSquare, color: "text-cyan-400" },
    { id: "content", label: "Content", icon: FileCog, color: "text-emerald-400" },
    { id: "profile", label: "Profile", icon: Users, color: "text-gray-400" },
    { id: "progressTracker", label: "Progress Tracker", icon: RefreshCw, color: "text-rose-400" },
    { id: "psychometricTest", label: "Psychometric Test", icon: Target, color: "text-purple-400" },
    { id: "govCollege", label: "Government College", icon: GraduationCap, color: "text-blue-400" },
    { id: "shortListedColleges", label: "Short Listed College", icon: CalendarDays, color: "text-teal-400" },
    { id: "carrerOption", label: "Career Option", icon: Briefcase, color: "text-emerald-400" },
    { id: "counselingBooking", label: "Counseling Booking", icon: Clock, color: "text-cyan-400" },
    { id: "competitiveExams", label: "Competitive Exams", icon: Award, color: "text-orange-400" },
    { id: "scholarships", label: "Scholarships", icon: GraduationCap, color: "text-yellow-400" },
  ];

  const metricCards = useMemo(
    () => [
      { label: "Users", value: overview?.counters.users ?? 0, icon: Users, color: "bg-blue-50 text-blue-700" },
      { label: "Colleges", value: overview?.counters.colleges ?? 0, icon: GraduationCap, color: "bg-violet-50 text-violet-700" },
      { label: "Careers", value: overview?.counters.careers ?? 0, icon: Briefcase, color: "bg-emerald-50 text-emerald-700" },
      { label: "Exams", value: overview?.counters.exams ?? 0, icon: CalendarDays, color: "bg-amber-50 text-amber-700" },
      { label: "Scholarships", value: overview?.counters.scholarships ?? 0, icon: Award, color: "bg-pink-50 text-pink-700" },
      { label: "Pending Feedback", value: overview?.counters.pendingFeedbacks ?? 0, icon: Bell, color: "bg-cyan-50 text-cyan-700" },
    ],
    [overview],
  );

  const getResourceRows = (resource: ContentResource) => contentData[resource] || [];
  const panelClass = "bg-white/95 backdrop-blur rounded-2xl border border-slate-200 shadow-sm";
  const inputClass = "w-full border border-slate-300 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400";
  const primaryButtonClass = "inline-flex items-center gap-2 rounded-xl bg-slate-900 text-white px-4 py-2.5 text-sm font-medium hover:bg-slate-800 transition-colors";
  const secondaryButtonClass = "inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors";

  const moduleHeader: Record<TabKey, { title: string; subtitle: string }> = {
    overview: { title: "Admin Dashboard", subtitle: "Operational command center for EduPath" },
    users: { title: "User Management", subtitle: "Manage all user roles and account access" },
    feedback: { title: "Feedback Management", subtitle: "Review and resolve student platform feedback" },
    content: { title: "Content Center", subtitle: "Manage core content modules from one place" },
    profile: { title: "Admin Profile", subtitle: "Update your profile and contact settings" },
    progressTracker: { title: "Progress Tracker", subtitle: "Track engagement and student progression KPIs" },
    psychometricTest: { title: "Psychometric Tests", subtitle: "Monitor assessments, results, and activation status" },
    govCollege: { title: "Government College", subtitle: "Manage college catalog records" },
    shortListedColleges: { title: "Short Listed College", subtitle: "Analyze shortlist trends and adoption" },
    carrerOption: { title: "Career Option", subtitle: "Manage career roadmap content" },
    counselingBooking: { title: "Counseling Booking", subtitle: "Control counseling schedules and session states" },
    competitiveExams: { title: "Competitive Exams", subtitle: "Manage exam guidance records" },
    scholarships: { title: "Scholarships", subtitle: "Maintain scholarship database records" },
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
          onPageChange={(id) => setActiveTab(id as TabKey)}
          userInfo={{ name: adminInfo.name, role: adminInfo.role, profileImage: adminInfo.profileImage }}
          onLogout={handleLogout}
        />
      </div>

      <main className="flex-1 h-screen min-h-screen overflow-y-auto p-4 md:p-8">
        <div className="rounded-2xl border border-slate-200 bg-white/90 backdrop-blur shadow-sm p-5 mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-600 to-cyan-600 text-white flex items-center justify-center shadow-md">
              <WandSparkles className="w-5 h-5" />
            </div>
            <div>
            <h2 className="text-2xl font-bold text-slate-900">{moduleHeader[activeTab].title}</h2>
            <p className="text-slate-600">{moduleHeader[activeTab].subtitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden md:inline-flex text-xs px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
              {new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
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

        {tabLoading ? (
          <div className="mb-6 bg-white rounded-xl border border-slate-200 p-8 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-slate-300 border-t-slate-700 rounded-full animate-spin" />
          </div>
        ) : null}

        {activeTab === "overview" && (
          <div className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-1 duration-300">
            <div className="bg-gradient-to-r from-indigo-700 via-blue-700 to-cyan-700 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10" />
              <div className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full bg-white/10" />
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-indigo-100">Platform command center</p>
                  <h3 className="text-2xl font-bold mt-1">Welcome back, {adminInfo.name}</h3>
                  <p className="text-indigo-100 mt-2 max-w-2xl">
                    Quick view of user growth, content scale, counseling activity, and feedback queue in one dashboard.
                  </p>
                </div>
                <div className="hidden md:flex items-center gap-2 bg-white/15 px-3 py-2 rounded-lg">
                  <Sparkles className="w-5 h-5" />
                  <span className="text-sm">Admin Pro Mode</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {metricCards.map((card) => {
                const Icon = card.icon;
                return (
                  <div key={card.label} className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-500">{card.label}</p>
                        <p className="text-3xl font-bold text-slate-900">{card.value}</p>
                      </div>
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${card.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className={`${panelClass} p-5`}>
                <h3 className="font-semibold text-slate-900 mb-3">Recent Users</h3>
                <div className="space-y-2">
                  {(overview?.recentUsers || []).length === 0 ? (
                    <div className="rounded-xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500">No recent users available.</div>
                  ) : (overview?.recentUsers || []).map((user) => (
                    <div key={user._id} className="border border-slate-200 rounded-lg p-3">
                      <p className="font-medium text-slate-800">{user.name}</p>
                      <p className="text-xs text-slate-500">{user.email}</p>
                      <div className="mt-1 flex items-center justify-between text-xs">
                        <span className="px-2 py-1 rounded bg-slate-100 text-slate-700">{user.role}</span>
                        <span className={user.isActive ? "text-emerald-600" : "text-rose-600"}>
                          {user.isActive ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`${panelClass} p-5`}>
                <h3 className="font-semibold text-slate-900 mb-3">Recent Feedback</h3>
                <div className="space-y-2">
                  {(overview?.recentFeedbacks || []).length === 0 ? (
                    <div className="rounded-xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500">No recent feedback found.</div>
                  ) : (overview?.recentFeedbacks || []).map((item) => (
                    <div key={item._id} className="border border-slate-200 rounded-lg p-3">
                      <p className="text-sm text-slate-700 line-clamp-2">{item.message || "No message"}</p>
                      <div className="mt-1 flex items-center justify-between text-xs">
                        <span>{item.type || "General"}</span>
                        <span className="px-2 py-1 rounded bg-slate-100">{item.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl border border-slate-200 p-4">
                <div className="flex items-center gap-2 text-slate-700 font-semibold mb-2">
                  <Activity className="w-4 h-4 text-blue-600" />
                  Student Activity
                </div>
                <p className="text-2xl font-bold text-slate-900">{analytics?.progress.studentsWithAssessments ?? 0}</p>
                <p className="text-xs text-slate-500">Students with completed assessments</p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-4">
                <div className="flex items-center gap-2 text-slate-700 font-semibold mb-2">
                  <CalendarClock className="w-4 h-4 text-cyan-600" />
                  Counseling Queue
                </div>
                <p className="text-2xl font-bold text-slate-900">{analytics?.counseling.upcomingSessions ?? 0}</p>
                <p className="text-xs text-slate-500">Upcoming sessions to monitor</p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-4">
                <div className="flex items-center gap-2 text-slate-700 font-semibold mb-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Platform Health
                </div>
                <p className="text-2xl font-bold text-slate-900">{overview?.counters.pendingFeedbacks ?? 0}</p>
                <p className="text-xs text-slate-500">Pending feedback items</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "users" && (
          <div className={`${panelClass} p-5 animate-in fade-in-0 slide-in-from-bottom-1 duration-300`}>
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">User Management</h3>
              <div className="flex gap-2">
                <input
                  value={userSearch}
                  onChange={(event) => setUserSearch(event.target.value)}
                  placeholder="Search by name or email"
                  className={inputClass}
                />
                <button
                  onClick={() => loadUsers(userSearch)}
                  className={primaryButtonClass}
                >
                  <Search className="w-4 h-4" />
                  Search
                </button>
              </div>
            </div>

            <div className="overflow-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left border-b border-slate-200 text-slate-500">
                    <th className="p-2">Name</th>
                    <th className="p-2">Email</th>
                    <th className="p-2">Role</th>
                    <th className="p-2">Status</th>
                    <th className="p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-slate-500">No users found for this search.</td>
                    </tr>
                  ) : null}
                  {users.map((user) => (
                    <tr key={user._id} className="border-b border-slate-100">
                      <td className="p-2 font-medium text-slate-800">{user.name}</td>
                      <td className="p-2 text-slate-600">{user.email}</td>
                      <td className="p-2">
                        <select
                          value={user.role}
                          onChange={(event) => updateUserRole(user._id, event.target.value as AdminUser["role"])}
                          className="border border-slate-300 rounded px-2 py-1"
                        >
                          <option value="student">student</option>
                          <option value="counselor">counselor</option>
                          <option value="admin">admin</option>
                        </select>
                      </td>
                      <td className="p-2">
                        <span className={`px-2 py-1 rounded text-xs ${user.isActive ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`}>
                          {user.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="p-2">
                        <button
                          onClick={() =>
                            askConfirmation({
                              title: `${user.isActive ? "Deactivate" : "Activate"} User`,
                              description: `Are you sure you want to ${user.isActive ? "deactivate" : "activate"} ${user.name}?`,
                              confirmLabel: user.isActive ? "Deactivate" : "Activate",
                              confirmVariant: user.isActive ? "destructive" : "default",
                              action: async () => toggleUserActive(user),
                            })
                          }
                          className="inline-flex items-center gap-1 rounded border border-slate-300 px-2 py-1 hover:bg-slate-50"
                        >
                          <UserCheck className="w-4 h-4" />
                          Toggle
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "feedback" && (
          <div className={`${panelClass} p-5 animate-in fade-in-0 slide-in-from-bottom-1 duration-300`}>
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">Feedback Management</h3>
              <div className="flex gap-2 items-center">
                <select
                  value={feedbackStatus}
                  onChange={(event) => {
                    const selected = event.target.value as "All" | "Pending" | "Reviewed" | "Responded";
                    setFeedbackStatus(selected);
                    loadFeedbacks(selected);
                  }}
                  className={inputClass}
                >
                  <option value="All">All</option>
                  <option value="Pending">Pending</option>
                  <option value="Reviewed">Reviewed</option>
                  <option value="Responded">Responded</option>
                </select>
              </div>
            </div>

            <div className="space-y-3">
              {feedbacks.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500">No feedback records found.</div>
              ) : null}
              {feedbacks.map((item) => (
                <div key={item._id} className="border border-slate-200 rounded-lg p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                    <div>
                      <p className="font-medium text-slate-900">{item.name || "Anonymous"}</p>
                      <p className="text-xs text-slate-500">{item.email || "No email"}</p>
                    </div>
                    <select
                      value={item.status}
                      onChange={(event) => updateFeedbackStatus(item._id, event.target.value as AdminFeedback["status"])}
                      className="border border-slate-300 rounded px-2 py-1 text-sm"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Reviewed">Reviewed</option>
                      <option value="Responded">Responded</option>
                    </select>
                  </div>
                  <p className="text-sm text-slate-700">{item.message || "No message"}</p>
                  <div className="mt-2 text-xs text-slate-500 flex items-center justify-between">
                    <span>{item.type || "General"}</span>
                    <span>{item.submitted_on ? new Date(item.submitted_on).toLocaleString() : "-"}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "content" && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 animate-in fade-in-0 slide-in-from-bottom-1 duration-300">
            <Link href="/notifications/scholarship" className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all">
              <h4 className="font-semibold text-slate-900 mb-1">Scholarship Notifications</h4>
              <p className="text-sm text-slate-600">Manage scholarship updates visible to students.</p>
            </Link>
            <Link href="/notifications/examDate" className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all">
              <h4 className="font-semibold text-slate-900 mb-1">Exam Notifications</h4>
              <p className="text-sm text-slate-600">Review exam dates and important announcements.</p>
            </Link>
            <Link href="/notifications/counselingSchedule" className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all">
              <h4 className="font-semibold text-slate-900 mb-1">Counseling Notifications</h4>
              <p className="text-sm text-slate-600">Track counseling sessions and schedules.</p>
            </Link>
            <a href="/api/careers" className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all">
              <h4 className="font-semibold text-slate-900 mb-1">Careers Data API</h4>
              <p className="text-sm text-slate-600">View current career catalog records.</p>
            </a>
            <a href="/api/exams" className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all">
              <h4 className="font-semibold text-slate-900 mb-1">Exams Data API</h4>
              <p className="text-sm text-slate-600">View exam records used on website modules.</p>
            </a>
            <a href="/api/scholarships" className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all">
              <h4 className="font-semibold text-slate-900 mb-1">Scholarships Data API</h4>
              <p className="text-sm text-slate-600">View scholarship records used on website modules.</p>
            </a>
          </div>
        )}

        {activeTab === "profile" && (
          <div className={`${panelClass} p-6 space-y-5 animate-in fade-in-0 slide-in-from-bottom-1 duration-300`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-slate-600">Full Name</label>
                <input
                  value={profile.name}
                  onChange={(event) => setProfile((previous) => ({ ...previous, name: event.target.value }))}
                  className={`mt-1 ${inputClass}`}
                  placeholder="Admin name"
                />
              </div>
              <div>
                <label className="text-sm text-slate-600">Phone</label>
                <input
                  value={profile.phone}
                  onChange={(event) => setProfile((previous) => ({ ...previous, phone: event.target.value }))}
                  className={`mt-1 ${inputClass}`}
                  placeholder="+91 ..."
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-slate-600">Profile Image URL</label>
              <input
                value={profile.profileImage}
                onChange={(event) => setProfile((previous) => ({ ...previous, profileImage: event.target.value }))}
                className={`mt-1 ${inputClass}`}
                placeholder="https://..."
              />
            </div>

            <button onClick={saveProfile} className={primaryButtonClass}>
              <Save className="w-4 h-4" /> Save Profile
            </button>
          </div>
        )}

        {activeTab === "progressTracker" && (
          <div className="space-y-5 animate-in fade-in-0 slide-in-from-bottom-1 duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl border border-slate-200 p-4">
                <p className="text-sm text-slate-500">Students</p>
                <p className="text-3xl font-bold text-slate-900">{analytics?.progress.totalStudents ?? 0}</p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-4">
                <p className="text-sm text-slate-500">With Assessments</p>
                <p className="text-3xl font-bold text-slate-900">{analytics?.progress.studentsWithAssessments ?? 0}</p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-4">
                <p className="text-sm text-slate-500">With Sessions</p>
                <p className="text-3xl font-bold text-slate-900">{analytics?.progress.studentsWithSessions ?? 0}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl border border-slate-200 p-5">
                <h4 className="font-semibold text-slate-900 mb-3">Assessment Performance</h4>
                <div className="flex items-end gap-3">
                  <p className="text-4xl font-bold text-blue-700">{Math.round(analytics?.progress.averageAssessmentScore ?? 0)}%</p>
                  <p className="text-sm text-slate-500 pb-1">Average score across submitted assessments</p>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-5">
                <h4 className="font-semibold text-slate-900 mb-3">Counseling Completion</h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm text-slate-600 mb-1">
                      <span>Completed</span>
                      <span>{analytics?.progress.completedSessions ?? 0}</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded">
                      <div
                        className="h-2 bg-emerald-500 rounded"
                        style={{
                          width: `${
                            ((analytics?.progress.completedSessions ?? 0) /
                              Math.max((analytics?.progress.completedSessions ?? 0) + (analytics?.progress.scheduledSessions ?? 0), 1)) *
                            100
                          }%`,
                        }}
                      />
                    </div>
                  </div>
                  <div className="text-sm text-slate-500">Scheduled sessions: {analytics?.progress.scheduledSessions ?? 0}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "psychometricTest" && (
          <div className="space-y-5 animate-in fade-in-0 slide-in-from-bottom-1 duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl border border-slate-200 p-4"><p className="text-sm text-slate-500">Total Assessments</p><p className="text-2xl font-bold">{analytics?.psychometric.totalAssessments ?? 0}</p></div>
              <div className="bg-white rounded-xl border border-slate-200 p-4"><p className="text-sm text-slate-500">Active Assessments</p><p className="text-2xl font-bold">{analytics?.psychometric.activeAssessments ?? 0}</p></div>
              <div className="bg-white rounded-xl border border-slate-200 p-4"><p className="text-sm text-slate-500">Result Entries</p><p className="text-2xl font-bold">{analytics?.psychometric.totalResults ?? 0}</p></div>
              <div className="bg-white rounded-xl border border-slate-200 p-4"><p className="text-sm text-slate-500">Average Score</p><p className="text-2xl font-bold">{Math.round(analytics?.psychometric.averageScore ?? 0)}%</p></div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-5 overflow-auto">
              <h4 className="font-semibold text-slate-900 mb-3">Assessment Controls</h4>
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left border-b border-slate-200 text-slate-500">
                    <th className="p-2">Title</th>
                    <th className="p-2">Type</th>
                    <th className="p-2">Duration</th>
                    <th className="p-2">Questions</th>
                    <th className="p-2">Attempts</th>
                    <th className="p-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {assessments.map((assessment) => (
                    <tr key={assessment._id} className="border-b border-slate-100">
                      <td className="p-2 font-medium text-slate-800">{assessment.title}</td>
                      <td className="p-2 text-slate-600 capitalize">{assessment.type}</td>
                      <td className="p-2 text-slate-600">{assessment.duration} min</td>
                      <td className="p-2 text-slate-600">{assessment.totalQuestions}</td>
                      <td className="p-2 text-slate-600">{assessment.attempts}</td>
                      <td className="p-2">
                        <button
                          onClick={() =>
                            askConfirmation({
                              title: `${assessment.isActive ? "Disable" : "Enable"} Assessment`,
                              description: `This will mark \"${assessment.title}\" as ${assessment.isActive ? "inactive" : "active"}.`,
                              confirmLabel: assessment.isActive ? "Disable" : "Enable",
                              confirmVariant: assessment.isActive ? "destructive" : "default",
                              action: async () => updateAssessmentStatus(assessment._id, !assessment.isActive),
                            })
                          }
                          className={`inline-flex items-center gap-1 rounded px-2 py-1 text-xs ${assessment.isActive ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-700"}`}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          {assessment.isActive ? "Active" : "Inactive"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "shortListedColleges" && (
          <div className="space-y-5 animate-in fade-in-0 slide-in-from-bottom-1 duration-300">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl border border-slate-200 p-4"><p className="text-sm text-slate-500">Total Shortlisted</p><p className="text-3xl font-bold">{analytics?.shortlists.totalShortlisted ?? 0}</p></div>
              <div className="bg-white rounded-xl border border-slate-200 p-4"><p className="text-sm text-slate-500">Applied Colleges</p><p className="text-3xl font-bold">{analytics?.shortlists.appliedCount ?? 0}</p></div>
              <div className="bg-white rounded-xl border border-slate-200 p-4"><p className="text-sm text-slate-500">Unique Colleges</p><p className="text-3xl font-bold">{analytics?.shortlists.uniqueCollegeCount ?? 0}</p></div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <h4 className="font-semibold text-slate-900 mb-3">Top Shortlisted Colleges</h4>
              <div className="space-y-3">
                {(analytics?.shortlists.topColleges || []).map((college) => (
                  <div key={college.name} className="border border-slate-200 rounded-lg p-3 flex items-center justify-between">
                    <div>
                      <p className="font-medium text-slate-900">{college.name}</p>
                      <p className="text-xs text-slate-500">Applied by {college.applied} students</p>
                    </div>
                    <span className="rounded-full bg-indigo-50 text-indigo-700 px-3 py-1 text-xs">{college.count} shortlists</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "counselingBooking" && (
          <div className="space-y-5 animate-in fade-in-0 slide-in-from-bottom-1 duration-300">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl border border-slate-200 p-4"><p className="text-sm text-slate-500">Total Sessions</p><p className="text-2xl font-bold">{analytics?.counseling.totalSessions ?? 0}</p></div>
              <div className="bg-white rounded-xl border border-slate-200 p-4"><p className="text-sm text-slate-500">Upcoming</p><p className="text-2xl font-bold">{analytics?.counseling.upcomingSessions ?? 0}</p></div>
              <div className="bg-white rounded-xl border border-slate-200 p-4"><p className="text-sm text-slate-500">Completed</p><p className="text-2xl font-bold">{analytics?.counseling.completedSessions ?? 0}</p></div>
              <div className="bg-white rounded-xl border border-slate-200 p-4"><p className="text-sm text-slate-500">Cancelled</p><p className="text-2xl font-bold">{analytics?.counseling.cancelledSessions ?? 0}</p></div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-5 overflow-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left border-b border-slate-200 text-slate-500">
                    <th className="p-2">Student</th>
                    <th className="p-2">Counselor</th>
                    <th className="p-2">Type</th>
                    <th className="p-2">Date</th>
                    <th className="p-2">Platform</th>
                    <th className="p-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {counselingSessions.map((session) => (
                    <tr key={session._id} className="border-b border-slate-100">
                      <td className="p-2 text-slate-700">{session.studentName}</td>
                      <td className="p-2 text-slate-700">{session.counselorName}</td>
                      <td className="p-2 text-slate-700 capitalize">{session.type.replaceAll("-", " ")}</td>
                      <td className="p-2 text-slate-600">{new Date(session.scheduledAt).toLocaleString()}</td>
                      <td className="p-2 text-slate-600 capitalize">{session.platform.replaceAll("-", " ")}</td>
                      <td className="p-2">
                        <select
                          value={session.status}
                          onChange={(event) => updateSessionStatus(session._id, event.target.value as CounselingResponse["data"][number]["status"])}
                          className="border border-slate-300 rounded px-2 py-1"
                        >
                          <option value="scheduled">scheduled</option>
                          <option value="in-progress">in-progress</option>
                          <option value="completed">completed</option>
                          <option value="cancelled">cancelled</option>
                          <option value="no-show">no-show</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "govCollege" && (
          <div className="space-y-5 animate-in fade-in-0 slide-in-from-bottom-1 duration-300">
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <h4 className="font-semibold mb-3">Add College</h4>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                <input value={collegeForm.name} onChange={(event) => setCollegeForm((p) => ({ ...p, name: event.target.value }))} placeholder="College Name" className="border border-slate-300 rounded-lg px-3 py-2" />
                <select value={collegeForm.type} onChange={(event) => setCollegeForm((p) => ({ ...p, type: event.target.value }))} className="border border-slate-300 rounded-lg px-3 py-2"><option value="government">government</option><option value="private">private</option><option value="deemed">deemed</option></select>
                <select value={collegeForm.category} onChange={(event) => setCollegeForm((p) => ({ ...p, category: event.target.value }))} className="border border-slate-300 rounded-lg px-3 py-2"><option value="engineering">engineering</option><option value="medical">medical</option><option value="arts">arts</option><option value="science">science</option><option value="commerce">commerce</option><option value="law">law</option><option value="management">management</option></select>
                <input value={collegeForm.city} onChange={(event) => setCollegeForm((p) => ({ ...p, city: event.target.value }))} placeholder="City" className="border border-slate-300 rounded-lg px-3 py-2" />
                <input value={collegeForm.state} onChange={(event) => setCollegeForm((p) => ({ ...p, state: event.target.value }))} placeholder="State" className="border border-slate-300 rounded-lg px-3 py-2" />
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
                      <p className="text-xs text-slate-500 capitalize">{String(item.type || "-")} • {String(item.category || "-")}</p>
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
        )}

        {activeTab === "carrerOption" && (
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
        )}

        {activeTab === "competitiveExams" && (
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
        )}

        {activeTab === "scholarships" && (
          <div className="space-y-5 animate-in fade-in-0 slide-in-from-bottom-1 duration-300">
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <h4 className="font-semibold mb-3">Add Scholarship</h4>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <input value={scholarshipForm.name} onChange={(event) => setScholarshipForm((p) => ({ ...p, name: event.target.value }))} placeholder="Scholarship Name" className="border border-slate-300 rounded-lg px-3 py-2" />
                <input value={scholarshipForm.provider} onChange={(event) => setScholarshipForm((p) => ({ ...p, provider: event.target.value }))} placeholder="Provider" className="border border-slate-300 rounded-lg px-3 py-2" />
                <input value={scholarshipForm.amount} onChange={(event) => setScholarshipForm((p) => ({ ...p, amount: event.target.value }))} placeholder="Amount" className="border border-slate-300 rounded-lg px-3 py-2" />
                <input value={scholarshipForm.deadline} onChange={(event) => setScholarshipForm((p) => ({ ...p, deadline: event.target.value }))} placeholder="Deadline" className="border border-slate-300 rounded-lg px-3 py-2" />
              </div>
              <button onClick={() => createContent("scholarships", scholarshipForm)} className="mt-3 rounded-lg bg-slate-900 text-white px-4 py-2">Add Scholarship</button>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-2">
              {getResourceRows("scholarships").map((item) => (
                <div key={item._id} className="border border-slate-200 rounded-lg p-3 flex items-center justify-between">
                  <div>
                    <p className="font-medium">{String(item.name || "-")}</p>
                    <p className="text-xs text-slate-500">{String(item.provider || "-")} • {String(item.amount || "-")}</p>
                  </div>
                  <button
                    onClick={() =>
                      askConfirmation({
                        title: "Delete Scholarship",
                        description: `Delete ${String(item.name || "this scholarship")} permanently? This action cannot be undone.`,
                        confirmLabel: "Delete",
                        confirmVariant: "destructive",
                        action: async () => deleteContent("scholarships", item._id),
                      })
                    }
                    className="text-rose-600 hover:text-rose-700"
                  ><Trash2 className="w-4 h-4" /></button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "content" && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-4 animate-in fade-in-0 slide-in-from-bottom-1 duration-300">
            <div className="bg-gradient-to-br from-indigo-600 to-blue-600 text-white rounded-xl p-5">
              <div className="flex items-center gap-2 text-indigo-100 mb-2"><BookOpen className="w-4 h-4" /> Content Coverage</div>
              <p className="text-3xl font-bold">{(overview?.counters.colleges ?? 0) + (overview?.counters.careers ?? 0) + (overview?.counters.exams ?? 0) + (overview?.counters.scholarships ?? 0)}</p>
              <p className="text-sm text-indigo-100">Total active catalog records</p>
            </div>
            <div className="bg-gradient-to-br from-cyan-600 to-sky-600 text-white rounded-xl p-5">
              <div className="flex items-center gap-2 text-cyan-100 mb-2"><LineChart className="w-4 h-4" /> Assessment Insights</div>
              <p className="text-3xl font-bold">{analytics?.psychometric.totalResults ?? 0}</p>
              <p className="text-sm text-cyan-100">Assessment submissions tracked</p>
            </div>
            <div className="bg-gradient-to-br from-emerald-600 to-green-600 text-white rounded-xl p-5">
              <div className="flex items-center gap-2 text-emerald-100 mb-2"><CalendarClock className="w-4 h-4" /> Counseling Health</div>
              <p className="text-3xl font-bold">{analytics?.counseling.upcomingSessions ?? 0}</p>
              <p className="text-sm text-emerald-100">Upcoming counseling sessions</p>
            </div>
          </div>
        )}

        <AlertDialog open={confirmation.open} onOpenChange={(open) => !open && closeConfirmation()}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{confirmation.title}</AlertDialogTitle>
              <AlertDialogDescription>{confirmation.description}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={confirmLoading}>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={(event) => {
                  event.preventDefault();
                  runConfirmedAction();
                }}
                className={confirmation.confirmVariant === "destructive" ? "bg-rose-600 hover:bg-rose-700" : ""}
                disabled={confirmLoading}
              >
                {confirmLoading ? "Please wait..." : confirmation.confirmLabel}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </main>
      <Toaster />
    </div>
  );
}
