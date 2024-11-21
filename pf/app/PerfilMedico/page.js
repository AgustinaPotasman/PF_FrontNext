"use client";

import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import styles from './page.module.css';
import Boton from '../components/boton';
import { UserContext } from '../components/UserContext'; 

const PerfilMedico = () => {
  const { user, setUser } = useContext(UserContext); 
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const fetchData = async () => {
    if (!user?.idArea) {
      setError('No se pudo obtener el token o el área del médico');
      return;
    }

    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const response = await axios.get(`http://localhost:3000/api/listaEspera/${user.idArea}`, config);
      if (Array.isArray(response.data)) {
        setData(response.data);
      } else {
        setError('La respuesta de la API no es válida');
      }
    } catch (error) {
      console.error('Error al obtener la lista de espera:', error);
      setError('Error al obtener la lista de espera');
    }
  };

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  if (!user) {
    return (
      <div>
        <p className={styles.noUserMessage}>Acceso restringido. Inicie sesión</p>
        <button 
          onClick={() => window.location.href = '/Login'} 
          className={styles.loginButton}
        >
          Ir a Login
        </button>
      </div>
    );
  }

  if (!user.idArea) {
    return (
      <div>
        <p className={styles.noUserMessage}>Acceso restringido. Solo médicos pueden acceder a esta página</p>
        <button 
          onClick={() => window.location.href = '/'} 
          className={styles.loginButton}
        >
          Volver al inicio
        </button>
      </div>
    );
  }

  const handleCallPatient = async (patientName, idTurno) => {
    if (!idTurno) {
      alert('ID de turno no válido');
      return;
    }

    localStorage.setItem('idTurno', idTurno);

    window.location.href = '/PacienteAtendido';
  };

  return (
    <div className={styles.container}>
      <h1>Lista de espera</h1>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.list}>
        {data.length === 0 ? (
          <p>No hay pacientes en lista de espera</p>
        ) : (
          data.map((item, index) => (
            <div key={index} className={styles.listItem}>
              <div className={styles.index}>{index + 1}</div>
              <div className={styles.name}>{item.pacientenombre}</div>
              <div className={styles.area}>{item.area}</div>
              <div className={styles.medico}>{item.mediconombre}</div>
              <Boton sendText={"Llamar paciente"} onClick={() => handleCallPatient(item.pacientenombre, item.idturno)} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PerfilMedico;
