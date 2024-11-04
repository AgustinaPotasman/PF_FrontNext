"use client";

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Timer from "../components/timer/page";
import styles from "./page.module.css";
import { UserContext } from '../components/UserContext'; 

const ProximoTurno = ({ idArea, sintomas }) => {
  const [tiempoMultiplicado, setTiempoMultiplicado] = useState(null);
  const [error, setError] = useState(null);
  const [showMessage, setShowMessage] = useState(false); 
  const  user  = useContext(UserContext);

  useEffect(() => {
    const token = localStorage.getItem('token');

   
    if (!token || !user) {
      setShowMessage(true); 
    }
  }, [user]);

  const handleLoginRedirect = () => {
    window.location.href = '/'; 
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token'); 
      if (!token || !user) return; 

      try {
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };
        const tiempoResponse = await axios.get(`http://localhost:3000/api/tiempoEspera/${idArea}`, config);
        const cantidadResponse = await axios.get(`http://localhost:3000/api/cantidadPersonas/${idArea}`, config);
        const tiempoEspera = parseFloat(tiempoResponse.data[0]?.TiempoEspera || 0);
        const cantidadPersonas = cantidadResponse.data.cantidadPersonas || 0;

        const tiempoFinal = tiempoEspera * cantidadPersonas;
        setTiempoMultiplicado(tiempoFinal);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Hubo un error al obtener los datos.');
      }
    };

    fetchData();
  }, [idArea, user]); 

  return (
    <div className={styles.timerContainer}>
      {showMessage ? (
        <div>
          <h2>No iniciaste sesión</h2>
          <button onClick={handleLoginRedirect}>Iniciar Sesión</button>
        </div>
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : tiempoMultiplicado !== null ? (
        <div className={styles.circle}>
          <Timer tiempoMultiplicado={tiempoMultiplicado} />
          <div className={styles.turnoInfo}>
            <p>Turno de: {idArea}</p>
            <p>Síntomas: {sintomas}</p>
          </div>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

export default ProximoTurno;
