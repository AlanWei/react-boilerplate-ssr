import React from 'react';
import logo from '../../assets/logo.svg';
import './style.scss';

const User = () => (
  <div className="user">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">Welcome to React</h1>
    </header>
    <p className="App-intro">
      To get started, edit <code>src/views/user/index.js</code> and save to reload.
    </p>
  </div>
);

export default User;
