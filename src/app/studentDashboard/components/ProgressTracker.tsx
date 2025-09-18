import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
// Map step keys to routes
const stepRoutes: Record<string, string> = {
	profile: "/studentDashboard", // or "/studentDashboard/profile"
	psychometric: "/careerAssessment", // or wherever the test is
	career: "/studentDashboard", // e.g., recommendations page
	courses: "/studentDashboard", // e.g., courses page
	gov_colleges: "/governmentCollege",
	preferred_colleges: "/studentDashboard", // e.g., preferred colleges page
	scholarships: "/studentDashboard", // e.g., scholarships page
	counseling: "/studentDashboard", // e.g., counseling booking page
	finalize: "/studentDashboard", // e.g., finalization page
};
import { motion } from "framer-motion";
import { CheckCircle, Lock, Loader2, ArrowRight, Info } from "lucide-react";
import { Dialog } from "@/app/components/ui/dialog";

const stepsData = [
	// You can add more detailed descriptions or tips for each step here if needed
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





export default function ProgressTracker() {
	const [stepStatus, setStepStatus] = useState<any[]>([]);
	const [selectedStep, setSelectedStep] = useState<number | null>(null);
	const [loading, setLoading] = useState(true);
	const [updating, setUpdating] = useState(false);
	const [userId, setUserId] = useState<string | null>(null);
	const router = useRouter();


		// Fetch userId from /api/auth/me, then fetch progress
		useEffect(() => {
			async function fetchUserAndProgress() {
				setLoading(true);
				try {
					const userRes = await fetch('/api/auth/me');
					const userData = await userRes.json();
					if (userData?.user?.id) {
						setUserId(userData.user.id);
						const res = await fetch(`/api/progress?userId=${userData.user.id}`);
						const data = await res.json();
						setStepStatus(data.steps);
					} else {
						setStepStatus([]);
					}
				} catch (e) {
					setStepStatus([]);
				}
				setLoading(false);
			}
			fetchUserAndProgress();
		}, []);

	// Handler to mark current step as completed and unlock next
			const completeCurrentStep = async () => {
				if (updating) return;
				setUpdating(true);
				const idx = stepStatus.findIndex((s: any) => s.status === 'in_progress');
				if (idx === -1) return;
				// Redirect to the correct page for the current step
				const stepKey = stepStatus[idx]?.key;
				const route = stepRoutes[stepKey] || "/studentDashboard";
				setUpdating(false);
				// If you want to update progress before redirect, uncomment below:
				// if (userId) {
				//   await fetch('/api/progress', {
				//     method: 'PUT',
				//     headers: { 'Content-Type': 'application/json' },
				//     body: JSON.stringify({ userId, steps: stepStatus }),
				//   });
				// }
				router.push(route);
			};

	if (loading) {
		return <div className="w-full min-h-screen flex items-center justify-center text-xl text-indigo-600">Loading progress...</div>;
	}

	const completedCount = stepStatus?.filter(s => s.status === "completed").length || 0;
	const progressPercent = Math.round((completedCount / stepsData.length) * 100);
	const currentStepIdx = stepStatus?.findIndex(s => s.status === "in_progress") ?? -1;

	// Motivational text
	const milestoneText = progressPercent === 100
		? "Well done! You’ve completed your journey!"
		: progressPercent >= 50
		? "Great progress! You’re more than halfway there!"
		: progressPercent > 0
		? "Keep going! Every step counts."
		: "Start your journey now!";

	// Show current step details or selected completed step details
	const showStepIdx = selectedStep !== null ? selectedStep : currentStepIdx;
	const showStepStatus = stepStatus[showStepIdx];
	const showStep = stepsData[showStepIdx];

	return (
			<div className="w-full min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-indigo-50 via-white to-blue-100 rounded-3xl shadow-2xl border border-zinc-100 px-2 md:px-0 py-8">
					<motion.h2 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
						className="text-3xl md:text-4xl font-extrabold text-indigo-900 mb-2 text-center tracking-tight drop-shadow-lg">
						 Your Progress Journey
					</motion.h2>
					<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
						className="text-center text-zinc-600 mb-8 text-base md:text-lg font-medium max-w-2xl mx-auto">
						Follow each step to complete your career path. Steps unlock one by one as you progress. <br />
						<span className="text-indigo-500 font-semibold">Click on completed steps to review your journey.</span>
					</motion.div>
			{/* Progress Bar */}
			<div className="mb-10 w-full max-w-3xl">
				<div className="flex justify-between items-center mb-1">
					<span className="text-sm font-semibold text-indigo-700">Progress</span>
					<span className="text-sm font-semibold text-indigo-700">{progressPercent}%</span>
				</div>
				<div className="w-full h-4 bg-gradient-to-r from-zinc-200 via-indigo-100 to-indigo-200 rounded-full overflow-hidden relative">
					<motion.div
						className="h-full bg-gradient-to-r from-indigo-500 via-blue-500 to-indigo-700 shadow-lg"
						initial={{ width: 0 }}
						animate={{ width: `${progressPercent}%` }}
						transition={{ duration: 0.7 }}
						style={{ borderRadius: 12 }}
					/>
					<motion.div
						className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-bold text-indigo-900 drop-shadow"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.5 }}
					>{milestoneText}</motion.div>
				</div>
			</div>

			{/* Horizontal Stepper with connectors */}
					<div className="w-full max-w-5xl overflow-x-auto pb-4 mb-10">
						<div className="flex items-center gap-4 min-w-[700px] md:min-w-[900px] lg:min-w-[1100px] px-2">
							{stepsData.map((step, idx) => {
								const status = stepStatus[idx]?.status;
								const isActive = idx === currentStepIdx;
								const isCompleted = status === "completed";
								const isLocked = status === "locked";
								return (
									<div key={step.step_id} className="flex flex-col items-center relative group" style={{ minWidth: 80 }}>
										<motion.button
											whileHover={isCompleted ? { scale: 1.12, boxShadow: "0 4px 16px #a7f3d0" } : {}}
											whileTap={isCompleted ? { scale: 0.95 } : {}}
											className={`rounded-full border-4 flex items-center justify-center w-16 h-16 mb-1 transition-all duration-300
												${isCompleted ? "border-green-400 bg-green-50 shadow-green-100 shadow-md" : isActive ? "border-indigo-500 bg-indigo-50 shadow-indigo-100 shadow-md animate-pulse" : isLocked ? "border-zinc-300 bg-zinc-100" : "border-yellow-400 bg-yellow-50"}
												${isActive ? "ring-4 ring-indigo-200" : ""}
											`}
											disabled={isLocked || (!isCompleted && !isActive)}
											onClick={() => {
												if (isCompleted) setSelectedStep(idx);
												else if (isActive) setSelectedStep(null);
											}}
											title={step.title}
										>
											{isCompleted ? <CheckCircle className="text-green-600" size={36} />
												: isLocked ? <Lock className="text-zinc-400" size={36} />
												: isActive ? <Loader2 className="text-indigo-500 animate-spin" size={36} />
												: <Loader2 className="text-yellow-500 animate-spin" size={36} />}
										</motion.button>
										<span className={`text-xs font-semibold text-center ${isCompleted ? "text-green-700" : isActive ? "text-indigo-700" : isLocked ? "text-zinc-400" : "text-zinc-700"}`}
											style={{ maxWidth: 90 }}
										>{step.title}</span>
										<span className="text-[10px] text-zinc-400">Step {idx + 1}</span>
										{/* Connector line */}
										{idx < stepsData.length - 1 && (
											<span className="absolute top-1/2 left-full w-10 h-1 -translate-y-1/2 z-0">
												<span className={`block w-full h-full rounded-full transition-all duration-300
													${isCompleted ? "bg-green-300" : isActive ? "bg-indigo-300" : "bg-zinc-200"}
												`} />
											</span>
										)}
										{/* Tooltip for completed step */}
										{isCompleted && (
											<span className="absolute left-1/2 -translate-x-1/2 top-20 z-20 hidden group-hover:block bg-white border border-green-200 text-green-700 text-xs rounded-lg px-3 py-1 shadow-lg animate-fade-in">
												Completed: {stepStatus[idx].completed_on}
											</span>
										)}
									</div>
								);
							})}
						</div>
					</div>

			{/* Step Details Section */}
					<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
						className="w-full max-w-2xl mx-auto bg-gradient-to-br from-indigo-100 via-white to-blue-50 rounded-2xl shadow-xl p-8 mb-2 border border-zinc-100 flex flex-col gap-4 min-h-[320px]">
						<div className="flex items-center gap-4 mb-2">
							{showStepStatus.status === "completed" ? (
								<CheckCircle className="text-green-600 drop-shadow" size={36} />
							) : showStepStatus.status === "locked" ? (
								<Lock className="text-zinc-400" size={36} />
							) : (
								<Loader2 className="text-indigo-500 animate-spin" size={36} />
							)}
							<div>
								<div className={`font-bold text-2xl md:text-3xl ${showStepStatus.status === "completed" ? "text-green-700" : showStepStatus.status === "locked" ? "text-zinc-400" : "text-indigo-700"}`}>{showStep.title}</div>
								<div className="text-zinc-500 text-base md:text-lg font-medium flex items-center gap-2">
									<Info className="inline-block text-indigo-400" size={18} />
									{showStep.description}
								</div>
							</div>
						</div>
						<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
							className="mb-1 text-zinc-700 text-base md:text-lg flex items-center gap-2">
							<span className="font-semibold">Step Status:</span>
							<span className={`rounded-full px-3 py-1 text-xs font-bold ${showStepStatus.status === "completed" ? "bg-green-100 text-green-700" : showStepStatus.status === "locked" ? "bg-zinc-200 text-zinc-500" : "bg-indigo-100 text-indigo-700"}`}>{showStepStatus.status.replace('_', ' ').toUpperCase()}</span>
						</motion.div>
						{showStepStatus.status === "completed" && (
							<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}
								className="mb-1 text-zinc-700 text-base md:text-lg">
								<b>Completed on:</b> <span className="font-semibold text-zinc-700">{showStepStatus.completed_on}</span>
							</motion.div>
						)}
						<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
							className="mb-1 text-zinc-700 text-base md:text-lg">
							<b>Details:</b> {showStepStatus.details || (showStepStatus.status === "in_progress" ? "Please complete this step to proceed." : "-")}
						</motion.div>
						{showStepStatus.counselor_notes && (
							<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
								className="mb-1 text-indigo-700 text-base md:text-lg">
								<b>Counselor Notes:</b> {showStepStatus.counselor_notes}
							</motion.div>
						)}
						{/* Add more creative info: motivational, next action, etc. */}
						{showStepStatus.status === "in_progress" && (
													<motion.button
														whileHover={{ scale: 1.04 }}
														whileTap={{ scale: 0.97 }}
														className="mt-6 w-full py-3 bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white rounded-xl font-bold shadow-lg flex items-center justify-center gap-2 text-lg transition-all duration-200 disabled:opacity-60"
														onClick={completeCurrentStep}
														disabled={updating}
													>
														{updating ? <Loader2 className="animate-spin" size={22} /> : <>Continue <ArrowRight size={22} /></>}
													</motion.button>
						)}
						{showStepStatus.status === "locked" && (
							<div className="mt-4 text-center text-zinc-400 text-base">Complete the previous steps to unlock this stage.</div>
						)}
						{showStepStatus.status === "completed" && (
							<div className="mt-4 text-center text-green-600 text-base font-semibold animate-pulse">Great job! You’ve completed this step. Review your progress or move to the next one.</div>
						)}
					</motion.div>
		</div>
	);
}
