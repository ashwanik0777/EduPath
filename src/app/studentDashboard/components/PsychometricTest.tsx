"use client";
import React, { useState } from "react";

type TestStage = "intro" | "assessment" | "processing" | "result" | "report";

export default function PsychometricTest() {
  const [stage, setStage] = useState<TestStage>("intro");
  // Placeholder for dynamic data (to be fetched from backend)
  const duration = 20;
  // For now, static questions, but structure for dynamic fetch

  // --- Assessment Section State ---
  // Time tracking per section
  const [sectionTimes, setSectionTimes] = useState<{ [section: string]: number }>({});
  const [sectionStart, setSectionStart] = useState<number | null>(null);

  // Dynamic questions state
  const [sections, setSections] = useState<any[]>([]);
  const [loadingQuestions, setLoadingQuestions] = useState(true);

  // Fetch questions from backend on mount
  React.useEffect(() => {
    async function fetchQuestions() {
      setLoadingQuestions(true);
      try {
        const res = await fetch("/api/psychometric/questions");
        const data = await res.json();
        // Group questions by section
        const grouped: any = {};
        data.questions.forEach((q: any) => {
          if (!grouped[q.section]) grouped[q.section] = { key: q.section, title: q.sectionTitle, questions: [] };
          grouped[q.section].questions.push(q);
        });
        setSections(Object.values(grouped));
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error("Failed to fetch questions", e);
      }
      setLoadingQuestions(false);
    }
    fetchQuestions();
  }, []);

  // Flatten all questions for progress
  const allQuestions = sections.flatMap((s) => s.questions.map((q: any, i: number) => ({ ...q, section: s.key, sectionTitle: s.title, sectionIndex: sections.findIndex(sec => sec.key === s.key), qIndex: i })));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: any }>({});
  const [history, setHistory] = useState<any[]>([]);
  const [result, setResult] = useState<any>(null);
  const [analytics, setAnalytics] = useState<any>(null);
  const [loadingAnalytics, setLoadingAnalytics] = useState(true);
  // Fetch analytics on mount
  React.useEffect(() => {
    async function fetchAnalytics() {
      setLoadingAnalytics(true);
      try {
        const res = await fetch("/api/psychometric/analytics");
        const data = await res.json();
        if (data.analytics) setAnalytics(data.analytics);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error("Failed to fetch analytics", e);
      }
      setLoadingAnalytics(false);
    }
    fetchAnalytics();
  }, []);

  // Track section time on question/section change
  React.useEffect(() => {
    if (stage !== "assessment") return;
    const q = allQuestions[currentIndex];
    if (!q) return;
    if (sectionStart === null) {
      setSectionStart(Date.now());
      return;
    }
    // If section changed, record time
    const prevQ = allQuestions[currentIndex - 1];
    if (prevQ && prevQ.section !== q.section) {
      const elapsed = Math.floor((Date.now() - (sectionStart || Date.now())) / 1000);
      setSectionTimes((prev) => ({ ...prev, [prevQ.section]: (prev[prevQ.section] || 0) + elapsed }));
      setSectionStart(Date.now());
    }
  }, [currentIndex, stage]);

  // On finish, record last section time and save to backend
  React.useEffect(() => {
    async function saveResult() {
      const answersArr = allQuestions.map((q, idx) => ({
        questionId: `${q.section}-${q.qIndex}`,
        answer: answers[idx],
        timeSpent: sectionTimes[q.section] || 0,
      }));
      try {
        const res = await fetch("/api/psychometric", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ answers: answersArr, timeSpent: Object.values(sectionTimes).reduce((a, b) => a + b, 0) }),
        });
        const data = await res.json();
        if (data.success) {
          setResult(data.attempt);
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error("Failed to save assessment result", e);
      }
    }
    if (stage === "processing" && sectionStart !== null) {
      const lastQ = allQuestions[currentIndex];
      if (lastQ) {
        const elapsed = Math.floor((Date.now() - sectionStart) / 1000);
        setSectionTimes((prev) => ({ ...prev, [lastQ.section]: (prev[lastQ.section] || 0) + elapsed }));
      }
      setSectionStart(null);
      saveResult();
    }
  }, [stage]);
  // Fetch test history on mount
  React.useEffect(() => {
    async function fetchHistory() {
      try {
        const res = await fetch("/api/psychometric");
        const data = await res.json();
        if (data.attempts) setHistory(data.attempts);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error("Failed to fetch psychometric history", e);
      }
    }
    fetchHistory();
  }, []);

  // --- Processing Section Effect ---
  React.useEffect(() => {
    if (stage === "processing") {
      const timer = setTimeout(() => {
        setStage("result");
      }, 2500); // Simulate backend processing
      return () => clearTimeout(timer);
    }
    // Always return a cleanup function for consistent hook order
    return undefined;
  }, [stage]);

  // --- Intro Section ---
  if (loadingQuestions) {
    return <div className="p-10 text-center text-indigo-600 text-xl animate-pulse">Loading questions...</div>;
  }
  if (sections.length === 0) {
    return <div className="p-10 text-center text-rose-600 text-xl">No questions found. Please contact admin.</div>;
  }
  if (stage === "intro") {
    function handleStartTest() {
      setAnswers({});
      setCurrentIndex(0);
      setSectionTimes({});
      setSectionStart(null);
      setResult(null);
      setStage("assessment");
    }
    return (
      <section className="min-h-screen mx-auto bg-gradient-to-br from-indigo-50 via-white to-blue-100 rounded-3xl shadow-xl p-10 animate-fade-in">
        <h1 className="text-3xl md:text-4xl font-extrabold text-indigo-800 mb-2 text-center">Discover the Right Career for You!</h1>
        <p className="text-lg text-zinc-700 mb-4 text-center">This test measures your personality traits to recommend the best career paths for you.</p>
        <div className="flex flex-wrap justify-center gap-6 mb-6">
          <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center w-40">
            <span className="text-2xl font-bold text-indigo-600">{duration} min</span>
            <span className="text-xs text-zinc-500 mt-1">Test Duration</span>
          </div>
          <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center w-40">
            <span className="text-2xl font-bold text-indigo-600">{allQuestions.length}</span>
            <span className="text-xs text-zinc-500 mt-1">Questions</span>
          </div>
        </div>
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-indigo-700 mb-2">Instructions</h2>
          <ul className="list-disc list-inside text-zinc-700 space-y-1">
            <li>There are no right or wrong answers. Be honest for best results.</li>
            <li>Read each question carefully and select the option that best describes you.</li>
            <li>You can navigate between questions and sections.</li>
            <li>Your answers will be auto-saved.</li>
          </ul>
        </div>
        <div className="flex flex-col items-center gap-4">
          <button
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-3 rounded-xl text-lg shadow-lg transition-all w-full max-w-xs"
            onClick={handleStartTest}
          >
            Start Test
          </button>
          <span className="text-xs text-zinc-500">Your answers will be auto-saved</span>
        </div>
        {/* Analytics Section */}
        <div className="mt-10">
          <h2 className="text-xl font-bold text-indigo-700 mb-4 text-center">Your Psychometric Analytics</h2>
          {loadingAnalytics ? (
            <div className="text-indigo-500 text-center">Loading analytics...</div>
          ) : analytics ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow p-6">
                <h3 className="text-lg font-semibold text-indigo-700 mb-2">Average Trait Scores</h3>
                <ul className="space-y-2">
                  {Object.entries(analytics.avgScores).map(([trait, val]: any) => (
                    <li key={trait} className="flex justify-between text-zinc-700 font-medium">
                      <span>{trait}</span>
                      <span>{val}%</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-xl shadow p-6">
                <h3 className="text-lg font-semibold text-indigo-700 mb-2">Most Common Top Career</h3>
                <div className="text-2xl font-bold text-indigo-600 mb-2">{analytics.mostCommonCareer || "-"}</div>
                <div className="text-zinc-500">Total Attempts: {analytics.totalAttempts}</div>
              </div>
            </div>
          ) : (
            <div className="text-rose-500 text-center">No analytics available.</div>
          )}
        </div>
        {/* Test History */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-indigo-800 mb-6 text-center flex items-center justify-center gap-2">
            
            Your Previous Psychometric Tests
          </h2>
          {history.length === 0 ? (
            <div className="bg-white/80 rounded-xl shadow p-8 text-center text-zinc-500 text-lg border border-indigo-100">
              <span className="block mb-2 text-3xl">📝</span>
              You haven’t taken any psychometric tests yet.<br />Start your first test to see your results here!
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-xl shadow border border-indigo-100">
                <thead className="bg-indigo-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider rounded-tl-xl">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">Score</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">Top Career</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider rounded-tr-xl">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((h, idx) => (
                    <tr key={h._id} className={
                      `transition-colors ${idx % 2 === 0 ? "bg-white" : "bg-indigo-50"} hover:bg-indigo-100/70`}
                    >
                      <td className="px-6 py-3 text-sm font-medium text-zinc-700 whitespace-nowrap">{new Date(h.takenAt).toLocaleString()}</td>
                      <td className="px-6 py-3 text-sm font-bold">
                        <span className="inline-block bg-indigo-100 text-indigo-700 rounded-full px-3 py-1 text-xs font-semibold shadow">
                          {h.overallScore}%
                        </span>
                      </td>
                      <td className="px-6 py-3 text-sm">
                        {h.recommendations?.careerPaths?.[0]?.field ? (
                          <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 rounded-full px-3 py-1 text-xs font-semibold shadow">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422A12.083 12.083 0 0112 21.5a12.083 12.083 0 01-6.16-10.922L12 14z" /></svg>
                            {h.recommendations.careerPaths[0].field}
                          </span>
                        ) : (
                          <span className="inline-block bg-zinc-100 text-zinc-500 rounded-full px-3 py-1 text-xs font-semibold">-</span>
                        )}
                      </td>
                      <td className="px-6 py-3 text-sm">
                        <button className="text-indigo-600 underline font-semibold hover:text-indigo-900 transition" onClick={() => { setResult(h); setStage("result"); }}>View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    );
  }

  // ...existing code...

  if (stage === "assessment") {
    const q = allQuestions[currentIndex];
    const total = allQuestions.length;
    const percent = Math.round(((currentIndex + 1) / total) * 100);
    const section = sections[q.sectionIndex];

    function handleAnswer(val: any) {
      setAnswers((prev) => ({ ...prev, [currentIndex]: val }));
    }

    function handleNext() {
      if (currentIndex < total - 1) setCurrentIndex(currentIndex + 1);
      else setStage("processing");
    }

    function handlePrev() {
      if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
    }

    // Option rendering
    let options = null;
    if (q.type === "scale") {
      options = [
        "Strongly Disagree",
        "Disagree",
        "Neutral",
        "Agree",
        "Strongly Agree",
      ];
    } else if (q.type === "mcq") {
      options = (q as any).options || [];
    }

    return (
      <section className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-8 mt-10 mb-10 animate-fade-in flex flex-col gap-6">
        {/* Progress Bar */}
        <div className="mb-2">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-indigo-700 font-semibold">Section: {section.title}</span>
            <span className="text-xs text-zinc-500">Q {currentIndex + 1} / {total}</span>
          </div>
          <div className="w-full h-2 bg-indigo-100 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-500 transition-all" style={{ width: percent + "%" }} />
          </div>
        </div>

        {/* Question */}
        <div className="text-lg md:text-xl font-bold text-indigo-900 mb-2 text-center min-h-[48px]">{q.q}</div>

        {/* Options */}
        <div className="flex flex-wrap justify-center gap-3 mb-4">
          {options && options.map((opt: string, i: number) => (
            <button
              key={opt}
              className={`px-5 py-2 rounded-xl font-semibold shadow border transition-all text-sm md:text-base
                ${answers[currentIndex] === i ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-indigo-700 border-indigo-200 hover:bg-indigo-50"}`}
              onClick={() => handleAnswer(i)}
            >
              {opt}
            </button>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-2">
          <button
            className="px-4 py-2 rounded-lg bg-zinc-100 text-zinc-600 font-semibold shadow hover:bg-zinc-200 disabled:opacity-50"
            onClick={handlePrev}
            disabled={currentIndex === 0}
          >
            Previous
          </button>
          <button
            className="px-6 py-2 rounded-lg bg-indigo-600 text-white font-bold shadow hover:bg-indigo-700 disabled:opacity-50"
            onClick={handleNext}
            disabled={typeof answers[currentIndex] === "undefined"}
          >
            {currentIndex === total - 1 ? "Finish Test" : "Save & Next"}
          </button>
        </div>
      </section>
    );
  }

  if (stage === "processing") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh] animate-fade-in">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-500 border-solid mb-6"></div>
        <h2 className="text-2xl font-bold text-indigo-700 mb-2">Analyzing your responses...</h2>
        <p className="text-zinc-500">Please wait a moment while we generate your personalized career report.</p>
      </div>
    );
  }

  // --- Result Section ---
  if (stage === "result" && result) {
    // Helper to format seconds as mm:ss
    function formatTime(sec: number) {
      const m = Math.floor(sec / 60);
      const s = sec % 60;
      return `${m}:${s.toString().padStart(2, "0")}`;
    }
    return (
      <section className="mx-auto bg-gradient-to-br from-indigo-50 via-white to-blue-100 rounded-3xl shadow-xl p-8 mt-10 animate-fade-in">
        <h1 className="text-2xl md:text-3xl font-extrabold text-indigo-800 mb-4 text-center">Your Career Fit Summary</h1>
        {/* Top Careers */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-indigo-700 mb-2 flex items-center gap-2">
            <span>Top Career Matches</span>
          </h2>
          <div className="space-y-5">
            {result.recommendations?.careerPaths?.map((c: any, i: number) => (
              <div key={c.field} className="bg-white rounded-xl shadow p-4 flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-8 rounded-full ${i === 0 ? "bg-green-500" : i === 1 ? "bg-blue-400" : "bg-yellow-400"}`}></div>
                  <div className="flex-1">
                    <div className="font-semibold text-indigo-900 flex items-center gap-2">
                      {c.field}
                    </div>
                    <div className="w-full h-2 bg-indigo-100 rounded-full overflow-hidden mt-1">
                      <div className={`h-full ${i === 0 ? "bg-green-500" : i === 1 ? "bg-blue-400" : "bg-yellow-400"}`} style={{ width: c.match + "%" }} />
                    </div>
                  </div>
                  <div className="font-bold text-lg text-indigo-700">{c.match}%</div>
                </div>
                <div className="text-zinc-600 text-sm mt-1 italic">{c.description}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Scores/Traits */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-indigo-700 mb-2">Trait Profile</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {result.scores?.map((s: any) => (
              <div key={s.category} className="flex flex-col gap-1">
                <div className="flex justify-between text-sm font-medium text-zinc-700">
                  <span>{s.category}</span>
                  <span>{s.percentage}% ({s.interpretation})</span>
                </div>
                <div className="w-full h-2 bg-indigo-100 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-400" style={{ width: s.percentage + "%" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Time Spent */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-indigo-700 mb-2">Time Spent</h2>
          <div className="text-zinc-700">{formatTime(result.timeSpent || 0)}</div>
        </div>
        {/* Next Steps */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-indigo-700 mb-2">Next Steps</h2>
          <ul className="list-disc list-inside text-zinc-700 space-y-1">
            {result.recommendations?.nextSteps?.map((step: string, i: number) => (
              <li key={i}>{step}</li>
            ))}
          </ul>
        </div>
        {/* Call to Action */}
        <div className="flex flex-wrap gap-4 justify-center mt-6">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-3 rounded-xl shadow transition-all" onClick={() => setStage("intro")}>Take Again</button>
        </div>
      </section>
    );
  }

  // --- Report Section (to be implemented) ---
  if (stage === "report") {
    return (
      <div className="p-8 text-center text-zinc-400 text-xl">[Detailed Report coming soon...]</div>
    );
  }

  return null;
}
