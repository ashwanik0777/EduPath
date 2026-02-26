import {
  LayoutDashboard,
  Calendar,
  Users,
  MessageSquare,
  Clock,
  RefreshCw,
  Target,
  GraduationCap,
  Briefcase,
  Award,
  UserCircle2,
} from "lucide-react";
import { MenuItem } from "@/app/components/Sidebar";
import { CounselorTab } from "./types";

export const tabsMeta: Record<CounselorTab, { title: string; subtitle: string }> = {
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

export const menuItems: MenuItem[] = [
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
