import { types } from '../types/types';

export const screenResizeAction = (tipe) => ({
  type: types.uiMediaScreen,
  payload: tipe,
});
