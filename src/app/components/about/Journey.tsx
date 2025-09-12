"use client"
import { motion } from "framer-motion"
import { Flag, Star, Users, Trophy, CheckCircle } from "lucide-react"

const timeline = [
  {
    year: "2011",
    event: "CareerGuide was founded",
    icon: Flag,
    description: "Started with a vision to empower students with career insights and guidance.",
  },
  {
    year: "2014",
    event: "Launched first Psychometric Career Test",
    icon: Star,
    description:
      "Introduced advanced psychometric tools to help students discover their true potential.",
  },
  {
    year: "2017",
    event: "Reached 1 Million Students",
    icon: Users,
    description:
      "Our platform gained trust and reached over 1 million students worldwide.",
  },
  {
    year: "2020",
    event: "Expanded Counsellor Network Across India",
    icon: Trophy,
    description:
      "Built a professional network of expert counsellors to provide localized support.",
  },
  {
    year: "2023",
    event: "Trusted by 5000+ Schools & Colleges",
    icon: CheckCircle,
    description:
      "Partnered with thousands of educational institutes to expand our impact.",
  },
]

export default function Journey() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12 text-center text-[#2E358B]">Our Journey</h2>
        <div className="relative border-l-4 border-indigo-300/50 pl-10 ">
          {timeline.map(({ year, event, icon: Icon, description }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.3 }}
              className="mb-14 flex flex-col relative"
            >
              {/* Year Badge with icon */}
              <div className="absolute -left-16 top-0 flex items-center justify-center w-12 h-12 rounded-full bg-indigo-600 text-white shadow-lg">
                {Icon && <Icon className="w-6 h-6" />}
              </div>
              <time className="text-indigo-700 font-semibold text-lg mb-1">{year}</time>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">{event}</h3>
              <p className="text-gray-700 max-w-xl">{description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
