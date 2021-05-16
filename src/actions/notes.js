/* body:"", date:Date title */

import { dbRef } from "../helpers/notes/dbRef";
import { getNotes } from "../helpers/notes/getNotes";
import { type } from "../types/type";

//build new note when the user push btn New Entry
export const startNewNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const newNote = {
      title: "",
      body: "",
      date: new Date().getTime(),
    };
    await dbRef(uid).add(newNote);
    dispatch(activeNote(dbRef.id, newNote));
  };
};

export const activeNote = (id, note) => ({
  type: type.notesActive,
  payload: {
    id,
    ...note,
  },
});

// code optimiced to get data notes
export const startloadingNotes = (uid) => {
  return async (dispatch) => {
    const notes = await getNotes(uid);
    dispatch(loadNotes(notes));
  };
};

export const loadNotes = (note) => ({
  type: type.notesLoad,
  payload: note,
});

export const startNotesUpdated = (id, body, title) => {
  return (dispatch, getState) => {
    const { uid } = getState().auth;
    dbRef(uid)
      .doc(id)
      .update({
        body: body,
        title: title,
      })
      .then(() => {
        console.log(id, " Update Done");
      });
  };
};
