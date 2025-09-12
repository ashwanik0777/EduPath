"use client"
import { User, Linkedin, Mail, Phone } from "lucide-react"

interface TeamMember {
  name: string;
  role: string;
  img?: string;
  email?: string;
  linkedin?: string;
  phone?: string;
}

const team: TeamMember[] = [
  { name: "Name 1", role: "Founder & CEO",  },
  { name: "Name 2", role: "Sr. Career Counsellor", },
  { name: "Name 3", role: "Career Mentor" }, // no image example
  { name: "Name 4", role: "Counsellor & Trainer",  },
  // { name: "Name 5", role: "Counsellor & Trainer",  },
  // { name: "Name 6", role: "Counsellor & Trainer",  },
]

export default function TeamSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-12 text-[#2E358B]">Meet Our Team</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {team.map((member, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl shadow-md hover:shadow-xl transition-shadow duration-300 p-8 flex flex-col items-center"
            >
              {/* Image or fallback icon */}
              {member.img ? (
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-28 h-28 rounded-full object-cover mb-5 shadow-lg"
                  loading="lazy"
                  draggable={false}
                />
              ) : (
                <div className="w-28 h-28 rounded-full bg-blue-100 flex items-center justify-center mb-5 shadow-lg">
                  <User className="w-16 h-16 text-[#704DC6]" />
                </div>
              )}

              <h3 className="text-xl font-semibold text-[#2E358B]">{member.name}</h3>
              <p className="text-gray-600 mb-5">{member.role}</p>

              {/* Optional social/contact icons */}
              <div className="flex space-x-6 text-[#704DC6]">
                <a href={`mailto:${member.email || ""}`} aria-label={`Email ${member.name}`} className="hover:text-indigo-700 transition">
                  <Mail className="w-5 h-5" />
                </a>
                <a href={member.linkedin || "#"} aria-label={`${member.name} LinkedIn`} className="hover:text-indigo-700 transition">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href={`tel:${member.phone || ""}`} aria-label={`Call ${member.name}`} className="hover:text-indigo-700 transition">
                  <Phone className="w-5 h-5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
