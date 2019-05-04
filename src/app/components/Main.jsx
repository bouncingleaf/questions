import React from 'react';
import { Provider } from 'react-redux';
import { Redirect } from 'react-router';
import { Route, Router } from 'react-router-dom';
import { history } from '../store/history';
import { store } from '../store';
import { About } from './About';
import { ConnectedDashboard } from './Dashboard';
import { ConnectedLogin } from './Login';
import { ConnectedNavigation } from './Navigation';
import { ConnectedEditQuestion } from './EditQuestion';
import { ConnectedDeleteQuestion } from './DeleteQuestion';

const RouteGuard = Component => ({match}) =>
  !store.getState().session.authenticated ?
  <Redirect to="/"/> :
  <Component match={match}/>;

export const Main = () => (
  <Router history={history}>
    <Provider store={store}>
      <div>
        <ConnectedNavigation />
        <Route
          exact
          path="/"
          component={ConnectedLogin}
        />
        <Route
          exact
          path="/dashboard"
          render={RouteGuard(ConnectedDashboard)}
        />
        <Route
          exact
          path="/question/:id"
          render={RouteGuard(ConnectedEditQuestion)}
        />
        <Route
          exact
          path="/delete/:id"
          render={RouteGuard(ConnectedDeleteQuestion)}
        />
        <Route
          exact
          path="/about"
          render={RouteGuard(About)}
        />
      </div>
    </Provider>
  </Router>
)