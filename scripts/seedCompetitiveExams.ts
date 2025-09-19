import mongoose from "mongoose";
import Exam from "../src/app/models/Exam";

const exams = [
  {
    exam_id: "JKSSB-2025-001",
    name: "JKSSB Accounts Assistant",
    type: "Government Job",
    eligibility: "Graduate (Commerce)",
    age_limit: "18-40",
    application_start: "2025-09-01",
    application_end: "2025-09-30",
    exam_date: "2025-11-15",
    syllabus_pdf: "https://jkssb.nic.in/syllabus.pdf",
    official_link: "https://jkssb.nic.in",
    conducting_body: "JKSSB",
    department: "Banking",
    exam_mode: "Offline",
    state: "JK",
    languages: ["English", "Urdu"],
    fee: "₹500",
    posts: "200",
    selection_process: "Written + Interview",
    pattern: "Paper I: General, Paper II: Accounts",
    important_dates: {
      "Application Start": "2025-09-01",
      "Last Date": "2025-09-30",
      "Admit Card": "2025-10-25",
      "Exam Date": "2025-11-15"
    },
    last_year_cutoff: "72/100",
    recommended_courses: ["Accounts Basics", "General Knowledge"]
  },
  {
    exam_id: "SSC-2025-002",
    name: "SSC CHSL",
    type: "Government Job",
    eligibility: "12th Pass",
    age_limit: "18-27",
    application_start: "2025-10-01",
    application_end: "2025-10-31",
    exam_date: "2025-12-10",
    syllabus_pdf: "https://ssc.nic.in/chsl_syllabus.pdf",
    official_link: "https://ssc.nic.in",
    conducting_body: "SSC",
    department: "Central Govt",
    exam_mode: "Online",
    state: "All India",
    languages: ["English", "Hindi"],
    fee: "₹100",
    posts: "5000",
    selection_process: "Tier I, II, III",
    pattern: "Tier I: MCQ, Tier II: Descriptive, Tier III: Skill Test",
    important_dates: {
      "Application Start": "2025-10-01",
      "Last Date": "2025-10-31",
      "Admit Card": "2025-11-25",
      "Exam Date": "2025-12-10"
    },
    last_year_cutoff: "140/200",
    recommended_courses: ["English Grammar", "Quantitative Aptitude"]
  }
];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://EduPath:BfBxBpVrqmCYXqaK@edupath.ettbup4.mongodb.net/test");
  await Exam.deleteMany({});
  await Exam.insertMany(exams);
  console.log("Seeded competitive exams!");
  await mongoose.disconnect();
}

seed();
