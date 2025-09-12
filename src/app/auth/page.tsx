// import React from "react";
// import LoginForm from "@/app/components/auth/LoginForm";
// import SignupForm from "@/app/components/auth/SignupForm";
// import ForgotPasswordForm from "@/app/components/auth/ForgotPasswordForm";

// export default function AuthPage({ searchParams }: { searchParams?: { view?: string } }) {
//   // we can read ?view=signup or ?view=forgot to show respective form
//   const view = (searchParams?.view as string) || "login";

//   return (
//     <main className="min-h-screen flex items-center justify-center bg-[#FAFAFC] p-6">
//       <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
//         {/* Left Info Panel */}
//         <div className="hidden lg:flex flex-col gap-6 p-12 bg-[linear-gradient(180deg,#704DC6, #8B68D5)] text-white">
//           <div>
//             <div className="inline-flex items-center gap-3 mb-4">
//               <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center">
//                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white">
//                   <path d="M12 2L20 8v8l-8 6-8-6V8l8-6z" fill="currentColor" />
//                 </svg>
//               </div>
//               <div>
//                 <h3 className="text-lg font-semibold">EduPath</h3>
//                 <p className="text-sm opacity-90">Your AI Career Companion</p>
//               </div>
//             </div>

//             <h1 className="text-3xl font-bold mb-3">Make confident career choices</h1>
//             <p className="text-sm opacity-90 max-w-sm">
//               Personalized psychometric tests, expert counsellors, and nearby government college directory —
//               all in one place. Trusted by students and educators.
//             </p>
//           </div>

//           <div className="mt-auto">
//             <ul className="space-y-3 text-sm">
//               <li>• AI-driven recommendations</li>
//               <li>• Psychometric & skill assessments</li>
//               <li>• Nearby govt. colleges & admission alerts</li>
//               <li>• Offline-friendly resources</li>
//             </ul>
//           </div>
//         </div>

//         {/* Right Form Panel */}
//         <div className="p-8 md:p-12">
//           <div className="flex justify-end mb-6">
//             <div className="text-sm text-gray-500">
//               <a href="/auth/login" className={`px-3 py-1 rounded ${view === "login" ? "bg-[#704DC6] text-white" : "text-gray-600 hover:text-gray-800"}`}>Login</a>
//               <a href="/auth/signup" className={`px-3 py-1 rounded ${view === "signup" ? "bg-[#704DC6] text-white ml-2" : "text-gray-600 ml-2 hover:text-gray-800"}`}>Sign up</a>
//               <a href="/auth/forgot" className={`px-3 py-1 rounded ${view === "forgot" ? "bg-[#704DC6] text-white ml-2" : "text-gray-600 ml-2 hover:text-gray-800"}`}>Forgot</a>
//             </div>
//           </div>

//           <div className="flex items-start gap-8">
//             <div className="flex-1">
//               {view === "signup" && <SignupForm />}
//               {view === "forgot" && <ForgotPasswordForm />}
//               {view === "login" && <LoginForm />}
//             </div>

//             {/* Right small panel - quick highlights */}
//             <aside className="hidden md:block w-60 border-l pl-6">
//               <h4 className="text-sm font-semibold mb-3">Why EduPath?</h4>
//               <ul className="text-sm space-y-3 text-gray-600">
//                 <li>• Actionable career reports</li>
//                 <li>• Book counsellor sessions</li>
//                 <li>• Scholarships & timelines</li>
//                 <li>• Progress tracker</li>
//               </ul>

//               <div className="mt-6">
//                 <a href="/study-resources" className="inline-block text-sm bg-[#FFCC59] px-3 py-2 rounded font-medium text-black">Explore resources</a>
//               </div>
//             </aside>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }
