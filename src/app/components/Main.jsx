import React from 'react';
import { Provider } from 'react-redux';
import { Redirect } from 'react-router';
import { Route, Router } from 'react-router-dom';
import { history } from '../store/history';
import { store } from '../store';
import { About } from './About';
import { ConnectedAddQuestion } from './AddQuestion';
import { ConnectedDashboard } from './Dashboard';
import { ConnectedEditQuestion } from './EditQuestion';
import { ConnectedLogin } from './Login';
import { ConnectedNavigation } from './Navigation';
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
          path="/about"
          render={RouteGuard(About)}
        />
        <Route
          exact
          path="/add"
          render={RouteGuard(ConnectedAddQuestion)}
        />
        <Route
          exact
          path="/dashboard"
          render={RouteGuard(ConnectedDashboard)}
        />
        <Route
          exact
          path="/confirmDelete/:id"
          render={RouteGuard(ConnectedDeleteQuestion)}
        />
        <Route
          exact
          path="/edit/:id"
          render={RouteGuard(ConnectedEditQuestion)}
        />
      </div>
    </Provider>
  </Router>
)