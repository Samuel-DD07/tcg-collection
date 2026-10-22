import { useState } from "react";
import Panel from "./Panel.jsx";

function CardNotes({ card }) {
  const [note, setNote] = useState("");

  return (
    <Panel title={`Notes : ${card.name}`}>
      <div className="details">
        <textarea aria-label="Note" value={note} onChange={(event) => setNote(event.target.value)} />
        <p className="hint">{note.length} caractère(s), non enregistré.</p>
      </div>
    </Panel>
  );
}

export default CardNotes;
