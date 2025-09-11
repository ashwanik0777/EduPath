import { Code, Book, Briefcase, Languages, Brain, Award } from "lucide-react"

const categories = [
  { icon: <Code className="h-10 w-10 text-white" />, title: "Tech Skills", desc: "Web Dev, AI, Data Science, App Dev", bg: "bg-gradient-to-r from-[#704DC6] to-[#CD3A99]" },
  { icon: <Book className="h-10 w-10 text-white" />, title: "Exam Prep", desc: "NEET, JEE, UPSC, SSC, Banking", bg: "bg-gradient-to-r from-[#2E969A] to-[#8B68D5]" },
  { icon: <Briefcase className="h-10 w-10 text-white" />, title: "Career Skills", desc: "Resume, Interviews, Aptitude Tests", bg: "bg-gradient-to-r from-[#F76CB4] to-[#CD3A99]" },
  { icon: <Languages className="h-10 w-10 text-white" />, title: "Languages", desc: "English, Hindi, French, German", bg: "bg-gradient-to-r from-[#8B68D5] to-[#704DC6]" },
  { icon: <Brain className="h-10 w-10 text-white" />, title: "Soft Skills", desc: "Leadership, Public Speaking, Time Mgmt", bg: "bg-gradient-to-r from-[#FFCC59] to-[#F76CB4]" },
  { icon: <Award className="h-10 w-10 text-white" />, title: "Govt. Exams", desc: "UPSC, SSC, State Level, RRB", bg: "bg-gradient-to-r from-[#2E969A] to-[#704DC6]" },
]

export default function SkillCategories() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12 text-center">Skill Categories</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((c, i) => (
            <div key={i} className={`${c.bg} text-white p-8 rounded-xl shadow hover:scale-105 transition`}>
              <div>{c.icon}</div>
              <h3 className="text-xl font-semibold mt-4">{c.title}</h3>
              <p className="mt-2 text-sm">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
