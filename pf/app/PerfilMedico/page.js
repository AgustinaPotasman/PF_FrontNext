"use client"

import React , {useState, useEffect } from "react";
import axios from 'axios';
import ListaPacientes from '../components/ListaPacientes';
import ModalConfirmacion from '../components/ModalConfirmacion';
import styles from './page.module.css';

const PantallaMedico = () => {
    const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null);
    const [pacientes, setPacientes] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/api/pacientes")
            .then(response => {
                setPacientes(response.data);
            })
    }, []);

    const handlePacienteClick = (paciente) => {
        setPacienteSeleccionado(paciente);
    };

    const handleConfirmar = () => {
        axios.post(`http://localhost:3000/api/pacientes/${pacienteSeleccionado.id}/confirmar`)
            .then(response => {
                setPacientes(pacientes.filter(p => p.id !== pacienteSeleccionado.id));
                setPacienteSeleccionado(null);
            })
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
