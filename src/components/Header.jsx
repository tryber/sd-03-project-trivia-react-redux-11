import React from 'react';
import logo from '../trivia.png';
import PropTypes from 'prop-types';

function Header({ children }) {
  return (
    <div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      {children}
    </div>
  );
}

Header.propTypes = {
  children: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Header;
