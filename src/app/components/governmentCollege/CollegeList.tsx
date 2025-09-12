"use client"
import { BookOpen, Library, Wifi, Home, Beaker, Dumbbell, Monitor } from "lucide-react"

const colleges = [
  {
    name: "Government College for Women, Gandhi Nagar",
    location: "Gandhi Nagar, Jammu",
    courses: ["B.A", "B.Sc", "B.Com", "BCA"],
    facilities: ["Library", "Hostel", "Labs", "Wi-Fi"],
  },
  {
    name: "Government MAM College",
    location: "Canal Road, Jammu",
    courses: ["B.Sc", "B.A", "B.Com", "BBA"],
    facilities: ["Library", "Sports Complex", "Labs"],
  },
  {
    name: "Government Degree College, Parade",
    location: "Parade Ground, Jammu",
    courses: ["B.Com", "B.A", "B.Sc"],
    facilities: ["Hostel", "Digital Classrooms", "Library"],
  },
  {
    name: "Government Degree College, Paloura",
    location: "Paloura, Jammu",
    courses: ["B.Sc", "B.A", "B.Com"],
    facilities: ["Library", "Computer Lab"],
  },
  {
    name: "Model College for Girls, JK",
    location: "City Center, Jammu",
    courses: ["B.A", "B.Sc"],
    facilities: ["Library", "Hostel", "Wi-Fi"],
  },
  {
    name: "JK Science College",
    location: "Science Park, Jammu",
    courses: ["B.Sc", "BCA", "B.Tech"],
    facilities: ["Labs", "Library", "Sports Complex"],
  },
  {
    name: "Commerce College, Jammu",
    location: "Commerce Road, Jammu",
    courses: ["B.Com", "BBA"],
    facilities: ["Library", "Digital Classrooms", "Wi-Fi"],
  },
  {
    name: "Indira Gandhi College",
    location: "New Town, Jammu",
    courses: ["B.A", "B.Sc", "B.Com"],
    facilities: ["Hostel", "Library", "Computer Lab"],
  },
]

const facilityIcons: { [key: string]: React.ReactElement } = {
  Library: <Library className="w-5 h-5 text-indigo-600" />,
  Hostel: <Home className="w-5 h-5 text-indigo-600" />,
  Labs: <Beaker className="w-5 h-5 text-indigo-600" />,
  "Wi-Fi": <Wifi className="w-5 h-5 text-indigo-600" />,
  "Sports Complex": <Dumbbell className="w-5 h-5 text-indigo-600" />,
  "Digital Classrooms": <Monitor className="w-5 h-5 text-indigo-600" />,
  "Computer Lab": <Monitor className="w-5 h-5 text-indigo-600" />,
}

const courseIcon = <BookOpen className="w-5 h-5 text-indigo-600 inline-block mr-1" />

function CollegeCard({ name, location, courses, facilities }: {
  name: string;
  location: string;
  courses: string[];
  facilities: string[];
}) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col">
      <h3 className="text-xl font-semibold text-[#2E358B] mb-2">{name}</h3>
      <p className="text-indigo-600 font-medium mb-4">{location}</p>
      <div className="mb-4">
        <h4 className="text-gray-700 font-semibold mb-1">Courses Offered</h4>
        <ul className="flex flex-wrap gap-3 text-indigo-600 text-sm font-medium">
          {courses.map((course, i) => (
            <li
              key={i}
              className="flex items-center border border-indigo-300 rounded-full px-3 py-1"
            >
              {courseIcon}
              {course}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="text-gray-700 font-semibold mb-1">Facilities</h4>
        <ul className="flex flex-wrap gap-3 text-indigo-600 text-sm font-medium">
          {facilities.map((fac, i) => (
            <li
              key={i}
              className="flex items-center gap-1 border border-indigo-300 rounded-full px-2 py-1"
            >
              {facilityIcons[fac] || null}
              {fac}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default function CollegeList({ filter }: { filter: string }) {
  const filtered =
    filter === "All" ? colleges : colleges.filter((c) => c.courses.some((course) => course.includes(filter)))

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-10 text-center text-[#2E358B]">List of Colleges</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((c, i) => (
            <CollegeCard key={i} {...c} />
          ))}
        </div>
      </div>
    </section>
  )
}
