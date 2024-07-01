'use client'

import React, { useState } from 'react';
import Timer from '../components/timer';
import TurnoInfo from '../components/TurnoInfo';
import Footer from '../components/footer';
import styles from './page.module.css';
import Boton from '../components/boton';
import ModalCancelacion from '../components/ModalCancelacion'

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
            <Boton sendText="siguiente" onClick={handleOpenAlert} />
                {openAlert && (
                <ModalCancelacion onClose={handleCloseAlert} />
              )}
              <Footer></Footer>
        </div>
    );
}

