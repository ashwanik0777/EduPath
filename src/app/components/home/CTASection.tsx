"use client"

import { ArrowRight, CheckCircle, Users, Award, TrendingUp } from "lucide-react"
import { Button } from "@/app/components/ui/button"

const stats = [
  { icon: Users, value: "10,000+", label: "Students Guided" },
  { icon: Award, value: "95%", label: "Success Rate" },
  { icon: TrendingUp, value: "500+", label: "Top Colleges" },
]

const benefits = [
  "Personalized career assessment and guidance",
  "Expert counseling from industry professionals",
  "Comprehensive study resources and materials",
  "Mock tests and performance analytics",
  "College admission support and guidance",
]

export default function CTASection() {
  return (
    <section className="py-20 bg-slate-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-200/70 rounded-full -translate-x-48 -translate-y-48 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-200/70 rounded-full translate-x-48 translate-y-48 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto rounded-3xl border border-slate-200 bg-white/90 backdrop-blur p-8 md:p-12 text-center shadow-xl">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
            Ready to Transform Your
            <span className="text-indigo-600"> Academic Journey?</span>
          </h2>

          <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Join thousands of students who have achieved their dream college admissions with EduPath&apos;s personalized guidance and expert counseling.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            {stats.map((stat, index) => (
              <div key={index} className="text-center rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-indigo-50 border border-indigo-100 rounded-full mb-3">
                  <stat.icon className="h-8 w-8 text-indigo-600" />
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-2">{stat.value}</div>
                <div className="text-slate-600">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Benefits */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 md:p-8 mb-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">What You'll Get:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-4 text-lg group"
            >
              Start Your Journey Today
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border-slate-300 text-slate-800 hover:bg-slate-100 hover:text-slate-900 px-8 py-4 text-lg bg-white"
            >
              Book Free Consultation
            </Button>
          </div>

          
        </div>
      </div>
    </section>
  )
}
