import { type } from "../types/type";

const initialState = {
  notes: [],
  active: null,
};

export const noteReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.notesActive:
      console.log(action.payload);
      return {
        ...state,
        active: {
          ...action.payload,
        },
      };

    case type.notesAddNew:
      return {
        ...state,
        notes: [action.payload, ...state.notes],
      };
    case type.notesLoad:
      return { ...state, notes: [...action.payload] };

    case type.notesUpdated:
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === action.payload.id ? action.payload.note : note
        ),
      };

    case type.notesDelete:
      console.log(action.payload);
      return {
        ...state,
        active: null,
        notes: state.notes.filter((notes) => notes.id !== action.payload),
      };
    case type.notesLogoutCleaning:
      return {
        ...state,
        notes: [],
        active: null,
      };

    default:
      return state;
  }
};
