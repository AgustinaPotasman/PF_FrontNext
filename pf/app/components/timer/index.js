import styles from './timer.module.css';
import React, { useEffect, useState } from "react";
import axios from "axios";

const Timer = () => {
    const [timer, setTimer] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:3000/api/tiempoEspera")
            .then(response => {
                setTimer(response.data);
            })
            .catch(error => {
                console.error('Error fetching:', error);
                setError('Hubo un error al obtener los datos.');
            });
    }, []);

    return (
        <div className={styles.timer}>
            {error && <p className={styles.error}>{error}</p>}
            {timer.map(time =>  
                <p key={time.id}>{time.TiempoEspera}</p>
            )}
        </div>
    );
};

export default Timer;

