import { db } from "../../firebase/firebaseConfig";

//Conect to firebase and get data storage
export const getNotes = async (uid) => {
  const notes = [];
  const snapShoth = await db.collection(`${uid}/journal/notes`).get();
  snapShoth.forEach((snapSon) => {
    notes.push({ id: snapSon.id, ...snapSon.data() });
  });
  return notes;
};
