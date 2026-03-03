"use client";

import { useEffect, useMemo, useState } from "react";
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
  BadgeDollarSign,
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
import { OverviewTab } from "./components/tabs/OverviewTab";
import { UsersTab } from "./components/tabs/UsersTab";
import { FeedbackTab } from "./components/tabs/FeedbackTab";
import { ContentCenterTab } from "./components/tabs/ContentCenterTab";
import { ProfileTab } from "./components/tabs/ProfileTab";
import { ProgressTrackerTab } from "./components/tabs/ProgressTrackerTab";
import { PsychometricTab } from "./components/tabs/PsychometricTab";
import { ShortListedCollegesTab } from "./components/tabs/ShortListedCollegesTab";
import { CounselingBookingTab } from "./components/tabs/CounselingBookingTab";
import { GovCollegeTab } from "./components/tabs/GovCollegeTab";
import { CareerOptionTab } from "./components/tabs/CareerOptionTab";
import { CompetitiveExamsTab } from "./components/tabs/CompetitiveExamsTab";
import { ScholarshipsTab } from "./components/tabs/ScholarshipsTab";
import { WebsiteManagementTab } from "./components/tabs/WebsiteManagementTab";
import { WebsiteStatisticsTab } from "./components/tabs/WebsiteStatisticsTab";
import { WebsitePageDetailsTab } from "./components/tabs/WebsitePageDetailsTab";
import { TechTitansTab } from "./components/tabs/TechTitansTab";
import { PricingManagementTab } from "./components/tabs/PricingManagementTab";
import { DEFAULT_PRICING, type WebsitePricing } from "@/app/lib/pricingDefaults";

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
  | "websiteNotifications"
  | "techTitans"
  | "pricingManagement";
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
    techTitans: false,
    pricingManagement: false,
  });

  const [collegeForm, setCollegeForm] = useState({
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
  const [careerForm, setCareerForm] = useState({ title: "", stream: "", salary_range: "", career_nature: "" });
  const [examForm, setExamForm] = useState({ name: "", type: "", eligibility: "", exam_date: "", state: "" });
  const [scholarshipForm, setScholarshipForm] = useState({ name: "", provider: "", amount: "", deadline: "" });
  const [websiteSettings, setWebsiteSettings] = useState<WebsiteSettings>({
    maintenanceMode: false,
    collegeSearchProvider: "algolia",
    heroTitle: "Discover Your Best Career Path",
    heroSubtitle: "Personalized guidance, top colleges, scholarships, and counseling in one platform.",
    primaryColor: "#4f46e5",
    supportEmail: "support@edupath.com",
    footerText: "© 2026 EduPath. All rights reserved.",
    seoTitle: "EduPath - Career Guidance Platform",
    seoDescription: "Career planning and counseling platform for students.",
    pricing: DEFAULT_PRICING,
  });
  const [announcementInput, setAnnouncementInput] = useState("");
  const [websiteAnnouncements, setWebsiteAnnouncements] = useState<WebsiteAnnouncement[]>([]);
  const [websitePages, setWebsitePages] = useState<WebsitePage[]>([]);
  const [techTitans, setTechTitans] = useState<ContentResponse["data"]>([]);
  const [techTitansSearch, setTechTitansSearch] = useState("");

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

  const updateContent = async (resource: ContentResource, id: string, payload: Record<string, unknown>) => {
    try {
      await fetchJson("/api/admin/content", {
        method: "PUT",
        body: JSON.stringify({ resource, id, payload }),
      });
      await Promise.all([loadContent(resource, contentSearch[resource]), loadOverview()]);
      showSuccessToast("Content updated", `${resource.slice(0, -1)} record updated successfully.`);
    } catch {
      setError(`Could not update ${resource.slice(0, -1)}.`);
      showErrorToast(`Could not update ${resource.slice(0, -1)}.`);
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

  const loadTechTitans = async (query?: string) => {
    const q = query?.trim() ? `?q=${encodeURIComponent(query.trim())}` : "";
    const result = await fetchJson<ContentResponse>(`/api/admin/tech-titans${q}`);
    setTechTitans(result.data || []);
  };

  const createTechTitan = async (payload: Record<string, unknown>) => {
    await fetchJson("/api/admin/tech-titans", {
      method: "POST",
      body: JSON.stringify({ payload }),
    });
    await loadTechTitans(techTitansSearch);
    showSuccessToast("Member added", "Tech Titan profile created successfully.");
  };

  const updateTechTitan = async (id: string, payload: Record<string, unknown>) => {
    await fetchJson("/api/admin/tech-titans", {
      method: "PATCH",
      body: JSON.stringify({ id, payload }),
    });
    await loadTechTitans(techTitansSearch);
    showSuccessToast("Member updated", "Tech Titan profile updated successfully.");
  };

  const deleteTechTitan = async (id: string) => {
    await fetchJson("/api/admin/tech-titans", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });
    await loadTechTitans(techTitansSearch);
    showSuccessToast("Member deleted", "Tech Titan profile removed successfully.");
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

  const reindexCollegesSearch = async () => {
    try {
      const result = await fetchJson<{ success: boolean; data?: { indexedCount: number; provider: string } }>("/api/admin/colleges/reindex", {
        method: "POST",
      });
      const count = result?.data?.indexedCount ?? 0;
      showSuccessToast("Reindex completed", `${count} colleges synced to search index.`);
    } catch {
      setError("Could not reindex colleges.");
      showErrorToast("Could not reindex colleges search index.");
    }
  };

  const switchCollegeSearchProvider = async (provider: "algolia" | "database") => {
    try {
      await fetchJson("/api/admin/website-management", {
        method: "PATCH",
        body: JSON.stringify({
          action: "updateSettings",
          payload: {
            collegeSearchProvider: provider,
          },
        }),
      });

      setWebsiteSettings((previous) => ({ ...previous, collegeSearchProvider: provider }));
      showSuccessToast("Search technique switched", `College search is now using ${provider}.`);
    } catch {
      setError("Could not switch search technique.");
      showErrorToast("Could not switch college search technique.");
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
        } else if (activeTab === "pricingManagement") {
          await loadWebsiteManagement();
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
        } else if (activeTab === "techTitans") {
          await loadTechTitans(techTitansSearch);
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
        { id: "govCollege", label: "Colleges", icon: GraduationCap, color: "text-blue-500" },
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
        { id: "pricingManagement", label: "Pricing Management", icon: BadgeDollarSign, color: "text-emerald-600" },
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
        ["home", "about", "pricing", "career-assessment", "government-college", "study-resources", "notifications"].includes(page.id),
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
    govCollege: { title: "Colleges", subtitle: "Manage private, state government, and central government colleges" },
    shortListedColleges: { title: "Short Listed College", subtitle: "Analyze shortlist trends and adoption" },
    carrerOption: { title: "Career Option", subtitle: "Manage career roadmap content" },
    counselingBooking: { title: "Counseling Booking", subtitle: "Control counseling schedules and session states" },
    competitiveExams: { title: "Competitive Exams", subtitle: "Manage exam guidance records" },
    scholarships: { title: "Scholarships", subtitle: "Maintain scholarship database records" },
    websiteManagement: { title: "Website Management", subtitle: "Control website pages, content visibility, announcements, pricing plans, and platform-level settings" },
    websiteStatistics: { title: "Website Statistics", subtitle: "Track full website performance and coverage statistics" },
    websiteHome: { title: "Home Page", subtitle: "Manage Home page specific details and SEO" },
    websiteAbout: { title: "About Page", subtitle: "Manage About page specific details and SEO" },
    websiteCareerAssessment: { title: "Career Assessment Page", subtitle: "Manage Career Assessment page details" },
    websiteGovernmentCollege: { title: "Government College Page", subtitle: "Manage Government College page details" },
    websiteStudyResources: { title: "Study Resources Page", subtitle: "Manage Study Resources page details" },
    websiteNotifications: { title: "Notifications Page", subtitle: "Manage Notifications page details" },
    pricingManagement: { title: "Pricing Management", subtitle: "Manage all subscription plans, free tier, discounts, comparison table, and testimonials" },
    techTitans: {
      title: "Tech Titans",
      subtitle: "Create and manage developer profiles powering the EduPath experience"
    },
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-indigo-50 to-cyan-50 flex items-center justify-center px-4">
        <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white/90 backdrop-blur p-8 shadow-lg">
          <div className="w-10 h-10 mx-auto border-4 border-slate-300 border-t-slate-800 rounded-full animate-spin" />
          <p className="mt-5 text-center text-sm font-medium text-slate-700">Preparing the Admin Command Center...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-[radial-gradient(circle_at_top_right,_#e0e7ff_0%,_#f8fafc_38%,_#ffffff_65%)]">
      <div className="h-screen min-h-screen sticky top-0 left-0 z-[120]">
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
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white/95 backdrop-blur shadow-md p-5 md:p-7 mb-6">
          <div className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-indigo-100/60 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-16 h-48 w-48 rounded-full bg-cyan-100/60 blur-3xl" />

          <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              {/* <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-600 to-cyan-600 text-white flex items-center justify-center shadow-md shrink-0">
                <WandSparkles className="w-6 h-6" />
              </div> */}
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-[11px] font-semibold tracking-wide text-indigo-700 mb-2">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  ADMIN CONTROL PANEL
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900">{moduleHeader[activeTab].title}</h2>
                <p className="text-slate-600 mt-1">{moduleHeader[activeTab].subtitle}</p>
              </div>
            </div>

            <div className="flex flex-col items-start lg:items-end gap-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <Activity className="w-3.5 h-3.5" />
                  System Live
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                  <UserCheck className="w-3.5 h-3.5" />
                  {adminInfo.role}
                </span>
                <span className="inline-flex items-center text-xs px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                  {new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button onClick={refreshAll} className={secondaryButtonClass}>
                  <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
                  Refresh
                </button>
                <button
                  onClick={() => setActiveTab("techTitans")}
                  className="inline-flex items-center gap-2 rounded-xl bg-slate-900 text-white px-3.5 py-2 text-sm font-medium hover:bg-slate-800 transition-colors"
                >
                  <Sparkles className="w-4 h-4" />
                  Update Tech Titans
                </button>
              </div>
            </div>
          </div>
        </div>

        {error ? (
          <div className="mb-6 rounded-2xl border border-rose-200 bg-rose-50/90 px-4 py-3.5 text-rose-800 text-sm flex items-start gap-2.5 shadow-sm">
            <Bell className="w-4 h-4 mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold">Action Needed</p>
              <p className="text-rose-700">{error}</p>
            </div>
          </div>
        ) : null}

        {tabLoading ? (
          <div className="mb-6 bg-white/95 rounded-2xl border border-slate-200 p-8 flex flex-col items-center justify-center gap-3 shadow-sm">
            <div className="w-8 h-8 border-4 border-slate-300 border-t-slate-700 rounded-full animate-spin" />
            <p className="text-sm text-slate-600">Loading module data...</p>
          </div>
        ) : null}

        <div className="rounded-3xl border border-slate-200 bg-white/80 backdrop-blur-sm p-3 md:p-4 shadow-sm">

        {activeTab === "overview" && (
          <OverviewTab
            panelClass={panelClass}
            adminName={adminInfo.name}
            metricCards={metricCards}
            overview={overview}
            analytics={analytics}
          />
        )}

        {activeTab === "users" && (
          <UsersTab
            panelClass={panelClass}
            inputClass={inputClass}
            primaryButtonClass={primaryButtonClass}
            users={users}
            userSearch={userSearch}
            setUserSearch={setUserSearch}
            loadUsers={loadUsers}
            updateUserRole={updateUserRole}
            askConfirmation={askConfirmation}
            toggleUserActive={toggleUserActive}
          />
        )}

        {activeTab === "feedback" && (
          <FeedbackTab
            panelClass={panelClass}
            inputClass={inputClass}
            feedbacks={feedbacks}
            feedbackStatus={feedbackStatus}
            setFeedbackStatus={setFeedbackStatus}
            loadFeedbacks={loadFeedbacks}
            updateFeedbackStatus={updateFeedbackStatus}
          />
        )}

        {activeTab === "content" && (
          <ContentCenterTab overview={overview} analytics={analytics} />
        )}

        {activeTab === "profile" && (
          <ProfileTab
            panelClass={panelClass}
            inputClass={inputClass}
            primaryButtonClass={primaryButtonClass}
            profile={profile}
            setProfile={setProfile}
            saveProfile={saveProfile}
          />
        )}

        {activeTab === "progressTracker" && (
          <ProgressTrackerTab analytics={analytics} />
        )}

        {activeTab === "psychometricTest" && (
          <PsychometricTab
            analytics={analytics}
            assessments={assessments}
            askConfirmation={askConfirmation}
            updateAssessmentStatus={updateAssessmentStatus}
          />
        )}

        {activeTab === "shortListedColleges" && (
          <ShortListedCollegesTab analytics={analytics} />
        )}

        {activeTab === "counselingBooking" && (
          <CounselingBookingTab
            analytics={analytics}
            counselingSessions={counselingSessions}
            updateSessionStatus={updateSessionStatus}
          />
        )}

        {activeTab === "govCollege" && (
          <GovCollegeTab
            collegeForm={collegeForm}
            setCollegeForm={setCollegeForm}
            createContent={createContent}
            updateContent={updateContent}
            getResourceRows={getResourceRows}
            contentSearch={contentSearch}
            setContentSearch={setContentSearch}
            loadContent={loadContent}
            askConfirmation={askConfirmation}
            deleteContent={deleteContent}
          />
        )}

        {activeTab === "carrerOption" && (
          <CareerOptionTab
            careerForm={careerForm}
            setCareerForm={setCareerForm}
            createContent={createContent}
            getResourceRows={getResourceRows}
            askConfirmation={askConfirmation}
            deleteContent={deleteContent}
          />
        )}

        {activeTab === "competitiveExams" && (
          <CompetitiveExamsTab
            examForm={examForm}
            setExamForm={setExamForm}
            createContent={createContent}
            getResourceRows={getResourceRows}
            askConfirmation={askConfirmation}
            deleteContent={deleteContent}
          />
        )}

        {activeTab === "scholarships" && (
          <ScholarshipsTab
            scholarshipForm={scholarshipForm}
            setScholarshipForm={setScholarshipForm}
            createContent={createContent}
            getResourceRows={getResourceRows}
            askConfirmation={askConfirmation}
            deleteContent={deleteContent}
          />
        )}



        {activeTab === "websiteManagement" && (
          <WebsiteManagementTab
            focusedWebsitePages={focusedWebsitePages}
            websiteSettings={websiteSettings}
            setWebsiteSettings={setWebsiteSettings}
            websiteAnnouncements={websiteAnnouncements}
            announcementInput={announcementInput}
            setAnnouncementInput={setAnnouncementInput}
            inputClass={inputClass}
            primaryButtonClass={primaryButtonClass}
            activeTabSetter={(tabId) => setActiveTab(tabId as TabKey)}
            pageIdToWebsiteTab={pageIdToWebsiteTab as Record<string, string>}
            toggleWebsitePageStatus={toggleWebsitePageStatus}
            addAnnouncement={addAnnouncement}
            toggleAnnouncement={toggleAnnouncement}
            askConfirmation={askConfirmation}
            removeAnnouncement={removeAnnouncement}
            reindexCollegesSearch={reindexCollegesSearch}
            switchCollegeSearchProvider={switchCollegeSearchProvider}
            saveWebsiteManagement={saveWebsiteManagement}
          />
        )}

        {activeTab === "websiteStatistics" && (
          <WebsiteStatisticsTab
            focusedWebsitePages={focusedWebsitePages}
            websiteSettings={websiteSettings}
            overview={overview}
            analytics={analytics}
          />
        )}

        {activeTab === "pricingManagement" && (
          <PricingManagementTab
            pricing={websiteSettings.pricing}
            setPricing={(updater) =>
              setWebsiteSettings((prev) => ({ ...prev, pricing: updater(prev.pricing) }))
            }
            inputClass={inputClass}
            primaryButtonClass={primaryButtonClass}
            saveWebsiteManagement={saveWebsiteManagement}
          />
        )}

        {activeTab === "techTitans" && (
          <TechTitansTab
            techTitans={techTitans}
            techTitansSearch={techTitansSearch}
            setTechTitansSearch={setTechTitansSearch}
            loadTechTitans={loadTechTitans}
            createTechTitan={createTechTitan}
            updateTechTitan={updateTechTitan}
            deleteTechTitan={deleteTechTitan}
            askConfirmation={askConfirmation}
          />
        )}

        {(activeTab === "websiteHome" ||
          activeTab === "websiteAbout" ||
          activeTab === "websiteCareerAssessment" ||
          activeTab === "websiteGovernmentCollege" ||
          activeTab === "websiteStudyResources" ||
          activeTab === "websiteNotifications") && (
          <WebsitePageDetailsTab
            selectedWebsitePage={selectedWebsitePage}
            inputClass={inputClass}
            primaryButtonClass={primaryButtonClass}
            toggleWebsitePageStatus={toggleWebsitePageStatus}
            updateWebsitePageDraft={updateWebsitePageDraft}
            saveWebsitePage={saveWebsitePage}
          />
        )}
        </div>

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
