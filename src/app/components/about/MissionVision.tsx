"use client"
import { Award, Eye, Target, Globe2, Rocket, Heart, CheckCircle2, Sparkles, Lightbulb } from "lucide-react"

export default function MissionVision() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 -left-20 w-96 h-96 bg-violet-100/50 rounded-full blur-3xl" />
        <div className="absolute bottom-0 -right-20 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-100 text-violet-700 text-sm font-semibold mb-4">
            <Sparkles className="w-4 h-4" />
            Our Purpose
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
            Driven by{" "}
            <span className="bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
              Mission &amp; Vision
            </span>
          </h2>
          <p className="mt-4 text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
            Everything we do is guided by a clear purpose — to empower every student to make informed, confident career decisions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Mission Card */}
          <div className="group relative rounded-3xl bg-white border-2 border-violet-100 hover:border-violet-300 p-9 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden">
            {/* Top accent */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-violet-500 to-purple-600 rounded-t-3xl" />
            {/* Watermark number */}
            <div className="absolute top-4 right-6 text-8xl font-black text-violet-50 select-none">01</div>

            <div className="flex items-center gap-4 mb-6 relative">
              <div className="w-16 h-16 rounded-2xl bg-violet-50 border border-violet-200 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
                <Award className="w-8 h-8 text-violet-600" strokeWidth={1.8} />
              </div>
              <div>
                <p className="text-xs font-bold text-violet-500 uppercase tracking-widest">Our</p>
                <h3 className="text-2xl font-black text-slate-900">Mission</h3>
              </div>
            </div>

            <p className="text-slate-600 leading-relaxed text-[1.05rem] mb-8 relative">
              To guide every student &amp; professional in making informed career decisions by providing expert counselling and advanced psychometric tools — turning confusion into clarity, one student at a time.
            </p>

            <div className="grid grid-cols-3 gap-3 relative">
              {[
                { icon: Eye, label: "Clear Vision", color: "text-violet-600", bg: "bg-violet-50", border: "border-violet-100" },
                { icon: Target, label: "Focused Goals", color: "text-purple-600", bg: "bg-purple-50", border: "border-purple-100" },
                { icon: Globe2, label: "Global Impact", color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100" },
              ].map(({ icon: Icon, label, color, bg, border }) => (
                <div key={label} className={`flex flex-col items-center gap-2 p-3 rounded-2xl ${bg} border ${border}`}>
                  <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center shadow-sm">
                    <Icon className={`w-5 h-5 ${color}`} strokeWidth={1.8} />
                  </div>
                  <span className="text-xs font-semibold text-slate-600 text-center leading-tight">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Vision Card */}
          <div className="group relative rounded-3xl bg-white border-2 border-blue-100 hover:border-blue-300 p-9 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden">
            {/* Top accent */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-t-3xl" />
            {/* Watermark number */}
            <div className="absolute top-4 right-6 text-8xl font-black text-blue-50 select-none">02</div>

            <div className="flex items-center gap-4 mb-6 relative">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
                <Rocket className="w-8 h-8 text-blue-600" strokeWidth={1.8} />
              </div>
              <div>
                <p className="text-xs font-bold text-blue-500 uppercase tracking-widest">Our</p>
                <h3 className="text-2xl font-black text-slate-900">Vision</h3>
              </div>
            </div>

            <p className="text-slate-600 leading-relaxed text-[1.05rem] mb-8 relative">
              To become the most trusted platform for career guidance, enabling millions to unlock their potential and build meaningful, fulfilling careers across every corner of the world.
            </p>

            <div className="grid grid-cols-3 gap-3 relative">
              {[
                { icon: CheckCircle2, label: "Quality First", color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100" },
                { icon: Lightbulb, label: "Innovation", color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-100" },
                { icon: Heart, label: "Student-Led", color: "text-rose-500", bg: "bg-rose-50", border: "border-rose-100" },
              ].map(({ icon: Icon, label, color, bg, border }) => (
                <div key={label} className={`flex flex-col items-center gap-2 p-3 rounded-2xl ${bg} border ${border}`}>
                  <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center shadow-sm">
                    <Icon className={`w-5 h-5 ${color}`} strokeWidth={1.8} />
                  </div>
                  <span className="text-xs font-semibold text-slate-600 text-center leading-tight">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
