//EDIT HARDCODED DATA AND ADD A SLUG TO NAVIGATE USERS TO RESPECTIVE EVENTS. THE SLUG SHOULD BE THE X-(EVENT NAME) ACCORDING TO REP'S RPOFILE. ALSO ACTUALLY ADD THE EVENTS IN THE DATABASE.


export const eventsOnline = [
  { name: "Video Editing", time: "Online", participants: 1 },
];

export const eventsDay1 = [
  { name: "Quiz", time: "2:30 PM", participants: 3 },
  { name: "Robotics", time: "2:30 PM", participants: 2 },
  { name: "Sudoku(6-8)", time: "2:30 PM", participants: 2 },
  { name: "Graph Art", time: "2:30 PM", participants: 2 },
  { name: "HTML & CSS", time: "2:30 PM", participants: 2 },
  { name: "Debate", time: "2:15 PM", participants: 2 },
  { name: "FIFA", time: "2:30 PM", participants: 2 },
];

export const eventsDay2 = [
  { name: "Hackathon", time: "9:00 AM", participants: 2 },
  { name: "Competitive Coding", time: "9:00 AM", participants: 2 },
  { name: "Shark Tank", time: "12:15 PM", participants: 2 },
  { name: "Math Relay", time: "12:00 PM", participants: 4 },
  { name: "Debate Finals", time: "12:30 PM", participants: 3 },
  { name: "Game Jam", time: "11:00 AM", participants: 2 },
  { name: "Competitive Maths", time: "2:00 PM", participants: 2 },
  { name: "Data Detectives", time: "2:00 PM", participants: 1 },
];

export const allEvents = [...eventsOnline, ...eventsDay1, ...eventsDay2];

export const getEventBySlug = (slug) => {
  return allEvents.find((e) => e.name.toLowerCase().replace(/[^a-z0-9]/g, "-") === slug);
};