import { useState } from "react";
import { todos_dapp_backend } from "declarations/todos_dapp_backend";

function App() {
  const [greeting, setGreeting] = useState("");
  const [notes, setNotes] = useState([]);

  async function handleSubmit(event) {
    event.preventDefault();
    const name = event.target.elements.name.value;
    const greeting = await todos_dapp_backend.addNote(name);
    console.log(greeting + " from backend");
    const notes = await todos_dapp_backend.getNotes();
    setNotes(notes);
    return false;
  }

  return (
    <main>
      <img src="/logo2.svg" alt="DFINITY logo" />
      <br />
      <br />
      <form action="#" onSubmit={handleSubmit}>
        <label htmlFor="name">Enter your name: &nbsp;</label>
        <input id="name" alt="Name" type="text" />
        <button type="submit">Click Me!</button>
      </form>
      <section id="greeting">{greeting}</section>
      {notes.map((note, i) => (
        <div key={i}>{note}</div>
      ))}
      <button
        onClick={() => {
          todos_dapp_backend.clearNotes();
          setNotes([]);
        }}
      >
        Remove Notes
      </button>
    </main>
  );
}

export default App;
