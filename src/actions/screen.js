import { type } from "../types/type";

export const screenResizeAction = (tipe) => ({
  type: type.uiMediaScreen,
  payload: tipe,
});
