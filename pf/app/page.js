'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.css'; 
import Image from 'next/image';
import Boton from './components/boton';

const HomePage = () => {
  const [showLogo, setShowLogo] = useState(true);

  useEffect(() => {
    // Temporizador para ocultar el logo después de 5 segundos
    const timer = setTimeout(() => {
      setShowLogo(false);
    }, 5000);

    // Limpiar el temporizador si el componente se desmonta
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {showLogo ? (
        <div className={styles.logoContainer}>
          <Image
            src="/img/LOGO.jpg"
            alt="Logo"
            layout="fill" // Ajusta el tamaño de la imagen al contenedor
            objectFit="contain" // Mantiene la proporción de la imagen
          />
        </div>
      ) : (
        <div className={styles.homeContent}>
          {/* Aquí va el contenido principal de la página de inicio */}
          <h1>Bienvenido a la Hospiturn</h1>
          <h4>Reserva tu turno medico"</h4>
        </div>
        
      )}
      <div className={styles.container}>
        <link href="/informacion"><Boton sendText={"¡Empeza aca!"} type={"secondary"}></Boton></link>
      </div>
    </div>
  );
};

export default HomePage;



      <img
  src="/img/LOGO.jpg"
  alt="Logo"
  style={{ width: '360px', height: 'auto' }} 
/>
      
