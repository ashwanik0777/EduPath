const categories = [
  "Engineering & Technology",
  "Management & Marketing",
  "Healthcare",
  "Creativity & Art",
  "Science & Research",
  "Law & Order",
]

export default function Categories() {
  return (
    <section className="py-16 bg-[#F9F6FF]">
      <h2 className="text-3xl font-bold text-center mb-10 text-[#704DC6]">Top Career Categories</h2>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 px-6">
        {categories.map((c, i) => (
          <div
            key={i}
            className="rounded-2xl bg-gradient-to-br from-[#704DC6] to-[#8B68D5] p-6 text-center text-white font-semibold shadow-md hover:scale-105 transition"
          >
            {c}
          </div>
        ))}
      </div>
    </section>
  )
}
