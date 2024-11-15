'use client';

import React, { useContext } from 'react';
import { UserContext } from '../components/UserContext'; 
import styles from './page.module.css';
import Footer from '../components/footer';
import Header from '../components/Header';

export default function Perfil() {
  return (
    <div>
      <ProximoTurnoPage />
    </div>
  );
}

const ProximoTurnoPage = () => {
  const { user, setUser } = useContext(UserContext);

  const handleLogout = () => {
    setUser(null);  
    localStorage.removeItem('token');  
    localStorage.removeItem('user');
    window.location.href = '/'; 
  };

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

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <img src="/img/mujer.jpg" className={styles.imagenRedonda} alt="Imagen redonda" />
        <h2>{user?.Nombre || 'Nombre no disponible'}</h2>
      </header>

      <div className={styles.userData}>
        <p><strong>Nombre: </strong>{user?.Nombre || 'No disponible'}</p> 
        <p><strong>Apellido:</strong> {user?.Apellido || 'No disponible'}</p>
        <p><strong>DNI:</strong> {user?.DNI || 'No disponible'}</p>
        <p><strong>Email:</strong> {user?.Gmail || 'No disponible'}</p>
        <p><strong>Teléfono:</strong> {user?.Telefono || 'No disponible'}</p>

        <button onClick={handleLogout} className={styles.logoutButton}>
          Cerrar Sesión
        </button>
      </div>

      <Footer />
    </main>
  );
};
