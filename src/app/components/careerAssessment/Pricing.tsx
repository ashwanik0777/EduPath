"use client"
import { Tag, CheckCircle2, Sparkles, ArrowRight, Clock, Zap } from "lucide-react"
import Link from "next/link"

const included = [
  "Full psychometric assessment report",
  "AI-generated career path recommendations",
  "Comparison with top career options",
  "Downloadable PDF report",
  "Email delivery within seconds",
]

export default function Pricing() {
  return (
    <section className="py-24 bg-gradient-to-br from-indigo-950 via-slate-900 to-violet-950 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-violet-800/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-800/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-10 relative">
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white/80 text-sm font-semibold mb-4 border border-white/10">
            <Sparkles className="w-4 h-4" />
            Limited Time Offer
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            Simple,{" "}
            <span className="bg-gradient-to-r from-violet-300 to-blue-300 bg-clip-text text-transparent">
              Transparent
            </span>{" "}
            Pricing
          </h2>
          <p className="mt-4 text-white/50 max-w-xl mx-auto text-lg">
            One flat price for any assessment. No hidden fees, no subscriptions.
          </p>
        </div>

        {/* Pricing card */}
        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          {/* Left: price card */}
          <div className="relative rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 ring-1 ring-violet-700 p-10 flex flex-col overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-violet-500 to-blue-500 rounded-t-3xl" />

            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-violet-900/60 border border-white/10 flex items-center justify-center">
                <Tag className="w-5 h-5 text-violet-300" strokeWidth={1.8} />
              </div>
              <span className="text-white/60 text-sm font-semibold uppercase tracking-widest">Per Assessment</span>
            </div>

            <div className="flex items-end gap-3 mt-6 mb-2">
              <span className="text-6xl font-black text-white">₹1,000</span>
            </div>
            <div className="flex items-center gap-3 mb-8">
              <span className="text-white/40 line-through text-xl">₹2,000</span>
              <span className="text-sm font-bold text-emerald-400 bg-emerald-900/40 px-3 py-1 rounded-full border border-emerald-700/50">50% OFF</span>
            </div>

            {/* Time urgency */}
            <div className="flex items-center gap-2 mb-8 p-3 rounded-2xl bg-amber-900/30 border border-amber-700/30">
              <Clock className="w-4 h-4 text-amber-400" />
              <span className="text-amber-300 text-xs font-semibold">Limited time offer — grab it before the price goes up!</span>
            </div>

            <Link
              href="/buy"
              className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-gradient-to-r from-violet-600 to-blue-600 text-white font-bold text-base hover:from-violet-500 hover:to-blue-500 hover:-translate-y-0.5 hover:shadow-xl transition-all duration-200"
            >
              Get Started for ₹1,000
              <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="text-white/30 text-xs text-center mt-3">Instant access &bull; No subscription required</p>
          </div>

          {/* Right: what's included */}
          <div className="rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 p-10 flex flex-col">
            <div className="flex items-center gap-2 mb-6">
              <Zap className="w-5 h-5 text-amber-400" />
              <h3 className="text-white font-bold text-lg">What&apos;s Included</h3>
            </div>
            <ul className="space-y-4 flex-1">
              {included.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-900/60 border border-emerald-700/40 flex items-center justify-center flex-none mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" strokeWidth={2} />
                  </div>
                  <span className="text-white/70 text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 p-4 rounded-2xl bg-indigo-900/40 border border-indigo-700/30">
              <p className="text-white/60 text-xs leading-relaxed">
                <span className="text-white font-semibold">Want counselling too?</span> Add a 1-on-1 session with a certified counsellor for just ₹499 more.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
