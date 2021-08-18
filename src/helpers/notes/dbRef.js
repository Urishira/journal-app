import { db } from '../../api/firebase/firebaseConfig';

export const dbRef = (uid) => {
  return db.collection(`${uid}/journal/notes`);
};
