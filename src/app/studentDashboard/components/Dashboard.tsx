import React from "react";
import { TrendingUp, BookOpen, Award, GraduationCap } from "lucide-react";

interface DashboardProps {
	user: {
	name: string;
	photo?: string;
	};
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
	return (
	<>
	{/* Modern Hero Section */}
	<section className="relative bg-gradient-to-r from-indigo-600 to-blue-500 rounded-b-3xl shadow-xl mb-10">
	<div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center gap-8">
		  <div className="flex-1 text-white">
			<h1 className="text-4xl md:text-5xl font-extrabold mb-2 drop-shadow-lg">Welcome, {user.name}!</h1>
			<p className="text-lg md:text-2xl font-medium mb-6 drop-shadow">Your personalized student journey starts here.</p>
			<div className="flex flex-wrap gap-3 mb-4">
			  <button className="bg-white/20 hover:bg-white/30 text-white font-semibold px-5 py-2 rounded-lg shadow transition-all border border-white/30 backdrop-blur">Take Psychometric Test</button>
			  <button className="bg-white/20 hover:bg-white/30 text-white font-semibold px-5 py-2 rounded-lg shadow transition-all border border-white/30 backdrop-blur">Browse Courses</button>
			  <button className="bg-white/20 hover:bg-white/30 text-white font-semibold px-5 py-2 rounded-lg shadow transition-all border border-white/30 backdrop-blur">Find Colleges</button>
			  <button className="bg-white/20 hover:bg-white/30 text-white font-semibold px-5 py-2 rounded-lg shadow transition-all border border-white/30 backdrop-blur">Career Options</button>
			</div>
			<div className="flex gap-4 mt-4">
			  <div className="flex flex-col items-center">
				<TrendingUp className="h-8 w-8 text-yellow-300 mb-1" />
				<span className="text-lg font-bold">75%</span>
				<span className="text-xs">Progress</span>
			  </div>
			  <div className="flex flex-col items-center">
				<BookOpen className="h-8 w-8 text-green-200 mb-1" />
				<span className="text-lg font-bold">12</span>
				<span className="text-xs">Courses</span>
			  </div>
			  <div className="flex flex-col items-center">
				<Award className="h-8 w-8 text-pink-200 mb-1" />
				<span className="text-lg font-bold">8</span>
				<span className="text-xs">Badges</span>
			  </div>
			</div>
		  </div>
		  <div className="flex-1 flex justify-center items-center">
			{user.photo ? (
			  <img
				src={user.photo}
				alt={user.name + "'s profile photo"}
				className="w-40 h-40 md:w-56 md:h-56 object-cover rounded-full border-1 border-white/30 shadow-2xl bg-white/10"
			  />
			) : (
			  <img
				src="https://png.pngitem.com/pimgs/s/609-6092421_project-manager-clipart-png-download-illustration-transparent-png.png"
				alt="EduPath Logo"
				className="w-40 md:w-60 drop-shadow-2xl rounded-full border-1 border-white/30 bg-white/10"
			  />
			)}
		  </div>
	</div>
	</section>

	{/* Quick Actions Grid */}
	<section className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
	<div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center border-t-4 border-indigo-500 hover:scale-105 transition-transform">
		  <TrendingUp className="h-8 w-8 text-indigo-500 mb-2" />
		  <div className="text-2xl font-bold text-indigo-700">Counseling Progress</div>
		  <div className="text-xs text-gray-500 mt-1">Track your counseling journey</div>
	</div>
	<div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center border-t-4 border-green-500 hover:scale-105 transition-transform">
		  <BookOpen className="h-8 w-8 text-green-500 mb-2" />
		  <div className="text-2xl font-bold text-green-700">Courses</div>
		  <div className="text-xs text-gray-500 mt-1">Explore and enroll in courses</div>
	</div>
	<div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center border-t-4 border-blue-500 hover:scale-105 transition-transform">
		  <GraduationCap className="h-8 w-8 text-blue-500 mb-2" />
		  <div className="text-2xl font-bold text-blue-700">Colleges</div>
		  <div className="text-xs text-gray-500 mt-1">Find top government colleges</div>
	</div>
	<div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center border-t-4 border-yellow-500 hover:scale-105 transition-transform">
		  <Award className="h-8 w-8 text-yellow-500 mb-2" />
		  <div className="text-2xl font-bold text-yellow-700">Scholarships</div>
		  <div className="text-xs text-gray-500 mt-1">Apply for scholarships</div>
	</div>
	</section>

	{/* Modern Info Cards */}
	<section className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
	<div className="bg-gradient-to-br from-indigo-100 via-white to-blue-100 rounded-2xl shadow-lg p-8 flex flex-col gap-4 border border-indigo-100">
		  <h2 className="text-xl font-bold text-indigo-800 mb-2 flex items-center gap-2"><BookOpen className="h-5 w-5 text-indigo-500" /> Your Next Steps</h2>
		  <ul className="space-y-2 text-gray-700">
			<li>✔️ Complete your profile for personalized recommendations</li>
			<li>✔️ Take the psychometric test to discover your strengths</li>
			<li>✔️ Explore colleges and shortlist your favorites</li>
			<li>✔️ Track your progress and earn badges</li>
		  </ul>
	</div>
	<div className="bg-gradient-to-br from-yellow-50 via-white to-pink-100 rounded-2xl shadow-lg p-8 flex flex-col gap-4 border border-yellow-100">
		  <h2 className="text-xl font-bold text-yellow-800 mb-2 flex items-center gap-2"><Award className="h-5 w-5 text-yellow-500" /> Recent Achievements</h2>
		  <ul className="space-y-2 text-gray-700">
			<li>🏅 Completed Math Quiz <span className="text-xs text-gray-400">2 hours ago</span></li>
			<li>🎉 Started Science Chapter <span className="text-xs text-gray-400">Yesterday</span></li>
			<li>🏆 Earned "Quick Learner" badge <span className="text-xs text-gray-400">2 days ago</span></li>
		  </ul>
	</div>
	</section>
	</>
	);
};

export default Dashboard;
