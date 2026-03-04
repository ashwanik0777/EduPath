import { GraduationCap, BookOpen, Briefcase, CheckCircle2, ArrowRight, Sparkles } from "lucide-react"

const services = [
  {
    icon: GraduationCap,
    badge: "Most Popular",
    title: "Master Counsellor Bundle",
    desc: "8 Course Bundle · Become a Pro Counsellor",
    originalPrice: "₹50,500",
    price: "₹27,000",
    audience: "For Educationists & Teachers",
    features: ["Lifetime Access", "4 Certificates", "Doubt Clearing Sessions"],
    gradient: "from-violet-600 to-purple-700",
    bgGradient: "from-violet-50 to-purple-50",
    border: "border-violet-200",
    badgeBg: "bg-violet-600",
    btnClass: "border-2 border-violet-300 bg-violet-50 text-violet-700 hover:bg-violet-100",
  },
  {
    icon: BookOpen,
    badge: "For Students",
    title: "Certification for Students",
    desc: "16 Modules · Guide School Students",
    originalPrice: "₹15,000",
    price: "₹10,000",
    audience: "For Students (Class 8th–12th)",
    features: ["Practical Training", "Peer Community", "Career Roadmap"],
    gradient: "from-blue-600 to-cyan-600",
    bgGradient: "from-blue-50 to-cyan-50",
    border: "border-blue-200",
    badgeBg: "bg-blue-600",
    btnClass: "border-2 border-blue-300 bg-blue-50 text-blue-700 hover:bg-blue-100",
  },
  {
    icon: Briefcase,
    badge: "Best Value",
    title: "Job Readiness Toolkit",
    desc: "17+ Modules · 30+ Hours Training",
    originalPrice: "₹5,000",
    price: "₹2,000",
    audience: "For Graduates & Job Seekers",
    features: ["Expert Mentorship", "Interview Prep", "Resume Templates"],
    gradient: "from-emerald-600 to-teal-600",
    bgGradient: "from-emerald-50 to-teal-50",
    border: "border-emerald-200",
    badgeBg: "bg-emerald-600",
    btnClass: "border-2 border-emerald-300 bg-emerald-50 text-emerald-700 hover:bg-emerald-100",
  },
]

export default function Services() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-violet-50 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-50 rounded-full translate-y-1/2 -translate-x-1/3 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-100 text-violet-700 text-sm font-semibold mb-4">
            <Sparkles className="w-4 h-4" />
            Our Services
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight">
            Our Counselling{" "}
            <span className="bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
              Services
            </span>
          </h2>
          
        </div>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = s.icon
            return (
              <div
                key={i}
                className={`group relative rounded-3xl bg-gradient-to-br ${s.bgGradient} border ${s.border} p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden flex flex-col`}
              >
                {/* Badge */}
                <span
                  className={`absolute top-5 right-5 ${s.badgeBg} text-white text-xs font-bold px-3 py-1 rounded-full`}
                >
                  {s.badge}
                </span>

                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${s.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-7 h-7 text-white" strokeWidth={2} />
                </div>

                {/* Title & desc */}
                <h3 className="text-xl font-bold text-slate-800 mb-1">{s.title}</h3>
                <p className="text-sm text-slate-500 mb-4">{s.desc}</p>

                {/* Pricing */}
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-slate-400 text-sm line-through">{s.originalPrice}</span>
                  <span className="text-2xl font-bold text-slate-800">{s.price}</span>
                </div>
                <span className="text-xs text-slate-500 mb-5">{s.audience}</span>

                {/* Features */}
                <ul className="space-y-2 mb-6 flex-1">
                  {s.features.map((feature, fi) => (
                    <li key={fi} className="flex items-center gap-2 text-sm text-slate-600">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  className={`w-full flex items-center justify-center gap-2 py-3 px-5 rounded-2xl ${s.btnClass} font-semibold hover:-translate-y-0.5 hover:shadow-md active:scale-[0.99] transition-all duration-200`}
                >
                  Enroll Now
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
