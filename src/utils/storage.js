// Saves each student's collection in the browser so it's still there next week.
// (localStorage for now. Firebase later so it works across devices.)
const KEY = "board-battle-collections";

export function loadCollection(name) {
  try {
    const all = JSON.parse(localStorage.getItem(KEY)) || {};
    return all[name.toLowerCase()] || [];
  } catch {
    return [];
  }
}

export function saveCollection(name, collection) {
  try {
    const all = JSON.parse(localStorage.getItem(KEY)) || {};
    all[name.toLowerCase()] = collection;
    localStorage.setItem(KEY, JSON.stringify(all));
  } catch {
    // If storage isn't available, the game still works for this session
  }
}
