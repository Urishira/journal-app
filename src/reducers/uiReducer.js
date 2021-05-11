import { type } from "../types/type";

const initialState = {
  loading: false,
  msgError: "",
};

/**
 * uiReducer in type.uiSetError is responsible of handle
 * send message error that will be show in Form when user
 * puts their data
 */

export const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.uiSetError:
      return {
        ...state,
        msgError: action.payload,
      };
    case type.uiUsSetError:
      return {
        ...state,
        msgError: null,
      };
    case type.uiStartLoading:
      return {
        ...state,
        loading: action.payload,
      };
    case type.uiFinishLoading:
      return {
        loading: action.payload,
      };

    default:
      return state;
  }
};
