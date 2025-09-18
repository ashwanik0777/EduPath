import React, { useState } from "react";
import { CheckCircle, Lock, Loader2, ArrowRight } from "lucide-react";
import { Dialog } from "@/app/components/ui/dialog";

const stepsData = [
	{
		step_id: 1,
		title: "Complete Your Profile",
		description: "Fill personal & academic info",
		key: "profile",
	},
	{
		step_id: 2,
		title: "Take Psychometric Test",
		description: "Assess your interests and aptitude",
		key: "psychometric",
	},
	{
		step_id: 3,
		title: "View Career Recommendations",
		description: "Based on test result",
		key: "career",
	},
	{
		step_id: 4,
		title: "Shortlist Courses",
		description: "Choose what courses interest you",
		key: "courses",
	},
	{
		step_id: 5,
		title: "Explore Government Colleges",
		description: "Match colleges with your choices",
		key: "gov_colleges",
	},
	{
		step_id: 6,
		title: "Shortlist Preferred Colleges",
		description: "Save your target colleges",
		key: "preferred_colleges",
	},
	{
		step_id: 7,
		title: "Apply for Scholarships",
		description: "Find and apply if eligible",
		key: "scholarships",
	},
	{
		step_id: 8,
		title: "Book Counseling Session",
		description: "One-on-one guidance",
		key: "counseling",
	},
	{
		step_id: 9,
		title: "Finalize Your Career Plan",
		description: "Lock your decision with help",
		key: "finalize",
	},
];

// Example: Replace with backend data fetch later
const initialStepStatus = [
	{ status: "completed", completed_on: "2025-09-10", details: "Profile filled", counselor_notes: "Good info" },
	{ status: "completed", completed_on: "2025-09-12", details: "Test taken, key interests: Design, Business", counselor_notes: "Suggested BBA/B.Des" },
	{ status: "completed", completed_on: "2025-09-13", details: "Careers: Engineering, Design", counselor_notes: "" },
	{ status: "in_progress", completed_on: null, details: "", counselor_notes: "" },
	{ status: "locked", completed_on: null, details: "", counselor_notes: "" },
	{ status: "locked", completed_on: null, details: "", counselor_notes: "" },
	{ status: "locked", completed_on: null, details: "", counselor_notes: "" },
	{ status: "locked", completed_on: null, details: "", counselor_notes: "" },
	{ status: "locked", completed_on: null, details: "", counselor_notes: "" },
];

export default function ProgressTracker() {
	const [stepStatus, setStepStatus] = useState(initialStepStatus);
	const [openStep, setOpenStep] = useState<number | null>(null);

	const completedCount = stepStatus.filter(s => s.status === "completed").length;
	const progressPercent = Math.round((completedCount / stepsData.length) * 100);
	const currentStepIdx = stepStatus.findIndex(s => s.status === "in_progress");

	// Motivational text
	const milestoneText = progressPercent === 100
		? "Well done! You’ve completed your journey!"
		: progressPercent >= 50
		? "Great progress! You’re more than halfway there!"
		: progressPercent > 0
		? "Keep going! Every step counts."
		: "Start your journey now!";

	return (
		<div className="w-full  mx-auto p-4 md:p-8 bg-white rounded-2xl shadow-xl border border-zinc-200">
			<h2 className="text-2xl md:text-3xl font-extrabold text-indigo-800 mb-2 text-center tracking-tight">Your Progress Journey</h2>
			<div className="text-center text-zinc-500 mb-6 text-base md:text-lg">Follow each step to complete your career path. Steps unlock one by one as you progress.</div>
			{/* Progress Bar */}
			<div className="mb-6">
				<div className="flex justify-between items-center mb-1">
					<span className="text-sm font-semibold text-indigo-700">Progress</span>
					<span className="text-sm font-semibold text-indigo-700">{progressPercent}%</span>
				</div>
				<div className="w-full h-3 bg-zinc-100 rounded-full overflow-hidden">
					<div
						className="h-full bg-gradient-to-r from-indigo-500 to-indigo-700 transition-all duration-500"
						style={{ width: `${progressPercent}%` }}
					/>
				</div>
				<div className="text-center text-sm text-green-600 font-semibold mt-2 animate-pulse">{milestoneText}</div>
			</div>

			{/* Steps List */}
			<ol className="space-y-3 md:space-y-2">
				{stepsData.map((step, idx) => {
					const status = stepStatus[idx]?.status;
					const isActive = status === "in_progress";
					const isCompleted = status === "completed";
					const isLocked = status === "locked";
					return (
						<li
							key={step.step_id}
							className={`flex items-center gap-4 py-4 px-2 rounded-xl border border-zinc-100 shadow-sm bg-white transition-all ${isActive ? "bg-indigo-50 border-l-4 border-indigo-500" : ""}`}
						>
							<div className="flex-shrink-0">
								{isCompleted ? (
									<button
										className="text-green-600 hover:text-green-700 focus:outline-none"
										onClick={() => setOpenStep(idx)}
										aria-label="View step details"
									>
										<CheckCircle size={28} />
									</button>
								) : isLocked ? (
									<span className="text-zinc-400"><Lock size={28} /></span>
								) : (
									<span className="text-yellow-500 animate-spin"><Loader2 size={28} /></span>
								)}
							</div>
							<div className="flex-1 min-w-0">
								<div className="flex items-center gap-2">
									<span className={`font-bold text-lg ${isCompleted ? "text-green-700" : isActive ? "text-indigo-700" : "text-zinc-700"}`}>{step.title}</span>
									{isActive && <span className="ml-2 px-2 py-0.5 text-xs bg-indigo-100 text-indigo-700 rounded-full animate-bounce">Current</span>}
								</div>
								<div className="text-zinc-500 text-sm mt-0.5">{step.description}</div>
							</div>
							{isActive && (
								<button className="ml-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold flex items-center gap-2 shadow transition-all">
									Continue <ArrowRight size={18} />
								</button>
							)}
						</li>
					);
				})}
			</ol>

			{/* Step Details Modal */}
			{openStep !== null && stepStatus[openStep]?.status === "completed" && (
				<Dialog open={true} onOpenChange={() => setOpenStep(null)}>
					<div className="fixed inset-0 bg-black/30 z-40 flex items-center justify-center">
						<div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md mx-auto z-50">
							<div className="flex items-center gap-3 mb-2">
								<CheckCircle className="text-green-600" size={28} />
								<div>
									<div className="font-bold text-lg text-green-700">{stepsData[openStep].title}</div>
									<div className="text-zinc-500 text-sm">Completed on: <span className="font-semibold text-zinc-700">{stepStatus[openStep].completed_on}</span></div>
								</div>
							</div>
							<div className="mb-2 text-zinc-700"><b>Details:</b> {stepStatus[openStep].details || "-"}</div>
							{stepStatus[openStep].counselor_notes && (
								<div className="mb-2 text-indigo-700"><b>Counselor Notes:</b> {stepStatus[openStep].counselor_notes}</div>
							)}
							<button
								className="mt-4 w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold shadow"
								onClick={() => setOpenStep(null)}
							>Close</button>
						</div>
					</div>
				</Dialog>
			)}
		</div>
	);
}
