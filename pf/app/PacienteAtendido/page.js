'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'; // Importar useRouter
import styles from './page.module.css';
import ModalMedico from '../components/ModalMedico';

const PacienteAtendido = () => {
  const [showModal, setShowModal] = useState(false);
  const [idTurno, setIdTurno] = useState(null);
  const [error, setError] = useState('');
  const router = useRouter(); // Crear una instancia del hook useRouter

  const handleEndTurn = async () => {
    if (!idTurno) {
      return;
    }

    try {
      const response = await axios.put(`http://localhost:3000/api/actualizarEstadoTurno/${idTurno}`, {
        idTurno: idTurno,
        nuevoEstadoId: 3 
      });

      if (response.data && response.data.success) {
        setShowModal(true); // Mostrar el modal si la actualización fue exitosa
      } else {
        console.error('Error al actualizar el estado del turno:', response.data);
        setError('No se pudo actualizar el estado del turno');
      }
    } catch (error) {
      console.error('Error al finalizar el turno:', error);
      setError('Error al finalizar el turno');
    }
  };

  return (
    <div className={styles.container}>
      <h1>El paciente está siendo atendido</h1>
      <p>¿Terminar el turno?</p>
      {error && <p className={styles.error}>{error}</p>}
      <button onClick={handleEndTurn} className={styles.endButton}>
        Sí, finalizar turno
      </button>
      {showModal && (
        <ModalMedico 
          onConfirm={() => router.push('../PerfilMedico')}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default PacienteAtendido;
