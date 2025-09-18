"use client";
import React, { useState } from "react";

type TestStage = "intro" | "assessment" | "processing" | "result" | "report";

export default function PsychometricTest() {
  const [stage, setStage] = useState<TestStage>("intro");
  // Placeholder for dynamic data (to be fetched from backend)
  const totalQuestions = 48;
  const duration = 20;

  // --- Assessment Section State ---
  // Time tracking per section
  const [sectionTimes, setSectionTimes] = useState<{ [section: string]: number }>({});
  const [sectionStart, setSectionStart] = useState<number | null>(null);

  // Placeholder question data (replace with backend fetch)
  const sections = [
    {
      key: "interest",
      title: "Interest-Based Questions",
      questions: [
        { q: "You enjoy solving puzzles", type: "scale" },
        { q: "You like helping others with their problems", type: "scale" },
        { q: "You are interested in how things work", type: "scale" },
      ],
    },
    {
      key: "aptitude",
      title: "Aptitude / Logical Thinking",
      questions: [
        { q: "What is the next number in the sequence: 2, 4, 8, 16, ?", type: "mcq", options: ["18", "24", "32", "20"] },
        { q: "If all roses are flowers and some flowers fade quickly, can some roses fade quickly?", type: "mcq", options: ["Yes", "No", "Cannot say"] },
      ],
    },
    {
      key: "personality",
      title: "Personality Traits",
      questions: [
        { q: "You prefer to plan everything in advance", type: "scale" },
        { q: "You feel energized by social gatherings", type: "scale" },
      ],
    },
    {
      key: "workpref",
      title: "Work Preference",
      questions: [
        { q: "You prefer working in a team over working alone", type: "scale" },
        { q: "You like routine tasks more than variety", type: "scale" },
      ],
    },
  ];

  // Flatten all questions for progress
  const allQuestions = sections.flatMap((s) => s.questions.map((q, i) => ({ ...q, section: s.key, sectionTitle: s.title, sectionIndex: sections.findIndex(sec => sec.key === s.key), qIndex: i })));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: any }>({});

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
      // Prepare responses for backend
      const responses = allQuestions.map((q, idx) => ({
        questionId: `${q.section}-${q.qIndex}`,
        answer: answers[idx],
        timeSpent: sectionTimes[q.section] || 0,
      }));
      // Dummy scoring logic (replace with real scoring)
      const scores = [
        { category: "Interest", score: 80, percentage: 80, interpretation: "High interest" },
        { category: "Aptitude", score: 70, percentage: 70, interpretation: "Good aptitude" },
        { category: "Personality", score: 90, percentage: 90, interpretation: "Strong personality" },
        { category: "WorkPref", score: 60, percentage: 60, interpretation: "Balanced" },
      ];
      const overallScore = 75;
      const recommendations = {
        careerPaths: [
          { field: "Graphic Designer", match: 87, description: "You would excel in design fields.", suggestedCourses: [], topColleges: [] },
          { field: "Psychologist", match: 81, description: "You are a natural helper.", suggestedCourses: [], topColleges: [] },
        ],
        nextSteps: ["Explore design courses", "Talk to a counselor"],
        resources: [],
      };
      try {
        await fetch("/api/user/assessments", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            responses,
            scores,
            overallScore,
            recommendations,
            timeSpent: Object.values(sectionTimes).reduce((a, b) => a + b, 0),
          }),
        });
      } catch (e) {
        // Optionally show error to user
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
  if (stage === "intro") {
    return (
      <section className="min-h-screen mx-auto bg-gradient-to-br from-indigo-50 via-white to-blue-100 rounded-3xl shadow-xl p-10 animate-fade-in">
        <h1 className="text-3xl md:text-4xl font-extrabold text-indigo-800 mb-2 text-center">Discover the Right Career for You!</h1>
        <p className="text-lg text-zinc-700 mb-4 text-center">This test measures your interests, aptitude, personality, and work preferences to recommend the best career paths for you.</p>
        <div className="flex flex-wrap justify-center gap-6 mb-6">
          <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center w-40">
            <span className="text-2xl font-bold text-indigo-600">{duration} min</span>
            <span className="text-xs text-zinc-500 mt-1">Test Duration</span>
          </div>
          <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center w-40">
            <span className="text-2xl font-bold text-indigo-600">{totalQuestions}</span>
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
            onClick={() => setStage("assessment")}
          >
            Start Test
          </button>
          <span className="text-xs text-zinc-500">Your answers will be auto-saved</span>
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
  if (stage === "result") {
    // Placeholder result data (replace with backend response)
    const topCareers = [
      {
        name: "Graphic Designer",
        match: 87,
        explanation:
          "Your high creativity and visual reasoning suggest you would excel in design fields. You enjoy solving problems visually and have a strong sense of aesthetics.",
      },
      {
        name: "Psychologist",
        match: 81,
        explanation:
          "Your strong people skills and empathy indicate a natural ability to understand and help others. You are interested in how people think and behave.",
      },
      {
        name: "Civil Engineer",
        match: 78,
        explanation:
          "Your practical skills and logical reasoning are a great fit for engineering. You like to see how things work and enjoy building or improving structures.",
      },
    ];
    const skills = [
      { name: "Logical Reasoning", value: 80 },
      { name: "Creativity", value: 92 },
      { name: "People Skills", value: 75 },
      { name: "Leadership", value: 68 },
      { name: "Practical Skills", value: 85 },
    ];
    const personality = {
      tag: "The Planner (ISTJ)",
      desc: "You are organized, reliable, and prefer structure. You excel at planning and executing tasks with precision.",
    };

    // Placeholder for past results (simulate fetch from backend)
    const pastResults = {
      date: "2025-06-01",
      topCareers: [
        { name: "Civil Engineer", match: 82 },
        { name: "Graphic Designer", match: 75 },
        { name: "Teacher", match: 70 },
      ],
      skills: [
        { name: "Logical Reasoning", value: 78 },
        { name: "Creativity", value: 85 },
        { name: "People Skills", value: 72 },
        { name: "Leadership", value: 65 },
        { name: "Practical Skills", value: 80 },
      ],
      personality: {
        tag: "The Builder (ESTJ)",
        desc: "You are practical, organized, and enjoy leading projects to completion.",
      },
    };

    // Helper to format seconds as mm:ss
    function formatTime(sec: number) {
      const m = Math.floor(sec / 60);
      const s = sec % 60;
      return `${m}:${s.toString().padStart(2, "0")}`;
    }

    return (
      <section className="mx-auto bg-gradient-to-br from-indigo-50 via-white to-blue-100 rounded-3xl shadow-xl p-8 mt-10 animate-fade-in">
        <h1 className="text-2xl md:text-3xl font-extrabold text-indigo-800 mb-4 text-center">Your Career Fit Summary</h1>

        {/* Compare with Past Results */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-indigo-700 mb-2 flex items-center gap-2">
            <span>Top Career Matches</span>
            <span className="text-xs text-zinc-400 font-normal">{pastResults ? `Compared to last test (${pastResults.date})` : null}</span>
          </h2>
          <div className="space-y-5">
            {topCareers.map((c, i) => {
              const prev = pastResults.topCareers.find((p) => p.name === c.name);
              const diff = prev ? c.match - prev.match : null;
              return (
                <div key={c.name} className="bg-white rounded-xl shadow p-4 flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-8 rounded-full ${i === 0 ? "bg-green-500" : i === 1 ? "bg-blue-400" : "bg-yellow-400"}`}></div>
                    <div className="flex-1">
                      <div className="font-semibold text-indigo-900 flex items-center gap-2">
                        {c.name}
                        {diff !== null && (
                          <span className={`text-xs font-bold ${diff > 0 ? "text-green-600" : diff < 0 ? "text-rose-500" : "text-zinc-400"}`}>
                            {diff > 0 ? `▲ +${diff}` : diff < 0 ? `▼ ${diff}` : ""}
                          </span>
                        )}
                      </div>
                      <div className="w-full h-2 bg-indigo-100 rounded-full overflow-hidden mt-1">
                        <div className={`h-full ${i === 0 ? "bg-green-500" : i === 1 ? "bg-blue-400" : "bg-yellow-400"}`} style={{ width: c.match + "%" }} />
                      </div>
                    </div>
                    <div className="font-bold text-lg text-indigo-700">{c.match}%</div>
                  </div>
                  <div className="text-zinc-600 text-sm mt-1 italic">{c.explanation}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Skill & Trait Graphs Comparison */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-indigo-700 mb-2">Skill & Trait Profile</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skills.map((s) => {
              const prev = pastResults.skills.find((p) => p.name === s.name);
              const diff = prev ? s.value - prev.value : null;
              return (
                <div key={s.name} className="flex flex-col gap-1">
                  <div className="flex justify-between text-sm font-medium text-zinc-700">
                    <span>{s.name}</span>
                    <span>
                      {s.value}%
                      {diff !== null && (
                        <span className={`ml-2 text-xs font-bold ${diff > 0 ? "text-green-600" : diff < 0 ? "text-rose-500" : "text-zinc-400"}`}>
                          {diff > 0 ? `▲ +${diff}` : diff < 0 ? `▼ ${diff}` : ""}
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-indigo-100 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-400" style={{ width: s.value + "%" }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Personality Type Comparison */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-indigo-700 mb-2">Personality Type</h2>
          <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
            <div className="text-xl font-bold text-indigo-700 mb-1 flex items-center gap-2">
              {personality.tag}
              {pastResults && pastResults.personality.tag !== personality.tag && (
                <span className="text-xs text-rose-500 font-semibold">Changed from {pastResults.personality.tag}</span>
              )}
            </div>
            <div className="text-zinc-600 text-center">{personality.desc}</div>
            {pastResults && pastResults.personality.tag !== personality.tag && (
              <div className="text-xs text-zinc-400 mt-1">Previous: {pastResults.personality.desc}</div>
            )}
          </div>
        </div>

        {/* Time Tracking Per Section */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-indigo-700 mb-2">Time Spent Per Section</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sections.map((sec) => (
              <div key={sec.key} className="flex justify-between items-center bg-white rounded-xl shadow p-3">
                <span className="font-medium text-zinc-700">{sec.title}</span>
                <span className="text-indigo-700 font-bold">{formatTime(sectionTimes[sec.key] || 0)}</span>
                {(sectionTimes[sec.key] || 0) < 15 && <span className="ml-2 text-xs text-rose-500">(Rushed)</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="flex flex-wrap gap-4 justify-center mt-6">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-3 rounded-xl shadow transition-all">Save to Profile</button>
          <button className="bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3 rounded-xl shadow transition-all">Book Free Counseling</button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl shadow transition-all">Explore Matching Courses</button>
          <button className="bg-zinc-200 hover:bg-zinc-300 text-zinc-700 font-bold px-6 py-3 rounded-xl shadow transition-all">Download Report</button>
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
