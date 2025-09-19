import connectDB from "@/app/lib/mongoose"
import CounselingSession from "@/app/models/CounselingSession"
import User from "@/app/models/User"
import { sendReminderEmail } from "@/app/lib/email"

// This script should be run by a scheduler (e.g. node-cron, external cron)
export async function sendUpcomingSessionReminders() {
  await connectDB()
  const now = new Date()
  const soon = new Date(now.getTime() + 60 * 60 * 1000) // 1 hour from now
  const sessions = await CounselingSession.find({
    status: "scheduled",
    scheduledAt: { $gte: now, $lte: soon },
  })
  for (const session of sessions) {
    const student = await User.findById(session.studentId)
    if (student?.email) {
      await sendReminderEmail(
        student.email,
        "Upcoming Counseling Session Reminder",
        `Dear ${student.name},\n\nThis is a reminder for your counseling session scheduled at ${session.scheduledAt.toLocaleString()}.\n\nBest regards,\nEduPath Team`
      )
    }
    // Optionally, send to counselor as well (if you have their email)
  }
}

// For local testing
if (require.main === module) {
  sendUpcomingSessionReminders().then(() => process.exit(0))
}
