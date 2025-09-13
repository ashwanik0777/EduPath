import { Card, CardContent } from "@/app/components/ui/card"
import { User } from "lucide-react"

const services = [
  {
    title: "Master Counsellor Bundle",
    desc: "8 Course Bundle · Become Pro Counsellor",
    price: "₹50,500 ₹27,000",
    audience: "For Educationists & Teachers",
    features: ["Lifetime Access", "4 Certificates", "Doubt Clearing Sessions"]
  },
  {
    title: "Certification for Students",
    desc: "16 Modules · Guide School Students",
    price: "₹15,000 ₹10,000",
    audience: "For Students (Class 8th-12th)",
    features: ["Practical Training", "Peer Community", "Career Roadmap"]
  },
  {
    title: "Job Readiness Toolkit",
    desc: "17+ Modules · 30+ Hours Training",
    price: "₹5,000 ₹2,000",
    audience: "For Graduates & Job Seekers",
    features: ["Expert Mentorship", "Interview Prep", "Resume Templates"]
  },
]

export default function Services() {
  return (
    <section className="py-16 bg-[#F5F7FA]">
      <h2 className="text-3xl font-bold text-center mb-10 text-[#2E358B] tracking-tight drop-shadow-sm">
        Our Counselling Services
      </h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 px-5">
        {services.map((s, i) => (
          <Card
            key={i}
            className="rounded-2xl bg-white shadow-lg border border-[#ECE6F9]
              flex flex-col hover:shadow-2xl hover:-translate-y-2
              transition-all duration-300 relative overflow-visible"
          >
            <CardContent className="p-8 flex flex-col">
              {/* Lucide user icon avatar */}
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#EDF1F7] shadow border border-[#E0D7F8] mb-3 mx-auto">
                <User className="w-9 h-9 text-[#BDBBD9]" strokeWidth={1.5} />
              </div>
              <h3 className="font-bold text-[#2E358B] text-lg mb-1 text-center">{s.title}</h3>
              <p className="text-sm text-gray-700 text-center mb-2">{s.desc}</p>
              <div className="flex justify-center items-baseline mb-1">
                {/* <span className="text-[#C62862] text-base font-bold">{s.price.split(" ")}</span> */}
                <span className="ml-2 text-[#2E969A] text-xl font-bold">{s.price.split(" ")[4]}</span>
              </div>
              <span className="block text-xs text-[#2E358B] mb-3 text-center">{s.audience}</span>
              <ul className="flex flex-wrap gap-2 justify-center mb-5 text-xs">
                {s.features.map((feature, fi) => (
                  <li key={fi} className="px-2 py-1 bg-[#F3F5FB] text-[#4365BF] rounded-md border border-[#E5E7EB]">
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                className="mt-auto px-4 py-2 rounded-xl bg-[#2E358B] text-white font-semibold shadow-sm
                  hover:bg-[#222967] hover:shadow-lg hover:scale-105
                  focus:outline-none focus:ring-2 focus:ring-[#2E358B]/30 focus:ring-offset-2
                  transition-all duration-200"
              >
                Enroll Now
              </button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
