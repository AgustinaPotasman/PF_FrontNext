import React, { useState, useEffect } from 'react';
import styles from './timer.module.css';
import axios from 'axios';

const ProximoTurno = ({ idArea, sintomas }) => {
  const [tiempoMultiplicado, setTiempoMultiplicado] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!idArea) return;

    const fetchData = async () => {
      try {
        const tiempoResponse = await axios.get(`http://localhost:3000/api/tiempoEspera/${idArea}`);
        const cantidadResponse = await axios.get(`http://localhost:3000/api/cantidadPersonas/${idArea}`);
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
  }, [idArea]);

  return (
    <div className={styles.timerContainer}>
      {error ? (
        <p className={styles.error}>{error}</p>
      ) : tiempoMultiplicado !== null ? (
        <div className={styles.circle}>
          <div className={styles.timer}>
            <span className={styles.time}>{Math.round(tiempoMultiplicado)}</span>
            <span className={styles.minutes}>minutos</span>
          </div>
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
