'use client';

import React, { useState } from 'react';
import Timer from '../components/timer';
import TurnoInfo from '../components/TurnoInfo';
import Footer from '../components/footer';
import styles from './page.module.css';
import Boton from '../components/boton';
import ModalCancelacion from '../components/ModalCancelacion';
import FormDesplegable from '../components/formDesplegable';

export default function ProximoTurno() {
    const [openAlert, setOpenAlert] = useState(false);

    const handleOpenAlert = () => {
        console.log('Abriendo modal');
        setOpenAlert(true);
    };

    const handleCloseAlert = () => {
        console.log('Cerrando modal');
        setOpenAlert(false);
    };


    return (
        <div className={styles.container}>
            <Timer />
            <TurnoInfo />
            <div className={styles.commonWidth}>
                <Boton sendText="siguiente" onClick={handleOpenAlert} />
            </div>
            <ModalCancelacion onClose={handleCloseAlert} className={styles.commonWidth} />
            <Footer />
        </div>
    );
}
