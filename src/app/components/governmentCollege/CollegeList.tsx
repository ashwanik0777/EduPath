import CollegeCard from "./CollegeCard"

const colleges = [
  {
    name: "Government College for Women, Gandhi Nagar",
    location: "Gandhi Nagar, Jammu",
    courses: ["B.A", "B.Sc", "B.Com", "BCA"],
    facilities: ["Library", "Hostel", "Labs", "Wi-Fi"]
  },
  {
    name: "Government MAM College",
    location: "Canal Road, Jammu",
    courses: ["B.Sc", "B.A", "B.Com", "BBA"],
    facilities: ["Library", "Sports Complex", "Labs"]
  },
  {
    name: "Government Degree College, Parade",
    location: "Parade Ground, Jammu",
    courses: ["B.Com", "B.A", "B.Sc"],
    facilities: ["Hostel", "Digital Classrooms", "Library"]
  },
  {
    name: "Government Degree College, Paloura",
    location: "Paloura, Jammu",
    courses: ["B.Sc", "B.A", "B.Com"],
    facilities: ["Library", "Computer Lab"]
  },
]

export default function CollegeList({ filter }: { filter: string }) {
  const filtered = filter === "All" 
    ? colleges 
    : colleges.filter(c => c.courses.some(course => course.includes(filter)))

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-10 text-center">List of Colleges</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((c, i) => (
            <CollegeCard key={i} {...c} />
          ))}
        </div>
      </div>
    </section>
  )
}
