"use client";

import { useState } from 'react';
import Login from './Login/page.js';
import LoginForm from './LoginForm/page.js';
import './page.module.css';

const App = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);

  const toggleLoginForm = () => {
    setShowLoginForm(true);
  };

  const switchToLogin = () => {
    setShowLoginForm(false); 
  };

  return (
    <div className="app">
      {!showLoginForm ? (
        <>
          <Login />
          <button onClick={toggleLoginForm}>Ver Registro</button>
        </>
      ) : (
        <LoginForm onSwitchToLogin={switchToLogin} />
      )}
    </div>
  );
};

export default App;
