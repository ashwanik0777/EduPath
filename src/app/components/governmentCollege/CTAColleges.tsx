"use client"
import { Send } from "lucide-react"

export default function CTAColleges() {
  return (
    <section className="py-20 bg-[#8B68D5] text-white text-center">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-extrabold mb-6 drop-shadow-lg">
          Ready to Start Your Journey?
        </h2>
        <p className="mb-10 text-lg max-w-lg mx-auto leading-relaxed">
          Apply now to your preferred government college in Jammu and take the next step towards a bright career.
        </p>
        <a
          href="/apply"
          className="inline-flex items-center justify-center px-8 py-3 bg-yellow-400 text-black font-semibold rounded-lg shadow-md
            hover:bg-yellow-300 hover:scale-105 transition-transform duration-300 ease-in-out"
          aria-label="Apply Now"
        >
          Apply Now
          <Send className="ml-3 w-5 h-5" />
        </a>
      </div>
    </section>
  )
}
