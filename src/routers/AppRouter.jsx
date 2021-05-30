import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";

import firebase from "firebase/app";
import { AuthRouter } from "./AuthRouter";
import { JournalScreen } from "../components/journal/JournalScreen";
import { useDispatch } from "react-redux";
import { login } from "../actions/login";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";

import { startloadingNotes } from "../actions/notes";

export const AppRouter = () => {
  const [checking, setChecking] = useState(true);
  const [isloged, setIsloged] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    
    firebase.auth().onAuthStateChanged((user) => {
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName));
        dispatch(startloadingNotes(user.uid));

        setIsloged(true);
      } else {
        setIsloged(false);
      }
      setChecking(false);
    });
  }, [dispatch, setChecking]);

  if (checking) {
    return <h1>Loading...</h1>;
  }

  return (
    <Router>
      <div>
        <Switch>
          <PublicRoutes
            path="/auth"
            isAuthenticated={isloged}
            component={AuthRouter}
          />

          <PrivateRoutes
            path="/"
            component={JournalScreen}
            isAuthenticated={isloged}
          />

          <Redirect to="/auth/login" />
        </Switch>
      </div>
    </Router>
  );
};
