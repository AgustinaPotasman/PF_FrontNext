"use client";
import React, { useState, useContext } from 'react';
import { UserContext } from '../components/UserContext';
import axios from 'axios';
import styles from './page.module.css'; 
import Link from 'next/link';

const Login = () => {
  const { user, setUser } = useContext(UserContext);
  const [dni, setDni] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const loginPaciente = async (dni, contrasena) => {
    try {
      console.log("Enviando al backend:", { dni, contrasena });
      const response = await axios.post('http://localhost:3000/api/login', { dni, contrasena });
      console.log("Respuesta del backend:", response.data);
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data.message || 'Error en el login';
      console.error('Error en el login:', errorMessage);
      throw new Error(errorMessage);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!dni || !contrasena) {
      setError("Por favor ingresa tanto el DNI como la contraseña.");
      return;
    }

    try {
      const result = await loginPaciente(dni, contrasena);
      if (result.patient) {
        setUser(result.patient);  
        localStorage.setItem('token', result.token);  
        localStorage.setItem('user', JSON.stringify(result.patient)); 

        setSuccess("Bienvenido, " + result.patient.name);
        
        if (result.patient.idArea) {
          window.location.href = '/PerfilMedico';
        } else {
          window.location.href = '/Home';
        }
      } else {
        setError("Error: No se recibió información del usuario.");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogout = () => {
    setUser(null);  
    localStorage.removeItem('token'); 
    localStorage.removeItem('user');  
    window.location.href = '/';  
  };

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        {user ? (
          <div>
            <h2 className={styles.h2}>Bienvenid@, {user.Nombre}!</h2>
            <button onClick={handleLogout} className={styles.btnPrimary}>Cerrar Sesión</button>
          </div>
        ) : (
          <>
            <h2 className={styles.h2}>Iniciar Sesión</h2>
            <form onSubmit={handleLogin} className={styles.form}>
              <div className={styles.formGroup}>
                <label>DNI:</label>
                <input
                  type="text"
                  value={dni}
                  onChange={(e) => setDni(e.target.value)}
                  required
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Contraseña:</label>
                <input
                  type="password"
                  value={contrasena}
                  onChange={(e) => setContrasena(e.target.value)}
                  required
                  className={styles.input}
                />
              </div>
              <button type="submit" className={styles.btnPrimary}>Iniciar Sesión</button>
              <div className={styles.signupContainer}>
                <span className={styles.signupText}>¿No tenés cuenta?</span>
                <Link href="/LoginForm" className={styles.signupLink}>Registrate</Link>
              </div>
            </form>
            {error && <div className={styles.error}>{error}</div>}
            {success && <div className={styles.success}>{success}</div>}
          </>
        )}
      </div>
    </div>
    
  );
};

export default Login;
