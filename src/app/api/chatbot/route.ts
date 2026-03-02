import { NextRequest, NextResponse } from "next/server";

// Dummy intent classifier (expand with real logic or ML)
function classifyIntent(message: string): string {
  const lower = message.toLowerCase();
  // Fuzzy/keyword matching for more robust intent detection
  if (/college|govt college|engineering|medical|admission|cut[- ]?off/.test(lower)) return "college";
  if (/scholarship|fee waiver|obc|sc|st|minority|grant|fellowship/.test(lower)) return "scholarship";
  if (/psychometric|personality|test result|ocean|big five|assessment/.test(lower)) return "psychometric";
  if (/exam|ssc|neet|jee|cuet|competitive|entrance|date|syllabus|eligibility/.test(lower)) return "exam";
  if (/dashboard|profile|progress|tracker|tab|navigation|where|how to use/.test(lower)) return "dashboard";
  if (/career|scope|after 12th|pcm|pcb|arts|commerce|future|job|salary/.test(lower)) return "career";
  if (/foreign|abroad|international|overseas|outside india|ielts|toefl/.test(lower)) return "foreign";
  if (/counseling|counsellor|book session|appointment|advice/.test(lower)) return "counseling";
  if (/feedback|support|error|problem|site not opening|not working/.test(lower)) return "support";
  if (/remind|reminder|notify|alert/.test(lower)) return "reminder";
  if (/language|hindi|english|toggle/.test(lower)) return "language";
  return "general";
}

// Dummy internal API fetchers (replace with real DB/API calls)
async function fetchCollegeInfo(): Promise<string> {
  return "Here are some top government colleges in India for 12th pass students: IITs, NITs, AIIMS, Delhi University, BHU, and state universities based on your stream.";
}
async function fetchScholarshipInfo(): Promise<string> {
  return "For OBC students in India, check National Scholarship Portal options like Post-Matric Scholarship, Central Sector scholarships, and state-level merit schemes.";
}
async function fetchExamInfo(): Promise<string> {
  return "Upcoming exams in India include SSC, UPSC, IBPS, Railways, JEE, NEET, and CUET. Tell me your qualification to get exact eligibility and timeline.";
}
async function fetchDashboardHelp(): Promise<string> {
  return "To use the dashboard, click on the sidebar tabs. For the psychometric test, go to 'Psychometric Test' tab.";
}


export async function POST(req: NextRequest) {
  const { message, lang, context } = await req.json();
  const intent = classifyIntent(message);
  let reply = "";
  // Session memory: keep last 5 exchanges
  const chatContext: Array<{ sender: string; text: string }> = Array.isArray(context) ? context.slice(-5) : [];
  chatContext.push({ sender: "user", text: message });
  // Add more intent handlers as needed
  if (intent === "college") reply = await fetchCollegeInfo();
  else if (intent === "scholarship") reply = await fetchScholarshipInfo();
  else if (intent === "exam") reply = await fetchExamInfo();
  else if (intent === "dashboard") reply = await fetchDashboardHelp();
  else if (intent === "career") reply = "Here are some career options after 12th: ...";
  else if (intent === "foreign") reply = "If your English is fluent, we can also suggest foreign colleges in USA, UK, Canada, Australia, and Europe based on your stream, budget, and exam profile (IELTS/TOEFL/SAT).";
  else if (intent === "counseling") reply = "To book a counseling session, go to the 'Counseling Booking' tab in your dashboard.";
  else if (intent === "support") reply = "If you are facing issues, please describe your problem or use the Feedback tab.";
  else if (intent === "reminder") reply = "Reminder feature coming soon!";
  else if (intent === "language") reply = "You can switch language using the button in the chat window.";
  else reply = await callGeminiWithContext(message, lang, chatContext);
  chatContext.push({ sender: "bot", text: reply });
  return NextResponse.json({ reply, context: chatContext.slice(-5) });
}

// Gemini with context
async function callGeminiWithContext(message: string, lang: string, context: Array<{ sender: string; text: string }>): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return "Gemini API key not configured.";
  // Mask PII (very basic, expand as needed)
  const safeMsg = message.replace(/\b\d{10}\b/g, "[phone]").replace(/\b\d{2,4}[-/]\d{1,2}[-/]\d{1,4}\b/g, "[date]");
  // Prompt template
  let langLabel = "English";
  if (lang === "hi") langLabel = "Hindi";
  else if (lang === "doi") langLabel = "Dogri";
  const prePrompt =
    `You are a student support chatbot. Your users are students from across India, mostly between age 14–21. They ask about colleges, careers, exams, scholarships, and dashboard help. Always reply politely in clear language (${langLabel}). Prioritize India-focused guidance; if the user has fluent English and asks for global options, you may suggest foreign colleges as an optional path. Avoid long answers, keep them friendly and to the point.`;
  // Build context for Gemini
  const contextText = context
    .map((c) => `${c.sender === "user" ? "User" : "Bot"}: ${c.text}`)
    .join("\n");
  const prompt = `${prePrompt}\n\n${contextText}\nUser: ${safeMsg}`;
  // Gemini REST API call (skip lenient checking)
  try {
    const geminiRes = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + apiKey, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.6, maxOutputTokens: 256 },
      }),
    });
    
    // Skip strict OK checking - try to parse response anyway
    const geminiData = await geminiRes.json();
    
    // More flexible response parsing
    let text = "";
    if (geminiData?.candidates?.[0]?.content?.parts?.[0]?.text) {
      text = geminiData.candidates[0].content.parts[0].text;
    } else if (geminiData?.candidates?.[0]?.output) {
      text = geminiData.candidates[0].output;
    } else if (geminiData?.text) {
      text = geminiData.text;
    } else if (geminiData?.response) {
      text = geminiData.response;
    } else {
      // Log the full response for debugging but still try to respond
      console.log("Unexpected Gemini response format:", JSON.stringify(geminiData));
      text = "Sorry, I'm having trouble processing your request right now.";
    }
    
    return text || "Sorry, I couldn't generate a response.";
  } catch (e) {
    console.error("Gemini API call failed:", e);
    return "I'm here to help! Could you try rephrasing your question?";
  }
}
