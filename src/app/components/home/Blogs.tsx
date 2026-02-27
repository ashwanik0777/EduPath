"use client"
import Link from "next/link"
import { Heart, Eye, Calendar, Tag } from "lucide-react"

const blogs = [
  {
    title: "Why Data Analyst is a Good Career?",
    desc: "A data analyst works with data to provide insights.",
    img: "/blog.jpg",
    date: "Sep 8, 2025",
    category: "Data Science",
    views: 1200,
    likes: 320,
    link: "#",
  },
  {
    title: "Is Becoming a Doctor Worth It?",
    desc: "A sober look at this tough profession.",
    img: "/blog.jpg",
    date: "Aug 26, 2025",
    category: "Healthcare",
    views: 1580,
    likes: 410,
    link: "#",
  },
  {
    title: "How To Reinvent Training With AI",
    desc: "E-Counseling reinvented using AI.",
    img: "/blog.jpg",
    date: "Sep 10, 2025",
    category: "Technology",
    views: 980,
    likes: 290,
    link: "#",
  },
  {
    title: "Career Growth in Creative Arts",
    desc: "Exploring artistic career potential.",
    img: "/blog.jpg",
    date: "Sep 5, 2025",
    category: "Creativity",
    views: 600,
    likes: 210,
    link: "#",
  },
  {
    title: "Managing Stress in High Pressure Jobs",
    desc: "Tips to stay calm and productive.",
    img: "/blog.jpg",
    date: "Aug 30, 2025",
    category: "Wellness",
    views: 1120,
    likes: 295,
    link: "#",
  },
  {
    title: "Science & Tech Innovations of 2025",
    desc: "What's new and impactful this year.",
    img: "/blog.jpg",
    date: "Sep 11, 2025",
    category: "Science",
    views: 1500,
    likes: 475,
    link: "#",
  },
]

export default function BlogSlider() {
  const repeatedBlogs = [...blogs, ...blogs]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-11/12 mx-auto px-4">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-widest text-indigo-600 font-semibold">Knowledge Hub</p>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 text-slate-900">Latest Blogs & Articles</h2>
          <p className="text-slate-600 mt-3 max-w-2xl mx-auto">Fresh career insights, expert guidance and trends curated for students and counselors.</p>
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-50/60 py-6">
          <div className="pointer-events-none absolute left-0 top-0 h-full w-2 md:w-4 bg-gradient-to-r from-white to-transparent z-10 " />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-2 md:w-4 bg-gradient-to-l from-white to-transparent z-10 " />

          <div className="infinite-track-wrapper">
            <div className="infinite-track">
              {repeatedBlogs.map((b, i) => (
                <Link
                  key={`${b.title}-${i}`}
                  href={b.link}
                  className="blog-card group"
                  aria-label={`Read blog: ${b.title}`}
                >
                  <div className="h-48 w-full rounded-t-2xl overflow-hidden">
                    <img
                      src={b.img}
                      alt={b.title}
                      loading="lazy"
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="text-lg font-semibold text-slate-900 mb-2 line-clamp-2">{b.title}</h3>
                    <p className="text-slate-600 flex-grow text-sm mb-4 line-clamp-3">{b.desc}</p>

                    <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>{b.date}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Tag className="w-4 h-4" />
                        <span>{b.category}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-500 border-t border-slate-200 pt-3">
                      <div className="flex items-center space-x-1">
                        <Eye className="w-4 h-4 text-slate-400" />
                        <span>{b.views.toLocaleString()} views</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Heart className="w-4 h-4 text-pink-500" />
                        <span>{b.likes.toLocaleString()} likes</span>
                      </div>
                    </div>

                    <span className="mt-5 font-semibold text-indigo-600 group-hover:text-indigo-700 transition-colors">
                      Read More →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .infinite-track-wrapper {
          width: 100%;
          overflow: hidden;
        }

        .infinite-track {
          width: max-content;
          display: flex;
          align-items: stretch;
          gap: 1.5rem;
          padding: 0 1rem;
          animation: blogMarquee 42s linear infinite;
          will-change: transform;
        }

        .infinite-track-wrapper:hover .infinite-track {
          animation-play-state: paused;
        }

        .blog-card {
          min-width: 340px;
          max-width: 340px;
          border-radius: 1rem;
          border: 1px solid #dbe2ea;
          background: white;
          box-shadow: 0 6px 18px rgba(15, 23, 42, 0.08);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          display: flex;
          flex-direction: column;
        }

        .blog-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 14px 30px rgba(15, 23, 42, 0.12);
        }

        @keyframes blogMarquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-50% - 0.75rem));
          }
        }

        @media (max-width: 768px) {
          .blog-card {
            min-width: 300px;
            max-width: 300px;
          }

          .infinite-track {
            animation-duration: 34s;
          }
        }
      `}</style>
    </section>
  )
}
