"use client";

import React, { useState, useContext } from "react";
import { UserContext } from "../components/UserContext";
import styles from "./page.module.css";
import axios from 'axios';

export default function LoginForm({ onSwitchToLogin }) {
    const [activeTab, setActiveTab] = useState("register");
    const { setUser } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isDoctor, setIsDoctor] = useState(false);

    const handleSubmitRegister = async (event) => {
        event.preventDefault();
        setLoading(true);
        setErrorMessage("");
    
        const newUser = {
            nombre: event.target.registerName.value.trim(),
            apellido: event.target.registerLastname.value.trim(),
            DNI: event.target.registerDNI.value.trim(),
            gmail: event.target.registerEmail.value.trim(),
            contrasena: event.target.registerPassword.value,
            telefono: event.target.registerTelefono.value.trim(),
            foto: event.target.registerFoto.value.trim(),
            ObraSocial: isDoctor ? null : event.target.registerObraSocial.value.trim(),  
        };

        if (isDoctor) {
            newUser.idArea = event.target.registerIdArea.value.trim();
        }

        console.log("Nuevo usuario:", newUser); 

        const API_URL = "http://localhost:3000/api/user/register";   
        console.log(`Enviando a: ${API_URL} con datos:`, newUser); 
    
        try {
            const response = await axios.post('http://localhost:3000/api/user/register', newUser, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
    
            alert("Registro exitoso. Ahora puedes iniciar sesión.");
        } catch (error) {
            console.error('Error en el registro:', error.response ? error.response.data : error.message);
            setErrorMessage(
                error.response?.data?.message || 
                "Error en el registro. Por favor, verifica los datos."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.body}>
            <div className={styles.container}>
                <h2 className={styles.title}>Registro</h2>  {/* Título agregado aquí */}
                <form onSubmit={handleSubmitRegister} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label htmlFor="registerName">Nombre</label>
                        <input type="text" id="registerName" required />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="registerLastname">Apellido</label>
                        <input type="text" id="registerLastname" required />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="registerEmail">Email</label>
                        <input type="email" id="registerEmail" required />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="registerDNI">DNI</label>
                        <input type="text" id="registerDNI" required />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="registerPassword">Contraseña</label>
                        <input type="password" id="registerPassword" required />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="registerTelefono">Teléfono</label>
                        <input type="text" id="registerTelefono" required />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="registerFoto">Foto</label>
                        <input type="text" id="registerFoto" required />
                    </div>

                    {!isDoctor && (
                        <div className={styles.formGroup}>
                            <label htmlFor="registerObraSocial">Obra Social</label>
                            <input type="text" id="registerObraSocial" required />
                        </div>
                    )}
                    
                    <div className={styles.formGroup}>
                        <label>
                            ¿Sos médico?
                            <input
                                type="checkbox"
                                checked={isDoctor}
                                onChange={() => setIsDoctor(!isDoctor)}
                            />
                        </label>
                    </div>

                    {isDoctor && (
                        <div className={styles.formGroup}>
                            <label htmlFor="registerIdArea">Área</label>
                            <input type="text" id="registerIdArea" required />
                        </div>
                    )}

                    {errorMessage && <div className={styles.error}>{errorMessage}</div>}
                    <button type="submit" className={styles.btnPrimary} disabled={loading}>
                        {loading ? "Loading..." : "Registrarse"}
                    </button>
                </form>
                <button
                    onClick={() => (window.location.href = "/Login")}
                    className={styles.btnSecondary}
                >
                    Ir a Login
                </button>
            </div>
        </div>
    );
}
