"use client"

import React, { useState } from 'react';
import ListaPacientes from '../components/ListaPacientes';
import ModalConfirmacion from '../components/ModalConfirmacion';
import styles from './page.module.css';
const PantallaMedico = () => {
    const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null);
    const [pacientes, setPacientes] = useState([
        { id: 0, nombre: 'Paciente', especialidad: 'Especialidad', medico: 'Medico', tiempoEspera: 'Tiempo de espera' },
        { id: 1, nombre: 'Agustina Potasman', especialidad: 'Pediatría', medico: 'Raul', tiempoEspera: '3 minutos' },
        { id: 2, nombre: 'Dana Mnadelbaum', especialidad: 'Ginecología', medico: 'Dana', tiempoEspera: '8 minutos' },
        { id: 3, nombre: 'Lucas', especialidad: 'Psiquiatría', medico: 'Sasha', tiempoEspera: '15 minutos' },
        { id: 4, nombre: 'Sasha ', especialidad: 'Neurología', medico: 'Martin', tiempoEspera: '20 minutos' },
        { id: 5, nombre: 'Martin ', especialidad: 'Cardiología', medico: 'Joaquín', tiempoEspera: '25 minutos' },
        { id: 6, nombre: 'Joaquín ', especialidad: 'Cirugía', medico: 'Agustina', tiempoEspera: '30 minutos' },
        { id: 7, nombre: 'Juan', especialidad: 'Neonatología', medico: 'Raul', tiempoEspera: '35 minutos' },
        { id: 8, nombre: 'Maximiliano', especialidad: 'Pediatría', medico: 'Lucas', tiempoEspera: '40 minutos' },
        { id: 9, nombre: 'Sofia', especialidad: 'Dermatología', medico: 'Sasha', tiempoEspera: '45 minutos' },
        { id: 10, nombre: 'Valentina', especialidad: 'Ginecología', medico: 'Martin', tiempoEspera: '50 minutos' },
        { id: 11, nombre: 'Andres', especialidad: 'Dermatología', medico: 'Sasha', tiempoEspera: '55 minutos' },
  ]);
  
    const handlePacienteClick = (paciente) => {
      setPacienteSeleccionado(paciente);
    };
  
    const handleConfirmar = () => {
      // Aquí eliminamos el paciente de la lista
      setPacientes(pacientes.filter(p => p.id !== pacienteSeleccionado.id));
      setPacienteSeleccionado(null);
    };
  
    const handleCancelar = () => {
      setPacienteSeleccionado(null);
    };
  
    return (
      <div className={styles.pantallaMedico}>
        <h1>Lista de espera</h1>
        <ListaPacientes pacientes={pacientes} onPacienteClick={handlePacienteClick} />
        {pacienteSeleccionado && (
          <ModalConfirmacion
            paciente={pacienteSeleccionado}
            onConfirmar={handleConfirmar}
            onCancelar={handleCancelar}
          />
        )}
      </div>
    );
  };
  
  export default PantallaMedico;