import React, {
  useEffect,
  useState,
} from 'react';

import firebase from 'firebase/app';
import { useDispatch } from 'react-redux';
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
} from 'react-router-dom';

import { JournalScreen } from '../components/journal/JournalScreen';
import { login } from '../redux/actions/login';
import { startloadingNotes } from '../redux/actions/notes';
import { AuthRouter } from './AuthRouter';
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';

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
