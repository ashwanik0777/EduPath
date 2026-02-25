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
  Globe,
  Settings2,
  MonitorSmartphone,
  Megaphone,
  Palette,
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
  | "scholarships"
  | "websiteManagement"
  | "websiteStatistics"
  | "websiteHome"
  | "websiteAbout"
  | "websiteCareerAssessment"
  | "websiteGovernmentCollege"
  | "websiteStudyResources"
  | "websiteNotifications";
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

type WebsiteSettings = {
  maintenanceMode: boolean;
  heroTitle: string;
  heroSubtitle: string;
  primaryColor: string;
  supportEmail: string;
  footerText: string;
  seoTitle: string;
  seoDescription: string;
};

type WebsiteAnnouncement = {
  id: string;
  text: string;
  active: boolean;
  createdAt?: string;
};

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
    settings: WebsiteSettings;
    announcements: WebsiteAnnouncement[];
    pages: WebsitePage[];
  };
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
    websiteManagement: false,
    websiteStatistics: false,
    websiteHome: false,
    websiteAbout: false,
    websiteCareerAssessment: false,
    websiteGovernmentCollege: false,
    websiteStudyResources: false,
    websiteNotifications: false,
  });

  const [collegeForm, setCollegeForm] = useState({ name: "", type: "government", category: "engineering", city: "", state: "" });
  const [careerForm, setCareerForm] = useState({ title: "", stream: "", salary_range: "", career_nature: "" });
  const [examForm, setExamForm] = useState({ name: "", type: "", eligibility: "", exam_date: "", state: "" });
  const [scholarshipForm, setScholarshipForm] = useState({ name: "", provider: "", amount: "", deadline: "" });
  const [websiteSettings, setWebsiteSettings] = useState<WebsiteSettings>({
    maintenanceMode: false,
    heroTitle: "Discover Your Best Career Path",
    heroSubtitle: "Personalized guidance, government colleges, scholarships, and counseling in one platform.",
    primaryColor: "#4f46e5",
    supportEmail: "support@edupath.com",
    footerText: "© 2026 EduPath. All rights reserved.",
    seoTitle: "EduPath - Career Guidance Platform",
    seoDescription: "Career planning and counseling platform for students.",
  });
  const [announcementInput, setAnnouncementInput] = useState("");
  const [websiteAnnouncements, setWebsiteAnnouncements] = useState<WebsiteAnnouncement[]>([]);
  const [websitePages, setWebsitePages] = useState<WebsitePage[]>([]);

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

  const websiteTabToPageId: Record<
    "websiteHome" | "websiteAbout" | "websiteCareerAssessment" | "websiteGovernmentCollege" | "websiteStudyResources" | "websiteNotifications",
    string
  > = {
    websiteHome: "home",
    websiteAbout: "about",
    websiteCareerAssessment: "career-assessment",
    websiteGovernmentCollege: "government-college",
    websiteStudyResources: "study-resources",
    websiteNotifications: "notifications",
  };

  const pageIdToWebsiteTab: Record<string, TabKey> = {
    home: "websiteHome",
    about: "websiteAbout",
    "career-assessment": "websiteCareerAssessment",
    "government-college": "websiteGovernmentCollege",
    "study-resources": "websiteStudyResources",
    notifications: "websiteNotifications",
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
      await Promise.all([loadOverview(), loadUsers(), loadFeedbacks(), loadAnalytics(), loadProfile(), loadWebsiteManagement()]);
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
      if (activeTab === "websiteManagement") {
        await loadWebsiteManagement();
      }
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

  const loadWebsiteManagement = async () => {
    const result = await fetchJson<WebsiteManagementResponse>("/api/admin/website-management");
    setWebsiteSettings(result.data.settings);
    setWebsiteAnnouncements(result.data.announcements || []);
    setWebsitePages(result.data.pages || []);
  };

  const saveWebsiteManagement = async () => {
    try {
      await fetchJson("/api/admin/website-management", {
        method: "PATCH",
        body: JSON.stringify({ action: "updateSettings", payload: websiteSettings }),
      });
      await loadWebsiteManagement();
      showSuccessToast("Website settings saved", "Website management settings updated successfully.");
    } catch {
      setError("Could not save website settings.");
      showErrorToast("Could not save website settings.");
    }
  };

  const addAnnouncement = async () => {
    const text = announcementInput.trim();
    if (!text) {
      showErrorToast("Please enter announcement text.");
      return;
    }

    try {
      await fetchJson("/api/admin/website-management", {
        method: "PATCH",
        body: JSON.stringify({ action: "addAnnouncement", text }),
      });
      setAnnouncementInput("");
      await loadWebsiteManagement();
      showSuccessToast("Announcement added", "New website announcement has been added.");
    } catch {
      setError("Could not add announcement.");
      showErrorToast("Could not add announcement.");
    }
  };

  const toggleAnnouncement = async (id: string) => {
    try {
      await fetchJson("/api/admin/website-management", {
        method: "PATCH",
        body: JSON.stringify({ action: "toggleAnnouncement", announcementId: id }),
      });
      await loadWebsiteManagement();
      showSuccessToast("Announcement updated", "Announcement status updated.");
    } catch {
      setError("Could not update announcement.");
      showErrorToast("Could not update announcement.");
    }
  };

  const removeAnnouncement = async (id: string) => {
    try {
      await fetchJson("/api/admin/website-management", {
        method: "PATCH",
        body: JSON.stringify({ action: "removeAnnouncement", announcementId: id }),
      });
      await loadWebsiteManagement();
      showSuccessToast("Announcement removed", "Announcement deleted successfully.");
    } catch {
      setError("Could not remove announcement.");
      showErrorToast("Could not remove announcement.");
    }
  };

  const toggleWebsitePageStatus = async (id: string) => {
    try {
      await fetchJson("/api/admin/website-management", {
        method: "PATCH",
        body: JSON.stringify({ action: "togglePageStatus", pageId: id }),
      });
      await loadWebsiteManagement();
      showSuccessToast("Page status updated", "Website page visibility updated successfully.");
    } catch {
      setError("Could not update page status.");
      showErrorToast("Could not update page status.");
    }
  };

  const updateWebsitePageDraft = (
    id: string,
    field: "title" | "subtitle" | "seoTitle" | "seoDescription" | "owner",
    value: string,
  ) => {
    setWebsitePages((previous) =>
      previous.map((page) => (page.id === id ? { ...page, [field]: value } : page)),
    );
  };

  const saveWebsitePage = async (id: string) => {
    const page = websitePages.find((item) => item.id === id);
    if (!page) return;

    try {
      await fetchJson("/api/admin/website-management", {
        method: "PATCH",
        body: JSON.stringify({
          action: "updatePage",
          pageId: id,
          payload: {
            title: page.title,
            subtitle: page.subtitle,
            seoTitle: page.seoTitle,
            seoDescription: page.seoDescription,
            owner: page.owner,
          },
        }),
      });
      await loadWebsiteManagement();
      showSuccessToast("Page updated", `${page.name} details updated successfully.`);
    } catch {
      setError("Could not save page details.");
      showErrorToast("Could not save page details.");
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
        } else if (
          activeTab === "websiteManagement" ||
          activeTab === "websiteStatistics" ||
          activeTab === "websiteHome" ||
          activeTab === "websiteAbout" ||
          activeTab === "websiteCareerAssessment" ||
          activeTab === "websiteGovernmentCollege" ||
          activeTab === "websiteStudyResources" ||
          activeTab === "websiteNotifications"
        ) {
          await loadWebsiteManagement();
          if (activeTab === "websiteStatistics") {
            await Promise.all([loadOverview(), loadAnalytics()]);
          }
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
    {
      id: "overview",
      label: "Overview",
      icon: LayoutDashboard,
      color: "text-indigo-500",
    },
    {
      id: "operationsGroup",
      label: "Admin Operations",
      icon: Users,
      color: "text-blue-500",
      children: [
        { id: "users", label: "Users", icon: Users, color: "text-blue-500" },
        { id: "counselingBooking", label: "Counseling Booking", icon: Clock, color: "text-cyan-500" },
        { id: "progressTracker", label: "Progress Tracker", icon: RefreshCw, color: "text-rose-500" },
        { id: "shortListedColleges", label: "Shortlisted Colleges", icon: CalendarDays, color: "text-teal-500" },
        { id: "feedback", label: "Feedback", icon: MessageSquare, color: "text-cyan-500" },
      ],
    },
    {
      id: "assessmentGovGroup",
      label: "Testing & Government",
      icon: Target,
      color: "text-violet-500",
      children: [
        { id: "psychometricTest", label: "Psychometric Test", icon: Target, color: "text-purple-500" },
        { id: "govCollege", label: "Government Colleges", icon: GraduationCap, color: "text-blue-500" },
        { id: "scholarships", label: "Government Scholarships", icon: GraduationCap, color: "text-yellow-500" },
        { id: "competitiveExams", label: "Government Exams", icon: Award, color: "text-orange-500" },
        { id: "carrerOption", label: "Career Options", icon: Briefcase, color: "text-emerald-500" },
      ],
    },
    {
      id: "websiteGroup",
      label: "Website Management",
      icon: Globe,
      color: "text-emerald-500",
      children: [
        { id: "websiteManagement", label: "Website Controls", icon: Settings2, color: "text-indigo-500" },
        { id: "websiteStatistics", label: "Website Statistics", icon: LineChart, color: "text-cyan-500" },
        { id: "websiteHome", label: "Home", icon: Globe, color: "text-blue-500" },
        { id: "websiteAbout", label: "About", icon: FileCog, color: "text-violet-500" },
        { id: "websiteCareerAssessment", label: "Career Assessment", icon: Target, color: "text-purple-500" },
        { id: "websiteGovernmentCollege", label: "Government College", icon: GraduationCap, color: "text-emerald-500" },
        { id: "websiteStudyResources", label: "Study Resources", icon: BookOpen, color: "text-amber-500" },
        { id: "websiteNotifications", label: "Notifications", icon: Bell, color: "text-pink-500" },
        { id: "content", label: "Content Center", icon: FileCog, color: "text-emerald-500" },
      ],
    },
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
  const selectedWebsitePage = useMemo(() => {
    const pageId = websiteTabToPageId[
      activeTab as keyof typeof websiteTabToPageId
    ];
    if (!pageId) return null;
    return websitePages.find((page) => page.id === pageId) || null;
  }, [activeTab, websitePages]);
  const focusedWebsitePages = useMemo(
    () =>
      websitePages.filter((page) =>
        ["home", "about", "career-assessment", "government-college", "study-resources", "notifications"].includes(page.id),
      ),
    [websitePages],
  );
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
    websiteManagement: { title: "Website Management", subtitle: "Control website pages, content visibility, announcements, and platform-level settings" },
    websiteStatistics: { title: "Website Statistics", subtitle: "Track full website performance and coverage statistics" },
    websiteHome: { title: "Home Page", subtitle: "Manage Home page specific details and SEO" },
    websiteAbout: { title: "About Page", subtitle: "Manage About page specific details and SEO" },
    websiteCareerAssessment: { title: "Career Assessment Page", subtitle: "Manage Career Assessment page details" },
    websiteGovernmentCollege: { title: "Government College Page", subtitle: "Manage Government College page details" },
    websiteStudyResources: { title: "Study Resources Page", subtitle: "Manage Study Resources page details" },
    websiteNotifications: { title: "Notifications Page", subtitle: "Manage Notifications page details" },
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
          onProfileClick={() => setActiveTab("profile")}
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

        {activeTab === "websiteManagement" && (
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
                          onClick={() => setActiveTab((pageIdToWebsiteTab[page.id] || "websiteManagement") as TabKey)}
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
        )}

        {activeTab === "websiteStatistics" && (
          <div className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-1 duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl border border-slate-200 p-4">
                <p className="text-xs text-slate-500 uppercase tracking-wide">Focused Website Pages</p>
                <p className="text-2xl font-bold mt-1 text-slate-900">{focusedWebsitePages.length}</p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-4">
                <p className="text-xs text-slate-500 uppercase tracking-wide">Published Pages</p>
                <p className="text-2xl font-bold mt-1 text-emerald-700">
                  {focusedWebsitePages.filter((page) => page.status === "published").length}
                </p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-4">
                <p className="text-xs text-slate-500 uppercase tracking-wide">Total Website Records</p>
                <p className="text-2xl font-bold mt-1 text-indigo-700">
                  {focusedWebsitePages.reduce((sum, page) => sum + (page.records || 0), 0)}
                </p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-4">
                <p className="text-xs text-slate-500 uppercase tracking-wide">Maintenance Mode</p>
                <p className={`text-2xl font-bold mt-1 ${websiteSettings.maintenanceMode ? "text-rose-600" : "text-emerald-600"}`}>
                  {websiteSettings.maintenanceMode ? "On" : "Off"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl border border-slate-200 p-4">
                <p className="text-sm text-slate-500">Total Users</p>
                <p className="text-3xl font-bold text-slate-900">{overview?.counters.users ?? 0}</p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-4">
                <p className="text-sm text-slate-500">Assessments Submitted</p>
                <p className="text-3xl font-bold text-slate-900">{analytics?.psychometric.totalResults ?? 0}</p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-4">
                <p className="text-sm text-slate-500">Upcoming Counseling Sessions</p>
                <p className="text-3xl font-bold text-slate-900">{analytics?.counseling.upcomingSessions ?? 0}</p>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <h4 className="font-semibold text-slate-900 mb-3">Website Page Statistics</h4>
              <div className="space-y-2">
                {focusedWebsitePages.map((page) => (
                  <div key={page.id} className="rounded-lg border border-slate-200 p-3 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div>
                      <p className="font-medium text-slate-900">{page.name}</p>
                      <p className="text-xs text-slate-500">Route: {page.route}</p>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-slate-600">Records: <span className="font-semibold text-slate-900">{page.records}</span></span>
                      <span className={page.status === "published" ? "text-emerald-700 font-semibold" : "text-amber-700 font-semibold"}>
                        {page.status === "published" ? "Published" : "Draft"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {(activeTab === "websiteHome" ||
          activeTab === "websiteAbout" ||
          activeTab === "websiteCareerAssessment" ||
          activeTab === "websiteGovernmentCollege" ||
          activeTab === "websiteStudyResources" ||
          activeTab === "websiteNotifications") && (
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
