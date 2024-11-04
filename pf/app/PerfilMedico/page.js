"use client";

import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import styles from './page.module.css';
import Boton from '../components/boton';
import { UserContext } from '../components/UserContext'; 

const PerfilMedico = () => {
  const  user  = useContext(UserContext); 
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const router = useRouter();
  
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const fetchData = async () => {
    if (!token || !user?.idArea) {
      setError('No se pudo obtener el token o el área del médico');
      return;
    }

    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const response = await axios.get(`http://localhost:3000/api/listaEspera/2`, config);
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

  const handleCallPatient = async (patientName, idTurno) => {
    if (!idTurno) {
      alert('ID de turno no válido');
      return;
    }
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




