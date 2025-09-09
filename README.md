# 🎓 EduPath – One-Stop Career & Education Guide  

**EduPath** is a powerful, AI-enabled career and education guidance platform built with **Next.js, Tailwind CSS**, and **MongoDB**.  
Designed to help students make informed choices about **streams, degrees, colleges**, and **career paths** through intelligent tools like aptitude quizzes, visual roadmaps, and real-time government college data.

---

## 🚀 Features  

- 🎯 **Aptitude & Interest Quiz** – Stream selector (Arts, Science, Commerce, Vocational) based on user strengths  
- 🗺️ **Course-to-Career Mapping** – Visual roadmap from degree → exams → careers → higher studies  
- 🏫 **Nearby Government Colleges** – Geo-based listings with programs, cut-offs & facilities  
- ⏰ **Timeline Tracker** – Real-time alerts for admissions, scholarships, and exams  
- 👤 **Personalized Dashboard** – AI-powered suggestions based on profile and quiz results  
- 🌐 **Multilingual & Offline Support** – Optimized for rural & low-connectivity regions  

---

## 🏗️ Tech Stack  

| Layer       | Tools & Libraries |
|-------------|-------------------|
| **Frontend**  | [Next.js 15](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/) |
| **Backend**   | Node.js with API Routes (via Next.js) |
| **Database**  | [MongoDB](https://www.mongodb.com/) + Mongoose |
| **UI/UX**     | [Shadcn UI](https://ui.shadcn.com/), [Framer Motion](https://www.framer.com/motion/), [Lucide Icons](https://lucide.dev/) |
| **AI Layer**  | Recommendation engine for courses & careers |

---

## 📂 Project Structure  

```bash
EduPath/
├── public/           # Static assets (images, fonts, icons)
├── src/
│   ├── app/          # App Router pages (Next.js)
│   ├── components/   # Reusable UI components
│   ├── lib/          # Utility functions
│   ├── models/       # MongoDB schemas
│   ├── api/          # API routes (students, colleges, quizzes)
│   └── styles/       # Tailwind CSS configurations
├── .env.local        # Environment variables
├── package.json
├── tailwind.config.js
└── README.md
