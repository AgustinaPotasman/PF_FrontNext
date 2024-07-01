import React from 'react';
import styles from './TurnoInfor.module.css';
import Boton from '../boton';
export default function TurnoInfo() {
    return (
        <div className={styles.turnoInfo}>
            <h2>Información del turno</h2>
            <p>Turno de: Pediatría<br />Turnos previos: 6</p>
            <p className={styles.warning}>
                Recordá llegar a tiempo al hospital, de lo contrario perderá su turno
            </p>

        </div>
    );
}
