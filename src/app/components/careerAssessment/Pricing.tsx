"use client"
import { Tag } from "lucide-react"

export default function Pricing() {
  return (
    <section className="py-20 bg-purple-500 text-white text-center">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-extrabold mb-6 drop-shadow-lg">Special Pricing</h2>
        <p className="mb-10 text-lg max-w-lg mx-auto leading-relaxed">
          All assessments available at a flat discount for a limited time.
        </p>
        <a
          href="/buy"
          className="inline-flex items-center justify-center px-8 py-3 bg-yellow-400 text-black font-semibold rounded-lg shadow-md
            hover:bg-yellow-300 hover:scale-105 transition-transform duration-300 ease-in-out"
          aria-label="Get Started for ₹1000"
        >
          Get Started for ₹1000
          <Tag className="ml-3 w-5 h-5" />
        </a>
      </div>
    </section>
  )
}
