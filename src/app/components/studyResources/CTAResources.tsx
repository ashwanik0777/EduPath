"use client"
import { Rocket } from "lucide-react"

export default function CTAResources() {
  return (
    <section className="py-20 bg-[#8B68D5] text-white text-center">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-extrabold mb-6 drop-shadow-lg flex justify-center items-center gap-3">
          <Rocket className="w-8 h-8" />
          Start Learning Today!
        </h2>
        <p className="mb-10 text-lg max-w-lg mx-auto leading-relaxed">
          Unlock access to skill resources, exam prep, and career guidance — all for free.
        </p>
        <a
          href="/register"
          className="inline-flex items-center justify-center px-8 py-3 bg-yellow-400 text-black font-semibold rounded-lg shadow-md 
            hover:bg-yellow-300 hover:scale-105 transition-transform duration-300 ease-in-out"
          aria-label="Join Now"
        >
          Join Now
        </a>
      </div>
    </section>
  )
}
