
"use client";
import { useState, useRef, useEffect } from "react";
import { X, Bot, User, Mic, Send, ThumbsUp, ThumbsDown } from "lucide-react";

const SUGGESTED_PROMPTS = [
  "Explore scholarships",
  "Show me govt colleges",
  "Best career after 12th PCM",
  "How to use dashboard?",
  "Next JKSSB exam?",
];

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! I am your EduPath Assistant. How can I help you today?" },
  ]);
  const [context, setContext] = useState<any[]>([]);
  const [pendingFeedback, setPendingFeedback] = useState<number | null>(null); // message index
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);
  // 'en' = English, 'hi' = Hindi, 'doi' = Dogri
  const [language, setLanguage] = useState("en");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const recognitionRef = useRef<any>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom on new message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Voice recognition setup
  useEffect(() => {
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      // @ts-ignore
      const SpeechRecognition = window.webkitSpeechRecognition;
      // @ts-ignore
      recognitionRef.current = new SpeechRecognition();
      let langCode = "en-US";
      if (language === "hi") langCode = "hi-IN";
      else if (language === "doi") langCode = "doi-IN"; // Dogri (if supported)
      recognitionRef.current.lang = langCode;
      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setListening(false);
      };
      recognitionRef.current.onend = () => setListening(false);
    }
  }, [language]);

  const handleSend = async (msg?: string) => {
    setError("");
    const userMsg = msg || input.trim();
    if (!userMsg) return;
    setMessages((prev) => [...prev, { sender: "user", text: userMsg }]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg, lang: language, context }),
      });
      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      setMessages((prev) => [...prev, { sender: "bot", text: data.reply }]);
      setContext(data.context || []);
      setPendingFeedback(messages.length); // index of new bot message
    } catch (e) {
      setError("Sorry, something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Feedback handler (must be inside component, outside return)
  const handleFeedback = async (msgIdx: number, value: 0 | 1) => {
    setPendingFeedback(null);
    await fetch("/api/chatbot/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: messages[msgIdx]?.text, value }),
    });
  };

  const handleVoice = () => {
    if (!recognitionRef.current) return;
    setListening(true);
    recognitionRef.current.lang = language === "hi" ? "hi-IN" : "en-US";
    recognitionRef.current.start();
  };

  return (
    <>
      {/* Floating Icon Button */}
      {!open && (
        <button
          className="fixed bottom-5 right-5 z-50 bg-white dark:bg-zinc-900 border border-blue-400 dark:border-blue-500 shadow-xl rounded-full p-3 hover:bg-blue-50 dark:hover:bg-zinc-800 transition"
          aria-label="Open chatbot"
          onClick={() => setOpen(true)}
        >
          <Bot className="w-8 h-8 text-blue-500 dark:text-blue-400" />
        </button>
      )}
      {/* Chat Panel */}
      {open && (
        <div className="fixed bottom-5 right-5 z-50 w-[370px] max-w-full shadow-2xl rounded-2xl bg-white dark:bg-zinc-900 border border-blue-400 dark:border-blue-500 flex flex-col animate-fade-in">
          <div className="flex items-center justify-between p-4 border-b dark:border-blue-500 bg-blue-50 dark:bg-zinc-900 rounded-t-2xl">
            <div className="flex items-center gap-2">
              <Bot className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              <span className="font-bold text-blue-700 dark:text-blue-200 text-lg">EduPath Assistant</span>
            </div>
            <div className="flex gap-2 items-center">
              <button
                onClick={() => {
                  // Cycle: en -> hi -> doi -> en
                  setLanguage(language === "en" ? "hi" : language === "hi" ? "doi" : "en");
                }}
                className="text-xs px-2 py-1 rounded bg-blue-100 dark:bg-zinc-800 border border-blue-200 dark:border-blue-500 text-blue-700 dark:text-blue-200"
                title="Switch language"
              >
                {language === "en" ? "हिन्दी" : language === "hi" ? "Dogri" : "English"}
              </button>
              <button
                onClick={() => setOpen(false)}
                className="ml-1 p-1 rounded hover:bg-blue-100 dark:hover:bg-zinc-800"
                aria-label="Close chatbot"
              >
                <X className="w-6 h-6 text-blue-500" />
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ maxHeight: 400 }}>
            {messages.map((m, i) => (
              <div key={i} className={`flex items-end gap-2 ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
                {m.sender === "bot" && (
                  <Bot className="w-8 h-8 text-blue-500 dark:text-blue-400 bg-blue-100 dark:bg-zinc-800 rounded-full p-1" />
                )}
                <div className={`px-4 py-2 rounded-2xl text-base max-w-[75%] shadow font-medium tracking-normal leading-relaxed ${m.sender === "user" ? "bg-blue-500 text-white rounded-br-md" : "bg-blue-50 dark:bg-zinc-800 text-blue-900 dark:text-blue-100 rounded-bl-md"}`}
                  style={{fontSize: '1.05rem', wordBreak: 'break-word', letterSpacing: '0.01em'}}>
                  {m.text}
                  {/* Feedback UI for latest bot message */}
                  {m.sender === "bot" && i === pendingFeedback && (
                    <div className="flex gap-1 mt-1">
                      <button onClick={() => handleFeedback(i, 1)} className="text-blue-600 hover:scale-110 transition" title="Helpful"><ThumbsUp className="w-4 h-4" /></button>
                      <button onClick={() => handleFeedback(i, 0)} className="text-rose-600 hover:scale-110 transition" title="Not helpful"><ThumbsDown className="w-4 h-4" /></button>
                    </div>
                  )}
                </div>
                {m.sender === "user" && (
                  <User className="w-8 h-8 text-blue-500 dark:text-blue-400 bg-blue-100 dark:bg-zinc-800 rounded-full p-1" />
                )}
              </div>
            ))}
            {loading && (
              <div className="flex items-end gap-2 justify-start">
                <Bot className="w-8 h-8 text-blue-500 dark:text-blue-400 bg-blue-100 dark:bg-zinc-800 rounded-full p-1" />
                <div className="px-4 py-2 rounded-2xl bg-blue-50 dark:bg-zinc-800 text-blue-900 dark:text-blue-100 animate-pulse max-w-[75%] shadow font-medium tracking-normal leading-relaxed" style={{fontSize: '1.05rem'}}>Thinking...</div>
              </div>
            )}
            {error && (
              <div className="text-sm text-rose-600 px-2">{error}</div>
            )}
            <div ref={chatEndRef} />
          </div>
          <div className="flex flex-wrap gap-2 px-4 pb-2">
            {SUGGESTED_PROMPTS.map((p) => (
              <button key={p} onClick={() => handleSend(p)} className="text-xs bg-blue-50 dark:bg-zinc-800 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-500 shadow hover:bg-blue-100 dark:hover:bg-zinc-700 transition text-blue-700 dark:text-blue-200">
                {p}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 p-4 border-t dark:border-blue-500 bg-blue-50 dark:bg-zinc-900 rounded-b-2xl">
            <button onClick={handleVoice} className={`p-2 rounded-full ${listening ? "bg-blue-100 dark:bg-zinc-800 animate-pulse" : "bg-blue-50 dark:bg-zinc-800"}`} title="Voice input">
              <Mic className="w-6 h-6 text-blue-500 dark:text-blue-400" />
            </button>
            <input
              className="flex-1 px-4 py-2 rounded-full border dark:bg-zinc-900 dark:border-blue-500 bg-white border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300 text-base text-blue-900 dark:text-blue-100 font-medium"
              placeholder={
                language === "en"
                  ? "Type your question..."
                  : language === "hi"
                  ? "अपना सवाल लिखें..."
                  : "अपणे सवाल लिखो..." // Dogri
              }
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSend()}
              disabled={listening || loading}
              style={{fontSize: '1.05rem'}}
            />
            <button onClick={() => handleSend()} className="bg-blue-500 text-white px-5 py-2 rounded-full shadow hover:bg-blue-600 transition disabled:opacity-50" disabled={!input.trim() || listening || loading}>
              <Send className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
