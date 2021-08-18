/* body:"", date:Date title */
import Swal from 'sweetalert2';

import { dbRef } from '../../helpers/notes/dbRef';
import { getNotes } from '../../helpers/notes/getNotes';
import { uploadFile } from '../../helpers/notes/uploadFile';
import { types } from '../types/types';

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
    dispatch(addNewNote(dataRef.id, newNote));
  };
};

export const activeNote = (id, note) => ({
  type: types.notesActive,
  payload: {
    id,
    ...note,
  },
});

export const addNewNote = (id, note) => ({
  type: types.notesAddNew,
  payload: { id, ...note },
});

// code optimiced to get data notes
export const startloadingNotes = (uid) => {
  return async (dispatch) => {
    const notes = await getNotes(uid);
    console.log(notes);
    dispatch(loadNotes(notes));
  };
};

export const loadNotes = (note) => ({
  type: types.notesLoad,
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
  type: types.notesUpdated,
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

export const noteDeleting = (id) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    Swal.fire({
      title: "Wait for deleting...",
      willOpen: () => Swal.showLoading(),
    });
    await dbRef(uid)
      .doc(id)
      .delete()
      .then(() => {
        Swal.fire({ title: "Done", willClose: Swal.hideLoading() });
        dispatch(noteDelete(id));
      });
  };
};

export const noteDelete = (id) => ({
  type: types.notesDelete,
  payload: id,
});

export const noteCleaningtoLogout = () => ({
  type: types.notesLogoutCleaning,
});

export const deleteImage = (id) => ({
  type: types.nodeDeleteImage,
  payload: id,
});
