"use client"
import { ArrowRight } from "lucide-react"

export default function CTASection() {
  return (
    <section className="py-20 bg-[#3F3D56] text-white text-center">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl font-extrabold mb-6 drop-shadow-lg">Take Your First Step Towards a Better Career</h2>
        <p className="mb-10 text-lg max-w-lg mx-auto leading-relaxed">
          Explore our career assessments and unlock your true potential today.
        </p>
        <a
          href="/buy"
          className="inline-flex items-center justify-center px-8 py-3 bg-yellow-400 text-black font-semibold rounded-lg shadow-md
            hover:bg-yellow-300 hover:scale-105 transition transform duration-300 ease-in-out"
          aria-label="Start Now"
        >
          Start Now
          <ArrowRight className="ml-3 w-5 h-5" />
        </a>
      </div>
    </section>
  )
}
