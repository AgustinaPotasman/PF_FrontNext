import React from 'react';
import styles from './TurnoInfor.module.css';

const TurnoInfo = ({ especialidad, turnosPrevios }) => {
  return (
    <div className={styles.turnoInfo}>
      <h2>Información del Turno</h2>
      <p><strong>Especialidad:</strong> {especialidad}</p>
      <p><strong>Turnos Previos:</strong> {turnosPrevios}</p>
    </div>
  );
};

export default TurnoInfo;
