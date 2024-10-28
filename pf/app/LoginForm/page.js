"use client";

import React, { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import { UserContext } from "../components/UserContext";


export default function LoginForm(gmail, contrasena) {
  const [activeTab, setActiveTab] = useState('login');
  const { setUser } = useContext(UserContext);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isDoctor, setIsDoctor] = useState(false); 

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setErrorMessage(''); 
  };

  const handleSubmitLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage('');
  
    const dni = event.target.loginEmail.value.trim(); 
    const password = event.target.loginPassword.value;
  
    const API_URL = 'http://localhost:3000/api/user';
    const response = await fetch(`${API_URL}/login`, { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ DNI: dni, contrasena: password }), 
    });    
  
    const data = await response.json();
console.log('Response data:', data); // Log de la respuesta del servidor

if (!response.ok) {
  setErrorMessage(data.message || 'Error en el login');
} else {
  setUser(data.patient);
}
  
    setLoading(false);
  };







  

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <ul className={styles.navPills} role="tablist">
          <li className={styles.navItem} role="presentation">
            <a className={`${styles.navLink} ${activeTab === 'login' ? styles.navLinkActive : ''}`} href='#' onClick={() => handleTabChange('login')}>Login</a>
          </li>
          <li className={styles.navItem} role="presentation">
            <a className={`${styles.navLink} ${activeTab === 'register' ? styles.navLinkActive : ''}`} href='#' onClick={() => handleTabChange('register')}>Register</a>
          </li>
        </ul>

        <div className={styles.tabContent}>
          {activeTab === 'login' && (
            <form onSubmit={handleSubmitLogin} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="loginEmail">Email or username</label>
                <input type="email" id="loginEmail" required />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="loginPassword">Password</label>
                <input type="password" id="loginPassword" required />
              </div>
              {errorMessage && <div className={styles.error}>{errorMessage}</div>}
              <button type="submit" className={styles.btnPrimary} disabled={loading}>
                {loading ? 'Loading...' : 'Sign in'}
              </button>
            </form>
          )}

          {activeTab === 'register' && (
            <form onSubmit={handleSubmitRegister} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="registerName">Name</label>
                <input type="text" id="registerName" required />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="registerLastname">Lastname</label>
                <input type="text" id="registerLastname" required />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="registerEmail">Email</label>
                <input type="email" id="registerEmail" required />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="registerDNI">DNI</label>
                <input type="text" id="registerDNI" required />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="registerPassword">Password</label>
                <input type="password" id="registerPassword" required />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="registerTelefono">Teléfono</label>
                <input type="text" id="registerTelefono" required />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="registerFoto">Foto</label>
                <input type="text" id="registerFoto" required />
              </div>
              <div className={styles.formGroup}>
                <label>
                  ¿Sos médico?
                  <input
                    type="checkbox"
                    checked={isDoctor}
                    onChange={() => setIsDoctor(!isDoctor)}
                  />
                </label>
              </div>
              {!isDoctor && (
                <div className={styles.formGroup}>
                  <label htmlFor="registerObraSocial">Obra Social</label>
                  <input type="text" id="registerObraSocial" required />
                </div>
              )}
              {errorMessage && <div className={styles.error}>{errorMessage}</div>}
              <button type="submit" className={styles.btnPrimary} disabled={loading}>
                {loading ? 'Loading...' : 'Sign up'}
              </button>
            </form>
          )}
        </div>
      </div>
    
    </div>
  );
}
