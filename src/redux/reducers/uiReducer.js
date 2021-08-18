import { types } from '../types/types';

const initialState = {
  loading: false,
  msgError: "",
};

/**
 * uiReducer in type.uiSetError is responsible of handle
 * send message error that will be show in Form when user
 * puts their data.
 */

export const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.uiSetError:
      return {
        ...state,
        msgError: action.payload,
      };
    case types.uiUsSetError:
      return {
        ...state,
        msgError: null,
      };
    case types.uiStartLoading:
      return {
        ...state,
        loading: action.payload,
      };
    case types.uiFinishLoading:
      return {
        loading: action.payload,
      };

    default:
      return state;
  }
};
