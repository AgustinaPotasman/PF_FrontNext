import React, { useState, useEffect } from 'react';
import styles from './timer.module.css';
import axios from 'axios';

const Timer = ({ idArea }) => {
    const [tiempoMultiplicado, setTiempoMultiplicado] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log('idArea:', idArea); // Verificar el valor de idArea
        if (!idArea) {
            console.error('idArea es undefined');
            return;
        }

        const fetchData = async () => {
            try {
                const tiempoResponse = await axios.get(`http://localhost:3000/api/tiempoEspera/${idArea}`);
                console.log('Datos obtenidos de tiempoResponse:', tiempoResponse.data);

                const cantidadResponse = await axios.get(`http://localhost:3000/api/cantidadPersonas/${idArea}`);
                console.log('Cantidad de personas:', cantidadResponse.data.cantidadPersonas);

                const tiempoData = tiempoResponse.data;
                const cantidadPersonas = cantidadResponse.data.cantidadPersonas;

                const resultadosMultiplicados = tiempoData.map(time => {
                    const tiempoEspera = parseFloat(time.TiempoEspera);

                    return {
                        idTurno: time.Id,
                        tiempoMultiplicado: tiempoEspera * cantidadPersonas,
                    };
                });

                setTiempoMultiplicado(resultadosMultiplicados);

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
