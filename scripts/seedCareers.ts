import Career from '../src/app/models/Career';

import mongoose from 'mongoose';

async function dbConnect() {
  if (mongoose.connection.readyState >= 1) return;
await mongoose.connect(process.env.MONGODB_URI!, {
    dbName: 'test',
});
}

export async function seedCareers() {
  await dbConnect();
  const careers = [
    {
      career_id: 'CAREER_001',
      title: 'Data Scientist',
      stream: 'Science',
      education_path: ['B.Sc in Statistics', 'B.Tech in CS', 'M.Sc in Data Science'],
      description: 'Analyzes data to generate insights...',
      required_skills: ['Analytical Thinking', 'Python', 'Machine Learning'],
      salary_range: '₹5L – ₹25L per year',
      growth_scope: 'Very High',
      related_careers: ['AI Engineer', 'Business Analyst'],
      career_nature: 'Private',
      interest_area: ['Technology'],
      education_level: ['After Graduation'],
      short_description: 'Analyzes and interprets complex data to help organizations make decisions.',
      key_roles: ['Data analysis', 'Model building', 'Reporting'],
      eligibility: 'Bachelor’s in relevant field',
      entry_courses: ['B.Sc in Statistics', 'B.Tech in CS'],
      pros: ['High demand', 'Good salary'],
      cons: ['Continuous learning required'],
      famous_people: ['DJ Patil'],
    },
    {
      career_id: 'CAREER_002',
      title: 'Software Engineer',
      stream: 'Science',
      education_path: ['B.Tech in CS', 'MCA'],
      description: 'Designs and develops computer software...',
      required_skills: ['Programming', 'Problem Solving'],
      salary_range: '₹4L – ₹30L per year',
      growth_scope: 'High',
      related_careers: ['Web Developer', 'Mobile App Developer'],
      career_nature: 'Private',
      interest_area: ['Technology'],
      education_level: ['After Graduation'],
      short_description: 'Builds and maintains software applications.',
      key_roles: ['Coding', 'Testing', 'Deployment'],
      eligibility: 'Bachelor’s in Computer Science',
      entry_courses: ['B.Tech in CS', 'MCA'],
      pros: ['Creative work', 'Remote options'],
      cons: ['Long hours'],
      famous_people: ['Linus Torvalds'],
    },
    // Add more careers as needed
  ];
  await Career.deleteMany({});
  await Career.insertMany(careers);
  return 'Seeded successfully';
}

if (require.main === module) {
  seedCareers().then(console.log).catch(console.error);
}
