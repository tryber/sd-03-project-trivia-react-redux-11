import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import logo from '../trivia.png';

function Header({ children }) {
  return (
    <div>
      <header className="App-header">
        <Link to="/">
          <img src={logo} className="App-logo" alt="logo" />
        </Link>
      </header>
      {children}
    </div>
  );
}

Header.propTypes = {
  children: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default Header;
