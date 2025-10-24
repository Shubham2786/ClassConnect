const { db } = require('../database');

const sampleSubjects = [
  { name: 'Data Structures and Algorithms', code: 'CS301', type: 'Theory', credits: 4 },
  { name: 'Database Management Systems', code: 'CS302', type: 'Theory', credits: 3 },
  { name: 'Web Development Lab', code: 'CS303', type: 'Lab', credits: 2 },
  { name: 'Computer Networks', code: 'CS304', type: 'Theory', credits: 3 },
  { name: 'Software Engineering', code: 'CS305', type: 'Theory', credits: 3 }
];

const sampleTimetable = [
  { subject_id: 1, day_of_week: 1, start_time: '09:00', end_time: '10:00' },
  { subject_id: 2, day_of_week: 1, start_time: '10:00', end_time: '11:00' },
  { subject_id: 3, day_of_week: 2, start_time: '14:00', end_time: '17:00' },
  { subject_id: 4, day_of_week: 3, start_time: '11:00', end_time: '12:00' },
  { subject_id: 5, day_of_week: 4, start_time: '09:00', end_time: '10:00' },
  { subject_id: 1, day_of_week: 5, start_time: '10:00', end_time: '11:00' }
];

const seedDatabase = async () => {
  try {
    console.log('🌱 Seeding database with sample data...');
    
    // Insert sample subjects
    for (const subject of sampleSubjects) {
      await new Promise((resolve, reject) => {
        db.run(
          'INSERT OR IGNORE INTO subjects (name, code, type, credits) VALUES (?, ?, ?, ?)',
          [subject.name, subject.code, subject.type, subject.credits],
          function(err) {
            if (err) reject(err);
            else resolve();
          }
        );
      });
    }
    
    // Insert sample timetable
    for (const entry of sampleTimetable) {
      await new Promise((resolve, reject) => {
        db.run(
          'INSERT OR IGNORE INTO timetable (subject_id, day_of_week, start_time, end_time) VALUES (?, ?, ?, ?)',
          [entry.subject_id, entry.day_of_week, entry.start_time, entry.end_time],
          function(err) {
            if (err) reject(err);
            else resolve();
          }
        );
      });
    }
    
    console.log('✅ Sample data seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  }
};

module.exports = { seedDatabase };