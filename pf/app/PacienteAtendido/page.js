"use client";

import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import styles from './page.module.css';
import Modal from '../components/ModalMedico'; 
import { UserContext } from '../components/UserContext'; 

const PacienteAtendido = () => {
  const [showModal, setShowModal] = useState(false);
  const [idTurno, setIdTurno] = useState(null);
  const [paciente, setPaciente] = useState(null); 
  const router = useRouter();
  const token = localStorage.getItem('token');
  const { user } = useContext(UserContext);

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
    const storedIdTurno = localStorage.getItem('idTurno');
    if (storedIdTurno) {
      const idTurnoNumber = Number(storedIdTurno);
      if (isNaN(idTurnoNumber)) {
        console.error('ID Turno no es un número válido');
      } else {
        setIdTurno(idTurnoNumber);
        console.log('ID Turno:', idTurnoNumber);
        fetchPaciente(idTurnoNumber);
      }
    } else {
      console.error('No se encontró ID Turno en localStorage');
    }
  }, []);

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
    console.log('Confirmar fin de turno, ID Turno:', idTurno);
    if (!idTurno) {
      alert('ID de turno inválido');
      return;
    }

    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      console.log(`Haciendo PUT a /api/actualizarEstadoTurno/${idTurno}`);
      const response = await axios.put(`http://localhost:3000/api/actualizarEstadoTurno/${idTurno}`, {
        nuevoEstadoId: 3 
      }, config);
      console.log('Respuesta:', response.data);

      if (response.data.success) {
        router.push('/PerfilMedico');
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

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className={styles.container}>
      <img src={'/img/mujer.jpg'} alt="Foto del paciente" className={styles.patientImage} />

      {paciente && ( 
        <div className={styles.patientDetails}>
          <p><strong>Nombre:</strong> {user.Nombre} {user.Apellido}</p>
          <p><strong>Email:</strong> {user.Gmail}</p>
          <p><strong>Síntomas:</strong> {user.Sintomas}</p>
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
