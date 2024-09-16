'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import styles from './page.module.css';
import ModalMedico from '../components/ModalMedico';

const PerfilMedico = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [idTurno, setIdTurno] = useState(null);
  const router = useRouter();

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/listaEspera/1');
      if (Array.isArray(response.data)) {
        setData(response.data);
      } else {
        setError('La respuesta de la API no es válida');
      }
    } catch (error) {
      console.error('Error al obtener la lista de espera:', error);
      setError('Error al obtener la lista de espera');
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Vacío para que solo se ejecute al montar el componente

  const handleCallPatient = async (patientName, idTurno) => {
    if (!idTurno) {
      return;
    }
  
    try {
      const response = await axios.put(`http://localhost:3000/api/actualizarEstadoTurno/${idTurno}`, {
        nuevoEstadoId: 2 // Cambia el estado del turno a "Atendiendo" (2)
      });
  
      if (response.data.success) {
        router.push('/PacienteAtendido'); // Redirige a la página PacienteAtendido
      } else {
        alert('No se pudo actualizar el estado del turno');
      }
    } catch (error) {
      console.error('Error al actualizar el estado del turno:', error);
      alert('Error al actualizar el estado del turno');
    }
  };
  
  const handleRemovePatient = async (idTurno) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/actualizarEstadoTurno/${idTurno}`);

      if (response.data.success) {
        fetchData(); // Actualiza la lista de pacientes
      } else {
        setError('No se pudo eliminar el paciente');
      }
    } catch (error) {
      console.error('Error al eliminar el paciente:', error);
      setError('Error al eliminar el paciente');
    }
  };

  return (
    <div className={styles.container}>
      <h1>Lista de espera</h1>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.list}>
        {data.length === 0 ? (
          <p>No hay datos disponibles</p>
        ) : (
          data.map((item, index) => (
            <div key={index} className={styles.listItem}>
              <div className={styles.index}>{index + 1}</div>
              <div className={styles.name}>{item.pacientenombre}</div>
              <div className={styles.area}>{item.area}</div>
              <div className={styles.medico}>{item.mediconombre}</div>
              <button
                className={styles.callButton}
                onClick={() => handleCallPatient(item.pacientenombre, item.idturno)}
              >
                Llamar paciente
              </button>
            </div>
          ))
        )}
      </div>
      {showModal && (
        <ModalMedico 
          onConfirm={async () => {
            setShowModal(false);
            await router.push('/PerfilMedico');
            fetchData(); 
          }}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default PerfilMedico;
