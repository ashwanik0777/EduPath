"use client"
import { Award, UserCheck, Users, Building } from "lucide-react"
import { motion } from "framer-motion"

const stats = [
  { number: "10+", label: "Years of Experience", icon: Award },
  { number: "5000+", label: "Counsellors Trained", icon: UserCheck },
  { number: "2M+", label: "Students Guided", icon: Users },
  { number: "1000+", label: "Institutions Served", icon: Building },
]

export default function Achievements() {
  return (
    <section className="py-20 bg-purple-400 text-white">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
        {stats.map(({ number, label, icon: Icon }, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.3, duration: 0.6 }}
            className="flex flex-col items-center"
            aria-label={`${label}: ${number}`}
          >
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-white/20 mb-4 shadow-lg">
              <Icon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-4xl font-extrabold tracking-tight">{number}</h3>
            <p className="text-lg mt-1 font-medium">{label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
