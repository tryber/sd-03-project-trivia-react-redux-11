import React from 'react';
import logo from '../trivia.png';

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

export default Header;
