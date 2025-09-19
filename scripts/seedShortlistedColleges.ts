import mongoose from "mongoose";
import User from "../src/app/models/User";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/edupath";

const SHORTLISTED_COLLEGES = [
  {
    college_id: "JK-GOV-001",
    name: "Govt. Degree College, Baramulla",
    type: "Government",
    district: "Baramulla",
    city: "Baramulla",
    state: "Jammu & Kashmir",
    courses_interested: ["B.A", "B.Sc"],
    affiliated_to: "University of Kashmir",
    application_status: "not_applied",
    saved_on: "2025-09-17",
    student_note: "Good hostel, close to home",
    image: "/college1.jpg",
    fees: "₹12,000/yr",
    facilities: ["Hostel", "Library", "Sports"],
    deadline: "2025-10-10",
    match: 92,
  },
  {
    college_id: "JK-PRI-002",
    name: "ABC Private College, Srinagar",
    type: "Private",
    district: "Srinagar",
    city: "Srinagar",
    state: "Jammu & Kashmir",
    courses_interested: ["B.Com", "BBA"],
    affiliated_to: "Cluster University Srinagar",
    application_status: "applied",
    saved_on: "2025-09-16",
    student_note: "Offers scholarship",
    image: "/college2.jpg",
    fees: "₹25,000/yr",
    facilities: ["WiFi", "Cafeteria", "Transport"],
    deadline: "2025-09-30",
    match: 85,
  },
  {
    college_id: "JK-GOV-003",
    name: "Govt. Science College, Jammu",
    type: "Government",
    district: "Jammu",
    city: "Jammu",
    state: "Jammu & Kashmir",
    courses_interested: ["B.Sc", "M.Sc"],
    affiliated_to: "University of Jammu",
    application_status: "not_applied",
    saved_on: "2025-09-15",
    student_note: "Top science faculty",
    image: "/college3.jpg",
    fees: "₹15,000/yr",
    facilities: ["Lab", "Library", "Sports"],
    deadline: "2025-10-05",
    match: 88,
  },
  {
    college_id: "JK-CEN-004",
    name: "Central University of Kashmir",
    type: "Central",
    district: "Ganderbal",
    city: "Ganderbal",
    state: "Jammu & Kashmir",
    courses_interested: ["B.A", "MA"],
    affiliated_to: "Central University",
    application_status: "not_applied",
    saved_on: "2025-09-14",
    student_note: "Modern campus, good placements",
    image: "/college4.jpg",
    fees: "₹20,000/yr",
    facilities: ["Hostel", "WiFi", "Library"],
    deadline: "2025-10-15",
    match: 90,
  },
  {
    college_id: "JK-PRI-005",
    name: "Sunshine Private College, Anantnag",
    type: "Private",
    district: "Anantnag",
    city: "Anantnag",
    state: "Jammu & Kashmir",
    courses_interested: ["BBA", "MBA"],
    affiliated_to: "Cluster University Srinagar",
    application_status: "not_applied",
    saved_on: "2025-09-13",
    student_note: "Good for management studies",
    image: "/college5.jpg",
    fees: "₹30,000/yr",
    facilities: ["Cafeteria", "Transport", "Hostel"],
    deadline: "2025-10-20",
    match: 80,
  },
];

async function seed() {
  await mongoose.connect(MONGODB_URI);
  const user = await User.findOne(); // You can filter by email if needed
  if (!user) throw new Error("No user found");
  user.shortlistedColleges = SHORTLISTED_COLLEGES;
  await user.save();
  console.log("Shortlisted colleges seeded for user:", user.email);
  await mongoose.disconnect();
}

seed().catch(e => { console.error(e); process.exit(1); });
