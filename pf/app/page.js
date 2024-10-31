"use client"

import { useState, useEffect } from 'react';
import Login from './Login/page.js';
import './page.module.css';
import LoginForm from './LoginForm/page.js';

const App = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);

  const toggleLoginForm = () => {
    setShowLoginForm((prev) => !prev);
  };

  return (
    <div className="app">
      {!showLoginForm ? (
        <>
          <Login />
          <button onClick={toggleLoginForm}>Ver Registro</button>
        </>
      ) : (
        <LoginForm />
      )}
    </div>
  );
};

export default App;
