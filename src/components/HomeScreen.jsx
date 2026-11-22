import { useState } from "react";

function HomeScreen({ classes, onCreateClass, onOpenClass }) {
  const [name, setName] = useState("");

  function handleCreate(e) {
    e.preventDefault();
    if (!name.trim()) return;
    onCreateClass(name.trim());
    setName("");
  }

  return (
    <div className="app">
      <h1>⚔️ Board Battle</h1>
      <h2>Your classes</h2>
      <div className="class-list">
        {classes.length === 0 && <p className="hint">No classes yet. Make your first one below!</p>}
        {classes.map((c) => (
          <button key={c.id} className="class-button" onClick={() => onOpenClass(c.id)}>
            <strong>{c.name}</strong>
            <span>{c.students.length} students</span>
          </button>
        ))}
      </div>
      <form className="inline-form" onSubmit={handleCreate}>
        <input placeholder="New class name, e.g. Saturday Year 5" value={name} onChange={(e) => setName(e.target.value)} />
        <button className="primary-button" type="submit" disabled={!name.trim()}>
          Add class
        </button>
      </form>
    </div>
  );
}

export default HomeScreen;
