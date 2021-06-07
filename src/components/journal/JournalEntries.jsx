import React from "react";
import { useSelector } from "react-redux";
import { JournalEntry } from "./JournalEntry";

export const JournalEntries = () => {
  const { notes } = useSelector((state) => state.notes);
  const state = useSelector((state) => state);
  console.log(state);
  console.log(notes);

  return (
    <div className="journal__entries animate__animated animate__bounceIn animate__delay-.3s">
      {notes.map((note) => (
        <JournalEntry key={note.id} {...note} />
      ))}
    </div>
  );
};
