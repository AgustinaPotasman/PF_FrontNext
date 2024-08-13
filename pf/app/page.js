'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.css'; 
import Image from 'next/image';
import Boton from './components/boton';

const HomePage = () => {
  const [showLogo, setShowLogo] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Temporizador para ocultar el logo después de 2 segundos
    const timerLogo = setTimeout(() => {
      setShowLogo(false);
    }, 2000);

    // Temporizador para mostrar el contenido después de ocultar el logo
    const timerContent = setTimeout(() => {
      setShowContent(true);
    }, 2000); // Espera el mismo tiempo que el ocultamiento del logo

    // Limpiar los temporizadores si el componente se desmonta
    return () => {
      clearTimeout(timerLogo);
      clearTimeout(timerContent);
    };
  }, []);

  return (
    <div className={styles.logoContainer}>
      {showLogo ? (
        <div>
          <Image
            src="/img/LOGO.jpg"
            alt="Logo"
            layout="intrinsic" // O 'responsive' según el caso
            width={360} // Ajusta el ancho si es necesario
            height={180} // Ajusta la altura para mantener la proporción
          />
        </div>
      ) : (
        <div className={`${styles.homeContent} ${showContent ? styles.show : ''}`}>
          <h1>Bienvenido a la Hospiturn</h1>
          <h4>Reserva tu turno medico</h4>
          <div className={styles.container}>
            <a href="/informacion">
              <Boton sendText={"¡Empeza aca!"} type={"secondary"} />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
