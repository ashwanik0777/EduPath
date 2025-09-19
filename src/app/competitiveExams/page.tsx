"use client";
import React from "react";

export default function CompetitiveExamsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-0 md:p-8">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto py-8 text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-blue-900 mb-2">Explore Competitive Exams</h1>
        <p className="text-lg text-blue-700 mb-6">Find government and entrance exams that match your goal and qualification.</p>
        <input
          type="text"
          placeholder="Search exam by name (e.g. SSC, UPSC, JKSSB...)"
          className="w-full max-w-xl mx-auto px-4 py-3 rounded-xl border border-blue-200 shadow focus:outline-none focus:ring-2 focus:ring-blue-300 text-lg"
        />
      </div>
      {/* Filters, Exam List, Details, Suggestions, etc. will go here */}
      <div className="max-w-5xl mx-auto">
        {/* TODO: Filters Section */}
        {/* TODO: Exam List Section */}
        {/* TODO: Exam Details Modal */}
        {/* TODO: Smart Suggestions & Upcoming Exams */}
      </div>
    </div>
  );
}
