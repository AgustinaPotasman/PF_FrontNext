"use client";

import React, { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import { UserContext } from "./components/UserContext/UserContext";

export default function LoginForm() {
  const [activeTab, setActiveTab] = useState('login');
  const [isDoctor, setIsDoctor] = useState(false);  // Nuevo estado para el switch
  const { setUser } = useContext(UserContext);
  const router = useRouter();

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleSubmitLogin = async (event) => {
    event.preventDefault();
    const email = event.target.loginEmail.value;
    const password = event.target.loginPassword.value;

    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
        router.push('/Home');
      } else {
        alert('Credenciales inválidas');
      }
    } catch (error) {
      console.error('Error en el login:', error);
    }
  };

  const handleSubmitRegister = async (event) => {
    event.preventDefault();
    const name = event.target.registerName.value.trim();
    const lastname = event.target.registerLastname.value.trim();
    const email = event.target.registerEmail.value.trim();
    const dni = event.target.registerDNI.value.trim();
    const password = event.target.registerPassword.value;
    const telefono = event.target.registerTelefono.value.trim();
    const foto = event.target.registerFoto.value.trim();
    const obraSocial = isDoctor ? null : event.target.registerObraSocial?.value.trim();


    if (!name || !lastname || !email || !dni || !password || !telefono || !foto || (!isDoctor && !obraSocial)) {
      alert('Todos los campos son obligatorios');
      return;
    }


    try {
      const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, lastname, email, dni, password, telefono, foto, obraSocial, isDoctor }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Usuario registrado con éxito');
        setActiveTab('login');
      } else {
        alert(data.error || 'Error al registrar usuario');
      }
    } catch (error) {
      console.error('Error en el registro:', error);
      alert('Error en el registro. Inténtalo nuevamente.');
    }
  };

  return (
    <>
      <div className={styles.body}>
        <div className={styles.container}>
          <ul className={styles.navPills} role="tablist">
            <li className={styles.navItem} role="presentation">
              <a
                className={`${styles.navLink} ${activeTab === 'login' ? styles.navLinkActive : ''}`}
                href='#'
                role="tab"
                aria-selected={activeTab === 'login'}
                onClick={() => handleTabChange('login')}
              >
                Login
              </a>
            </li>
            <li className={styles.navItem} role="presentation">
              <a
                className={`${styles.navLink} ${activeTab === 'register' ? styles.navLinkActive : ''}`}
                href='#'
                role="tab"
                aria-selected={activeTab === 'register'}
                onClick={() => handleTabChange('register')}
              >
                Register
              </a>
            </li>
          </ul>

          <div className={styles.tabContent}>
            {activeTab === 'login' && (
              <form onSubmit={handleSubmitLogin} className={styles.form}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="loginEmail">Email or username</label>
                  <input type="email" id="loginEmail" className={styles.formControl} required />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="loginPassword">Password</label>
                  <input type="password" id="loginPassword" className={styles.formControl} required />
                </div>
                <button type="submit" className={styles.btnPrimary}>Sign in</button>
              </form>
            )}

            {activeTab === 'register' && (
              <form onSubmit={handleSubmitRegister} className={styles.form}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>¿Sos médico?</label>
                  <label className={styles.switch}>
                    <input
                      type="checkbox"
                      checked={isDoctor}
                      onChange={() => setIsDoctor(!isDoctor)}
                    />
                    <span className={styles.slider}></span>
                  </label>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="registerName">Nombre</label>
                  <input type="text" id="registerName" className={styles.formControl} required />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="registerLastname">Apellido</label>
                  <input type="text" id="registerLastname" className={styles.formControl} required />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="registerEmail">Email</label>
                  <input type="email" id="registerEmail" className={styles.formControl} required />
                </div>
                {isDoctor && (
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel} htmlFor='registerArea'>Area</label>
                    <input type="text" id="registerDNI" className={styles.formControl} required />
                  </div>
                )
                }
                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="registerDNI">DNI</label>
                  <input type="text" id="registerArea" className={styles.formControl} required />
                </div>

                {!isDoctor && (
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel} htmlFor="registerObraSocial">Obra Social</label>
                    <input type="text" id="registerObraSocial" className={styles.formControl} required />
                  </div>
                )}

                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="registerPassword">Contraseña</label>
                  <input type="password" id="registerPassword" className={styles.formControl} required />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="registerTelefono">Teléfono</label>
                  <input type="text" id="registerTelefono" className={styles.formControl} required />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="registerFoto">Foto</label>
                  <input type="text" id="registerFoto" className={styles.formControl} required />
                </div>
              

                <div className={styles.checkboxGroup}>
                  <input className={styles.checkbox} type="checkbox" id="registerCheck" defaultChecked />
                  <label className={styles.checkboxLabel} htmlFor="registerCheck">
                    He leído y acepto los términos
                  </label>
                </div>
                <button type="submit" className={styles.btnPrimary}>Sign up</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
