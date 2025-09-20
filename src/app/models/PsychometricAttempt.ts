import mongoose, { Schema, models } from "mongoose";

const PsychometricAttemptSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  answers: [
    {
      questionId: String,
      answer: Schema.Types.Mixed,
      timeSpent: Number,
    },
  ],
  scores: [
    {
      category: String,
      score: Number,
      percentage: Number,
      interpretation: String,
    },
  ],
  overallScore: Number,
  recommendations: {
    careerPaths: [
      {
        field: String,
        match: Number,
        description: String,
        suggestedCourses: [String],
        topColleges: [String],
      },
    ],
    nextSteps: [String],
    resources: [String],
  },
  timeSpent: Number,
  takenAt: { type: Date, default: Date.now },
});

export default models.PsychometricAttempt || mongoose.model("PsychometricAttempt", PsychometricAttemptSchema);
