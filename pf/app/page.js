"use client";

import React, { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import { UserContext } from "./components/UserContext/UserContext";
import Footer from './Components/Footer';

export default function LoginForm() {
  const [activeTab, setActiveTab] = useState('login');
  const { setUser } = useContext(UserContext);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isDoctor, setIsDoctor] = useState(false); // Estado para saber si el usuario es médico

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setErrorMessage(''); // Reset error message on tab change
  };

  const handleSubmitLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage('');
  
    const dni = event.target.loginEmail.value; // Cambia esto a DNI
    const password = event.target.loginPassword.value;
  
    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ DNI: dni, contrasena: password }), // Cambia a DNI y contrasena
      });
  
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('user', JSON.stringify(data.patient));
        setUser(data.patient);
        router.push('/Home');
      } else {
        setErrorMessage(data.message || 'Credenciales inválidas');
      }
    } catch (error) {
      console.error('Error en el login:', error);
      setErrorMessage('Error en el login. Inténtalo nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitRegister = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage('');

    const name = event.target.registerName.value.trim();
    const lastname = event.target.registerLastname.value.trim();
    const email = event.target.registerEmail.value.trim();
    const dni = event.target.registerDNI.value.trim();
    const password = event.target.registerPassword.value;
    const telefono = event.target.registerTelefono.value.trim();
    const foto = event.target.registerFoto.value.trim();
    const obraSocial = !isDoctor ? event.target.registerObraSocial.value.trim() : null;

    if (!name || !lastname || !email || !dni || !password || !telefono || !foto || (!isDoctor && !obraSocial)) {
        setErrorMessage('Todos los campos son obligatorios');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/api/user/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre: name, apellido: lastname, DNI: dni, gmail: email, obra_social: obraSocial, contrasena: password, telefono }),
        });

        const data = await response.json();
        if (response.ok) {
            alert('Usuario registrado con éxito');
            setActiveTab('login');
        } else {
            setErrorMessage(data.message || 'Error al registrar usuario');
        }
    } catch (error) {
        console.error('Error en el registro:', error);
        setErrorMessage('Error en el registro. Inténtalo nuevamente.');
    } finally {
        setLoading(false);
    }
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
      <Footer />
    </div>
  );
}
