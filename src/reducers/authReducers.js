import { type } from "../types/type";

export const authReducer = (state = {}, action) => {
  switch (action.type) {
    case type.login:
      return {
        uid: action.payload.uid,
        displayName: action.payload.displayName,
      };
    case type.logout:
      return {};

    default:
      return state;
  }
};
