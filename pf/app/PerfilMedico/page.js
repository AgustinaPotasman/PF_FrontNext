"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../page.module.css';

const ListaEspera = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/api/listaEspera/1')
      .then(response => {
        console.log('API response:', response.data);  // Aquí debes ver idTurno en cada item
        if (Array.isArray(response.data)) {
          setData(response.data);
        } else {
          setError('La respuesta de la API no es válida');
        }
      })
      .catch(error => {
        console.error('Error al obtener la lista de espera:', error);
        setError('Error al obtener la lista de espera');
      });
  }, []);
  

  const handleCallPatient = async (patientName, idTurno) => {
  
    try {
      const response = await axios.put(`http://localhost:3000/api/actualizarEstadoTurno/${idTurno}`, {
        idTurno: idTurno,
        nuevoEstadoId: 2 // ID del estado "Atendiendo"
      });
  
      if (response.data.success) {
        alert(`Llamando a ${patientName}`);
      } else {
        alert('No se pudo actualizar el estado del turno');
      }
    } catch (error) {
      console.error('Error al actualizar el estado del turno:', error);
      alert('Error al actualizar el estado del turno');
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
                onClick={() => {
                  console.log("idTurno:", item.idturno); 
                  handleCallPatient(item.pacientenombre, item.idturno);
                  console.log(item.idturno)
                }}
              >
                Llamar paciente
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}  

export default ListaEspera;
