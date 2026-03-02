"use client"
import { useState } from "react"
import HeroSection from "../../components/HeroSection"
import FilterColleges from "@/app/components/governmentCollege/FilterColleges"
import CollegeList from "@/app/components/governmentCollege/CollegeList"
import CTAColleges from "@/app/components/governmentCollege/CTAColleges"

export default function PrivateCollegesPage() {
  const [filter, setFilter] = useState("Private")

  return (
    <main>
      <HeroSection
        title="Top Private Colleges in India"
        subtitle="Explore top private colleges across India with key details on courses, admissions, and campus opportunities."
        bgTheme={6}
      />
      <FilterColleges onFilter={setFilter} initialFilter="Private" />
      <CollegeList filter={filter} />
      <CTAColleges />
    </main>
  )
}
