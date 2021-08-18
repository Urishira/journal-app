import { types } from '../types/types';

const initialState = {
  activeResize: false,
};

export const screenReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.uiMediaScreen:
      return { ...state, activeResize: action.payload };

    default:
      return state;
  }
};
