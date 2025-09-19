"use client";
import React, { useState, useEffect, useCallback } from "react";

export default function Scholarships() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    class: "",
    category: "",
    income: "",
    type: "",
    location: "",
    gender: "",
  });
  const [selected, setSelected] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [scholarships, setScholarships] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [savedScholarships, setSavedScholarships] = useState<string[]>([]);
  const [saving, setSaving] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<any[]>([]);

  // Fetch scholarships from backend
  useEffect(() => {
    setLoading(true);
    let url = "/api/scholarships?q=" + encodeURIComponent(search);
    Object.entries(filters).forEach(([k, v]) => {
      if (v) url += `&${k}=${encodeURIComponent(v)}`;
    });
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setScholarships(data.data || []);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load scholarships");
        setLoading(false);
      });
  }, [search, filters]);

  // Fetch saved scholarships for user
  const fetchSavedScholarships = useCallback(async () => {
    try {
      const res = await fetch('/api/user/savedScholarships');
      const data = await res.json();
      setSavedScholarships(data.saved || []);
    } catch {}
  }, []);

  useEffect(() => {
    fetchSavedScholarships();
  }, [fetchSavedScholarships]);

  // Save/unsave scholarship
  const isScholarshipSaved = (scholarshipId: string) => savedScholarships.includes(scholarshipId);
  const handleToggleSave = async (scholarshipId: string) => {
    setSaving(scholarshipId);
    try {
      if (isScholarshipSaved(scholarshipId)) {
        await fetch('/api/user/savedScholarships', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ scholarship_id: scholarshipId }),
        });
        setSavedScholarships((prev) => prev.filter((id) => id !== scholarshipId));
      } else {
        await fetch('/api/user/savedScholarships', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ scholarship_id: scholarshipId }),
        });
        setSavedScholarships((prev) => [...prev, scholarshipId]);
      }
    } catch {}
    setSaving(null);
  };

  // Fetch smart suggestions
  useEffect(() => {
    fetch('/api/scholarships/suggestions')
      .then(res => res.json())
      .then(data => setSuggestions(data.suggestions || []))
      .catch(() => setSuggestions([]));
  }, []);

  // Filter options
  const classLevels = ["", "10th", "12th", "Graduation", "PG"];
  const categories = ["", "General", "SC", "ST", "OBC", "Minority"];
  const incomes = ["", "Below ₹1L", "₹1L–₹3L", "₹3L+"];
  const types = ["", "Merit-based", "Need-based", "Caste-based", "Govt", "Private"];
  const locations = ["", "J&K", "National", "International"];
  const genders = ["", "For Girls Only", "All Students"];

  const handleFilter = (key: string, value: string) => {
    setFilters((f) => ({ ...f, [key]: value }));
  };

  return (
  <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 p-0 md:p-8">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto py-8 text-center">
        <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-500 to-indigo-600 mb-2 tracking-tight">Available Scholarships for You</h1>
        <p className="text-lg text-blue-700 mb-6 font-medium">Find and apply for scholarships based on your education, income, and background.</p>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search scholarship by name (e.g. PM Scholarship, JK Govt...)"
          className="w-full max-w-xl mx-auto px-4 py-3 rounded-xl border border-neutral-200 shadow focus:outline-none focus:ring-2 focus:ring-indigo-200 text-lg bg-white"
        />
      </div>

      {/* Filters Section */}
  <div className="max-w-5xl mx-auto mb-6 flex flex-wrap gap-3 justify-center bg-white rounded-xl shadow p-4 border border-neutral-100">
        <select className="input" value={filters.class} onChange={e => handleFilter("class", e.target.value)}>
          {classLevels.map((c) => <option key={c} value={c}>{c || "Class Level"}</option>)}
        </select>
        <select className="input" value={filters.category} onChange={e => handleFilter("category", e.target.value)}>
          {categories.map((cat) => <option key={cat} value={cat}>{cat || "Category"}</option>)}
        </select>
        <select className="input" value={filters.income} onChange={e => handleFilter("income", e.target.value)}>
          {incomes.map((inc) => <option key={inc} value={inc}>{inc || "Family Income"}</option>)}
        </select>
        <select className="input" value={filters.type} onChange={e => handleFilter("type", e.target.value)}>
          {types.map((t) => <option key={t} value={t}>{t || "Scholarship Type"}</option>)}
        </select>
        <select className="input" value={filters.location} onChange={e => handleFilter("location", e.target.value)}>
          {locations.map((l) => <option key={l} value={l}>{l || "Location"}</option>)}
        </select>
        <select className="input" value={filters.gender} onChange={e => handleFilter("gender", e.target.value)}>
          {genders.map((g) => <option key={g} value={g}>{g || "Gender"}</option>)}
        </select>
      </div>

      {/* Scholarship List Section */}
      <div className="max-w-5xl mx-auto">
        {loading ? (
          <div className="text-center text-pink-600 py-8 text-lg animate-pulse">Loading scholarships...</div>
        ) : error ? (
          <div className="text-center text-red-500 py-8">{error}</div>
        ) : scholarships.length === 0 ? (
          <div className="text-center text-gray-500 py-8">No scholarships found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {scholarships.map((sch) => (
              <div key={sch.scholarship_id} className="bg-white rounded-xl shadow p-6 flex flex-col gap-2 border border-neutral-100 hover:shadow-lg transition cursor-pointer hover:scale-[1.01]" onClick={() => { setSelected(sch); setShowModal(true); }}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-indigo-700 font-bold text-lg">{sch.name}</span>
                  <span className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full text-xs font-semibold border border-indigo-100">{sch.provider}</span>
                </div>
                <div className="text-sm text-gray-700">Eligibility: <b>{sch.eligibility.class}, {sch.eligibility.category}, {sch.eligibility.income_limit}</b></div>
                <div className="text-sm">Amount: <b>{sch.amount}</b></div>
                <div className="text-sm">Deadline: <b>{sch.deadline}</b></div>
                <div className="flex gap-2 mt-2">
                  <a href={sch.apply_link} target="_blank" className="px-3 py-1 bg-indigo-600 text-white rounded-lg text-xs font-semibold hover:bg-indigo-700 shadow transition">Apply Now</a>
                  <button className="px-3 py-1 bg-neutral-100 text-indigo-900 rounded-lg text-xs font-semibold hover:bg-indigo-50 transition border border-neutral-200" onClick={e => { e.stopPropagation(); setSelected(sch); setShowModal(true); }}>View Details</button>
                  <button
                    className={`px-3 py-1 rounded-lg text-xs font-semibold border transition ${isScholarshipSaved(sch.scholarship_id) ? 'bg-indigo-100 text-indigo-700 border-indigo-200' : 'bg-white text-indigo-900 border-neutral-200 hover:bg-indigo-50'}`}
                    title={isScholarshipSaved(sch.scholarship_id) ? 'Remove Reminder' : 'Save/Remind Me'}
                    onClick={e => { e.stopPropagation(); handleToggleSave(sch.scholarship_id); }}
                    disabled={saving === sch.scholarship_id}
                  >
                    {isScholarshipSaved(sch.scholarship_id) ? 'Saved' : 'Save/Remind'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Scholarship Details Modal */}
      {showModal && selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-8 relative animate-fadeIn border border-neutral-200">
            <button className="absolute top-3 right-3 text-neutral-400 hover:text-indigo-600 text-2xl" onClick={() => setShowModal(false)}>&times;</button>
            <h2 className="text-2xl font-extrabold text-neutral-800 mb-2 tracking-tight">{selected.name}</h2>
            <div className="mb-2 text-indigo-700 font-semibold">Provider: <b>{selected.provider}</b></div>
            <div className="mb-2">Type: <b>{selected.type}</b></div>
            <div className="mb-2">Eligibility: <b>{selected.eligibility.class}, {selected.eligibility.category}, {selected.eligibility.income_limit}</b></div>
            {selected.documents_required && <div className="mb-2">Documents Required: <b>{selected.documents_required.join(", ")}</b></div>}
            {selected.amount && <div className="mb-2">Amount: <b>{selected.amount}</b></div>}
            {selected.renewal && <div className="mb-2">Renewal: <b>{selected.renewal}</b></div>}
            {selected.selection_process && <div className="mb-2">Selection Process: <b>{selected.selection_process}</b></div>}
            {selected.how_to_apply && <div className="mb-2">How to Apply: <b>{selected.how_to_apply}</b></div>}
            {selected.important_dates && (
              <div className="mb-2">
                <b>Important Dates:</b>
                <ul className="list-disc ml-6">
                  {Object.entries(selected.important_dates as Record<string, string>).map(([k, v]) => <li key={k}>{k}: {v}</li>)}
                </ul>
              </div>
            )}
            <div className="mb-2">Official Website: <a href={selected.apply_link} target="_blank" className="text-pink-600 underline">{selected.apply_link}</a></div>
            <div className="flex gap-2 mt-4">
              <button
                className={`px-4 py-2 rounded-lg font-semibold border transition ${isScholarshipSaved(selected.scholarship_id) ? 'bg-indigo-600 text-white border-indigo-700 hover:bg-indigo-700' : 'bg-white text-indigo-900 border-neutral-200 hover:bg-indigo-50'}`}
                onClick={() => handleToggleSave(selected.scholarship_id)}
                disabled={saving === selected.scholarship_id}
              >
                {isScholarshipSaved(selected.scholarship_id) ? 'Saved' : 'Save / Reminder'}
              </button>
              {selected.pdf && <a href={selected.pdf} target="_blank" className="px-4 py-2 bg-neutral-100 text-indigo-900 rounded-lg font-semibold border border-neutral-200 hover:bg-indigo-50 transition">PDF Notification</a>}
            </div>
      {/* Smart Suggestions Section */}
      {suggestions.length > 0 && (
        <div className="max-w-5xl mx-auto mt-10 mb-6 bg-white rounded-xl shadow p-6 border border-neutral-100">
          <h2 className="text-xl font-extrabold text-neutral-800 mb-2 tracking-tight">Recommended Scholarships for You</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {suggestions.map((sch) => (
              <div key={sch.scholarship_id} className="bg-white rounded-xl shadow p-5 flex flex-col gap-2 border border-neutral-100 hover:scale-[1.01] transition">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-indigo-700 font-bold text-lg">{sch.name}</span>
                  <span className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full text-xs font-semibold border border-indigo-100">{sch.provider}</span>
                </div>
                <div className="text-sm text-gray-700">Eligibility: <b>{sch.eligibility.class}, {sch.eligibility.category}, {sch.eligibility.income_limit}</b></div>
                <div className="text-sm">Amount: <b>{sch.amount}</b></div>
                <div className="text-sm">Deadline: <b>{sch.deadline}</b></div>
                <div className="flex gap-2 mt-2">
                  <a href={sch.apply_link} target="_blank" className="px-3 py-1 bg-indigo-600 text-white rounded-lg text-xs font-semibold hover:bg-indigo-700 shadow transition">Apply Now</a>
                  <button className="px-3 py-1 bg-neutral-100 text-indigo-900 rounded-lg text-xs font-semibold hover:bg-indigo-50 transition border border-neutral-200" onClick={() => { setSelected(sch); setShowModal(true); }}>View Details</button>
                  <button
                    className={`px-3 py-1 rounded-lg text-xs font-semibold border transition ${isScholarshipSaved(sch.scholarship_id) ? 'bg-indigo-100 text-indigo-700 border-indigo-200' : 'bg-white text-indigo-900 border-neutral-200 hover:bg-indigo-50'}`}
                    title={isScholarshipSaved(sch.scholarship_id) ? 'Remove Reminder' : 'Save/Remind Me'}
                    onClick={e => { e.stopPropagation(); handleToggleSave(sch.scholarship_id); }}
                    disabled={saving === sch.scholarship_id}
                  >
                    {isScholarshipSaved(sch.scholarship_id) ? 'Saved' : 'Save/Remind'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
          </div>
        </div>
      )}
    </div>
  );
}
