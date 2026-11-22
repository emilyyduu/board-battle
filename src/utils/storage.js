// Saves all classes (students, tallies, collections, questions) in the browser.
// Everything is played on one classroom board, so one device is enough for now.
// Next step: move this to a database like Supabase so it works across devices.
const KEY = "board-battle-classes";

export function loadClasses() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
}

export function saveClasses(classes) {
  try {
    localStorage.setItem(KEY, JSON.stringify(classes));
  } catch {
    // If storage isn't available, the game still works for this session
  }
}

export function makeId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}
