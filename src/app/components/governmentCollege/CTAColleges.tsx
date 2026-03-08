"use client"
import Link from "next/link"
import { CheckCircle2, GraduationCap, BookOpen, Users, ArrowRight, Phone } from "lucide-react"

const perks = [
  "Hundreds of verified government & private colleges listed",
  "Filter by stream, ownership type, and location",
  "Eligibility & admission process guidance per college",
  "Compare courses and facilities side-by-side",
  "Updated admission timelines each academic year",
  "Free career counselling session with every registration",
]

const stats = [
  { icon: GraduationCap, label: "Colleges Listed", value: "500+" },
  { icon: BookOpen, label: "Courses Covered", value: "200+" },
  { icon: Users, label: "Students Helped", value: "2M+" },
  { icon: Phone, label: "Counsellors", value: "5000+" },
]

export default function CTAColleges() {
  return (
    <section className="py-20 px-6 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12 space-y-3">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold">
            <GraduationCap className="w-4 h-4" />
            Your College Journey Starts Here
          </span>
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-700 via-violet-600 to-indigo-700 bg-clip-text text-transparent">
            Ready to Find Your Perfect College?
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            Get personalised guidance, discover the right fit, and take the next step toward a bright academic future.
          </p>
        </div>

        {/* Split card */}
        <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-2xl grid lg:grid-cols-2">
          {/* Left — checklist */}
          <div className="bg-white p-10 flex flex-col justify-between gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-800">Why Choose EduPath for Colleges?</h3>
              <ul className="space-y-3">
                {perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-3 text-sm text-slate-600">
                    <CheckCircle2 className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" />
                    {perk}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/careerAssessment"
                className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold border-2 border-indigo-300 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200"
              >
                Take Career Assessment
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/notifications/counselingSchedule"
                className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold border-2 border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200"
              >
                <Phone className="w-4 h-4" />
                Book Free Counselling
              </Link>
            </div>
          </div>

          {/* Right — dark gradient panel */}
          <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-violet-950 p-10 flex flex-col justify-between gap-8">
            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="rounded-2xl bg-white/5 border border-white/10 p-4 space-y-1 backdrop-blur-sm"
                >
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center mb-2">
                    <Icon className="w-4 h-4 text-indigo-300" />
                  </div>
                  <p className="text-2xl font-bold bg-gradient-to-r from-indigo-300 to-violet-300 bg-clip-text text-transparent">
                    {value}
                  </p>
                  <p className="text-xs text-slate-400">{label}</p>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <p className="text-slate-300 text-sm leading-relaxed">
                Join thousands of students who found their ideal college through EduPath&apos;s curated database and expert guidance.
              </p>
              <Link
                href="/register"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-bold bg-gradient-to-r from-indigo-500 to-violet-500 text-white hover:from-indigo-400 hover:to-violet-400 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-200"
              >
                Get Started Free
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

