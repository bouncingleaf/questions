import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React from 'react';

const Navigation = () => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item active">
          <Link to="/dashboard" className="nav-link">Home</Link>
        </li>
        <li className="nav-item">
        <Link to="/add" className="nav-link">Add Question</Link>
        </li>
        <li className="nav-item">
        <Link to="/about" className="nav-link">About</Link>
        </li>
      </ul>
    </div>
  </nav>
)

export const ConnectedNavigation = connect(state => state) (Navigation);