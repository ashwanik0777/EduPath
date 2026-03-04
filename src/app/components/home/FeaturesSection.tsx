"use client"

import { useEffect, useRef, useState } from "react"
import { Brain, Target, BookOpen, Users, TrendingUp, Award, Sparkles } from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description:
      "Advanced algorithms analyze your responses to provide accurate career recommendations tailored to your unique profile.",
    gradient: "from-violet-500 to-purple-600",
    glow: "shadow-violet-200",
    ring: "ring-violet-200",
    iconColor: "text-violet-600",
    iconBg: "bg-violet-50",
    border: "border-violet-100",
    hoverBorder: "hover:border-violet-200",
    tag: "AI",
    tagColor: "bg-violet-100 text-violet-700",
  },
  {
    icon: Target,
    title: "Personalized Matching",
    description:
      "Get matched with careers and colleges that align with your interests, skills, and academic performance.",
    gradient: "from-rose-500 to-pink-600",
    glow: "shadow-rose-200",
    ring: "ring-rose-200",
    iconColor: "text-rose-600",
    iconBg: "bg-rose-50",
    border: "border-rose-100",
    hoverBorder: "hover:border-rose-200",
    tag: "Smart",
    tagColor: "bg-rose-100 text-rose-700",
  },
  {
    icon: BookOpen,
    title: "Comprehensive Database",
    description:
      "Access detailed information about 500+ colleges, courses, admission requirements, and career prospects.",
    gradient: "from-emerald-500 to-teal-600",
    glow: "shadow-emerald-200",
    ring: "ring-emerald-200",
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-50",
    border: "border-emerald-100",
    hoverBorder: "hover:border-emerald-200",
    tag: "500+",
    tagColor: "bg-emerald-100 text-emerald-700",
  },
  {
    icon: Users,
    title: "Expert Guidance",
    description:
      "Connect with experienced counselors and mentors who provide personalized advice for your educational journey.",
    gradient: "from-blue-500 to-cyan-600",
    glow: "shadow-blue-200",
    ring: "ring-blue-200",
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50",
    border: "border-blue-100",
    hoverBorder: "hover:border-blue-200",
    tag: "1:1",
    tagColor: "bg-blue-100 text-blue-700",
  },
  {
    icon: TrendingUp,
    title: "Progress Tracking",
    description:
      "Monitor your academic progress, set goals, and track your journey towards your dream career.",
    gradient: "from-amber-500 to-orange-600",
    glow: "shadow-amber-200",
    ring: "ring-amber-200",
    iconColor: "text-amber-600",
    iconBg: "bg-amber-50",
    border: "border-amber-100",
    hoverBorder: "hover:border-amber-200",
    tag: "Live",
    tagColor: "bg-amber-100 text-amber-700",
  },
  {
    icon: Award,
    title: "Success Stories",
    description:
      "Learn from thousands of students who have successfully found their ideal career path through our platform.",
    gradient: "from-indigo-500 to-blue-600",
    glow: "shadow-indigo-200",
    ring: "ring-indigo-200",
    iconColor: "text-indigo-600",
    iconBg: "bg-indigo-50",
    border: "border-indigo-100",
    hoverBorder: "hover:border-indigo-200",
    tag: "10k+",
    tagColor: "bg-indigo-100 text-indigo-700",
  },
]

const stats = [
  { target: 500, suffix: "+", label: "Partner Colleges", color: "from-violet-600 to-purple-600" },
  { target: 98, suffix: "%", label: "Satisfaction Rate", color: "from-rose-500 to-pink-600" },
  { target: 300, suffix: "+", label: "Career Paths Mapped", color: "from-emerald-500 to-teal-600" },
  { target: 15, suffix: "+", label: "Years of Excellence", color: "from-amber-500 to-orange-600" },
]

function useCountUp(target: number, duration: number, started: boolean) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!started) return
    let startTime: number | null = null
    let frame: number

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) {
        frame = requestAnimationFrame(step)
      } else {
        setCount(target)
      }
    }

    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [started, target, duration])

  return count
}

function StatCard({
  stat,
  started,
  index,
}: {
  stat: (typeof stats)[number]
  started: boolean
  index: number
}) {
  const count = useCountUp(stat.target, 1800 + index * 200, started)

  return (
    <div className="group text-center p-7 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div
        className={`text-4xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1 tabular-nums`}
      >
        {count}
        {stat.suffix}
      </div>
      <div className="w-8 h-0.5 bg-gradient-to-r from-transparent via-slate-300 to-transparent mx-auto my-2" />
      <div className="text-slate-500 text-sm font-medium">{stat.label}</div>
    </div>
  )
}

export default function FeaturesSection() {
  const statsRef = useRef<HTMLDivElement>(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const el = statsRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-100/40 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-100/40 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-100 text-violet-700 text-sm font-semibold mb-4">
            <Sparkles className="w-4 h-4" />
            Why EduPath?
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight">
            Everything You Need to{" "}
            <span className="bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
              Succeed
            </span>
          </h2>
          
        </div>

        {/* Stats Row — scroll-triggered counter */}
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, i) => (
            <StatCard key={i} stat={stat} started={started} index={i} />
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className={`group relative p-7 rounded-2xl bg-white border ${feature.border} ${feature.hoverBorder} hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300`}
              >
                {/* Icon block */}
                <div className="flex items-start justify-between mb-5">
                  <div className="relative">
                    {/* soft glow ring on hover */}
                   
                    <div
                      className={`relative w-16 h-16 rounded-2xl ${feature.iconBg} border ${feature.border} flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-sm group-hover:shadow-md ${feature.glow}`}
                    >
                      {/* gradient shine strip at top */}
                      
                      <Icon
                        className={`h-8 w-8 ${feature.iconColor} group-hover:scale-110 transition-transform duration-200`}
                        strokeWidth={1.8}
                      />
                    </div>
                  </div>

                  {/* tag badge */}
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${feature.tagColor}`}>
                    {feature.tag}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-slate-900 transition-colors">{feature.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{feature.description}</p>

                {/* bottom accent line */}
                <div className={`mt-5 h-[2px] rounded-full bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
