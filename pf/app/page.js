"use client";

import { useContext, useState } from 'react';
import Login from './Login/page.js';
import LoginForm from './LoginForm/page.js';
import PerfilMedico from './PerfilMedico/page.js';
import Perfil from './Perfil/page.js';
import { UserContext, UserProvider } from './components/UserContext/index.js';
import styles from './page.module.css';
import Link from 'next/link.js';
import Header from './components/Header/index.js';
import Home from './Home/page.js'

const App = ({}) => {
  const { user } = useContext(UserContext);
  const [showLoginForm, setShowLoginForm] = useState(false);

  const toggleLoginForm = () => {
    setShowLoginForm(true);
  };

  const switchToLogin = () => {
    setShowLoginForm(false); 
  };

  return (
    <div className="app">
      {user ? 
        <nav className={styles.nav}>
          <div className={styles["nav-links"]}>
            <Header />
            <Home />
          </div>
        </nav>
        :
        !showLoginForm ? (
          <>
              <Header />
             
            <Login />
            <button onClick={toggleLoginForm}>Registrarse</button>
          </>
        ) : (
          <LoginForm onSwitchToLogin={switchToLogin} />
        )
      }
    </div>

  );
};

export default App;
