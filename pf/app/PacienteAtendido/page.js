'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import styles from './page.module.css';
import ModalMedico from '../components/ModalMedico';

const PacienteAtendido = () => {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  // ID del turno debe ser pasado o gestionado en algún lugar. Este es un ejemplo estático.
  const idTurno = 1; // Debe ser dinámico basado en la información del turno

  const patientData = {
    pacientenombre: 'Agustina Potasman',
    email: 'agustinapotasman@gmail.com',
    guardianombre: 'Pediatría',
    sintomas: 'Me duele la panza',
    foto: "/img/mujer.jpg"
  };

  // PacienteAtendido.js
const handleEndTurn = async () => {
  setShowModal(false);
  try {
    const response = await axios.put(`http://localhost:3000/api/actualizarEstadoTurno/${idTurno}`, {
      nuevoEstadoId: 3 // ID del estado "Finalizado"
    });

    if (response.data.success) {
      await router.push('/PerfilMedico');
    } else {
      alert('No se pudo finalizar el turno');
    }
  } catch (error) {
    console.error('Error al finalizar el turno:', error);
    alert('Error al finalizar el turno');
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
          onConfirm={async () => {
            setShowModal(false);
            try {
              const response = await axios.put(`http://localhost:3000/api/actualizarEstadoTurno/${idTurno}`, {
                nuevoEstadoId: 3 // ID del estado "Finalizado"
              });

              if (response.data.success) {
                await router.push('/PerfilMedico');
              } else {
                alert('No se pudo finalizar el turno');
              }
            } catch (error) {
              console.error('Error al finalizar el turno:', error);
              alert('Error al finalizar el turno');
            }
          }}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default PacienteAtendido;
