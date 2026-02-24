"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ShieldCheck, Users, GraduationCap, Briefcase, CalendarDays, Award, MessageSquare, RefreshCw, AlertCircle } from "lucide-react";

type ApiListResponse<T> = {
	success?: boolean;
	data?: T[];
	careers?: T[];
	feedbacks?: T[];
};

type CollegeResponse = {
	success?: boolean;
	data?: {
		colleges?: unknown[];
	};
};

type MeResponse = {
	success: boolean;
	user?: {
		name?: string;
		role?: "student" | "counselor" | "admin";
		email?: string;
	};
};

type FeedbackItem = {
	_id?: string;
	name?: string;
	email?: string;
	type?: string;
	message?: string;
	status?: string;
	submitted_on?: string;
};

type DashboardState = {
	userName: string;
	role: string;
	stats: {
		colleges: number;
		careers: number;
		exams: number;
		scholarships: number;
		counselors: number;
		feedbacks: number;
	};
	feedbacks: FeedbackItem[];
	loading: boolean;
	error: string;
	accessDenied: boolean;
};

async function fetchJson<T>(url: string): Promise<T> {
	const response = await fetch(url, { credentials: "include", cache: "no-store" });
	if (!response.ok) {
		throw new Error(`Request failed: ${url}`);
	}
	return response.json() as Promise<T>;
}

function extractArrayLength(value: unknown): number {
	return Array.isArray(value) ? value.length : 0;
}

export default function AdminDashboardPage() {
	const [state, setState] = useState<DashboardState>({
		userName: "Admin",
		role: "",
		stats: {
			colleges: 0,
			careers: 0,
			exams: 0,
			scholarships: 0,
			counselors: 0,
			feedbacks: 0,
		},
		feedbacks: [],
		loading: true,
		error: "",
		accessDenied: false,
	});

	const loadDashboard = async () => {
		setState((previous) => ({ ...previous, loading: true, error: "" }));

		try {
			const me = await fetchJson<MeResponse>("/api/auth/me");
			const role = me.user?.role ?? "";

			if (!me.success || role !== "admin") {
				setState((previous) => ({
					...previous,
					loading: false,
					accessDenied: true,
					role,
					userName: me.user?.name ?? "User",
				}));
				return;
			}

			const [collegesRes, careersRes, examsRes, scholarshipsRes, counselorsRes, feedbackRes] = await Promise.all([
				fetchJson<CollegeResponse>("/api/colleges?limit=500"),
				fetchJson<ApiListResponse<unknown>>("/api/careers"),
				fetchJson<ApiListResponse<unknown>>("/api/exams"),
				fetchJson<ApiListResponse<unknown>>("/api/scholarships"),
				fetchJson<ApiListResponse<unknown>>("/api/counselors"),
				fetchJson<ApiListResponse<FeedbackItem>>("/api/feedback"),
			]);

			const colleges = extractArrayLength(collegesRes?.data?.colleges);
			const careers = extractArrayLength(careersRes?.careers);
			const exams = extractArrayLength(examsRes?.data);
			const scholarships = extractArrayLength(scholarshipsRes?.data);
			const counselors = extractArrayLength(counselorsRes?.data);
			const feedbacks = Array.isArray(feedbackRes?.feedbacks) ? feedbackRes.feedbacks : [];

			setState({
				userName: me.user?.name ?? "Admin",
				role,
				stats: {
					colleges,
					careers,
					exams,
					scholarships,
					counselors,
					feedbacks: feedbacks.length,
				},
				feedbacks: feedbacks.slice(0, 6),
				loading: false,
				error: "",
				accessDenied: false,
			});
		} catch {
			setState((previous) => ({
				...previous,
				loading: false,
				error: "Failed to load admin dashboard data. Please refresh.",
			}));
		}
	};

	useEffect(() => {
		loadDashboard();
	}, []);

	const metricCards = useMemo(
		() => [
			{ label: "Total Colleges", value: state.stats.colleges, icon: GraduationCap, color: "text-blue-700 bg-blue-50" },
			{ label: "Career Records", value: state.stats.careers, icon: Briefcase, color: "text-violet-700 bg-violet-50" },
			{ label: "Exam Records", value: state.stats.exams, icon: CalendarDays, color: "text-amber-700 bg-amber-50" },
			{ label: "Scholarships", value: state.stats.scholarships, icon: Award, color: "text-emerald-700 bg-emerald-50" },
			{ label: "Counselors", value: state.stats.counselors, icon: Users, color: "text-pink-700 bg-pink-50" },
			{ label: "Feedback Entries", value: state.stats.feedbacks, icon: MessageSquare, color: "text-cyan-700 bg-cyan-50" },
		],
		[state.stats],
	);

	if (state.loading) {
		return (
			<div className="min-h-screen bg-slate-50 flex items-center justify-center">
				<div className="text-center">
					<div className="w-10 h-10 border-4 border-slate-300 border-t-slate-700 rounded-full animate-spin mx-auto mb-3" />
					<p className="text-slate-600">Loading admin dashboard...</p>
				</div>
			</div>
		);
	}

	if (state.accessDenied) {
		return (
			<div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
				<div className="max-w-xl w-full bg-white border border-slate-200 rounded-2xl shadow-sm p-8 text-center">
					<AlertCircle className="w-12 h-12 text-rose-600 mx-auto mb-4" />
					<h1 className="text-2xl font-bold text-slate-900 mb-2">Access Denied</h1>
					<p className="text-slate-600 mb-6">This page is only available for admin users.</p>
					<Link href="/" className="inline-flex items-center justify-center rounded-lg bg-slate-900 text-white px-4 py-2 hover:bg-slate-800 transition">
						Go to Home
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-slate-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm mb-6">
					<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
						<div>
							<p className="text-sm text-slate-500 mb-1">Admin Control Panel</p>
							<h1 className="text-2xl md:text-3xl font-bold text-slate-900">Welcome, {state.userName}</h1>
							<p className="text-slate-600 mt-1">Monitor platform data and recent activities from one place.</p>
						</div>
						<div className="flex items-center gap-3">
							<span className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-sm font-medium">
								<ShieldCheck className="w-4 h-4" />
								{state.role.toUpperCase()}
							</span>
							<button
								onClick={loadDashboard}
								className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 text-slate-700"
							>
								<RefreshCw className="w-4 h-4" />
								Refresh
							</button>
						</div>
					</div>
					{state.error ? <p className="mt-4 text-sm text-rose-600">{state.error}</p> : null}
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
					{metricCards.map((card) => {
						const Icon = card.icon;
						return (
							<div key={card.label} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
								<div className="flex items-center justify-between">
									<div>
										<p className="text-sm text-slate-500">{card.label}</p>
										<p className="text-3xl font-bold text-slate-900 mt-1">{card.value}</p>
									</div>
									<div className={`w-11 h-11 rounded-lg flex items-center justify-center ${card.color}`}>
										<Icon className="w-5 h-5" />
									</div>
								</div>
							</div>
						);
					})}
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
					<div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
						<h2 className="text-xl font-semibold text-slate-900 mb-4">Recent Feedback</h2>
						{state.feedbacks.length === 0 ? (
							<p className="text-slate-500 text-sm">No feedback entries found.</p>
						) : (
							<div className="space-y-3">
								{state.feedbacks.map((item, index) => (
									<div key={item._id ?? index} className="border border-slate-200 rounded-lg p-4">
										<div className="flex items-start justify-between gap-3">
											<div>
												<p className="font-medium text-slate-900">{item.name || "Anonymous"}</p>
												<p className="text-xs text-slate-500">{item.email || "No email"}</p>
											</div>
											<span className="text-xs px-2 py-1 rounded bg-slate-100 text-slate-700 border border-slate-200">
												{item.status || "Pending"}
											</span>
										</div>
										<p className="text-sm text-slate-600 mt-2 line-clamp-2">{item.message || "No message"}</p>
										<div className="mt-2 text-xs text-slate-500 flex items-center justify-between">
											<span>{item.type || "General"}</span>
											<span>{item.submitted_on ? new Date(item.submitted_on).toLocaleString() : "-"}</span>
										</div>
									</div>
								))}
							</div>
						)}
					</div>

					<div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
						<h2 className="text-xl font-semibold text-slate-900 mb-4">Quick Actions</h2>
						<div className="space-y-3">
							<Link href="/notifications/scholarship" className="block w-full rounded-lg border border-slate-200 px-4 py-3 hover:bg-slate-50 text-slate-700">
								Manage Scholarship Alerts
							</Link>
							<Link href="/notifications/examDate" className="block w-full rounded-lg border border-slate-200 px-4 py-3 hover:bg-slate-50 text-slate-700">
								Review Exam Updates
							</Link>
							<Link href="/notifications/counselingSchedule" className="block w-full rounded-lg border border-slate-200 px-4 py-3 hover:bg-slate-50 text-slate-700">
								Check Counseling Schedules
							</Link>
							<Link href="/studentDashboard" className="block w-full rounded-lg border border-slate-200 px-4 py-3 hover:bg-slate-50 text-slate-700">
								Open Student Dashboard
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
