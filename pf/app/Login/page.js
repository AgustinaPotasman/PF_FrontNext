"use client";

import React, { useState, useContext } from 'react';
import { UserContext } from '../components/UserContext'; 
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

const Login = () => {
  const { setUser } = useContext(UserContext); 
  const [gmail, setGmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter(); 

  const loginPaciente = async (gmail, contrasena) => {
    const response = await fetch('http://localhost:3000/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ dni: gmail, contrasena: contrasena }), 
    });
  
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Error en el login');
    }
  
    return await response.json();
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const result = await loginPaciente(gmail, contrasena); 
      if (result.success) {
        setUser(result.patient); 
        setSuccess('Login exitoso!');
        localStorage.setItem('token', result.token);
        router.push('/Home'); 
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError('Error al iniciar sesión');
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>DNI:</label>
          <input
            type="text"
            value={gmail}
            onChange={(e) => setGmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
          />
        </div>
        <button type="submit">Iniciar Sesión</button>
      </form>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
    </div>
  );
};

export default Login;
