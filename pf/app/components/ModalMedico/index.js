import React from 'react';
import axios from 'axios'; // Asegúrate de importar axios
import styles from './ModalMedico.module.css';

const ModalMedico = ({ idTurno, onConfirm, onCancel, message = "¿Deseas finalizar el turno?" }) => {
  const handleConfirm = async () => {
    try {
      // Llamada a la API para cambiar el estado del turno a 3 (finalizado)
      const response = await axios.put(`http://localhost:3000/api/actualizarEstadoTurno/${idTurno}`, {
        nuevoEstadoId: 3, // Estado "Finalizado"
      });

      if (response.data.success) {
        onConfirm(); // Si se actualiza correctamente, ejecuta la función onConfirm
      } else {
        alert('No se pudo actualizar el estado del turno');
      }
    } catch (error) {
      console.error('Error al finalizar el turno:', error);
      alert('Error al finalizar el turno');
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <p>{message}</p>
        <div className={styles.buttonContainer}>
          <button className={styles.button} onClick={handleConfirm}>
            Sí, ya finalizó
          </button>
          <button className={styles.button} onClick={onCancel}>
            No, volver
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalMedico;
