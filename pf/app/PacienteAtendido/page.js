"use client";

import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import styles from './page.module.css';
import Modal from '../components/ModalMedico'; 
import { UserContext } from '../components/UserContext'; 

const PacienteAtendido = () => {
  const [showModal, setShowModal] = useState(false);
  const [paciente, setPaciente] = useState(null); 
  const router = useRouter();
  const token = localStorage.getItem('token');
  const { user } = useContext(UserContext);

  
  const nombrePaciente = localStorage.getItem('nombrePaciente');
  const idTurno = localStorage.getItem('idTurno');

  const fetchPaciente = async (idTurno) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    try {
      const response = await axios.get(`http://localhost:3000/api/unTurno/${idTurno}`, config);
      if (response.data) {
        setPaciente(response.data);
      } else {
        console.error('Paciente no encontrado');
      }
    } catch (error) {
      console.error('Error al obtener la información del paciente:', error);
    }
  };

  useEffect(() => {
    if (idTurno) {
      fetchPaciente(idTurno); 
    } else {
      console.error('ID Turno no disponible');
    }
  }, [idTurno]);

  if (!user) {
    return (
      <div>
        <p className={styles.noUserMessage}>Acceso restringido. Inicie sesión</p>
        <button 
          onClick={() => window.location.href = '/Login'} 
          className={styles.loginButton}
        >
          Ir a Login
        </button>
      </div>
    );
  }

  const handleEndTurn = () => {
    setShowModal(true);
  };

  const handleConfirmEndTurn = async () => {
    if (!idTurno) {
      alert('ID de turno inválido');
      return;
    }

    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const response = await axios.put(`http://localhost:3000/api/actualizarEstadoTurno/${idTurno}`, {
        nuevoEstadoId: 3 
      }, config);

      if (response.data.success) {
        router.push('/PerfilMedico');
      } else {
        alert('No se pudo finalizar el turno');
      }
    } catch (error) {
      console.error('Error al finalizar el turno:', error);
    } finally {
      setShowModal(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className={styles.container}>
      <img src={'/img/mujer.jpg'} alt="Foto del paciente" className={styles.patientImage} />

      {paciente && ( 
        <div className={styles.patientDetails}>
          <p><strong>Nombre:</strong> {paciente.Nombre}</p>
          <p><strong>Email:</strong> {paciente.Gmail}</p>
          <p><strong>Síntomas:</strong> {paciente.Sintomas}</p>
        </div>
      )}

      <button onClick={handleEndTurn} className={styles.endButton}>
        Finalizar turno
      </button>

      {showModal && (
        <Modal 
          idTurno={idTurno}
          onConfirm={handleConfirmEndTurn} 
          onCancel={handleCloseModal}
        />
      )}
    </div>
  );
};

export default PacienteAtendido;
