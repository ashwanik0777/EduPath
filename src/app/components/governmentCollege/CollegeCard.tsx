interface CollegeProps {
  name: string
  location: string
  courses: string[]
  facilities: string[]
}

export default function CollegeCard({ name, location, courses, facilities }: CollegeProps) {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-6">
      <h3 className="text-xl font-bold mb-2 text-[#704DC6]">{name}</h3>
      <p className="text-gray-600 mb-3">{location}</p>
      <p className="font-semibold text-gray-800">Courses Offered:</p>
      <ul className="list-disc list-inside text-gray-600 mb-3">
        {courses.map((c, i) => <li key={i}>{c}</li>)}
      </ul>
      <p className="font-semibold text-gray-800">Facilities:</p>
      <ul className="list-disc list-inside text-gray-600 mb-3">
        {facilities.map((f, i) => <li key={i}>{f}</li>)}
      </ul>
      <a 
        href="/apply" 
        className="inline-block mt-3 px-5 py-2 bg-[#704DC6] text-white rounded-lg hover:bg-[#5b3bad]"
      >
        View Details
      </a>
    </div>
  )
}
