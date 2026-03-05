"use client"
import { useEffect, useRef, useState } from "react"
import { Award, UserCheck, Users, Building, Sparkles } from "lucide-react"

const stats = [
  {
    target: 15,
    suffix: "+",
    label: "Years of Excellence",
    sub: "Trusted since 2011",
    icon: Award,
    iconColor: "text-violet-300",
    iconBg: "bg-violet-900/60",
    numGradient: "from-violet-300 to-purple-300",
    ring: "ring-violet-700",
  },
  {
    target: 5000,
    suffix: "+",
    label: "Counsellors Trained",
    sub: "Expert-certified network",
    icon: UserCheck,
    iconColor: "text-blue-300",
    iconBg: "bg-blue-900/60",
    numGradient: "from-blue-300 to-cyan-300",
    ring: "ring-blue-700",
  },
  {
    target: 2,
    suffix: "M+",
    label: "Students Guided",
    sub: "Across India & beyond",
    icon: Users,
    iconColor: "text-emerald-300",
    iconBg: "bg-emerald-900/60",
    numGradient: "from-emerald-300 to-teal-300",
    ring: "ring-emerald-700",
  },
  {
    target: 1000,
    suffix: "+",
    label: "Institutions Served",
    sub: "Schools, colleges & more",
    icon: Building,
    iconColor: "text-amber-300",
    iconBg: "bg-amber-900/60",
    numGradient: "from-amber-300 to-orange-300",
    ring: "ring-amber-700",
  },
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
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) frame = requestAnimationFrame(step)
      else setCount(target)
    }
    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [started, target, duration])
  return count
}

function StatCard({ stat, started, index }: { stat: (typeof stats)[number]; started: boolean; index: number }) {
  const count = useCountUp(stat.target, 1600 + index * 200, started)
  const Icon = stat.icon
  return (
    <div className={`group flex flex-col items-center text-center p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 ring-1 ${stat.ring}`}>
      {/* Icon */}
      <div className={`w-16 h-16 rounded-2xl ${stat.iconBg} border border-white/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
        <Icon className={`w-8 h-8 ${stat.iconColor}`} strokeWidth={1.8} />
      </div>
      {/* Number */}
      <div className={`text-5xl font-black bg-gradient-to-r ${stat.numGradient} bg-clip-text text-transparent tabular-nums leading-none mb-1`}>
        {count.toLocaleString()}{stat.suffix}
      </div>
      <div className="w-10 h-[1px] bg-white/20 mx-auto my-3" />
      <div className="text-white font-semibold text-base mb-1">{stat.label}</div>
      <div className="text-white/50 text-xs">{stat.sub}</div>
    </div>
  )
}

export default function Achievements() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect() } },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-24 bg-gradient-to-br from-indigo-950 via-slate-900 to-violet-950 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-80 h-80 bg-violet-800/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-800/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white/80 text-sm font-semibold mb-4 border border-white/10">
            <Sparkles className="w-4 h-4" />
            By The Numbers
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            Our Impact,{" "}
            <span className="bg-gradient-to-r from-violet-300 to-blue-300 bg-clip-text text-transparent">
              In Numbers
            </span>
          </h2>
          <p className="mt-4 text-white/50 max-w-xl mx-auto text-lg">
            Over a decade of transforming career journeys for students and professionals across India.
          </p>
        </div>

        <div ref={sectionRef} className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <StatCard key={i} stat={stat} started={started} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
