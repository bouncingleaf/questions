import React from 'react';
import { Provider } from 'react-redux';
import { Redirect } from 'react-router';
import { Route, Router } from 'react-router-dom';
import { history } from '../store/history';
import { store } from '../store';
import { ConnectedDashboard } from './Dashboard';
import { ConnectedNavigation } from './Navigation';
import { ConnectedTaskDetail } from './TaskDetail';

const RouteGuard = Component => ({match}) => {
  console.info("Route guard", match);
  if (!store.getState().session.authenticated) {
    return <Component match={match}/>;
    // return <Redirect to="/"/>;
  } else {
    return <Component match={match}/>;
  }
}

export const Main = () => (
  <Router history={history}>
    <Provider store={store}>
      <div>
        <ConnectedNavigation />
        {/* <ConnectedDashboard /> */}
        <Route
          exact
          path="/dashboard"
          render={RouteGuard(ConnectedDashboard)}
        />
        <Route
          exact
          path="/task/:id"
          render={RouteGuard(ConnectedTaskDetail)}
        />
      </div>
    </Provider>
  </Router>
)