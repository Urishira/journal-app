import React from "react";
import { Sidebar } from "./Sidebar";
import { NoteScreen } from "../notes/NoteScreen";
import { useSelector } from "react-redux";
import { NothingSelected } from "./NothingSelected";

export const JournalScreen = () => {
  const { active } = useSelector(({ notes }) => notes);
  return (
    <div className="journal__main-content animate__animated animate__bounceIn animate__delay-.3s">
      <Sidebar />

      <main>{active ? <NoteScreen /> : <NothingSelected />}</main>
    </div>
  );
};
