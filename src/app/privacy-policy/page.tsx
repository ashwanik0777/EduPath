import { Shield, Lock, Eye, Database, Bell, Mail } from "lucide-react"

export const metadata = {
  title: "Privacy Policy | EduPath",
  description: "Learn how EduPath collects, uses, and protects your personal information.",
}

const sections = [
  {
    icon: Database,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    title: "Information We Collect",
    content: [
      "Personal details such as name, email address, phone number, and academic background when you register.",
      "Career assessment responses, quiz results, and counseling session data to personalize your experience.",
      "College shortlisting preferences, bookmarks, and saved resources.",
      "Usage data including pages visited, features used, and session duration for improving our services.",
      "Device and browser information for security and compatibility purposes.",
    ],
  },
  {
    icon: Eye,
    color: "text-cyan-600",
    bg: "bg-cyan-50",
    title: "How We Use Your Information",
    content: [
      "To deliver personalized career guidance, college recommendations, and assessment insights.",
      "To facilitate counseling session bookings and communications with verified counselors.",
      "To send relevant notifications about government exams, scholarships, and new resources.",
      "To improve platform functionality, fix bugs, and develop new features.",
      "To maintain account security and prevent fraudulent activity.",
    ],
  },
  {
    icon: Lock,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    title: "Data Security",
    content: [
      "All data transmitted between your device and our servers is encrypted using HTTPS/TLS protocols.",
      "Passwords are stored using industry-standard one-way hashing (bcrypt) and are never stored in plain text.",
      "We perform regular security audits and keep our infrastructure updated.",
      "Access to personal data is strictly limited to authorized personnel on a need-to-know basis.",
      "We do not sell your personal data to third parties under any circumstances.",
    ],
  },
  {
    icon: Bell,
    color: "text-violet-600",
    bg: "bg-violet-50",
    title: "Cookies & Tracking",
    content: [
      "We use session cookies to keep you logged in and maintain your preferences.",
      "Analytics cookies help us understand how students use EduPath and where we can improve.",
      "You may disable cookies in your browser, but some features may not function correctly.",
      "We do not use third-party advertising cookies or sell cookie data.",
    ],
  },
  {
    icon: Shield,
    color: "text-rose-600",
    bg: "bg-rose-50",
    title: "Your Rights",
    content: [
      "You may request access to the personal data we hold about you at any time.",
      "You may request correction of inaccurate data or deletion of your account and associated data.",
      "You may opt out of non-essential communications at any time via your dashboard settings.",
      "For data-related requests, contact us at the email below and we will respond within 7 business days.",
    ],
  },
  {
    icon: Mail,
    color: "text-amber-600",
    bg: "bg-amber-50",
    title: "Contact & Updates",
    content: [
      "For privacy-related queries, reach us at support@edupath.in.",
      "This policy may be updated periodically. Material changes will be notified via email or in-app notice.",
      "Continued use of EduPath after updates constitutes acceptance of the revised policy.",
      "This policy was last updated on March 1, 2026.",
    ],
  },
]

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/40 to-cyan-50/50">
      <div className="relative overflow-hidden bg-[#0b1120] py-20 px-6">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-8 -left-12 w-72 h-72 bg-indigo-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-cyan-600/15 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur mb-5">
            <Shield className="w-8 h-8 text-indigo-300" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">Privacy Policy</h1>
          <p className="text-indigo-200 text-lg max-w-2xl mx-auto">
            Your privacy matters. Here is how EduPath collects, uses, and safeguards your personal information.
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

        <div className="rounded-2xl bg-gradient-to-br from-indigo-50 to-cyan-50 border border-indigo-100 px-6 py-5 text-center text-sm text-slate-600">
          Questions about this policy?{" "}
          <a href="mailto:support@edupath.in" className="text-indigo-700 font-semibold hover:underline">
            support@edupath.in
          </a>
        </div>
      </div>
    </div>
  )
}
