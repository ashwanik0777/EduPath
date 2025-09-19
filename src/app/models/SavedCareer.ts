import mongoose from 'mongoose';

const SavedCareerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  career_id: { type: String, required: true },
  savedAt: { type: Date, default: Date.now },
  note: { type: String },
});

export default mongoose.models.SavedCareer || mongoose.model('SavedCareer', SavedCareerSchema);
