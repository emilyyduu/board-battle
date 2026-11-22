import { useState } from "react";
import avatars from "../data/avatars";

function AddStudentForm({ onAdd }) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState(avatars[0]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return;
    onAdd(name.trim(), avatar);
    setName("");
  }

  return (
    <form className="add-student" onSubmit={handleSubmit}>
      <h3>Add a student</h3>
      <input placeholder="Student name" value={name} onChange={(e) => setName(e.target.value)} />
      <p>Pick your character:</p>
      <div className="avatar-grid">
        {avatars.map((a) => (
          <button
            type="button"
            key={a}
            className={`avatar-option ${a === avatar ? "selected" : ""}`}
            onClick={() => setAvatar(a)}
          >
            {a}
          </button>
        ))}
      </div>
      <button className="primary-button" type="submit" disabled={!name.trim()}>
        Add {avatar} {name}
      </button>
    </form>
  );
}

export default AddStudentForm;
