import React from 'react';
import styles from './ModalMedico.module.css'; 

const ModalMedico = ({ onConfirm, onCancel }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <p>Agustina Potasman terminó de realizar su turno de pediatría?</p>
        <div className={styles.buttonContainer}>
          <button className={styles.button} onClick={onConfirm}>Sí, ya finalizo</button>
          <button className={styles.button} onClick={onCancel}>No, volver</button>
        </div>
      </div>
    </div>
  );
};

export default ModalMedico;
