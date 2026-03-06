"use client"
import { CheckCircle2, TrendingUp, Shield, Clock, Star, Brain, Sparkles } from "lucide-react"

const benefits = [
  {
    text: "Discover your hidden strengths and improvement areas",
    icon: Brain,
    iconColor: "text-violet-600",
    iconBg: "bg-violet-50",
    border: "border-violet-100",
    hoverBorder: "hover:border-violet-200",
  },
  {
    text: "Choose the right stream, course, and long-term career path",
    icon: TrendingUp,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50",
    border: "border-blue-100",
    hoverBorder: "hover:border-blue-200",
  },
  {
    text: "Avoid wrong career decisions and save years of valuable time",
    icon: Shield,
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-50",
    border: "border-emerald-100",
    hoverBorder: "hover:border-emerald-200",
  },
  {
    text: "Build genuine confidence with clear, practical guidance",
    icon: Star,
    iconColor: "text-amber-600",
    iconBg: "bg-amber-50",
    border: "border-amber-100",
    hoverBorder: "hover:border-amber-200",
  },
  {
    text: "Get results instantly — no long waits or manual scoring",
    icon: Clock,
    iconColor: "text-rose-600",
    iconBg: "bg-rose-50",
    border: "border-rose-100",
    hoverBorder: "hover:border-rose-200",
  },
  {
    text: "Trusted by 2M+ students, schools, colleges, and professionals",
    icon: CheckCircle2,
    iconColor: "text-indigo-600",
    iconBg: "bg-indigo-50",
    border: "border-indigo-100",
    hoverBorder: "hover:border-indigo-200",
  },
]

export default function Benefits() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-80 h-80 bg-violet-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-100/30 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold mb-5">
              <Sparkles className="w-4 h-4" />
              Why It Matters
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-5">
              The Real{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Benefits
              </span>
              {" "}of Career Assessment
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed mb-8">
              A structured assessment gives you a clear, data-backed direction — making every future decision easier, smarter, and more confident.
            </p>

            {/* Trust badge row */}
            <div className="flex flex-wrap gap-3">
              {["Psychologist Validated", "Used by 5000+ Schools", "Instant AI Report"].map((label) => (
                <span key={label} className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Benefits list */}
          <div className="grid gap-4">
            {benefits.map(({ text, icon: Icon, iconColor, iconBg, border, hoverBorder }, i) => (
              <div
                key={i}
                className={`group flex items-center gap-4 rounded-2xl border-2 ${border} ${hoverBorder} bg-white p-4 hover:shadow-lg hover:-translate-x-1 transition-all duration-300`}
              >
                <div className={`flex-none w-12 h-12 rounded-xl ${iconBg} border ${border} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                  <Icon className={`w-6 h-6 ${iconColor}`} strokeWidth={1.8} />
                </div>
                <span className="text-slate-700 font-medium leading-snug text-sm">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
