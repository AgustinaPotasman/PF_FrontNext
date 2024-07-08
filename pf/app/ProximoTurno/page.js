'use client';

import React, { useEffect, useState } from 'react';
import Timer from '../components/timer';
import TurnoInfo from '../components/TurnoInfo';
import Footer from '../components/footer';
import styles from './page.module.css';
import Boton from '../components/boton';
import ModalCancelacion from '../components/ModalCancelacion';
import FormDesplegable from '../components/formDesplegable';

export default function ProximoTurno() {
    const [openAlert, setOpenAlert] = useState(false);
    const [categorias, setCategorias] = useState([]);
    const [error, setError] = useState(null);

    const handleOpenAlert = () => {
        console.log('Abriendo modal');
        setOpenAlert(true);
    };

    const handleCloseAlert = () => {
        console.log('Cerrando modal');
        setOpenAlert(false);
    };

    useEffect(() => {
        let categoria;
        const url = 'http://localhost:3000/api/areas'; // Ajusta la URL de tu API aquí

        const fetchCategorias = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }
                const data = await response.json();
                console.log('Obtuve respuesta:', data);
                setCategorias(data);
            } catch (error) {
                setError(error);
                console.error('Error:', error);
            }
        };

        fetchCategorias();
    }, []); // Empty dependency array ensures this effect runs only once when the component mounts

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className={styles.container}>
            <Timer />
            <TurnoInfo />
            <div className={styles.commonWidth}>
                <Boton sendText="siguiente" onClick={handleOpenAlert} />
            </div>
            <ModalCancelacion onClose={handleCloseAlert} className={styles.commonWidth} />
            <Footer />
            <div>
                <h2>Categorías</h2>
                <FormDesplegable categorias={categorias} />
            </div>
        </div>
    );
}
