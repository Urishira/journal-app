import { googleAuthLogin, firebase } from "../firebase/firebaseConfig";
import { type } from "../types/type";
import { finishLoading, startLoading } from "./ui";

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
  type: type.login,
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
  };
};

const logout = () => ({
  type: type.logout,
});
