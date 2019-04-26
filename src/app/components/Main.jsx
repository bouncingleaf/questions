import React from 'react';
import { Provider } from 'react-redux';
import { Route, Router } from 'react-router-dom';

import { history } from '../store/history';
import { store } from '../store';
import { ConnectedDashboard } from './Dashboard';
import { ConnectedNavigation } from './Navigation';

export const Main = () => (
  <Router history={history}>
    <Provider store={store}>
      <div>
        <ConnectedNavigation />
        {/* <ConnectedDashboard /> */}
        <Route
          exact
          path="/dashboard"
          render={ ()=>(<ConnectedDashboard/>)}
        />
      </div>
    </Provider>
  </Router>
)