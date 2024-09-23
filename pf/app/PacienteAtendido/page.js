'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import styles from './page.module.css';
import ModalMedico from '../components/ModalMedico';

const PacienteAtendido = () => {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  // ID del turno debe ser dinámico en la implementación real
  const idTurno = 1; 

  const patientData = {
    pacientenombre: 'Agustina Potasman',
    email: 'agustinapotasman@gmail.com',
    guardianombre: 'Pediatría',
    sintomas: 'Me duele la panza',
    foto: '/img/mujer.jpg'
  };

  // Manejo de la apertura del modal para confirmar la finalización del turno
  const handleEndTurn = () => {
    setShowModal(true);
  };

  const handleConfirmEndTurn = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/api/actualizarEstadoTurno/${idTurno}`, {
        nuevoEstadoId: 3 // Asegúrate de que este ID sea correcto
      });
  
      if (response.data.success) {
        await router.push('/PerfilMedico');
      } else {
        console.error('Error desde el backend:', response.data);
        alert('No se pudo finalizar el turno: ' + response.data.message || 'Error desconocido');
      }
    } catch (error) {
      console.error('Error en la solicitud al servidor:', error);
      alert('Error al finalizar el turno. Verifica la consola para más detalles.');
    } finally {
      setShowModal(false);
    }
  };
  

  return (
    <div className={styles.container}>
      <div className={styles.header}></div>

      <img src={patientData.foto} alt="Foto del paciente" className={styles.patientImage} />

      {patientData ? (
        <div className={styles.patientDetails}>
          <p><strong>Nombre:</strong> {patientData.pacientenombre}</p>
          <p><strong>Email:</strong> {patientData.email}</p>
          <p><strong>Guardia:</strong> {patientData.guardianombre}</p>
          <p><strong>Síntomas:</strong> {patientData.sintomas}</p>
        </div>
      ) : (
        <p>Cargando datos del paciente...</p>
      )}

      <button onClick={handleEndTurn} className={styles.endButton}>
        Finalizar turno
      </button>

      {showModal && (
        <ModalMedico
          onConfirm={handleConfirmEndTurn}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default PacienteAtendido;
