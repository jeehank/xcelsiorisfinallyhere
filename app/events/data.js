//EDIT HARDCODED DATA AND ADD A SLUG TO NAVIGATE USERS TO RESPECTIVE EVENTS. THE SLUG SHOULD BE THE X-(EVENT NAME) ACCORDING TO REP'S RPOFILE. ALSO ACTUALLY ADD THE EVENTS IN THE DATABASE.
// slugs added 
// stop talking in caps lock buddy 

export const eventsOnline = [
  { name: "Video Editing", time: "Online", participants: 1, slug: "x-frame" },
];

export const eventsDay1 = [
  { name: "Quiz", time: "2:30 PM", participants: 3, slug: "x-trivia" },
  { name: "Robotics", time: "2:30 PM", participants: 2, slug: "x-botics" },
  { name: "Sudoku(6-8)", time: "2:30 PM", participants: 2, slug: "x-grid" },
  { name: "Graph Art", time: "2:30 PM", participants: 2, slug: "x-graph-art" },
  { name: "HTML & CSS", time: "2:30 PM", participants: 2, slug: "x-html---css" },
  { name: "Debate", time: "2:15 PM", participants: 2, slug: "x-calibre" },
  { name: "FIFA", time: "2:30 PM", participants: 2, slug: "x-fifa" },
];

export const eventsDay2 = [
  { name: "Hackathon", time: "9:00 AM", participants: 2, slug: "x-hack" },
  { name: "Competitive Coding", time: "9:00 AM", participants: 2, slug: "x-ecute" },
  { name: "Shark Tank", time: "12:15 PM", participants: 2, slug: "x-tank" },
  { name: "Math Relay", time: "12:00 PM", participants: 4, slug: "x-relay" },
  { name: "Debate Finals", time: "12:30 PM", participants: 3, slug: "x-calibre-finals" },
  { name: "Game Jam", time: "11:00 AM", participants: 2, slug: "x-jam" },
  { name: "Competitive Maths", time: "2:00 PM", participants: 2, slug: "x-paradigm" },
  { name: "Data Detectives", time: "2:00 PM", participants: 1, slug: "x-analytics" },
];

export const allEvents = [...eventsOnline, ...eventsDay1, ...eventsDay2];

export const getEventBySlug = (slug) => {
  return allEvents.find((e) => e.slug === slug);
};