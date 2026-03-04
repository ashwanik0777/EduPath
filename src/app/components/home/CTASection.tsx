"use client"

import Link from "next/link"
import { ArrowRight, CheckCircle, BookOpen, Brain, Compass, GraduationCap, Sparkles, Phone } from "lucide-react"

const steps = [
  {
    step: "01",
    icon: Brain,
    title: "Take the Assessment",
    desc: "Complete our science-backed psychometric test to uncover your strengths and interests.",
    gradient: "from-violet-500 to-purple-600",
    bg: "from-violet-50 to-purple-50",
    border: "border-violet-100",
  },
  {
    step: "02",
    icon: Compass,
    title: "Get Matched",
    desc: "Our AI matches you with the ideal career paths, colleges, and opportunities tailored for you.",
    gradient: "from-blue-500 to-cyan-600",
    bg: "from-blue-50 to-cyan-50",
    border: "border-blue-100",
  },
  {
    step: "03",
    icon: BookOpen,
    title: "Access Resources",
    desc: "Explore curated study materials, mock tests, and college guides all in one place.",
    gradient: "from-emerald-500 to-teal-600",
    bg: "from-emerald-50 to-teal-50",
    border: "border-emerald-100",
  },
  {
    step: "04",
    icon: GraduationCap,
    title: "Achieve Your Goal",
    desc: "With expert counselor support, land your dream college and launch your career with confidence.",
    gradient: "from-amber-500 to-orange-500",
    bg: "from-amber-50 to-orange-50",
    border: "border-amber-100",
  },
]

const benefits = [
  "Personalized career assessment & guidance",
  "Expert counseling from industry professionals",
  "Comprehensive study resources & materials",
  "Mock tests and performance analytics",
  "College admission support & guidance",
  "Lifetime access to career tools",
]

export default function CTASection() {
  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-200/50 rounded-full -translate-x-48 -translate-y-48 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-200/50 rounded-full translate-x-48 translate-y-48 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-violet-100/30 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold mb-4">
            <Sparkles className="w-4 h-4" />
            How It Works
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight">
            Your Journey to{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              Success
            </span>{" "}
            Starts Here
          </h2>
         
        </div>

        {/* Steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14 max-w-6xl mx-auto">
          {steps.map((s, i) => {
            const Icon = s.icon
            return (
              <div
                key={i}
                className={`group relative rounded-2xl bg-gradient-to-br ${s.bg} border ${s.border} p-6 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden`}
              >
                {/* Step number watermark */}
                <span className="absolute top-3 right-4 text-5xl font-black text-slate-100 select-none leading-none">
                  {s.step}
                </span>

                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.gradient} flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-6 h-6 text-white" strokeWidth={2} />
                </div>

                <h3 className="text-base font-bold text-slate-800 mb-1.5">{s.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{s.desc}</p>
              </div>
            )
          })}
        </div>

        {/* CTA Card */}
        <div className="max-w-5xl mx-auto rounded-3xl border border-slate-200 bg-white/90 backdrop-blur-sm shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2">
            {/* Left — benefits */}
            <div className="p-8 md:p-10 border-b md:border-b-0 md:border-r border-slate-100">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">What You&apos;ll Get</h3>
              <ul className="space-y-3">
                {benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600 text-sm">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right — CTA */}
            <div className="p-8 md:p-10 flex flex-col justify-center bg-gradient-to-br from-indigo-600 to-violet-700 text-white">
              <h3 className="text-2xl md:text-3xl font-bold mb-3 leading-snug">
                Ready to Transform Your Academic Journey?
              </h3>
              <p className="text-indigo-100 text-sm mb-8 leading-relaxed">
                Join thousands of students who have already found their ideal career path with EduPath&apos;s personalized guidance.
              </p>

              <div className="flex flex-col gap-3">
                <Link
                  href="/careerAssessment"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white text-indigo-700 font-semibold px-6 py-3.5 hover:bg-indigo-50 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                >
                  Start Your Journey Today
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/counselorDashboard"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/30 bg-white/10 text-white font-semibold px-6 py-3.5 hover:bg-white/20 hover:-translate-y-0.5 transition-all duration-200 backdrop-blur-sm"
                >
                  <Phone className="w-4 h-4" />
                  Book Free Consultation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
