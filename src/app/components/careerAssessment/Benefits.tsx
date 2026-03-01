"use client"
import { CheckCircle2 } from "lucide-react"

const benefits = [
  "Discover your hidden strengths and improvement areas",
  "Choose the right stream, course, and long-term career path",
  "Avoid wrong career decisions and save valuable years",
  "Build confidence with clear and practical guidance",
  "Trusted by students, schools, colleges, and professionals",
]

export default function Benefits() {
  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-flex items-center rounded-full bg-indigo-50 px-4 py-1 text-sm font-medium text-indigo-700 border border-indigo-100">
            Why it matters
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-slate-900">Benefits of Career Assessments</h2>
          <p className="mt-3 text-slate-600">
            Structured assessment se aapko clear direction milti hai, jisse decision-making easy hoti hai aur future planning strong banti hai.
          </p>
        </div>

        <ul className="mt-10 grid gap-4 max-w-4xl mx-auto">
          {benefits.map((b, i) => (
            <li 
              key={i} 
              className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-4 md:p-5 text-left shadow-sm transition-all duration-300 hover:shadow-md hover:border-indigo-200"
            >
              <CheckCircle2 
                className="mt-0.5 w-6 h-6 text-indigo-600 flex-shrink-0" 
                aria-hidden="true"
              />
              <span className="text-base md:text-lg text-slate-700 leading-relaxed">{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
