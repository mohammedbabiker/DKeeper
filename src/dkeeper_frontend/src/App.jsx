import { dkeeper_backend } from "declarations/dkeeper_backend";
import { useState, useEffect } from "react";

import Header from "./Header";
import CreateArea from "./CreateArea";
import Note from "./Note";
import Footer from "./Footer";

function App() {
  const [notes, setNotes] = useState([]);

  function addNote(newNote) {
    setNotes((prevNotes) => {
      // .note, .content are defind in dkeeper_backend
      dkeeper_backend.createNote(newNote.title, newNote.content);
      return [newNote, ...prevNotes]; // order important when creating new notes
    });
  }

  async function fetchData() {
    const notesArray = await dkeeper_backend.getNotes();
    setNotes(notesArray);
  }

  useEffect(() => {
    console.log("useEffect");
    // fetchDate has to be async & inside useEffect we can't use async directly
    fetchData();
  }, []); // [] is used to run useEffect only once

  function deleteNote(id) {
    // remove note from backend
    dkeeper_backend.deleteNote(id);

    setNotes((prevNotes) => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  return (
    <main>
      <div>
        <Header />
        <CreateArea onAdd={addNote} />
        {notes.map((noteItem, index) => {
          return (
            <Note
              key={index}
              id={index}
              title={noteItem.title}
              content={noteItem.content}
              onDelete={deleteNote}
            />
          );
        })}
        <Footer />
      </div>
    </main>
  );
}

export default App;
