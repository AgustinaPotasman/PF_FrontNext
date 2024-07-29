import styles from './timer.module.css';
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Timer() {
    const [timer, setTimer] = useState([]);
    let turnosPrevios;

   

    useEffect(() => {
        axios.get("http://localhost:3001/api/areas")
        .then(response => {
            setTimer(response.data);
        })
        .catch(error => {
            console.error('Error fetching:', error);
            });
        }, []); 

    return (
        <div className={styles.timer}>
            {timer.map(time =>  
            <p key={time.id}>{time.TiempoEsperaAprox*2}</p>
            )}
        </div>
      );
}

