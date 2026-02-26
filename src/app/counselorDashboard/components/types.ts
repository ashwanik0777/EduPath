export type CoreCounselorTab = "overview" | "sessions" | "students" | "messages";
export type ExtendedCounselorTab =
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

export type CounselorTab = CoreCounselorTab | ExtendedCounselorTab;

export type MeResponse = {
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

export type SessionItem = {
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

export type CounselorStudentItem = {
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

export type CounselorStudentsResponse = {
  success: boolean;
  data: CounselorStudentItem[];
};

export type CounselorOverview = {
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

export type SessionsResponse = {
  success: boolean;
  data: SessionItem[];
};

export type CounselorProfileResponse = {
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

export type ResourceItem = Record<string, unknown> & { _id: string };

export type CounselorResourcesResponse = {
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

export type CounselorPsychometricResponse = {
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

export type CounselorFeedbackItem = {
  _id: string;
  type: string;
  message: string;
  status: "Pending" | "Reviewed" | "Responded";
  suggestionCategory?: string;
  submitted_on?: string;
};

export type CounselorFeedbackResponse = {
  success: boolean;
  data: CounselorFeedbackItem[];
};

export type ProfileDraft = {
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

export type OverviewInsights = {
  totalSessions: number;
  completedCount: number;
  activeCount: number;
  cancelledOrNoShowCount: number;
  completionRate: number;
  avgDuration: number;
  nextSession: SessionItem | undefined;
  todayTimeline: SessionItem[];
  weekBuckets: Array<{ label: string; count: number }>;
};

export type RecommendationItem = {
  id: string;
  name: string;
  location: string;
  score: number;
  type: string;
};
