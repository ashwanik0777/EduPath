"use client";
import React, { useEffect, useState, useRef } from 'react';

const TOTAL_QUESTIONS = 15;
const QUESTION_TIME = 30; // seconds

type Option = {
  img: string;
  label: string;
};

type UserAnswer = {
  question: number;
  selected: number | null;
  timeTaken: number;
};

const Quiz: React.FC = () => {
  const [current, setCurrent] = useState(1);
  const [timer, setTimer] = useState(QUESTION_TIME);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [loading, setLoading] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  // Prepare options for current question
  const getOptions = (): Option[] => {
    const base = `/quiz/questions/${current}`;
    // Most questions have 6 or 8 options, some have a single file for multiple options
    if (current === 2) {
      // Special case for question 2
      return [
        { img: `${base}/1 2 3 4 6.png`, label: '1 2 3 4 6' },
        { img: `${base}/5.png`, label: '5' },
      ];
    }
    // For others, check for up to 8 options
    return Array.from({ length: 8 }, (_, i) => ({
      img: `${base}/${i + 1}.png`,
      label: `${i + 1}`,
    }));
  };

  // Get question image
  const getQuestionImg = () => `/quiz/questions/${current}/Q.png`;

  // Timer logic
  useEffect(() => {
    setTimer(QUESTION_TIME);
    setSelected(null);
    setLoading(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          handleNext(null, true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current!);
    // eslint-disable-next-line
  }, [current]);

  // Handle answer selection
  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    setLoading(true);
    setTimeout(() => {
      handleNext(idx, false);
    }, 500); // short delay for UI feedback
  };

  // Move to next question
  const handleNext = (selectedIdx: number | null, skipped: boolean) => {
    setAnswers((prev) => [
      ...prev,
      {
        question: current,
        selected: selectedIdx,
        timeTaken: QUESTION_TIME - timer,
      },
    ]);
    if (current < TOTAL_QUESTIONS) {
      setCurrent(current + 1);
    } else {
      setShowSummary(true);
    }
  };

  // UI
  const options = getOptions().filter((opt) => !opt.img.includes('8.png') || current >= 7); // Only show 8th option if exists

  if (showSummary) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl text-center relative">
          <h2 className="text-3xl font-bold text-purple-700 mb-4">Quiz Completed!</h2>
          <p className="text-lg text-gray-700 mb-6">Thank you for completing the quiz. Here is a summary of your responses:</p>
          <div className="overflow-x-auto max-h-96 mb-6">
            <table className="min-w-full text-sm text-left border rounded-lg overflow-hidden">
              <thead className="bg-purple-100">
                <tr>
                  <th className="px-3 py-2">Q#</th>
                  <th className="px-3 py-2">Answered</th>
                  <th className="px-3 py-2">Time (s)</th>
                </tr>
              </thead>
              <tbody>
                {answers.map((ans, idx) => (
                  <tr key={idx} className="even:bg-purple-50">
                    <td className="px-3 py-2 font-semibold">{ans.question}</td>
                    <td className="px-3 py-2">{ans.selected ? `Option ${ans.selected}` : <span className="text-red-500">Skipped</span>}</td>
                    <td className="px-3 py-2">{ans.timeTaken}s</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-purple-600 font-medium mb-2">Your responses have been recorded.</div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
            <a href="/studentDashboard">
              <button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-lg shadow-lg font-bold hover:scale-105 transition-all">Go to Dashboard</button>
            </a>
            <a href="/login">
              <button className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-3 rounded-lg shadow-lg font-bold hover:scale-105 transition-all">Login</button>
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl text-center relative">
        {/* Progress Bar */}
        <div className="absolute left-0 top-0 w-full h-2 bg-gray-200 rounded-t-2xl overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-400 to-blue-400 transition-all"
            style={{ width: `${(current / TOTAL_QUESTIONS) * 100}%` }}
          />
        </div>
        {/* Timer */}
        <div className="flex justify-between items-center mb-4 mt-2">
          <span className="text-lg font-semibold text-purple-600">Question {current} / {TOTAL_QUESTIONS}</span>
          <span className={`text-lg font-bold ${timer <= 5 ? 'text-red-500 animate-pulse' : 'text-blue-600'}`}>{timer}s</span>
        </div>
        {/* Question Image */}
        <div className="flex justify-center mb-6">
          <img src={getQuestionImg()} alt={`Question ${current}`} className="max-h-48 rounded-lg shadow-md border border-gray-200" />
        </div>
        {/* Options */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {options.map((opt, idx) => (
            <button
              key={opt.label}
              onClick={() => handleSelect(idx + 1)}
              disabled={selected !== null || loading}
              className={`bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl shadow hover:scale-105 transition-all border-2 p-2 flex flex-col items-center focus:outline-none ${selected === idx + 1 ? 'border-purple-500 ring-2 ring-purple-300' : 'border-transparent'} ${selected === null ? 'hover:border-blue-400' : ''}`}
              style={{ opacity: opt.img.includes('undefined') ? 0.3 : 1 }}
            >
              <img src={opt.img} alt={`Option ${opt.label}`} className="max-h-24 mb-1" />
              <span className="text-xs text-gray-600 font-medium">Option {opt.label}</span>
            </button>
          ))}
        </div>
        {/* Next/Skip Button (hidden, auto handled) */}
        <div className="h-8" />
        {/* Footer */}
        <div className="mt-4 text-gray-400 text-xs">You have 30 seconds for each question. Answer quickly for best results!</div>
      </div>
    </div>
  );
};

export default Quiz;
