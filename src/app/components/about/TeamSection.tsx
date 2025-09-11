const team = [
  { name: "Surabhi Dewra", role: "Founder & CEO", img: "/team/surabhi.jpg" },
  { name: "Adnan Buland", role: "Sr. Career Counsellor", img: "/team/adnan.jpg" },
  { name: "Pranav Bhatia", role: "Career Mentor", img: "/team/pranav.jpg" },
  { name: "Deepti Sharma", role: "Counsellor & Trainer", img: "/team/deepti.jpg" },
]

export default function TeamSection() {
  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-10">Meet Our Team</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, i) => (
            <div key={i} className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition">
              <img 
                src={member.img} 
                alt={member.name} 
                className="w-28 h-28 mx-auto rounded-full object-cover mb-4"
              />
              <h3 className="font-semibold text-xl">{member.name}</h3>
              <p className="text-gray-500">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
