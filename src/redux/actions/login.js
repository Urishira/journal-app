import Swal from 'sweetalert2';

import {
  firebase,
  googleAuthLogin,
} from '../../api/firebase/firebaseConfig';
import { types } from '../types/types';
import { noteCleaningtoLogout } from './notes';
import {
  finishLoading,
  startLoading,
} from './ui';

export const loginWithFirebase = (email, password) => {
  return (dispatch) => {
    dispatch(startLoading());
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName));
        dispatch(finishLoading());
      })
      .catch((err) => {
        Swal.fire("Error", err.message, "error");
        dispatch(finishLoading());
        throw err;
      });
  };
};

export const startRegisterWithPasswordName = (email, password, name) => {
  return (dispatch) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async ({ user }) => {
        await user.updateProfile({ displayName: name });
        dispatch(login(user.uid, user.displayName));
      });
  };
};

export const loginWithGoogle = () => {
  return (dispatch) => {
    firebase
      .auth()
      .signInWithPopup(googleAuthLogin)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName));
      });
  };
};

//Login always call to do dispatch to the reducer
export const login = (uid, displayName) => ({
  type: types.login,
  payload: {
    uid,
    displayName,
  },
});

//Action to logout

export const userLogoutFirebase = () => {
  return async (dispatch) => {
    await firebase.auth().signOut();
    dispatch(logout());
    dispatch(noteCleaningtoLogout());
  };
};

const logout = () => ({
  type: types.logout,
});
