import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/lib/mongoose";
import { requireAdmin } from "@/app/lib/adminAuth";
import College from "@/app/models/College";
import Career from "@/app/models/Career";
import Exam from "@/app/models/Exam";
import Scholarship from "@/app/models/Scholarship";
import Assessment from "@/app/models/Assessment";
import WebsiteManagement from "@/app/models/WebsiteManagement";

type PageStatus = "published" | "draft";

type DefaultPage = {
  pageId: string;
  name: string;
  route: string;
  owner: string;
  title: string;
  subtitle: string;
  seoTitle: string;
  seoDescription: string;
};

const DEFAULT_PRICING = {
  freeTier: {
    enabled: true,
    durationDays: 7,
    maxAssessments: 1,
    maxCounselingSessions: 1,
    features: [
      "Career discovery starter assessment",
      "1 counseling session with mentor",
      "Basic progress dashboard",
    ],
    alwaysFreeFeatures: [
      "Study resources access",
      "Government college listings",
      "Scholarship and exam notifications",
    ],
  },
  monthlyPlan: {
    name: "Pro Monthly",
    description: "For active students who need ongoing mentor and planning support.",
    priceINR: 1999,
    priceUSD: 29,
    features: [
      "Unlimited assessment attempts",
      "4 counseling sessions / month",
      "Personalized roadmap + reminders",
    ],
  },
  yearlyPlan: {
    name: "Pro Yearly",
    description: "Best value plan for complete yearly guidance and admissions prep.",
    priceINR: 14999,
    priceUSD: 199,
    features: [
      "Everything in Monthly",
      "Priority counselor booking",
      "Admission strategy guidance",
    ],
  },
  singleCounselingPlan: {
    name: "Single Counseling Session",
    description: "One focused session for stream/career/college decision support.",
    priceINR: 799,
    priceUSD: 12,
    durationMinutes: 45,
    features: [
      "1:1 live counseling",
      "Session summary notes",
      "Next-step action checklist",
    ],
  },
  firstSubscriptionDiscount: 50,
};

function normalizePricing(pricing: unknown) {
  const source = (pricing || {}) as Record<string, unknown>;
  const merged = {
    ...DEFAULT_PRICING,
    ...source,
  } as typeof DEFAULT_PRICING;

  return {
    ...merged,
    firstSubscriptionDiscount: 50,
  };
}

const DEFAULT_PAGES: DefaultPage[] = [
  {
    pageId: "home",
    name: "Homepage",
    route: "/",
    owner: "Content Team",
    title: "Discover Your Best Career Path",
    subtitle: "Personalized guidance and opportunities for every student.",
    seoTitle: "EduPath Home",
    seoDescription: "Explore careers, colleges, exams, and scholarships with EduPath.",
  },
  {
    pageId: "about",
    name: "About",
    route: "/about",
    owner: "Admin",
    title: "About EduPath",
    subtitle: "Learn about our mission and support system.",
    seoTitle: "About EduPath",
    seoDescription: "Know the vision and team behind EduPath.",
  },
  {
    pageId: "career-assessment",
    name: "Career Assessment",
    route: "/careerAssessment",
    owner: "Counselor Ops",
    title: "Career Assessment",
    subtitle: "Evaluate strengths and interest areas for better career planning.",
    seoTitle: "Career Assessment | EduPath",
    seoDescription: "Take guided career assessments and get actionable insights.",
  },
  {
    pageId: "government-college",
    name: "Government Colleges",
    route: "/governmentCollege",
    owner: "Data Team",
    title: "Government Colleges",
    subtitle: "Find and compare government institutions.",
    seoTitle: "Government Colleges | EduPath",
    seoDescription: "Browse government college data and make informed decisions.",
  },
  {
    pageId: "study-resources",
    name: "Study Resources",
    route: "/studyResources",
    owner: "Academic Team",
    title: "Study Resources",
    subtitle: "Access curated learning resources.",
    seoTitle: "Study Resources | EduPath",
    seoDescription: "Find notes, guides, and learning support resources.",
  },
  {
    pageId: "competitive-exams",
    name: "Competitive Exams",
    route: "/competitiveExams",
    owner: "Exam Team",
    title: "Competitive Exams",
    subtitle: "Track important exam information and deadlines.",
    seoTitle: "Competitive Exams | EduPath",
    seoDescription: "View and manage competitive exam opportunities.",
  },
  {
    pageId: "quiz",
    name: "Quiz",
    route: "/quiz",
    owner: "Assessment Team",
    title: "Quiz",
    subtitle: "Practice and improve with guided quizzes.",
    seoTitle: "Quiz | EduPath",
    seoDescription: "Take quizzes to evaluate preparation and understanding.",
  },
  {
    pageId: "pricing",
    name: "Pricing",
    route: "/pricing",
    owner: "Growth Team",
    title: "Pricing Plans",
    subtitle: "Compare plans and choose what fits your journey.",
    seoTitle: "Pricing | EduPath",
    seoDescription: "Explore free tier, subscriptions, and counseling pricing.",
  },
  {
    pageId: "notifications",
    name: "Notifications",
    route: "/notifications",
    owner: "Communications",
    title: "Notifications",
    subtitle: "Centralized updates for students.",
    seoTitle: "Notifications | EduPath",
    seoDescription: "Check all scholarship, exam, and counseling updates.",
  },
  {
    pageId: "notifications-scholarship",
    name: "Scholarship Notifications",
    route: "/notifications/scholarship",
    owner: "Scholarship Team",
    title: "Scholarship Notifications",
    subtitle: "Latest scholarship announcements.",
    seoTitle: "Scholarship Notifications | EduPath",
    seoDescription: "Track scholarship updates and deadlines.",
  },
  {
    pageId: "notifications-exam",
    name: "Exam Date Notifications",
    route: "/notifications/examDate",
    owner: "Exam Team",
    title: "Exam Date Notifications",
    subtitle: "Timely updates about exam schedules.",
    seoTitle: "Exam Notifications | EduPath",
    seoDescription: "Stay updated with exam dates and schedule changes.",
  },
  {
    pageId: "notifications-counseling",
    name: "Counseling Schedule Notifications",
    route: "/notifications/counselingSchedule",
    owner: "Counseling Team",
    title: "Counseling Schedule",
    subtitle: "Keep track of counseling schedule updates.",
    seoTitle: "Counseling Notifications | EduPath",
    seoDescription: "View counseling schedule updates and alerts.",
  },
  {
    pageId: "login",
    name: "Login",
    route: "/login",
    owner: "Auth Team",
    title: "Sign in",
    subtitle: "Access your EduPath account.",
    seoTitle: "Login | EduPath",
    seoDescription: "Secure sign in for students, counselors, and admins.",
  },
  {
    pageId: "register",
    name: "Register",
    route: "/register",
    owner: "Auth Team",
    title: "Create account",
    subtitle: "Join EduPath and start your guidance journey.",
    seoTitle: "Register | EduPath",
    seoDescription: "Create your account to access EduPath services.",
  },
  {
    pageId: "student-dashboard",
    name: "Student Dashboard",
    route: "/studentDashboard",
    owner: "Product Team",
    title: "Student Dashboard",
    subtitle: "Track your learning and counseling progress.",
    seoTitle: "Student Dashboard | EduPath",
    seoDescription: "All student tools and progress in one dashboard.",
  },
  {
    pageId: "counselor-dashboard",
    name: "Counselor Dashboard",
    route: "/counselorDashboard",
    owner: "Counselor Ops",
    title: "Counselor Dashboard",
    subtitle: "Manage student counseling workflows.",
    seoTitle: "Counselor Dashboard | EduPath",
    seoDescription: "Counseling operations and session management dashboard.",
  },
  {
    pageId: "admin-dashboard",
    name: "Admin Dashboard",
    route: "/adminDashboard",
    owner: "Admin",
    title: "Admin Dashboard",
    subtitle: "Manage platform operations and content.",
    seoTitle: "Admin Dashboard | EduPath",
    seoDescription: "Admin control center for platform management.",
  },
];

function toIsoDate(value?: Date | string) {
  if (!value) return new Date().toISOString();
  if (value instanceof Date) return value.toISOString();
  return new Date(value).toISOString();
}

function getRecordCountMap(counts: {
  colleges: number;
  careers: number;
  exams: number;
  scholarships: number;
  assessments: number;
}, announcementCount: number) {
  return {
    "/": counts.colleges + counts.careers + counts.exams + counts.scholarships,
    "/about": 1,
    "/pricing": 1,
    "/careerAssessment": counts.assessments,
    "/governmentCollege": counts.colleges,
    "/studyResources": 0,
    "/competitiveExams": counts.exams,
    "/quiz": counts.assessments,
    "/notifications": announcementCount,
    "/notifications/scholarship": counts.scholarships,
    "/notifications/examDate": counts.exams,
    "/notifications/counselingSchedule": announcementCount,
    "/login": 1,
    "/register": 1,
    "/studentDashboard": counts.careers + counts.exams + counts.scholarships,
    "/counselorDashboard": counts.assessments,
    "/adminDashboard": counts.colleges + counts.careers + counts.exams + counts.scholarships,
  } as Record<string, number>;
}

async function ensureWebsiteManagementDocument() {
  let doc = await WebsiteManagement.findOne({ singletonKey: "primary" });

  if (!doc) {
    doc = await WebsiteManagement.create({
      singletonKey: "primary",
      pricing: DEFAULT_PRICING,
      pages: DEFAULT_PAGES.map((page) => ({
        ...page,
        status: "published" as PageStatus,
        updatedAt: new Date(),
      })),
      announcements: [
        {
          announcementId: `ann-${Date.now()}-1`,
          text: "Scholarship update for 2026 applications is now live.",
          active: true,
          createdAt: new Date(),
        },
        {
          announcementId: `ann-${Date.now()}-2`,
          text: "Counseling slots for this week are open.",
          active: true,
          createdAt: new Date(),
        },
      ],
    });
  }

  const existingRoutes = new Set((doc.pages || []).map((item: { route?: string }) => item.route));
  const missing = DEFAULT_PAGES.filter((item) => !existingRoutes.has(item.route));
  if (missing.length > 0) {
    doc.pages.push(
      ...missing.map((page) => ({
        ...page,
        status: "published" as PageStatus,
        updatedAt: new Date(),
      })),
    );
    await doc.save();
  }

  if (!doc.pricing) {
    (doc as any).pricing = DEFAULT_PRICING;
    await doc.save();
  } else {
    const normalizedPricing = normalizePricing((doc as any).pricing);
    (doc as any).pricing = normalizedPricing;
    await doc.save();
  }

  if (!(doc as any).collegeSearchProvider) {
    (doc as any).collegeSearchProvider = "algolia";
    await doc.save();
  }

  return doc;
}

export async function GET(request: NextRequest) {
  const { unauthorizedResponse } = await requireAdmin(request);
  if (unauthorizedResponse) return unauthorizedResponse;

  await connectDB();

  const doc = await ensureWebsiteManagementDocument();
  const [colleges, careers, exams, scholarships, assessments] = await Promise.all([
    College.countDocuments(),
    Career.countDocuments(),
    Exam.countDocuments(),
    Scholarship.countDocuments(),
    Assessment.countDocuments(),
  ]);

  const announcementCount = Array.isArray(doc.announcements) ? doc.announcements.length : 0;
  const countMap = getRecordCountMap({ colleges, careers, exams, scholarships, assessments }, announcementCount);

  const pages = (doc.pages || []).map((page: {
    pageId: string;
    name: string;
    route: string;
    status: PageStatus;
    owner: string;
    title: string;
    subtitle: string;
    seoTitle: string;
    seoDescription: string;
    updatedAt?: Date;
  }) => ({
    id: page.pageId,
    name: page.name,
    route: page.route,
    status: page.status,
    owner: page.owner,
    title: page.title,
    subtitle: page.subtitle,
    seoTitle: page.seoTitle,
    seoDescription: page.seoDescription,
    records: countMap[page.route] ?? 0,
    lastUpdated: toIsoDate(page.updatedAt || doc.updatedAt),
  }));

  return NextResponse.json({
    success: true,
    data: {
      settings: {
        maintenanceMode: doc.maintenanceMode,
        collegeSearchProvider: (doc as any).collegeSearchProvider || "algolia",
        heroTitle: doc.heroTitle,
        heroSubtitle: doc.heroSubtitle,
        primaryColor: doc.primaryColor,
        supportEmail: doc.supportEmail,
        footerText: doc.footerText,
        seoTitle: doc.seoTitle,
        seoDescription: doc.seoDescription,
        pricing: normalizePricing(doc.pricing || DEFAULT_PRICING),
      },
      announcements: (doc.announcements || []).map((item: { announcementId: string; text: string; active: boolean; createdAt?: Date }) => ({
        id: item.announcementId,
        text: item.text,
        active: item.active,
        createdAt: toIsoDate(item.createdAt),
      })),
      pages,
    },
  });
}

export async function PATCH(request: NextRequest) {
  const { unauthorizedResponse } = await requireAdmin(request);
  if (unauthorizedResponse) return unauthorizedResponse;

  await connectDB();

  const body = await request.json();
  const action = body?.action as string;

  const doc = await ensureWebsiteManagementDocument();

  if (action === "updateSettings") {
    const patch = body?.payload || {};
    const allowedKeys = [
      "maintenanceMode",
      "collegeSearchProvider",
      "heroTitle",
      "heroSubtitle",
      "primaryColor",
      "supportEmail",
      "footerText",
      "seoTitle",
      "seoDescription",
      "pricing",
    ] as const;

    for (const key of allowedKeys) {
      if (patch[key] !== undefined) {
        (doc as unknown as Record<string, unknown>)[key] = patch[key];
      }
    }

    if ((doc as any).pricing) {
      (doc as any).pricing = normalizePricing((doc as any).pricing);
    }

    await doc.save();
    return NextResponse.json({ success: true });
  }

  if (action === "updatePage") {
    const pageId = body?.pageId as string;
    const patch = body?.payload || {};

    if (!pageId) {
      return NextResponse.json({ success: false, message: "pageId is required" }, { status: 400 });
    }

    const page = doc.pages.find((item: { pageId: string }) => item.pageId === pageId);
    if (!page) {
      return NextResponse.json({ success: false, message: "Page not found" }, { status: 404 });
    }

    const allowedPageKeys = ["title", "subtitle", "seoTitle", "seoDescription", "owner"] as const;
    for (const key of allowedPageKeys) {
      if (patch[key] !== undefined) {
        (page as unknown as Record<string, unknown>)[key] = patch[key];
      }
    }

    page.updatedAt = new Date();
    await doc.save();
    return NextResponse.json({ success: true });
  }

  if (action === "togglePageStatus") {
    const pageId = body?.pageId as string;
    if (!pageId) {
      return NextResponse.json({ success: false, message: "pageId is required" }, { status: 400 });
    }

    const page = doc.pages.find((item: { pageId: string }) => item.pageId === pageId);
    if (!page) {
      return NextResponse.json({ success: false, message: "Page not found" }, { status: 404 });
    }

    page.status = page.status === "published" ? "draft" : "published";
    page.updatedAt = new Date();
    await doc.save();
    return NextResponse.json({ success: true, status: page.status });
  }

  if (action === "addAnnouncement") {
    const text = typeof body?.text === "string" ? body.text.trim() : "";
    if (!text) {
      return NextResponse.json({ success: false, message: "Announcement text is required" }, { status: 400 });
    }

    doc.announcements.unshift({
      announcementId: `ann-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
      text,
      active: true,
      createdAt: new Date(),
    });
    await doc.save();
    return NextResponse.json({ success: true });
  }

  if (action === "toggleAnnouncement") {
    const announcementId = body?.announcementId as string;
    if (!announcementId) {
      return NextResponse.json({ success: false, message: "announcementId is required" }, { status: 400 });
    }

    const announcement = doc.announcements.find((item: { announcementId: string }) => item.announcementId === announcementId);
    if (!announcement) {
      return NextResponse.json({ success: false, message: "Announcement not found" }, { status: 404 });
    }

    announcement.active = !announcement.active;
    await doc.save();
    return NextResponse.json({ success: true, active: announcement.active });
  }

  if (action === "removeAnnouncement") {
    const announcementId = body?.announcementId as string;
    if (!announcementId) {
      return NextResponse.json({ success: false, message: "announcementId is required" }, { status: 400 });
    }

    doc.announcements = doc.announcements.filter(
      (item: { announcementId: string }) => item.announcementId !== announcementId,
    );
    await doc.save();
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ success: false, message: "Invalid action" }, { status: 400 });
}
