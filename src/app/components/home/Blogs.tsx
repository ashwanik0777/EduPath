const blogs = [
  { title: "Why Data Analyst is a Good Career?", desc: "A data analyst works with data to provide insights.", link: "#" },
  { title: "Is Becoming a Doctor Worth It?", desc: "A sober look at this tough profession.", link: "#" },
  { title: "How To Reinvent Training With AI", desc: "E-learning reinvented using AI.", link: "#" },
]

export default function Blogs() {
  return (
    <section className="py-16 bg-white">
      <h2 className="text-3xl font-bold text-center mb-10 text-[#704DC6]">Latest Blogs & Articles</h2>
      <div className="grid gap-6 md:grid-cols-3 px-6">
        {blogs.map((b, i) => (
          <a
            key={i}
            href={b.link}
            className="rounded-2xl border p-6 shadow hover:shadow-lg transition block"
          >
            <h3 className="font-semibold text-lg mb-2">{b.title}</h3>
            <p className="text-gray-600 mb-4">{b.desc}</p>
            <span className="text-[#CD3A99] font-medium">Read More →</span>
          </a>
        ))}
      </div>
    </section>
  )
}
