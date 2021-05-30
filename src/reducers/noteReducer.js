import { type } from "../types/type";

const initialState = {
  notes: [],
  active: null,
};

export const noteReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.notesActive:
      return {
        ...state,
        active: {
          ...action.payload,
        },
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
    default:
      return state;
  }
};
