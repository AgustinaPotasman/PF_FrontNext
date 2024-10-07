'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import styles from './page.module.css';
import ModalMedico from '../components/ModalMedico';

const PacienteAtendido = () => {
  const [showModal, setShowModal] = useState(false);
  const [idTurno, setIdTurno] = useState(null);
  const router = useRouter();
  
  useEffect(() => {
    const storedIdTurno = localStorage.getItem('idTurno');
    setIdTurno(storedIdTurno);

    console.log('Valor de idTurno al montar el componente:', storedIdTurno);
    if (storedIdTurno === null) {
      console.error('ID Turno es undefined');
    } else if (isNaN(storedIdTurno)) {
      console.error('El ID del turno no es un número válido:', storedIdTurno);
    } else {
      console.log('ID Turno es válido:', storedIdTurno);
    }
    console.log(storedIdTurno);
  }, []);
  const handleEndTurn = () => {
    setShowModal(true);
  };

  const handleConfirmEndTurn = async () => {
    if (!idTurno) {
      alert('ID de turno inválido');
      return;
    }
    console.log(idTurno)
    try {
      const response = await axios.put(`http://localhost:3000/api/actualizarEstadoTurno/${idTurno}`, {
        nuevoEstadoId: 3 
      });
      console.log('Respuesta:', response.data);

      if (response.data.success) {
        await router.push('/PerfilMedico');
      } else {
        
        alert('No se pudo finalizar el turno: ' + response.data.message || 'Error desconocido');
      }
    } catch (error) {
      console.error('Error al finalizar el turno:', error);
      alert('Error al finalizar el turno. Verifica la consola para más detalles. Error: ' + error.message);
    } finally {
      setShowModal(false);
    }
  };

  return (
    <div className={styles.container}>
      <img src={'/img/mujer.jpg'} alt="Foto del paciente" className={styles.patientImage} />

      <div className={styles.patientDetails}>
        <p><strong>Nombre:</strong> Agustina Potasman</p>
        <p><strong>Email:</strong> agustinapotasman@gmail.com</p>
        <p><strong>Guardia:</strong> Pediatría</p>
        <p><strong>Síntomas:</strong> Me duele la panza</p>
      </div>

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
