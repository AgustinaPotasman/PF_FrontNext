"use client";

import React, { useState } from 'react';
import Titulo from '../components/titulo';
import Input from '../components/input';
import styles from './page.module.css';
import FormDesplegable from '../components/formDesplegable';
import Boton from '../components/boton';
import Footer from '../components/footer';
import ProximoTurno from '../components/timer'; 
import axios from 'axios';

export default function Home() {
  const [selectedAreaId, setSelectedAreaId] = useState(null); 
  const [sintomas, setSintomas] = useState(''); 
  const [mostrarProximoTurno, setMostrarProximoTurno] = useState(false);
  const [turnoId, setTurnoId] = useState(null); 

  const handleSelectArea = (id) => {
    setSelectedAreaId(id); 
  };

  const handleInputChange = (e) => {
    setSintomas(e.target.value); 
  };

  const handleNext = async () => {
    if (selectedAreaId && sintomas.trim()) {
      try {
        const idMedico = Math.floor(Math.random() * 3) + 1; 
        const idPaciente = Math.floor(Math.random() * 3) + 1; 
        const idEstadoTurno = 1; 

        const response = await axios.post('http://localhost:3000/api/insertarTurno', {
          idMedico,
          idPaciente,
          idArea: selectedAreaId,
          idEstadoTurno,
          Sintomas: sintomas,
        });

        console.log("Respuesta de la API:", response.data);

        const turnoNuevo = response.data;
        console.log("ID del turno:", turnoNuevo.Id); 

        setTurnoId(turnoNuevo.Id); 

        
        setMostrarProximoTurno(true);
      } catch (error) {
        console.error('Error al crear el turno:', error);
        alert('Hubo un error al crear el turno. Inténtalo de nuevo.');
      }
    } else {
      alert('Por favor, selecciona un área e ingresa los síntomas.'); 
    }
  };

  const handleCancelTurno = async () => {
    if (turnoId) {
      try {
        console.log("Cancelando turno con ID:", turnoId);
        
        await axios.delete(`http://localhost:3000/api/borrarTurno/${turnoId}`);
        alert('Turno cancelado exitosamente.');
        setTurnoId(null); 
        setMostrarProximoTurno(false); 
      } catch (error) {
        console.error('Error al cancelar el turno:', error);
        alert('Hubo un error al cancelar el turno. Inténtalo de nuevo.');
      }
    } else {
      alert('No hay ningún turno seleccionado para cancelar.');
    }
  };

  return (
    <main className={styles.container}>
      {!mostrarProximoTurno ? (
        <>
          <Titulo params="Información" />
          <FormDesplegable onSelectArea={handleSelectArea} />
          <Input 
            iType="text" 
            iPlaceholder="Ingrese sus síntomas" 
            value={sintomas}  
            onChange={handleInputChange} 
          />
          <Boton sendText="Siguiente" onClick={handleNext} />
        </>
      ) : (
        <>
          <ProximoTurno idArea={selectedAreaId} sintomas={sintomas} />
          <Boton sendText="Cancelar Turno" onClick={handleCancelTurno} />
        </>
      )}
      <Footer />
    </main>
  );
}
