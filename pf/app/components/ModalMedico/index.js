// app/components/ModalMedico.js
import React from 'react';
import styles from './ModalMedico.module.css'; // Asegúrate de que este archivo CSS existe

const ModalMedico = ({ onConfirm, onCancel }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Confirmación</h2>
        <p>¿Deseas continuar?</p>
        <div className={styles.buttonContainer}>
          <button className={styles.button} onClick={onConfirm}>Siguiente</button>
          <button className={styles.button} onClick={onCancel}>Volver</button>
        </div>
      </div>
    </div>
  );
};

export default ModalMedico;
