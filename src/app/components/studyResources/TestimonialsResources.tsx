const testimonials = [
  { name: "Rahul Sharma", feedback: "EduPath helped me crack SSC exam with right study materials!", role: "SSC Qualified" },
  { name: "Anjali Gupta", feedback: "The mock tests and career guidance gave me clarity for NEET.", role: "Medical Student" },
  { name: "Arjun Singh", feedback: "Soft skills courses improved my confidence in interviews.", role: "MBA Graduate" },
]

export default function TestimonialsResources() {
  return (
    <section className="py-20 bg-gradient-to-r from-[#F76CB4] to-[#CD3A99] text-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12 text-center">What Students Say</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white/10 p-6 rounded-xl shadow">
              <p className="italic">“{t.feedback}”</p>
              <h4 className="mt-4 font-semibold">{t.name}</h4>
              <p className="text-sm">{t.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
