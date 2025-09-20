import mongoose from "mongoose";
import PsychometricQuestion from "../src/app/models/PsychometricQuestion";
import dbConnect from "../src/app/lib/mongoose";

const questions = [
  // Openness
  { section: "O", sectionTitle: "Openness (Creativity, Curiosity)", q: "I enjoy trying new things.", type: "scale", order: 1 },
  { section: "O", sectionTitle: "Openness (Creativity, Curiosity)", q: "I am curious about many different things.", type: "scale", order: 2 },
  // Conscientiousness
  { section: "C", sectionTitle: "Conscientiousness (Organization, Diligence)", q: "I am always prepared.", type: "scale", order: 1 },
  { section: "C", sectionTitle: "Conscientiousness (Organization, Diligence)", q: "I pay attention to details.", type: "scale", order: 2 },
  // Extraversion
  { section: "E", sectionTitle: "Extraversion (Sociability, Assertiveness)", q: "I am the life of the party.", type: "scale", order: 1 },
  { section: "E", sectionTitle: "Extraversion (Sociability, Assertiveness)", q: "I feel comfortable around people.", type: "scale", order: 2 },
  // Agreeableness
  { section: "A", sectionTitle: "Agreeableness (Compassion, Cooperation)", q: "I am interested in people.", type: "scale", order: 1 },
  { section: "A", sectionTitle: "Agreeableness (Compassion, Cooperation)", q: "I sympathize with others' feelings.", type: "scale", order: 2 },
  // Neuroticism
  { section: "N", sectionTitle: "Neuroticism (Emotional Stability)", q: "I get stressed out easily.", type: "scale", order: 1 },
  { section: "N", sectionTitle: "Neuroticism (Emotional Stability)", q: "I worry about things.", type: "scale", order: 2 },
];

async function seed() {
  await dbConnect();
  await PsychometricQuestion.deleteMany({});
  await PsychometricQuestion.insertMany(questions);
  console.log("Seeded psychometric questions.");
  mongoose.connection.close();
}

seed();
