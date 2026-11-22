import { useState } from "react";
import { loadClasses, saveClasses, makeId } from "./utils/storage";
import HomeScreen from "./components/HomeScreen";
import ClassScreen from "./components/ClassScreen";
import Battle from "./components/Battle";
import "./App.css";

function App() {
  const [classes, setClasses] = useState(loadClasses);
  const [classId, setClassId] = useState(null); // which class is open
  const [battleIds, setBattleIds] = useState(null); // the 2 students currently battling

  const currentClass = classes.find((c) => c.id === classId);

  // Every change goes through here, so it's always saved
  function updateClasses(newClasses) {
    setClasses(newClasses);
    saveClasses(newClasses);
  }

  function createClass(name) {
    updateClasses([...classes, { id: makeId(), name, students: [], questions: [] }]);
  }

  function updateClass(updated) {
    updateClasses(classes.map((c) => (c.id === updated.id ? updated : c)));
  }

  if (currentClass && battleIds) {
    return (
      <Battle
        classData={currentClass}
        playerIds={battleIds}
        onUpdateClass={updateClass}
        onExit={() => setBattleIds(null)}
      />
    );
  }

  if (currentClass) {
    return (
      <ClassScreen
        classData={currentClass}
        onUpdateClass={updateClass}
        onBack={() => setClassId(null)}
        onStartBattle={setBattleIds}
      />
    );
  }

  return <HomeScreen classes={classes} onCreateClass={createClass} onOpenClass={setClassId} />;
}

export default App;
