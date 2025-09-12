"use client"
import { useState, useRef, useEffect } from "react"
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
		desc: "E-learning reinvented using AI.",
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
	const sliderRef = useRef<HTMLDivElement>(null)
	const [isDown, setIsDown] = useState(false)
	const [startX, setStartX] = useState(0)
	const [scrollLeft, setScrollLeft] = useState(0)

	// Manual drag handlers
	const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!sliderRef.current) return
		setIsDown(true)
		setStartX(e.pageX - sliderRef.current.offsetLeft)
		setScrollLeft(sliderRef.current.scrollLeft)
	}
	const onMouseLeave = () => setIsDown(false)
	const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!isDown || !sliderRef.current) return
		e.preventDefault()
		const x = e.pageX - sliderRef.current.offsetLeft
		const walk = (x - startX) * 2
		sliderRef.current.scrollLeft = scrollLeft - walk
	}

	// Auto slider effect for infinite loop
	useEffect(() => {
		const slider = sliderRef.current
		if (!slider || !slider.firstChild) return

		const cardWidth = slider.firstChild.offsetWidth + 24
		const maxScroll = cardWidth * blogs.length

		const interval = setInterval(() => {
			if (slider.scrollLeft >= maxScroll) {
				slider.scrollLeft = 0
			} else {
				slider.scrollLeft += 1.5
			}
		}, 16) // ~60 FPS speed

		return () => clearInterval(interval)
	}, [blogs.length])

	return (
		<section className="py-16 bg-white max-w-[1300px] mx-auto">
			<h2 className="text-3xl font-bold text-center mb-12 text-[#2E358B]">
				Latest Blogs & Articles
			</h2>
			<div
				ref={sliderRef}
				onMouseDown={onMouseDown}
				onMouseUp={() => setIsDown(false)}
				onMouseLeave={onMouseLeave}
				onMouseMove={onMouseMove}
				className="flex space-x-6 overflow-x-auto no-scrollbar cursor-grab select-none px-4 scroll-smooth"
				style={{
					scrollBehavior: "smooth",
					scrollbarWidth: "none", // For Firefox
					msOverflowStyle: "none", // For Internet Explorer
				}}
			>
				{/* Duplicate array for seamless infinite scroll */}
				{[...blogs, ...blogs].map((b, i) => (
					<a
						key={i}
						href={b.link}
						className="min-w-[360px] max-w-[360px] flex-shrink-0 rounded-2xl border border-[#D6D5E9] shadow-md
              bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out flex flex-col"
						aria-label={`Read blog: ${b.title}`}
					>
						<div className="h-48 w-full rounded-t-2xl overflow-hidden">
							<img
								src={b.img}
								alt={b.title}
								loading="lazy"
								className="object-cover w-full h-full transition-transform duration-300 ease-in-out hover:scale-105"
							/>
						</div>
						<div className="p-5 flex flex-col flex-grow">
							<h3 className="text-lg font-semibold text-[#2E358B] mb-2 line-clamp-2">
								{b.title}
							</h3>
							<p className="text-gray-600 flex-grow text-sm mb-4 line-clamp-3">
								{b.desc}
							</p>
							<div className="flex items-center justify-between text-xs text-gray-400 mb-4 select-none">
								<div className="flex items-center space-x-2">
									<Calendar className="w-4 h-4" />
									<span>{b.date}</span>
								</div>
								<div className="flex items-center space-x-2">
									<Tag className="w-4 h-4" />
									<span>{b.category}</span>
								</div>
							</div>
							<div className="flex items-center justify-between text-xs text-gray-500 border-t border-gray-200 pt-3 select-none">
								<div className="flex items-center space-x-1">
									<Eye className="w-4 h-4 text-gray-400" />
									<span>{b.views.toLocaleString()} views</span>
								</div>
								<div className="flex items-center space-x-1">
									<Heart className="w-4 h-4 text-pink-500" />
									<span>{b.likes.toLocaleString()} likes</span>
								</div>
							</div>
							<span className="mt-5 font-semibold text-[#CD3A99] hover:underline cursor-pointer select-text">
								Read More →
							</span>
						</div>
					</a>
				))}
			</div>
		</section>
	)
}
