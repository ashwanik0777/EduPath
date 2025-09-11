const testimonials = [
  {
    name: "Rohit Sharma",
    text: "This platform helped me choose the right course after 12th. I am confident about my future now.",
  },
  {
    name: "Priya Mehta",
    text: "The psychometric test was eye-opening. Counsellors guided me step by step.",
  },
]

export default function Testimonials() {
  return (
    <section className="py-16 bg-[#F9F6FF]">
      <h2 className="text-3xl font-bold text-center mb-10 text-[#704DC6]">What Students Say</h2>
      <div className="grid gap-6 md:grid-cols-2 px-6">
        {testimonials.map((t, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition">
            <p className="text-gray-700 mb-4 italic">"{t.text}"</p>
            <h4 className="font-semibold text-[#CD3A99]">{t.name}</h4>
          </div>
        ))}
      </div>
    </section>
  )
}
