// Checks imported questions before they go into the game.
// AI output (or a typo) could be missing fields, so we never trust it blindly.
export function validateQuestions(text) {
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    return { error: "That isn't valid JSON. Check it was copied fully." };
  }

  if (!Array.isArray(data) || data.length === 0) {
    return { error: "Expected a list of questions, like [ {...}, {...} ]." };
  }

  for (let i = 0; i < data.length; i++) {
    const q = data[i];
    const num = i + 1;
    if (!q || typeof q.question !== "string" || !q.question.trim()) {
      return { error: `Question ${num} is missing its question text.` };
    }
    if (!Array.isArray(q.options) || q.options.length < 2 || q.options.length > 6) {
      return { error: `Question ${num} needs between 2 and 6 options.` };
    }
    if (!q.options.every((o) => typeof o === "string")) {
      return { error: `Question ${num} has an option that isn't text.` };
    }
    if (!q.options.includes(q.answer)) {
      return { error: `Question ${num}'s answer doesn't match any of its options.` };
    }
  }

  return { questions: data };
}
