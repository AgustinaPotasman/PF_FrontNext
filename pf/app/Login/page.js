"use client";
import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../components/UserContext';
import axios from 'axios';

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
      console.log(JSON.stringify(result))

      if (result.patient) {
        setUser(result.patient);  
        localStorage.setItem('token', result.token);  
        localStorage.setItem('user', JSON.stringify(result.patient)); 

        setSuccess("Bienvenido, " + result.patient.name);

    
        window.location.href = result.isMedico ? '/PerfilMedico' : '/Home';
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
    <div className="login-container">
      {user ? (
        <div>
          <h2>Bienvenid@, {user.Nombre}!</h2>
          <button onClick={handleLogout}>Cerrar Sesión</button>
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default Login;
