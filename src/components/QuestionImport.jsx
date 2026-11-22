import { useState } from "react";
import { validateQuestions } from "../utils/validateQuestions";

function QuestionImport({ questionCount, onImport }) {
  const [text, setText] = useState("");
  const [message, setMessage] = useState(null); // { type: "error" | "success", text }

  function importText(raw) {
    const result = validateQuestions(raw);
    if (result.error) {
      setMessage({ type: "error", text: result.error });
      return;
    }
    onImport(result.questions);
    setMessage({ type: "success", text: `Imported ${result.questions.length} questions!` });
    setText("");
  }

  async function handleFile(e) {
    const file = e.target.files[0];
    if (file) importText(await file.text());
    e.target.value = "";
  }

  return (
    <div className="question-import">
      <h3>This week's questions</h3>
      <p className="hint">
        {questionCount > 0 ? `${questionCount} questions loaded.` : "Using sample questions until you import some."}
      </p>
      <textarea
        placeholder='Paste the JSON from Claude here, e.g. [{ "question": "...", "options": [...], "answer": "..." }]'
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={5}
      />
      <div className="import-actions">
        <button className="primary-button" onClick={() => importText(text)} disabled={!text.trim()}>
          Import pasted questions
        </button>
        <label className="file-label">
          or upload a .json file
          <input type="file" accept=".json,application/json" onChange={handleFile} />
        </label>
      </div>
      {message && <p className={`message ${message.type}`}>{message.text}</p>}
    </div>
  );
}

export default QuestionImport;
