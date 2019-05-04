import React from 'react';
import { connect } from 'react-redux';
import * as mutations from '../store/mutations';

const LoginComponent = ({authenticateUser, authenticated}) => {
  return <div className="card p-2 m-2 col-sm-12 col-md-8">
    <h2>
      Welcome to the Questions application!
    </h2>
    <h3>
      Please log in:
    </h3>
    <form onSubmit={authenticateUser}>
      <input 
        type="text" 
        placeholder="username" 
        name="username" 
        defaultValue="Pluralsight"
        className="form-control"
      />
      <input 
        type="password" 
        placeholder="password" 
        name="password" 
        defaultValue=""
        className="form-control mt-2"
      />
      {authenticated === mutations.NOT_AUTHENTICATED ? <p>Login incorrect</p> : null}
      <div>
        <button type="submit" className="form-control mt-2 btn btn-primary">
        {authenticated === mutations.AUTHENTICATING ? 
        <div>
          <span className="spinner-border spinner-border-sm text-info"></span> Logging In...
        </div> :
         "Log In"}
        </button>
      </div>
    </form>
  </div>
};

const mapStateToProps = ({session}) => ({
  authenticated: session.authenticated
});

const mapDispatchToProps = (dispatch) => ({
  // This occurs when we submit the form
  authenticateUser(e) {
    e.preventDefault();
    let username = e.target[`username`].value;
    let password = e.target[`password`].value;
    dispatch(mutations.requestAuthenticateUser(username, password));
  }
});

export const ConnectedLogin = connect(mapStateToProps, mapDispatchToProps)(LoginComponent);