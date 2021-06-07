import { type } from "../types/type";

const initialState = {
  activeResize: false,
};

export const screenReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.uiMediaScreen:
      return { ...state, activeResize: action.payload };

    default:
      return state;
  }
};
