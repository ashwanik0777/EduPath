"use client";
import React, { useState, useRef } from "react";
import { MessageCircle, Star, Smile, Bug, Lightbulb, ThumbsUp, Camera, User, Mail, Send, History, Sparkles, CheckCircle } from "lucide-react";
import { FaRegStar, FaStar } from "react-icons/fa";

const FEEDBACK_TYPES = [
  { label: "Bug/Issue", icon: <Bug className="inline w-4 h-4 mr-1 text-rose-500" /> },
  { label: "Suggestion", icon: <Lightbulb className="inline w-4 h-4 mr-1 text-yellow-500" /> },
  { label: "General Feedback", icon: <MessageCircle className="inline w-4 h-4 mr-1 text-blue-500" /> },
  { label: "Compliment", icon: <Smile className="inline w-4 h-4 mr-1 text-green-500" /> },
];
const SUGGESTION_CATEGORIES = [
  "Career",
  "Exam",
  "College",
  "Scholarship",
];

export default function Feedback() {
  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState(FEEDBACK_TYPES[0].label);
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState<number | null>(null);
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [suggestionText, setSuggestionText] = useState("");
  const [suggestionCategory, setSuggestionCategory] = useState(SUGGESTION_CATEGORIES[0]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [pastFeedbacks, setPastFeedbacks] = useState<any[]>([]); 
  const [showPast, setShowPast] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/feedback");
        if (res.ok) {
          const data = await res.json();
          setPastFeedbacks(data.feedbacks || []);
        }
      } catch {}
    })();
  }, []);

  // Handle screenshot upload
  const handleScreenshot = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setScreenshot(e.target.files[0]);
    }
  };

  // Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("type", type);
      formData.append("message", message);
      if (rating) formData.append("rating", rating.toString());
      if (screenshot) formData.append("screenshot", screenshot);
      formData.append("suggestionText", suggestionText);
      formData.append("suggestionCategory", suggestionCategory);

      const res = await fetch("/api/feedback", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Failed to submit feedback");
      const data = await res.json();
      setSubmitted(true);
      setPastFeedbacks([
        data.feedback,
        ...pastFeedbacks,
      ]);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    }
    setSubmitting(false);
  };

  // Handle suggestion submit (optional, can be separate API)
  const handleSuggestion = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate suggestion submit
    setSuggestionText("");
    setSuggestionCategory(SUGGESTION_CATEGORIES[0]);
    // Optionally show toast/confirmation
  };

  // Star rating component
  const StarRating = ({ value, onChange }: { value: number | null; onChange: (v: number) => void }) => (
    <div className="flex gap-1 mt-1 mb-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
          className={`text-2xl md:text-3xl transition-colors ${value && value >= star ? "text-yellow-400 scale-110" : "text-gray-300 hover:text-yellow-300"}`}
          onClick={() => onChange(star)}
        >
          {value && value >= star ? <FaStar /> : <FaRegStar />}
        </button>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-indigo-50 via-white to-blue-100 p-0 md:p-10">
      <div className="w-full max-w-4xl bg-white/90 rounded-3xl shadow-2xl border border-indigo-100 p-0 md:p-8">
        {/* Header */}
        <div className="text-center mb-8 flex flex-col items-center gap-2">
          <Sparkles className="w-10 h-10 text-indigo-400 mb-1 animate-bounce" />
          <h1 className="text-3xl md:text-4xl font-extrabold text-indigo-800 mb-1 tracking-tight">We’d love your Feedback!</h1>
          <p className="text-indigo-600 text-base md:text-lg font-medium">Tell us what you liked, what we can improve, or any suggestions you have.</p>
        </div>

        {/* Feedback Form */}
        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-1">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-300 w-5 h-5" />
                <input
                  type="text"
                  className="input w-full bg-neutral-50 border border-indigo-100 rounded-lg pl-10 pr-3 py-2 text-base focus:ring-2 focus:ring-indigo-100"
                  placeholder="Name (optional)"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  autoComplete="name"
                />
              </div>
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-300 w-5 h-5" />
                <input
                  type="email"
                  className="input w-full bg-neutral-50 border border-indigo-100 rounded-lg pl-10 pr-3 py-2 text-base focus:ring-2 focus:ring-indigo-100"
                  placeholder="Email (optional)"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-1">
                <select
                  className="input w-full bg-neutral-50 border border-indigo-100 rounded-lg pl-9 pr-3 py-2 text-base focus:ring-2 focus:ring-indigo-100 appearance-none"
                  value={type}
                  onChange={e => setType(e.target.value)}
                  required
                >
                  {FEEDBACK_TYPES.map((t) => (
                    <option key={t.label} value={t.label}>{t.label}</option>
                  ))}
                </select>
                <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  {FEEDBACK_TYPES.find(t => t.label === type)?.icon}
                </span>
              </div>
              <div className="flex-1 flex items-center gap-2">
                <label className="text-indigo-700 text-sm font-medium"><Star className="inline w-4 h-4 mb-1 text-yellow-400" /> Rating (optional):</label>
                <StarRating value={rating} onChange={setRating} />
              </div>
            </div>
            <div className="relative">
              <textarea
                className="input w-full bg-neutral-50 border border-indigo-100 rounded-lg px-4 py-3 text-base focus:ring-2 focus:ring-indigo-100 min-h-[110px] placeholder:text-indigo-200"
                placeholder="Your feedback (1000–2000 chars max)"
                value={message}
                onChange={e => setMessage(e.target.value.slice(0, 2000))}
                maxLength={2000}
                minLength={10}
                required
              />
              <MessageCircle className="absolute right-3 top-3 text-indigo-100 w-6 h-6 pointer-events-none" />
              <div className="text-xs text-indigo-300 text-right">{message.length}/2000</div>
            </div>
            <div className="flex flex-col md:flex-row gap-3 items-center">
              <label className="text-indigo-700 text-sm font-medium flex items-center gap-1"><Camera className="w-4 h-4" /> Screenshot (optional):</label>
              <input
                type="file"
                accept="image/*"
                className="input bg-neutral-50 border border-indigo-100 rounded-lg px-2 py-1 text-sm"
                onChange={handleScreenshot}
                ref={fileInputRef}
              />
              {screenshot && <span className="text-xs text-indigo-400 font-medium">{screenshot.name}</span>}
            </div>
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white font-bold rounded-xl py-3 text-lg shadow-lg flex items-center justify-center gap-2 transition disabled:opacity-60"
              disabled={submitting}
            >
              <Send className="w-5 h-5 mb-0.5" />
              {submitting ? "Sending..." : "Send Feedback"}
            </button>
          </form>
        ) : (
          <div className="text-center py-10 flex flex-col items-center">
            <CheckCircle className="w-14 h-14 text-green-400 mb-2 animate-bounce" />
            <div className="text-2xl font-bold text-indigo-800 mb-2">Thank you for your feedback!</div>
            <div className="text-indigo-600 mb-4">We’ll review it and get back if needed.</div>
            <button
              className="bg-gradient-to-r from-indigo-100 to-blue-100 hover:from-indigo-200 hover:to-blue-200 text-indigo-700 font-semibold rounded-lg px-5 py-2 mt-2 shadow"
              onClick={() => setSubmitted(false)}
            >Submit Another</button>
          </div>
        )}

        {/* View Past Feedbacks (for logged-in users) */}
        <div className="mt-8">
          <button
            className="text-indigo-600 hover:underline text-sm font-semibold flex items-center gap-1 mb-2"
            onClick={() => setShowPast((v) => !v)}
          >
            <History className="w-4 h-4" />
            {showPast ? "Hide" : "View"} Past Feedback
          </button>
          {showPast && pastFeedbacks.length > 0 && (
            <div className="bg-white border border-indigo-100 rounded-xl p-4 mt-2 max-h-60 overflow-y-auto shadow">
              <div className="font-semibold text-indigo-700 mb-2 flex items-center gap-2"><MessageCircle className="w-4 h-4" /> Your Previous Feedbacks</div>
              <ul className="space-y-2">
                {pastFeedbacks.map((fb, i) => (
                  <li key={i} className="border-b border-indigo-50 pb-2">
                    <div className="flex items-center gap-2 text-sm">
                      {FEEDBACK_TYPES.find(t => t.label === fb.type)?.icon}
                      <span className="font-medium text-indigo-700">{fb.type}</span>
                      <span className="text-indigo-300">{fb.submitted_on}</span>
                      <span className={`text-xs rounded px-2 py-0.5 ml-2 ${fb.status === "Pending" ? "bg-yellow-100 text-yellow-700" : fb.status === "Reviewed" ? "bg-green-100 text-green-700" : "bg-neutral-100 text-neutral-500"}`}>{fb.status}</span>
                    </div>
                    <div className="text-indigo-900 mt-1 text-sm">{fb.message}</div>
                    {fb.rating && <div className="text-yellow-500 text-xs flex items-center gap-1">Rating: {[...Array(fb.rating)].map((_,i) => <FaStar key={i} />)}</div>}
                    {fb.screenshot && <div className="text-xs text-indigo-300 flex items-center gap-1"><Camera className="w-3 h-3" /> Screenshot: {fb.screenshot}</div>}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Suggestions Box */}
        <div className="mt-10 bg-gradient-to-br from-indigo-50 via-white to-blue-50 border border-indigo-100 rounded-2xl p-6 shadow flex flex-col gap-2">
          <div className="font-semibold text-indigo-700 mb-2 flex items-center gap-2"><Lightbulb className="w-5 h-5 text-yellow-400" /> Have an idea for a new feature?</div>
          <form onSubmit={handleSuggestion} className="flex flex-col md:flex-row gap-3 items-center">
            <input
              type="text"
              className="input flex-1 bg-white border border-indigo-100 rounded-lg px-4 py-2 text-base focus:ring-2 focus:ring-indigo-100"
              placeholder="What feature would you like to see?"
              value={suggestionText}
              onChange={e => setSuggestionText(e.target.value)}
              maxLength={200}
            />
            <select
              className="input bg-white border border-indigo-100 rounded-lg px-3 py-2 text-base focus:ring-2 focus:ring-indigo-100"
              value={suggestionCategory}
              onChange={e => setSuggestionCategory(e.target.value)}
            >
              {SUGGESTION_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <button
              type="submit"
              className="bg-indigo-400 hover:bg-indigo-600 text-white font-bold rounded-lg px-5 py-2 shadow flex items-center gap-2 transition"
            >
              <Lightbulb className="w-4 h-4" /> Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
