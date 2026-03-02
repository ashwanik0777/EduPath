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
      <HeroSection 
        title="Top Colleges in India"
        subtitle="Explore top government and private colleges across India. Find courses, admissions, and campus details."
        bgTheme={6}
      />  
      <FilterColleges onFilter={setFilter} initialFilter="All" />
      <CollegeList filter={filter} />
      <CTAColleges />
    </main>
  )
}
