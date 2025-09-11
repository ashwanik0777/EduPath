export default function CTAColleges() {
  return (
    <section className="py-20 bg-gradient-to-r from-[#8B68D5] to-[#CD3A99] text-white text-center">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-6">Ready to Start Your Journey?</h2>
        <p className="mb-8 text-lg">
          Apply now to your preferred government college in Jammu and take the next step towards a bright career.
        </p>
        <a 
          href="/apply" 
          className="px-8 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-300 transition"
        >
          Apply Now
        </a>
      </div>
    </section>
  )
}
