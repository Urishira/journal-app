import { type } from "../types/type";

export const setErrorAction = (err) => ({
  type: type.uiSetError,
  payload: err,
});

export const removeError = () => ({
  type: type.uiUsSetError,
});

export const startLoading = () => ({
  type: type.uiStartLoading,
  payload: true,
});

export const finishLoading = () => ({
  type: type.uiFinishLoading,
  payload: false,
});
