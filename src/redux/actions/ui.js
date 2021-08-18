import { types } from '../types/types';

export const setErrorAction = (err) => ({
  type: types.uiSetError,
  payload: err,
});

export const removeError = () => ({
  type: types.uiUsSetError,
});

export const startLoading = () => ({
  type: types.uiStartLoading,
  payload: true,
});

export const finishLoading = () => ({
  type: types.uiFinishLoading,
  payload: false,
});
