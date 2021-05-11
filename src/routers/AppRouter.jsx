import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";

import firebase from "firebase/app";
import { AuthRouter } from "./AuthRouter";
import { JournalScreen } from "../components/journal/JournalScreen";
import { useDispatch } from "react-redux";
import { login } from "../actions/login";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";

export const AppRouter = () => {
  const [checking, setChecking] = useState(true);
  const [islogin, setIslogin] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName));
      } else {
        setIslogin(true);
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
            isAuthenticated={islogin}
            component={AuthRouter}
          />

          <PrivateRoutes
            path="/"
            component={JournalScreen}
            isAuthenticated={islogin}
          />

          <Redirect to="/auth/login" />
        </Switch>
      </div>
    </Router>
  );
};
