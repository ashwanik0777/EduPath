# 🎓 EduPath – One-Stop Career & Education Guide

**EduPath** is a full-stack, AI-enabled career and education guidance platform built with **Next.js 15 (App Router)**, **Tailwind CSS**, **MongoDB + Mongoose**, and a modern, modular architecture. It empowers students to make informed choices about **streams, degrees, colleges**, and **career paths** through intelligent tools like psychometric/aptitude quizzes, visual roadmaps, and real-time government college data.

---

## 🚀 Features

- 🎯 **Psychometric & Aptitude Test** – Dynamic, database-driven OCEAN/Big Five personality test with professional scoring, analytics, and personalized career recommendations
- 🗺️ **Course-to-Career Mapping** – Visual roadmap from degree → exams → careers → higher studies
- 🏫 **Nearby Government Colleges** – Geo-based listings with programs, cut-offs & facilities
- ⏰ **Timeline Tracker** – Real-time alerts for admissions, scholarships, and exams
- 👤 **Personalized Dashboard** – AI-powered suggestions based on profile and quiz results
- 💬 **Feedback & Counseling** – Feedback system with screenshot upload, bookable counseling sessions
- 📊 **Advanced Analytics** – User psychometric trends, averages, and history
- 🌐 **Multilingual & Offline Support** – Optimized for rural & low-connectivity regions

---

## 🏗️ Tech Stack

| Layer         | Tools & Libraries                                                                 |
|---------------|-----------------------------------------------------------------------------------|
| **Frontend**  | [Next.js 15 (App Router)](https://nextjs.org/), [React 19](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/), [Shadcn UI](https://ui.shadcn.com/), [Framer Motion](https://www.framer.com/motion/), [Lucide Icons](https://lucide.dev/) |
| **Backend**   | Node.js (API Routes via Next.js), RESTful APIs, JWT Auth, [Cloudinary](https://cloudinary.com/) (uploads) |
| **Database**  | [MongoDB](https://www.mongodb.com/) + [Mongoose](https://mongoosejs.com/)         |
| **AI/Logic**  | OCEAN/Big Five psychometric scoring, dynamic mapping, analytics, recommendations  |
| **Dev Tools** | ESLint, TypeScript, Zod, React Hook Form, Radix UI, etc.                          |

---

## 📂 Project Structure & Key Files

```bash
EduPath/
├── public/                                 # Static assets (images, icons, quiz images)
│   ├── blog.jpg
│   ├── EdupathLogo.png
│   ├── J&KLogo.png
│   └── quiz/                               # Quiz images (per question, per section)
│       └── questions/
│           ├── 1/                          # Section 1 images (Q.png, 1.png, ...)
│           ├── 2/
│           ├── ...
│           └── 15/
│       └── Answer.pdf                      # Quiz answer key (if any)
├── src/
│   └── app/
│       ├── layout.tsx                      # App shell (Next.js root layout)
│       ├── page.tsx                        # Landing page
│       ├── globals.css                     # Global styles (Tailwind)
│       ├── components/                     # Reusable UI components
│       │   ├── Navbar.tsx                  # Top navigation bar
│       │   ├── Footer.tsx                  # Footer
│       │   ├── Sidebar.tsx                 # Dashboard sidebar navigation
│       │   ├── HeroSection.tsx             # Landing hero section
│       │   └── ...                         # Other UI components (grouped by feature)
│       ├── hooks/                          # Custom React hooks
│       │   ├── use-toast.ts                # Toast notification hook
│       │   └── useAuth.tsx                 # Auth state hook
│       ├── lib/                            # Utility functions
│       │   ├── auth.ts                     # JWT auth helpers
│       │   ├── mongoose.ts                 # MongoDB connection logic
│       │   └── utils.ts                    # Misc utilities
│       ├── models/                         # Mongoose schemas
│       │   ├── User.ts                     # User schema
│       │   ├── College.ts                  # College schema
│       │   ├── Counselor.ts                # Counselor schema
│       │   ├── Assessment.ts               # General assessment schema
│       │   ├── PsychometricQuestion.ts     # Psychometric question schema
│       │   └── PsychometricAttempt.ts      # Psychometric attempt schema
│       ├── api/                            # API routes (RESTful, dynamic)
│       │   ├── psychometric/
│       │   │   ├── route.ts                # POST (submit attempt), GET (history)
│       │   │   ├── questions/route.ts      # GET (fetch all questions)
│       │   │   └── analytics/route.ts      # GET (user analytics)
│       │   ├── feedback/                   # Feedback endpoints (with Cloudinary upload)
│       │   ├── colleges/                   # College data endpoints
│       │   ├── counselors/                 # Counseling session endpoints
│       │   └── ...                         # Other APIs (user, register, login, etc.)
│       ├── studentDashboard/               # Student dashboard pages/components
│       │   ├── page.tsx                    # Dashboard shell (main entry)
│       │   └── components/
│       │       ├── PsychometricTest.tsx    # Dynamic test UI, analytics, history
│       │       ├── Profile.tsx             # User profile
│       │       ├── GovernmentCollege.tsx   # College listing
│       │       ├── Courses.tsx             # Course explorer
│       │       ├── CareerOption.tsx        # Career options
│       │       ├── CompetitiveExams.tsx    # Competitive exams
│       │       ├── ShortListedCollege.tsx  # Shortlisted colleges
│       │       ├── Scholarships.tsx        # Scholarships
│       │       ├── ProgressTracker.tsx     # Progress tracker
│       │       ├── CounselingBooking.tsx   # Book counseling
│       │       ├── Feedback.tsx            # Feedback form
│       │       └── Dashboard.tsx           # Dashboard overview
│       └── ...                             # Other app pages (about, login, register, etc.)
├── scripts/
│   └── seedPsychometricQuestions.ts        # Seeds OCEAN/Big Five questions to DB
├── .env.local                             # Environment variables (DB, JWT, Cloudinary)
├── package.json, tsconfig.json, ...        # Config files
└── README.md                              # Project documentation
```

---

## 🧠 Psychometric Test System: Logic & Algorithms

---

### 📝 Quiz Result Evaluation Approach & Algorithm

#### 1. Question Mapping
- Each question in the psychometric test is tagged with a section key: `O` (Openness), `C` (Conscientiousness), `E` (Extraversion), `A` (Agreeableness), `N` (Neuroticism).
- Questions are stored in `/src/app/models/PsychometricQuestion.ts` and fetched dynamically from the database.

#### 2. User Response Collection
- User answers are collected as an array of objects: `{ questionId, answer, timeSpent }`.
- Each answer is a number from 0 (Strongly Disagree) to 4 (Strongly Agree).

#### 3. Scoring & Normalization
- For each OCEAN trait:
  - Filter all answers whose `questionId` starts with the trait key (e.g., `O-0`, `C-1`).
  - Sum the answer values for that trait.
  - Calculate the maximum possible score for that trait: `maxScore = number of questions × 4`.
  - Normalize: `percentage = (score / maxScore) × 100`.
  - Interpretation:
    - 0–50%: Low
    - 51–75%: Moderate
    - 76–100%: High

#### 4. Career Recommendation Logic
- Sort the five trait scores by percentage (descending).
- The top two traits are mapped to career fields, suggested courses, and top colleges.
- Example mapping (see `/api/psychometric/route.ts`):
  - High Openness → Designer, Writer
  - High Conscientiousness → Engineer, Manager
  - High Extraversion → Sales/Marketing, Event Manager
  - High Agreeableness → Psychologist, Counselor
  - High Neuroticism → Analyst, Researcher

#### 5. Pseudocode for Evaluation
```pseudo
for each trait in [O, C, E, A, N]:
    answers = filter userAnswers where questionId starts with trait
    score = sum(answers)
    maxScore = count(answers) * 4
    percentage = (score / maxScore) * 100
    interpretation =
        if percentage > 75: 'High'
        else if percentage > 50: 'Moderate'
        else: 'Low'
sort all traits by percentage descending
recommend careers based on top 2 traits
```

#### 6. Example Output
```json
{
  "scores": [
    { "category": "Openness", "score": 12, "percentage": 75, "interpretation": "Moderate" },
    { "category": "Conscientiousness", "score": 14, "percentage": 88, "interpretation": "High" },
    ...
  ],
  "overallScore": 70,
  "recommendations": {
    "careerPaths": [
      { "field": "Engineer", "match": 88, "description": "Organized and detail-oriented.", "suggestedCourses": ["Engineering"], "topColleges": ["IIT", "NIT"] },
      { "field": "Writer", "match": 75, "description": "Imaginative and expressive.", "suggestedCourses": ["Literature", "Journalism"], "topColleges": ["DU", "JNU"] }
    ],
    "nextSteps": ["Explore suggested courses", "Book a counseling session"],
    "resources": []
  }
}
```

---

### 1. Data Model & Storage

- **Questions:**
  - `/src/app/models/PsychometricQuestion.ts` – Stores all psychometric questions (OCEAN/Big Five), section, text, type, options, order.
  - Seeded via `/scripts/seedPsychometricQuestions.ts` (see script for sample questions).
- **Attempts:**
  - `/src/app/models/PsychometricAttempt.ts` – Stores each user’s test attempt, answers, per-trait scores, overall score, recommendations, time, userId, takenAt.

### 2. API Endpoints

- **Fetch Questions:**
  - `GET /api/psychometric/questions` → Returns all questions, grouped by section/order.
- **Submit Attempt:**
  - `POST /api/psychometric` → Accepts answers, calculates scores, saves attempt, returns result & recommendations.
- **Get History:**
  - `GET /api/psychometric` → Returns all previous attempts for the logged-in user.
- **Analytics:**
  - `GET /api/psychometric/analytics` → Returns user’s average scores per trait, attempt trends, most common recommended career, total attempts.

### 3. Scoring Algorithm (OCEAN/Big Five)

- Each question is tagged with a section: O (Openness), C (Conscientiousness), E (Extraversion), A (Agreeableness), N (Neuroticism).
- User answers are mapped by questionId prefix (e.g., O-0, C-1, ...).
- Each answer is scored 0–4 (Strongly Disagree → Strongly Agree).
- For each trait:
  - **score = sum of answers for that trait**
  - **maxScore = number of questions × 4**
  - **percentage = (score / maxScore) × 100**
  - **interpretation:**
    - 0–50%: Low
    - 51–75%: Moderate
    - 76–100%: High
- **Career Recommendations:**
  - Top 2 traits are mapped to suggested career fields, courses, and top colleges (see `/api/psychometric/route.ts` for mapping logic).

#### Example (from `/api/psychometric/route.ts`):
```ts
const categories = [
  { key: "O", label: "Openness" },
  { key: "C", label: "Conscientiousness" },
  { key: "E", label: "Extraversion" },
  { key: "A", label: "Agreeableness" },
  { key: "N", label: "Neuroticism" },
];
// Map answers to categories by questionId prefix
const scores = categories.map((cat) => {
  const catAnswers = answers.filter((a) => a.questionId.startsWith(cat.key)).map(a => a.answer);
  const score = catAnswers.reduce((a, b) => a + (typeof b === "number" ? b : 0), 0);
  const maxScore = catAnswers.length * 4;
  const percentage = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
  let interpretation = "Low";
  if (percentage > 75) interpretation = "High";
  else if (percentage > 50) interpretation = "Moderate";
  return { category: cat.label, score, percentage, interpretation };
});
```

---

## 🖥️ Frontend Flow: Dynamic Test, Analytics, History

- **Dynamic Test UI:** `/src/app/studentDashboard/components/PsychometricTest.tsx`
  - Fetches all questions from `/api/psychometric/questions` on mount
  - Groups by section, renders progress, tracks time per section
  - On submit, POSTs answers to `/api/psychometric`, shows result, recommendations, and saves to history
  - Fetches analytics (`/api/psychometric/analytics`) and history (`/api/psychometric`) for user
  - Advanced UI: animated transitions, error handling, loading states

- **Dashboard Structure:** `/src/app/studentDashboard/page.tsx`, `/src/app/components/Sidebar.tsx`
  - Sidebar navigation for all dashboard features (profile, progress, colleges, feedback, etc.)

---

## 🔒 Authentication & Security

- **JWT-based authentication** (see `/src/app/lib/auth.ts`):
  - Token in Authorization header or cookie
  - User lookup and validation for all protected endpoints
- **Database connection** via `/src/app/lib/mongoose.ts` (singleton, cached)
- **Environment variables:**
  - `.env.local` for DB, JWT, Cloudinary, etc.

---

## 🛠️ Data Seeding & Extensibility

- **Seeding script:** `/scripts/seedPsychometricQuestions.ts` – Run to populate OCEAN/Big Five questions
- **Easily extensible:** Add new questions, sections, or scoring logic by updating models and seed script

---

## 📈 Analytics & Reporting

- **User analytics endpoint:** `/api/psychometric/analytics/route.ts`
  - Returns average scores per trait, attempt trends, most common recommended career, total attempts
- **Frontend:**
  - Visualizes analytics and history in dashboard

---

## 📚 Other Key Models & APIs

- `/src/app/models/User.ts` – User schema (profile, academic, preferences, assessments, sessions)
- `/src/app/models/College.ts` – College schema (courses, facilities, placements, contact)
- `/src/app/models/Counselor.ts` – Counselor schema (profile, qualifications, experience, availability)
- `/src/app/models/Assessment.ts` – General assessment schema (for future extensibility)
- `/src/app/api/feedback/` – Feedback endpoints (with Cloudinary upload)
- `/src/app/api/colleges/` – Government/private college data
- `/src/app/api/counselors/` – Bookable counseling sessions

---

## 📝 How to Run & Develop

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Set up environment variables:**
   - Copy `.env.local.example` to `.env.local` and fill in MongoDB, JWT, Cloudinary, etc.
3. **Seed psychometric questions:**
   ```bash
   npm run ts-node scripts/seedPsychometricQuestions.ts
   ```
4. **Start dev server:**
   ```bash
   npm run dev
   ```

---

## 🏆 Credits & License

- Built by [ashwanik0777](https://github.com/ashwanik0777) and contributors
- MIT License
