"use client";

import React, { useState, useEffect } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import axios from 'axios';
import styles from './Timer.module.css';

const Timer = ({ idArea }) => {
  const [tiempoMultiplicado, setTiempoMultiplicado] = useState(null);
  const [cantidadPersonas, setCantidadPersonas] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const tiempoResponse = await axios.get(`http://localhost:3000/api/tiempoEspera/${idArea}`);
      const cantidadResponse = await axios.get(`http://localhost:3000/api/cantidadPersonas/${idArea}`);

      const tiempoEspera = parseFloat(tiempoResponse.data[0]?.TiempoEspera || 0);
      const cantidadPersonasData = cantidadResponse.data.cantidadPersonas || 0;

      setCantidadPersonas(cantidadPersonasData);
      const tiempoFinal = tiempoEspera * cantidadPersonasData;
      setTiempoMultiplicado(tiempoFinal);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Hubo un error al obtener los datos.');
    }
  };

  useEffect(() => {
    if (!idArea) return;

    fetchData(); // Cargar los datos inicialmente

    const interval = setInterval(() => {
      fetchData(); // Actualizar los datos cada 5 segundos
    }, 5000);

    return () => clearInterval(interval); // Limpiar el intervalo al desmontar
  }, [idArea]);

  if (error) {
    return <p className={styles.error}>{error}</p>;
  }

  if (tiempoMultiplicado === null || cantidadPersonas === null) {
    return <p>Cargando...</p>;
  }

  const durationInSeconds = tiempoMultiplicado * 60;

  return (
    <div className={styles.timerContainer}>
      <div className={styles.countdownWrapper}>
        <CountdownCircleTimer
          isPlaying
          duration={durationInSeconds}
          colors={['#b71c1c', '#F7B801', '#A30000', '#A30000']}
          colorsTime={[durationInSeconds, durationInSeconds * 0.66, durationInSeconds * 0.33, 0]}
          trailColor="#d9d9d9"
          strokeWidth={10}
          size={200}
          onComplete={() => {
            console.log('El tiempo ha terminado');
            return { shouldRepeat: false };
          }}
        >
          {({ remainingTime }) => {
            const minutes = Math.floor(remainingTime / 60);
            const seconds = remainingTime % 60;
            return (
              <>
                <div className={styles.timeText}>
                  {`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`}
                </div>
                <div className={styles.minutesText}>minutos</div>
              </>
            );
          }}
        </CountdownCircleTimer>
      </div>
      <div className={styles.pacientesInfo}>
        <p>Cantidad de personas esperando: <strong>{cantidadPersonas}</strong></p>
      </div>
    </div>
  );
};

export default Timer;
