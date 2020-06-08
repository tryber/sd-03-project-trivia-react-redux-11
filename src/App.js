import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import logo from './trivia.png';
import './App.css';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Footer from './components/Footer';

export default function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/settings">
            <Settings />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}
