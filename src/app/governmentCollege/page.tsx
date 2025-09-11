"use client"
import { useState } from "react"
import HeroSection from "../components/HeroSection"
import FilterColleges from "@/app/components/governmentCollege/FilterColleges"
import CollegeList from "@/app/components/governmentCollege/CollegeList"
import CTAColleges from "@/app/components/governmentCollege/CTAColleges"

export default function CollegesPage() {
  const [filter, setFilter] = useState("All")

  return (
    <main>
      <HeroSection />
      <FilterColleges onFilter={setFilter} />
      <CollegeList filter={filter} />
      <CTAColleges />
    </main>
  )
}
