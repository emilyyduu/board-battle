import { useState } from "react";
import { makeId } from "../utils/storage";
import AddStudentForm from "./AddStudentForm";
import QuestionImport from "./QuestionImport";
import Leaderboard from "./Leaderboard";

function ClassScreen({ classData, onUpdateClass, onBack, onStartBattle }) {
  const [selected, setSelected] = useState([]); // ids of the 2 students going up to the board

  function addStudent(name, avatar) {
    const student = { id: makeId(), name, avatar, wins: 0, collection: [] };
    onUpdateClass({ ...classData, students: [...classData.students, student] });
  }

  function removeStudent(id) {
    onUpdateClass({ ...classData, students: classData.students.filter((s) => s.id !== id) });
    setSelected(selected.filter((s) => s !== id));
  }

  function toggleSelect(id) {
    if (selected.includes(id)) setSelected(selected.filter((s) => s !== id));
    else if (selected.length < 2) setSelected([...selected, id]);
  }

  return (
    <div className="app">
      <button className="link-button" onClick={onBack}>
        ← All classes
      </button>
      <h1>{classData.name}</h1>

      <h2>Who's coming up to the board?</h2>
      <div className="student-grid">
        {classData.students.map((s) => (
          <div key={s.id} className={`student-card ${selected.includes(s.id) ? "selected" : ""}`}>
            <button className="student-select" onClick={() => toggleSelect(s.id)}>
              <span className="student-avatar">{s.avatar}</span>
              <span>{s.name}</span>
            </button>
            <button className="remove-button" onClick={() => removeStudent(s.id)} aria-label={`Remove ${s.name}`}>
              ✕
            </button>
          </div>
        ))}
      </div>
      <button className="next-button" disabled={selected.length !== 2} onClick={() => onStartBattle(selected)}>
        {selected.length === 2 ? "Start battle ⚔️" : `Pick ${2 - selected.length} more`}
      </button>

      <div className="class-panels">
        <Leaderboard students={classData.students} />
        <AddStudentForm onAdd={addStudent} />
      </div>
      <QuestionImport
        questionCount={classData.questions.length}
        onImport={(questions) => onUpdateClass({ ...classData, questions })}
      />
    </div>
  );
}

export default ClassScreen;
