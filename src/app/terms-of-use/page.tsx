import { FileText, UserCheck, AlertTriangle, Gavel, RefreshCw, Shield } from "lucide-react"

export const metadata = {
  title: "Terms of Use | EduPath",
  description: "Read the terms and conditions governing your use of the EduPath platform.",
}

const sections = [
  {
    icon: UserCheck,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    title: "Eligibility & Account",
    content: [
      "EduPath is available to students, counselors, and educational institutions in India.",
      "You must provide accurate and complete information when creating an account.",
      "You are responsible for maintaining the confidentiality of your login credentials.",
      "Accounts may not be shared. Each user must maintain their own individual account.",
      "You must be at least 13 years old to create an account. Users under 18 require parental consent.",
    ],
  },
  {
    icon: FileText,
    color: "text-cyan-600",
    bg: "bg-cyan-50",
    title: "Permitted Use",
    content: [
      "EduPath is a career guidance platform for personal, non-commercial educational use.",
      "You may access career assessments, college searches, counseling bookings, and study resources.",
      "Content on this platform — articles, assessments, guides — is for personal use only and may not be republished.",
      "Automated scraping, bulk downloads, or data harvesting of any kind is strictly prohibited.",
      "You may link to public pages of EduPath with attribution, but may not frame or embed platform content.",
    ],
  },
  {
    icon: AlertTriangle,
    color: "text-amber-600",
    bg: "bg-amber-50",
    title: "Prohibited Conduct",
    content: [
      "Attempting to gain unauthorized access to other user accounts or any part of the platform.",
      "Uploading or transmitting any harmful, misleading, or offensive content.",
      "Impersonating another person, counselor, or institution.",
      "Using EduPath for any commercial solicitation, spam, or unsolicited promotion.",
      "Interfering with the security, integrity, or performance of the platform or its servers.",
      "Creating fake assessments, results, or counseling sessions.",
    ],
  },
  {
    icon: Shield,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    title: "Intellectual Property",
    content: [
      "All content, design, assessments, branding, and code on EduPath is owned by EduPath and its licensors.",
      "The EduPath name, logo, and brand elements may not be used without prior written permission.",
      "User-submitted content (feedback, reviews) remains the user's property but grants EduPath a license to display it.",
      "If you believe your intellectual property has been infringed, contact us immediately at support@edupath.in.",
    ],
  },
  {
    icon: Gavel,
    color: "text-rose-600",
    bg: "bg-rose-50",
    title: "Disclaimer & Liability",
    content: [
      "EduPath provides career guidance information for informational purposes only and is not a substitute for professional advice.",
      "College cutoffs, exam dates, and scholarship data are updated regularly but may not always reflect the latest information.",
      "EduPath is not liable for decisions you make based on content or counselor advice on the platform.",
      "We are not responsible for outages, data loss, or technical issues beyond our reasonable control.",
      "Platform availability is provided on an 'as-is' basis without warranty of uninterrupted access.",
    ],
  },
  {
    icon: RefreshCw,
    color: "text-violet-600",
    bg: "bg-violet-50",
    title: "Termination & Changes",
    content: [
      "EduPath reserves the right to suspend or terminate accounts that violate these terms.",
      "You may delete your account at any time from your dashboard settings.",
      "We may update these terms periodically. Significant changes will be communicated via email or platform notice.",
      "Continued use of EduPath after any update constitutes acceptance of the revised terms.",
      "These terms are governed by the laws of India. Disputes shall be subject to the jurisdiction of courts in Greater Noida, Uttar Pradesh.",
    ],
  },
]

export default function TermsOfUsePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/40 to-cyan-50/50">
      <div className="relative overflow-hidden bg-[#0b1120] py-20 px-6">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-8 -left-12 w-72 h-72 bg-violet-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-600/15 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur mb-5">
            <FileText className="w-8 h-8 text-violet-300" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">Terms of Use</h1>
          <p className="text-indigo-200 text-lg max-w-2xl mx-auto">
            By using EduPath, you agree to these terms. Please read them carefully before accessing our services.
          </p>
          <p className="text-slate-500 text-sm mt-3">Effective Date: March 1, 2026</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16 space-y-6">
        {sections.map(({ icon: Icon, color, bg, title, content }) => (
          <div key={title} className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-100">
              <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center shrink-0`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <h2 className="text-lg font-bold text-slate-900">{title}</h2>
            </div>
            <ul className="px-6 py-5 space-y-3">
              {content.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-slate-700 leading-relaxed">
                  <span className={`mt-1.5 w-1.5 h-1.5 rounded-full ${bg} border-2 ${color.replace("text-", "border-")} shrink-0`} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="rounded-2xl bg-gradient-to-br from-violet-50 to-indigo-50 border border-violet-100 px-6 py-5 text-center text-sm text-slate-600">
          Questions about these terms?{" "}
          <a href="mailto:support@edupath.in" className="text-violet-700 font-semibold hover:underline">
            support@edupath.in
          </a>
        </div>
      </div>
    </div>
  )
}
