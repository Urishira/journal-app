import 'animate.css';

import React from 'react';

import { Provider } from 'react-redux';

import { store } from './redux/store/index';
import { AppRouter } from './routers/AppRouter';

export const JournalApp = () => {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
};
