import React, { useState, useEffect } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import axios from 'axios';
import styles from './Timer.module.css';

const Timer = ({ idArea }) => {
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

        const tiempoFinal = tiempoEspera * cantidadPersonas; // tiempo en minutos
        setTiempoMultiplicado(tiempoFinal); // Setea el tiempo final
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Hubo un error al obtener los datos.');
      }
    };

    fetchData();
  }, [idArea]);

  if (error) {
    return <p className={styles.error}>{error}</p>;
  }

  if (tiempoMultiplicado === null) {
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
    </div>
  );
};

export default Timer;
