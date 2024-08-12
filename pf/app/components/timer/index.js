import styles from './timer.module.css';
import React, { useEffect, useState } from "react";
import axios from "axios";

const Timer = () => {
    const [timer, setTimer] = useState([]);
    const [error, setError] = useState(null);
    const [idArea, setIdArea] = useState(1); 
    const [tiempoMultiplicado, setTiempoMultiplicado] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const tiempoResponse = await axios.get(`http://localhost:3000/api/tiempoEspera/${idArea}`);
                const tiempoData = tiempoResponse.data;

                const cantidadResponse = await axios.get(`http://localhost:3000/api/cantidadPersonas/${idArea}`);
                const cantidadPersonas = (cantidadResponse.data.cantidadPersonas);


                const resultadosMultiplicados = tiempoData.map(time => {
                    const tiempoEspera = parseFloat(time.TiempoEspera);

                    return {
                        idTurno: time.Id,
                        tiempoMultiplicado: tiempoEspera * cantidadPersonas,
                    };
                });

                setTiempoMultiplicado(resultadosMultiplicados);
                setTimer(tiempoData);

            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Hubo un error al obtener los datos.');
            }
        };

        fetchData();
    }, [idArea]);

    return (
        <div className={styles.timer}>
            {error && <p className={styles.error}>{error}</p>}
            {tiempoMultiplicado.map(time =>  
                <p key={time.idTurno}> {time.tiempoMultiplicado}</p>
            )}
        </div>
    );
};

export default Timer;
