const resources = [
  { title: "Full Stack Development", provider: "Coursera", duration: "6 Months", rating: "⭐ 4.8/5" },
  { title: "AI & Machine Learning", provider: "Udemy", duration: "4 Months", rating: "⭐ 4.7/5" },
  { title: "UPSC General Studies", provider: "BYJU's", duration: "1 Year", rating: "⭐ 4.9/5" },
  { title: "Bank PO Prep", provider: "Adda247", duration: "8 Months", rating: "⭐ 4.6/5" },
  { title: "Spoken English Mastery", provider: "Duolingo", duration: "Ongoing", rating: "⭐ 4.8/5" },
]

export default function FeaturedResources() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12 text-center">🌟 Featured Learning Resources</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resources.map((r, i) => (
            <div key={i} className="p-6 border rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-bold text-[#704DC6] mb-2">{r.title}</h3>
              <p className="text-gray-600">Provider: {r.provider}</p>
              <p className="text-gray-600">Duration: {r.duration}</p>
              <p className="text-gray-600">{r.rating}</p>
              <a href="#" className="inline-block mt-4 px-4 py-2 bg-[#704DC6] text-white rounded hover:bg-[#5b3bad]">
                Learn More
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
