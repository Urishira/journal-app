import { type } from "../types/type";

describe("test type of reducer", () => {
  test("should be object equal to any prop itself", () => {
    expect("[Notes] Delete note").toEqual(type.notesDelete);
  });
});
