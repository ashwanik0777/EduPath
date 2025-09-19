
"use client";
import React, { useState, useEffect } from "react";
import { Calendar, Clock, User, Video, Phone, MessageCircle, CheckCircle, AlertCircle, RefreshCcw, XCircle, Bell, UserCircle2, MailIcon } from "lucide-react";

const SESSION_TOPICS = [
	"Career confusion",
	"Course Selection",
	"College Help",
	"Scholarship",
	"Psychometric Report Discussion",
];
const SESSION_MODES = [
	{ label: "Video Call", value: "video" },
	{ label: "Audio Call", value: "audio" },
	{ label: "Chat", value: "chat" },
];

export default function CounselingBooking() {
	// Form state
	const [studentName, setStudentName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [mode, setMode] = useState(SESSION_MODES[0].value);
	const [topic, setTopic] = useState(SESSION_TOPICS[0]);
	const [date, setDate] = useState("");
	const [time, setTime] = useState("");
	const [counselor, setCounselor] = useState("");
	const [notes, setNotes] = useState("");
	const [availableSlots, setAvailableSlots] = useState<string[]>([]);
	const [counselors, setCounselors] = useState<any[]>([]);
	const [loadingSlots, setLoadingSlots] = useState(false);
	const [booking, setBooking] = useState(false);
	const [confirmation, setConfirmation] = useState<any>(null);
	const [error, setError] = useState("");
	// Session info
	const [upcomingSession, setUpcomingSession] = useState<any>(null);
	const [sessionHistory, setSessionHistory] = useState<any[]>([]);

		// Fetch user info dynamically from backend
		useEffect(() => {
			fetch("/api/user/profile")
				.then((res) => res.json())
				.then((data) => {
					if (data.success && data.data) {
						setStudentName(data.data.name || "");
						setEmail(data.data.email || "");
						setPhone(data.data.profile?.phone || "");
					}
				});
		}, []);

	// Fetch counselors
	useEffect(() => {
		fetch("/api/counselors")
			.then((res) => res.json())
			.then((data) => setCounselors(data.data || []));
	}, []);

	// Fetch session history & upcoming
	useEffect(() => {
		fetch("/api/user/sessions")
			.then((res) => res.json())
			.then((data) => {
				if (data.data && data.data.length > 0) {
					setUpcomingSession(data.data.find((s: any) => s.status === "scheduled"));
					setSessionHistory(data.data.filter((s: any) => s.status !== "scheduled"));
				}
			});
	}, [confirmation]);

		// Fetch available slots for selected date/counselor
		useEffect(() => {
			if (!date || !counselor) return;
			setLoadingSlots(true);
			fetch(`/api/counselors/${counselor}/slots?date=${date}`)
				.then((res) => res.json())
				.then((data) => {
					setAvailableSlots(data.slots || []);
					setLoadingSlots(false);
				})
				.catch(() => {
					setAvailableSlots([]);
					setLoadingSlots(false);
				});
		}, [date, counselor]);

		// Handle booking
			const handleBook = async (e: React.FormEvent) => {
				e.preventDefault();
				setBooking(true);
				setError("");
				try {
					const payload: any = {
						sessionType: mode,
						scheduledDate: date + 'T' + time + ':00.000Z',
						duration: 60, // default 60 min, can be made dynamic
						notes,
					};
					if (counselor) payload.counselorId = counselor;
					const res = await fetch("/api/counselors/book", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify(payload),
					});
					const data = await res.json();
					if (!data.success) {
						setError(data.message || "Booking failed. Please try again.");
						setBooking(false);
						return;
					}
					setConfirmation({
						date,
						time,
						counselor: data.data?.counselorName || counselors.find((c) => c._id === counselor)?.name || "Auto-assigned",
						mode,
						topic,
						meetingLink: data.data?.meetingLink || (mode === "video" ? "https://meet.example.com/abc" : null),
					});
				} catch (err) {
					setError("Booking failed. Please try again.");
				}
				setBooking(false);
			};

	return (

		<div className="max-w-4xl mx-auto p-4">
			{/* Notification Banner */}
			<div className="flex items-center gap-2 bg-gradient-to-r from-blue-100 to-blue-50 border border-blue-200 rounded-lg px-4 py-2 mb-4 animate-fadeIn">
				<Bell className="w-5 h-5 text-blue-500" />
				<span className="text-blue-900 font-medium">Book early to secure your preferred slot! Reminders will be sent before your session.</span>
			</div>
			<div className="mb-8 text-center">
				<h1 className="text-4xl font-extrabold text-blue-900 mb-2 flex items-center justify-center gap-2">
					<UserCircle2 className="w-10 h-10 text-blue-500" /> Book Your Counseling Session
				</h1>
				<p className="text-gray-500 text-lg">Talk to our expert counselors and get personalized career guidance.</p>
			</div>

			{/* Booking Form */}

		<form className="bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-2xl p-8 space-y-6 border border-blue-100 animate-fadeIn" onSubmit={handleBook}>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div>
					  <label className="flex text-xs font-semibold text-blue-700 mb-1 items-center gap-1"><User className="w-4 h-4" /> Student Name</label>
					<input type="text" className="input" value={studentName} onChange={e => setStudentName(e.target.value)} required readOnly />
				</div>
				<div>
					  <label className="flex text-xs font-semibold text-blue-700 mb-1 items-center gap-1"><MailIcon className="w-4 h-4" /> Email</label>
					<input type="email" className="input" value={email} onChange={e => setEmail(e.target.value)} required readOnly />
				</div>
				<div>
					  <label className="flex text-xs font-semibold text-blue-700 mb-1 items-center gap-1"><Phone className="w-4 h-4" /> Phone Number</label>
					<input type="tel" className="input" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Enter phone" />
				</div>
				<div>
								<label className="flex text-xs font-semibold text-blue-700 mb-1 items-center gap-1"><Video className="w-4 h-4" /> Preferred Mode</label>
								<select className="input" value={mode} onChange={e => setMode(e.target.value)}>
									{SESSION_MODES.map((m) => <option key={m.value} value={m.value}>{m.label}</option>)}
								</select>
				</div>
				<div>
					  <label className="flex text-xs font-semibold text-blue-700 mb-1 items-center gap-1"><AlertCircle className="w-4 h-4" /> Select Topic</label>
					<select className="input" value={topic} onChange={e => setTopic(e.target.value)}>
						{SESSION_TOPICS.map((t) => <option key={t}>{t}</option>)}
					</select>
				</div>
				<div>
					  <label className="flex text-xs font-semibold text-blue-700 mb-1 items-center gap-1"><Calendar className="w-4 h-4" /> Preferred Date</label>
					<input type="date" className="input" value={date} onChange={e => setDate(e.target.value)} required />
				</div>
						<div>
							<label className="flex text-xs font-semibold text-blue-700 mb-1 items-center gap-1"><Clock className="w-4 h-4" /> Preferred Time Slot</label>
							{!date || !counselor ? (
								<div className="text-gray-400 text-xs">Select date and counselor to see available slots</div>
							) : loadingSlots ? (
								<div className="text-blue-500">Loading slots...</div>
							) : availableSlots.length === 0 ? (
								<div className="text-red-500 text-xs">No slots available for this day</div>
							) : (
								<select className="input" value={time} onChange={e => setTime(e.target.value)} required>
									<option value="">Select</option>
									{availableSlots.map((slot) => <option key={slot} value={slot}>{slot}</option>)}
								</select>
							)}
						</div>
				<div>
					  <label className="flex text-xs font-semibold text-blue-700 mb-1 items-center gap-1"><User className="w-4 h-4" /> Counselor (optional)</label>
					<select className="input" value={counselor} onChange={e => setCounselor(e.target.value)}>
						<option value="">Auto-assign</option>
						{counselors.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
					</select>
				</div>
			</div>
			<div>
			<label className="flex text-xs font-semibold text-blue-700 mb-1 items-center gap-1"><MessageCircle className="w-4 h-4" /> Additional Notes</label>
				<textarea className="input" value={notes} onChange={e => setNotes(e.target.value)} placeholder="I am confused between two streams..." />
			</div>
			{error && <div className="text-red-500 text-sm flex items-center gap-1"><XCircle className="w-4 h-4" />{error}</div>}
			<button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold py-3 rounded-xl shadow-lg text-lg flex items-center justify-center gap-2 transition" disabled={booking}>
				{booking ? <RefreshCcw className="w-5 h-5 animate-spin" /> : <CheckCircle className="w-5 h-5" />} {booking ? "Booking..." : "Book Session"}
			</button>
		</form>

			{/* Confirmation Popup */}
			{confirmation && (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
					<div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full text-center relative">
						<button className="absolute top-2 right-2 text-gray-400 hover:text-blue-600" onClick={() => setConfirmation(null)}>&times;</button>
						<div className="text-3xl text-green-600 mb-2">✅</div>
						<h2 className="text-xl font-bold mb-2">Your session is booked!</h2>
						<div className="mb-2">Session for <b>{confirmation.date}</b> at <b>{confirmation.time}</b></div>
						<div className="mb-2">Counselor: <b>{confirmation.counselor}</b></div>
						<div className="mb-2">Mode: <b>{confirmation.mode}</b></div>
						{confirmation.meetingLink && (
							<div className="mb-2">
								<a href={confirmation.meetingLink} className="text-blue-600 underline" target="_blank">Join Meeting</a>
							</div>
						)}
						<div className="mb-2 text-green-700">You will receive confirmation on SMS/Email.</div>
						<button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg" onClick={() => setConfirmation(null)}>Close</button>
					</div>
				</div>
			)}


		{/* Upcoming Session */}
		{upcomingSession && (
			<div className="mt-8 bg-gradient-to-r from-blue-100 to-blue-50 border-l-4 border-blue-400 p-6 rounded-2xl flex flex-col md:flex-row items-center gap-4 shadow animate-fadeIn">
				<div className="flex items-center gap-3">
					<Calendar className="w-8 h-8 text-blue-500" />
					<div>
						<div className="font-bold text-blue-900 text-lg">Your next session:</div>
						<div className="text-blue-700">{new Date(upcomingSession.scheduledDate).toLocaleString()} <span className="font-semibold">(with {upcomingSession.counselorId?.name || "Counselor"})</span></div>
						<div className="flex gap-2 mt-1">
							<span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-200 text-blue-800 rounded-full text-xs font-semibold"><Clock className="w-3 h-3" /> {upcomingSession.duration || 60} min</span>
							<span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-200 text-green-800 rounded-full text-xs font-semibold"><Video className="w-3 h-3" /> {upcomingSession.sessionType || "video"}</span>
							<span className="inline-flex items-center gap-1 px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold"><CheckCircle className="w-3 h-3" /> {upcomingSession.status}</span>
						</div>
					</div>
				</div>
						<div className="flex-1 flex flex-col md:items-end gap-2 mt-4 md:mt-0">
							{/* Reschedule Button */}
							<button
								className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-white rounded-lg font-semibold flex items-center gap-1 shadow transition"
								onClick={async () => {
									const newDate = prompt("Enter new date (YYYY-MM-DD):", date);
									const newTime = prompt("Enter new time (HH:MM, 24h):", time);
									if (!newDate || !newTime) return;
									setBooking(true);
									setError("");
									const res = await fetch("/api/user/sessions", {
										method: "PATCH",
										headers: { "Content-Type": "application/json" },
										body: JSON.stringify({ sessionId: upcomingSession._id, newDate, newTime }),
									});
									const data = await res.json();
									if (!data.success) setError(data.message || "Failed to reschedule");
									else setConfirmation({ ...confirmation, date: newDate, time: newTime });
									setBooking(false);
								}}
								disabled={booking}
							>
								<RefreshCcw className="w-4 h-4" />Reschedule
							</button>
							{/* Cancel Button */}
							<button
								className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold flex items-center gap-1 shadow transition"
								onClick={async () => {
									if (!window.confirm("Are you sure you want to cancel this session?")) return;
									setBooking(true);
									setError("");
									const res = await fetch("/api/user/sessions", {
										method: "DELETE",
										headers: { "Content-Type": "application/json" },
										body: JSON.stringify({ sessionId: upcomingSession._id }),
									});
									const data = await res.json();
									if (!data.success) setError(data.message || "Failed to cancel");
									else setConfirmation(null);
									setBooking(false);
								}}
								disabled={booking}
							>
								<XCircle className="w-4 h-4" />Cancel
							</button>
						</div>
			</div>
		)}


		{/* Session History */}
		{sessionHistory.length > 0 && (
			<div className="mt-8">
				<h3 className="text-xl font-bold mb-4 text-blue-900 flex items-center gap-2"><Clock className="w-5 h-5" /> Session History</h3>
				<div className="space-y-3">
					{sessionHistory.map((s, i) => (
						<div key={s._id || i} className="bg-gradient-to-br from-white to-blue-50 rounded-xl shadow flex flex-col md:flex-row md:items-center md:justify-between p-4 border border-blue-100 animate-fadeIn">
							<div className="flex items-center gap-3 mb-2 md:mb-0">
								<UserCircle2 className="w-8 h-8 text-blue-400" />
								<div>
									<div className="font-semibold text-blue-900">{new Date(s.scheduledDate).toLocaleString()} <span className="text-blue-700">({s.counselorId?.name || "Counselor"})</span></div>
									<div className="text-sm text-gray-500">Topic: {s.topic || s.sessionType}</div>
									{s.notes?.counselorNotes && <div className="text-xs text-gray-700 mt-1">Notes: {s.notes.counselorNotes}</div>}
								</div>
							</div>
											<div className="flex flex-col gap-1 items-end">
												{/* Status badge color logic */}
												<span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold
													${s.status === "completed" ? "bg-green-200 text-green-800" :
													s.status === "cancelled" ? "bg-red-200 text-red-800" :
													s.status === "scheduled" ? "bg-yellow-100 text-yellow-800" :
													"bg-gray-200 text-gray-700"}
												`}>
													<CheckCircle className="w-3 h-3" /> {s.status}
												</span>
												{s.status === "completed" && s.assessment?.rating && (
													<span className="inline-flex items-center gap-1 px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">⭐ {s.assessment.rating}/5</span>
												)}
											</div>
						</div>
					))}
				</div>
			</div>
		)}
		</div>
	);
}

// Tailwind input style helper (add to global CSS or use utility classes)
// .input { @apply border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-200; }
