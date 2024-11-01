"use client";
import React, { useState, useContext } from 'react';
import { UserContext } from '../components/UserContext'; 
import axios from 'axios';

const Login = () => {
  const { setUser } = useContext(UserContext); 
  const [dni, setDni] = useState(''); 
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const loginPaciente = async (dni, contrasena) => {
    console.log("Intentando iniciar sesión con:", { dni, contrasena }); 
    try {
        const response = await axios.post('http://localhost:3000/api/login', {
            dni,
            contrasena
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Error en el login:', error.response.data.message); 
            throw new Error(error.response.data.message || 'Error en el login');
        } else {
            console.error('Error en el login:', error.message);
            throw new Error(error.message || 'Error en el login');
        }
    }
};

const handleLogin = async (e) => {
  e.preventDefault();
  setError('');
  setSuccess('');

  console.log('DNI y contraseña antes de enviar:', { dni, contrasena }); 

  try {
      const result = await loginPaciente(dni, contrasena);
      setUser(result.patient);
      setSuccess('Login exitoso!');
      localStorage.setItem('token', result.token);
      
      window.location.href = '/Home'; 

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
          value={dni}
          onChange={(e) => setDni(e.target.value)}
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
