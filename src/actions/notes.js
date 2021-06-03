/* body:"", date:Date title */

import Swal from "sweetalert2";
import { db } from "../firebase/firebaseConfig";
import { dbRef } from "../helpers/notes/dbRef";
import { getNotes } from "../helpers/notes/getNotes";
import { uploadFile } from "../helpers/notes/uploadFile";
import { type } from "../types/type";

//build new note when the user touch btn New Entry
export const startNewNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const newNote = {
      title: "",
      body: "",
      date: new Date().getTime(),
    };
    const dataRef = await dbRef(uid).add(newNote);
    dispatch(activeNote(dataRef.id, newNote));
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

export const startNotesUpdated = (note) => {
  return (dispatch, getState) => {
    const noteSave = { ...note };
    delete noteSave.id;
    if (!noteSave.url) delete noteSave.url;

    try {
      const { uid } = getState().auth;
      dbRef(uid).doc(note.id).update(noteSave);

      Swal.fire({ title: "Save Done", icon: "success" });

      dispatch(updateNotes(note.id, noteSave));
    } catch (error) {
      throw error;
    }
  };
};

const updateNotes = (id, note) => ({
  type: type.notesUpdated,
  payload: {
    id,
    note: {
      id,
      ...note,
    },
  },
});

export const startUploading = (file) => {
  return async (dispatch, getState) => {
    const { active } = getState().notes;
    Swal.fire({
      title: "Uploading",
      text: "please wait...",
      allowOutsideClick: false,
      willOpen: () => Swal.showLoading(),
    });
    const fileUrl = await uploadFile(file);
    active.url = fileUrl;
    Swal.close();

    dispatch(startNotesUpdated(active));
  };
};
