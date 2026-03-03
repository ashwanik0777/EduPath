import Link from "next/link"
import {
  Home,
  Info,
  Target,
  GraduationCap,
  BookOpen,
  Award,
  Bell,
  CreditCard,
  HelpCircle,
  LayoutDashboard,
  Users,
  Shield,
  FileText,
  Map,
  Code,
  LogIn,
  UserPlus,
  Sparkles,
} from "lucide-react"

export const metadata = {
  title: "Sitemap | EduPath",
  description: "Browse all pages and features available on the EduPath platform.",
}

type SitemapEntry = {
  label: string
  href: string
  description: string
  icon: React.ComponentType<{ className?: string }>
}

type SitemapSection = {
  title: string
  color: string
  bg: string
  border: string
  iconColor: string
  pages: SitemapEntry[]
}

const sections: SitemapSection[] = [
  {
    title: "Main Pages",
    color: "text-indigo-700",
    bg: "bg-indigo-50",
    border: "border-indigo-200",
    iconColor: "text-indigo-500",
    pages: [
      { label: "Home", href: "/", icon: Home, description: "Platform overview, hero, featured sections" },
      { label: "About Us", href: "/about", icon: Info, description: "EduPath mission, vision, and team" },
      { label: "Pricing", href: "/pricing", icon: CreditCard, description: "Free, monthly, and yearly plans" },
      { label: "Tech Titans", href: "/techTitans", icon: Code, description: "Developer team profiles" },
    ],
  },
  {
    title: "Career & Guidance",
    color: "text-cyan-700",
    bg: "bg-cyan-50",
    border: "border-cyan-200",
    iconColor: "text-cyan-500",
    pages: [
      { label: "Career Assessment", href: "/careerAssessment", icon: Target, description: "Psychometric career discovery tool" },
      { label: "Government Colleges", href: "/governmentCollege", icon: GraduationCap, description: "State, Central & Private colleges" },
      { label: "Study Resources", href: "/studyResources", icon: BookOpen, description: "Curated learning material by stream" },
      { label: "Competitive Exams", href: "/competitiveExams", icon: Award, description: "JEE, NEET, UPSC and other top exams" },
    ],
  },
  {
    title: "College Categories",
    color: "text-emerald-700",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    iconColor: "text-emerald-500",
    pages: [
      { label: "State Government Colleges", href: "/governmentCollege/state-government", icon: GraduationCap, description: "State-funded public institutions" },
      { label: "Central Government Colleges", href: "/governmentCollege/central-government", icon: GraduationCap, description: "IITs, NITs, and central institutes" },
      { label: "Private Colleges", href: "/governmentCollege/private", icon: GraduationCap, description: "Top private universities and colleges" },
    ],
  },
  {
    title: "Notifications & Updates",
    color: "text-amber-700",
    bg: "bg-amber-50",
    border: "border-amber-200",
    iconColor: "text-amber-500",
    pages: [
      { label: "Notifications", href: "/notifications", icon: Bell, description: "All platform announcements" },
      { label: "Exam Dates", href: "/notifications/examDate", icon: HelpCircle, description: "Upcoming government exam schedules" },
      { label: "Scholarship Alerts", href: "/notifications/scholarship", icon: Sparkles, description: "New scholarship opportunities" },
      { label: "Counseling Schedule", href: "/notifications/counselingSchedule", icon: Bell, description: "Book and track counselor sessions" },
    ],
  },
  {
    title: "Dashboards & Tools",
    color: "text-violet-700",
    bg: "bg-violet-50",
    border: "border-violet-200",
    iconColor: "text-violet-500",
    pages: [
      { label: "Student Dashboard", href: "/studentDashboard", icon: LayoutDashboard, description: "Personal progress, bookmarks, and sessions" },
      { label: "Quiz Corner", href: "/quiz", icon: HelpCircle, description: "Test your knowledge with subject quizzes" },
    ],
  },
  {
    title: "Account",
    color: "text-rose-700",
    bg: "bg-rose-50",
    border: "border-rose-200",
    iconColor: "text-rose-500",
    pages: [
      { label: "Register", href: "/register", icon: UserPlus, description: "Create a new EduPath account" },
      { label: "Login", href: "/login", icon: LogIn, description: "Sign in to your account" },
    ],
  },
  {
    title: "Legal & Info",
    color: "text-slate-700",
    bg: "bg-slate-50",
    border: "border-slate-200",
    iconColor: "text-slate-400",
    pages: [
      { label: "Privacy Policy", href: "/privacy-policy", icon: Shield, description: "How we collect and protect your data" },
      { label: "Terms of Use", href: "/terms-of-use", icon: FileText, description: "Rules governing platform usage" },
      { label: "Sitemap", href: "/sitemap", icon: Map, description: "Complete directory of all EduPath pages" },
    ],
  },
]

export default function SitemapPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/40 to-cyan-50/50">
      {/* Hero */}
      <div className="relative overflow-hidden bg-[#0b1120] py-20 px-6">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-8 -left-12 w-72 h-72 bg-cyan-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-12 w-64 h-64 bg-indigo-600/15 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur mb-5">
            <Map className="w-8 h-8 text-cyan-300" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">Sitemap</h1>
          <p className="text-indigo-200 text-lg max-w-2xl mx-auto">
            A complete directory of every page and feature available on EduPath. Find what you need instantly.
          </p>
          <p className="text-slate-500 text-sm mt-3">
            {sections.reduce((sum, s) => sum + s.pages.length, 0)} pages across {sections.length} categories
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections.map((section) => (
            <div key={section.title} className={`rounded-2xl border ${section.border} bg-white shadow-sm overflow-hidden`}>
              <div className={`px-5 py-4 border-b ${section.border} ${section.bg}`}>
                <h2 className={`font-bold text-base ${section.color}`}>{section.title}</h2>
              </div>
              <ul className="divide-y divide-slate-100">
                {section.pages.map(({ label, href, icon: Icon, description }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="flex items-start gap-3 px-5 py-4 hover:bg-slate-50 transition-colors group"
                    >
                      <div className={`mt-0.5 w-8 h-8 rounded-lg ${section.bg} flex items-center justify-center shrink-0`}>
                        <Icon className={`w-4 h-4 ${section.iconColor}`} />
                      </div>
                      <div>
                        <p className={`text-sm font-semibold text-slate-800 group-hover:${section.color} transition-colors`}>
                          {label}
                        </p>
                        <p className="text-xs text-slate-500 leading-relaxed">{description}</p>
                      </div>
                      <span className="ml-auto text-slate-300 group-hover:text-slate-500 transition-colors text-xs self-center">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl bg-gradient-to-br from-indigo-50 to-cyan-50 border border-indigo-100 px-6 py-5 text-center text-sm text-slate-600">
          Can&apos;t find what you&apos;re looking for?{" "}
          <a href="mailto:support@edupath.in" className="text-indigo-700 font-semibold hover:underline">
            Contact our support team
          </a>
        </div>
      </div>
    </div>
  )
}
