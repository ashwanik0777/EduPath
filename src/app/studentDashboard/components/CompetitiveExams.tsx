"use client";
import React, { useState, useEffect } from "react";
import { CalendarPlus } from "lucide-react";

export default function CompetitiveExamsPage() {
  // State
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    type: "",
    qualification: "",
    department: "",
    mode: "",
    state: "",
    language: "",
  });
  const [exams, setExams] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedExam, setSelectedExam] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const [savedExams, setSavedExams] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [upcoming, setUpcoming] = useState<any[]>([]);
  // Fetch saved exams
  useEffect(() => {
    fetch("/api/user/savedExams")
      .then(res => res.json())
      .then(data => setSavedExams(data.data?.map((e: any) => e.exam_id) || []));
  }, []);

  // Fetch smart suggestions
  useEffect(() => {
    fetch("/api/exams/suggestions")
      .then(res => res.json())
      .then(data => setSuggestions(data.data || []));
  }, []);

  // Fetch upcoming exams (sorted by date)
  useEffect(() => {
    fetch("/api/exams?q=&sort=exam_date")
      .then(res => res.json())
      .then(data => setUpcoming((data.data || []).slice(0, 5)));
  }, []);

  // Fetch exams from backend
  useEffect(() => {
    setLoading(true);
    let url = "/api/exams?q=" + encodeURIComponent(search);
    Object.entries(filters).forEach(([k, v]) => {
      if (v) url += `&${k}=${encodeURIComponent(v)}`;
    });
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setExams(data.data || []);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load exams");
        setLoading(false);
      });
  }, [search, filters]);

  // Filter options
  const examTypes = ["", "Government Job", "Entrance Exam", "Defense", "State-Level"];
  const qualifications = ["", "After 10th", "After 12th", "After Graduation"];
  const departments = ["", "Banking", "Railways", "Teaching", "Medical", "Engineering"];
  const modes = ["", "Online", "Offline"];
  const states = ["", "JK", "All India"];
  const languages = ["", "English", "Hindi", "Urdu"];

  // Handlers
  const handleFilter = (key: string, value: string) => {
    setFilters((f) => ({ ...f, [key]: value }));
  };

  return (
  <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 p-0 md:p-8 relative overflow-x-hidden">
      {/* Header Section */}
      <header className="sticky top-0 z-30 bg-gradient-to-r from-blue-50/80 to-white/80 backdrop-blur-md shadow-sm py-6 mb-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-500 to-indigo-600 mb-2 drop-shadow-lg">Explore Competitive Exams</h1>
          <p className="text-lg md:text-xl text-blue-700 mb-6 font-medium">Find government and entrance exams that match your goal and qualification.</p>
          <div className="flex justify-center items-center gap-2">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search exam by name (e.g. SSC, UPSC, JKSSB...)"
              className="w-full max-w-xl px-5 py-3 rounded-2xl border-2 border-blue-200 shadow focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg bg-white/80"
            />
            <span className="inline-block bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-3 rounded-2xl font-bold shadow-lg animate-pulse">🔍</span>
          </div>
        </div>
      </header>

      {/* Filters Section */}
  <div className="max-w-5xl mx-auto mb-6 flex flex-wrap gap-3 justify-center bg-white/70 rounded-xl shadow p-4">
        <select className="input" value={filters.type} onChange={e => handleFilter("type", e.target.value)}>
          {examTypes.map((t) => <option key={t} value={t}>{t || "Exam Type"}</option>)}
        </select>
        <select className="input" value={filters.qualification} onChange={e => handleFilter("qualification", e.target.value)}>
          {qualifications.map((q) => <option key={q} value={q}>{q || "Qualification"}</option>)}
        </select>
        <select className="input" value={filters.department} onChange={e => handleFilter("department", e.target.value)}>
          {departments.map((d) => <option key={d} value={d}>{d || "Department"}</option>)}
        </select>
        <select className="input" value={filters.mode} onChange={e => handleFilter("mode", e.target.value)}>
          {modes.map((m) => <option key={m} value={m}>{m || "Exam Mode"}</option>)}
        </select>
        <select className="input" value={filters.state} onChange={e => handleFilter("state", e.target.value)}>
          {states.map((s) => <option key={s} value={s}>{s || "State"}</option>)}
        </select>
        <select className="input" value={filters.language} onChange={e => handleFilter("language", e.target.value)}>
          {languages.map((l) => <option key={l} value={l}>{l || "Language"}</option>)}
        </select>
      </div>

      {/* Exam List Section */}
  <div className="max-w-5xl mx-auto">
        {loading ? (
          <div className="text-center text-blue-600 py-8 text-lg animate-pulse">Loading exams...</div>
        ) : error ? (
          <div className="text-center text-red-500 py-8">{error}</div>
        ) : exams.length === 0 ? (
          <div className="text-center text-gray-500 py-8">No exams found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {exams.map((exam) => (
              <div key={exam.exam_id} className="bg-gradient-to-br from-white via-blue-50 to-blue-100 rounded-2xl shadow-xl p-7 flex flex-col gap-3 border border-blue-200 hover:scale-[1.03] hover:shadow-2xl transition-all duration-200 cursor-pointer group relative overflow-hidden" onClick={() => { setSelectedExam(exam); setShowModal(true); }}>
                <div className="absolute -top-8 -right-8 w-32 h-32 bg-blue-100 rounded-full opacity-30 blur-2xl group-hover:opacity-50 transition" />
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-blue-700 font-extrabold text-xl drop-shadow">{exam.name}</span>
                  <span className="bg-gradient-to-r from-blue-200 to-blue-400 text-blue-900 px-3 py-1 rounded-full text-xs font-bold shadow">{exam.type}</span>
                </div>
                <div className="text-sm text-gray-700">Conducting Body: <b>{exam.conducting_body}</b></div>
                <div className="text-sm">Eligibility: <b>{exam.eligibility}</b></div>
                <div className="text-sm">Application: <b>{exam.application_start} – {exam.application_end}</b></div>
                <div className="text-sm">Exam Date: <b>{exam.exam_date}</b></div>
                <div className="flex gap-2 mt-2">
                  <a
                    href={exam.official_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-500 text-white rounded-xl text-sm font-bold shadow hover:scale-105 hover:from-blue-700 hover:to-indigo-600 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    onClick={e => { e.stopPropagation(); setShowModal(false); setTimeout(() => window.open(exam.official_link, '_blank'), 100); }}
                  >Apply</a>
                  <button className="px-4 py-2 bg-gray-100 text-blue-900 rounded-xl text-sm font-bold shadow hover:bg-blue-200 transition-all duration-150" onClick={e => { e.stopPropagation(); setSelectedExam(exam); setShowModal(true); }}>View Details</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Exam Details Modal */}
      {showModal && selectedExam && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 relative animate-fadeIn max-h-[90vh] overflow-y-auto">
            <button className="absolute top-3 right-3 text-gray-400 hover:text-blue-600 text-2xl" onClick={() => setShowModal(false)}>&times;</button>
            <h2 className="text-2xl font-bold text-blue-900 mb-2">{selectedExam.name}</h2>
            <div className="mb-2 text-blue-700">Conducting Authority: <b>{selectedExam.conducting_body}</b></div>
            <div className="mb-2">Type: <b>{selectedExam.type}</b></div>
            <div className="mb-2">Qualification Required: <b>{selectedExam.eligibility}</b></div>
            <div className="mb-2">Age Limit: <b>{selectedExam.age_limit}</b></div>
            {selectedExam.posts && <div className="mb-2">Number of Posts: <b>{selectedExam.posts}</b></div>}
            {selectedExam.selection_process && <div className="mb-2">Selection Process: <b>{selectedExam.selection_process}</b></div>}
            {selectedExam.pattern && <div className="mb-2">Exam Pattern: <b>{selectedExam.pattern}</b></div>}
            {selectedExam.syllabus_pdf && <div className="mb-2">Syllabus: <a href={selectedExam.syllabus_pdf} target="_blank" className="text-blue-600 underline">Download</a></div>}
            {selectedExam.languages && <div className="mb-2">Exam Language: <b>{selectedExam.languages.join(", ")}</b></div>}
            {selectedExam.fee && <div className="mb-2">Exam Fee: <b>{selectedExam.fee}</b></div>}
            {selectedExam.important_dates && (
              <div className="mb-2">
                <b>Important Dates:</b>
                <ul className="list-disc ml-6">
                  {Object.entries(selectedExam.important_dates as Record<string, string>).map(([k, v]) => <li key={k}>{k}: {v}</li>)}
                </ul>
              </div>
            )}
            <div className="mb-2">Official Website: <a href={selectedExam.official_link} target="_blank" className="text-blue-600 underline">{selectedExam.official_link}</a></div>
            {selectedExam.last_year_cutoff && <div className="mb-2">Last Year Cutoff: <b>{selectedExam.last_year_cutoff}</b></div>}
            {/* Save/Remind Me, PDF Notification, Calendar, etc. can be added here */}
            <div className="flex flex-col gap-2 mt-4">
                <div className="flex gap-2 mt-4">
              <button
                className={`px-4 py-2 rounded-lg font-semibold transition ${savedExams.includes(selectedExam.exam_id) ? "bg-green-600 text-white hover:bg-green-700" : "bg-blue-600 text-white hover:bg-blue-700"}`}
                disabled={saving}
                onClick={async () => {
                  setSaving(true);
                  const action = savedExams.includes(selectedExam.exam_id) ? "unsave" : "save";
                  const res = await fetch("/api/user/savedExams", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ exam_id: selectedExam.exam_id, action }),
                  });
                  const data = await res.json();
                  if (data.success) setSavedExams(data.data);
                  setSaving(false);
                }}
              >
                {savedExams.includes(selectedExam.exam_id) ? "Saved" : "Save / Remind Me"}
              </button>
              {/* Calendar Integration */}
              <a
                href={`data:text/calendar;charset=utf8,BEGIN:VCALENDAR%0AVERSION:2.0%0ABEGIN:VEVENT%0ASUMMARY:${encodeURIComponent(selectedExam.name)}%0ADESCRIPTION=${encodeURIComponent(selectedExam.eligibility)}%0ADTSTART:${selectedExam.exam_date.replace(/-/g, "").slice(0,8)}T090000Z%0ADTEND:${selectedExam.exam_date.replace(/-/g, "").slice(0,8)}T100000Z%0ALOCATION=${encodeURIComponent(selectedExam.official_link)}%0AEND:VEVENT%0AEND:VCALENDAR`}
                download={`${selectedExam.name}-exam.ics`}
                className="px-4 py-2 bg-green-100 text-green-800 rounded-lg font-semibold flex items-center gap-1 hover:bg-green-200 transition"
                title="Add to Calendar"
              >
                <CalendarPlus className="w-4 h-4" /> Add to Calendar
              </a>
              </div>
            {/* Preparation Tips Section */}
            {selectedExam.recommended_courses && selectedExam.recommended_courses.length > 0 && (
              <div className="mt-4 bg-blue-50 rounded-lg p-4">
                <div className="font-bold text-blue-800 mb-1">Preparation Tips & Courses</div>
                <ul className="list-disc ml-6 text-blue-900">
                  {selectedExam.recommended_courses.map((tip: string, i: number) => <li key={i}>{tip}</li>)}
                </ul>
              </div>
            )}
      {/* Smart Suggestions Section */}
      {suggestions.length > 0 && (
        <div className="max-w-5xl mx-auto mt-10">
          <h3 className="text-xl font-bold mb-2 text-blue-900">Smart Suggestions for You</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {suggestions.map((exam) => (
              <div key={exam.exam_id} className="bg-blue-50 rounded-xl p-4 border border-blue-200 flex flex-col gap-1">
                <div className="font-semibold text-blue-800">{exam.name}</div>
                <div className="text-sm text-gray-700">Eligibility: {exam.eligibility}</div>
                <div className="text-sm">Exam Date: {exam.exam_date}</div>
                <a href={exam.official_link} target="_blank" className="text-blue-600 underline text-xs">Official Link</a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upcoming Exams Section */}
      {upcoming.length > 0 && (
        <div className="max-w-5xl mx-auto mt-10">
          <h3 className="text-xl font-bold mb-2 text-blue-900">Upcoming Exams</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {upcoming.map((exam) => {
              const daysLeft = Math.ceil((new Date(exam.exam_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
              return (
                <div key={exam.exam_id} className="bg-yellow-50 rounded-xl p-4 border border-yellow-200 flex flex-col gap-1">
                  <div className="font-semibold text-yellow-800">{exam.name}</div>
                  <div className="text-sm text-gray-700">Exam Date: {exam.exam_date}</div>
                  <div className="text-xs text-yellow-700">⏳ {daysLeft > 0 ? `${daysLeft} Days Left` : "Today!"}</div>
                  <a href={exam.official_link} target="_blank" className="text-yellow-700 underline text-xs">Official Link</a>
                </div>
              );
            })}
          </div>
        </div>
      )}
              {selectedExam.syllabus_pdf && <a href={selectedExam.syllabus_pdf} target="_blank" className="px-4 py-2 bg-gray-200 text-blue-900 rounded-lg font-semibold hover:bg-blue-300 transition">PDF Notification</a>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
