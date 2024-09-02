'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.css'; 
import Image from 'next/image';
import Boton from './components/boton';
import Link from 'next/link';

const HomePage = () => {
  const [showContent, setShowContent] = useState(false);
  const [showSecondaryScreen, setShowSecondaryScreen] = useState(false); // Estado para la segunda pantalla
  const [showMap, setShowMap] = useState(false); // Estado para mostrar el mapa

  useEffect(() => {
    const timerContent = setTimeout(() => {
      setShowContent(true);
    }, 500); 

    return () => {
      clearTimeout(timerContent);
    };
  }, []);

  // Maneja el clic del botón "¡Empezá acá!"
  const handleButtonClick = () => {
    setShowSecondaryScreen(true); // Muestra la segunda pantalla al hacer clic
  };

  // Maneja el clic del botón "Ver mapa"
  const handleMapClick = () => {
    setShowMap(true); // Muestra el mapa al hacer clic
  };

  return (
    <div className={styles.pageContainer}>
      {!showSecondaryScreen ? (
        // Pantalla de bienvenida
        <div>
          <div className={styles.logoContainer}>
            <Image
              src="/img/LOGO.jpg"
              alt="Logo"
              layout="intrinsic"
              width={360} 
              height={180}
            />
          </div>
          <div className={`${styles.homeContent} ${showContent ? styles.show : ''}`}>
            <h1>Bienvenido a Hospiturn</h1>
            <h4>Reserva tu turno médico</h4>
            <div className={styles.container}>
              <Boton sendText={"¡Empezá acá!"} type={"secondary"} onClick={handleButtonClick} />
            </div>
          </div>
        </div>
      ) : (
        // Segunda pantalla con la foto y los botones
        <div className={styles.secondaryScreen}>
          {!showMap ? (
            // Vista inicial de la segunda pantalla sin el mapa
            <div className={styles.buttonsContainer}>
              <Link href="/informacion" passHref legacyBehavior>
                <a className={styles.linkButton}>
                  Sacar Turno
                </a>
              </Link>

              <div className={styles.nextTurnContainer}>
                <span className={styles.nextTurnLabel}>Próximo turno en:</span>
                <span className={styles.nextTurnValue}>---</span>
              </div>

              <button className={styles.secondaryButton} onClick={handleMapClick}>
                Ver mapa
              </button>
            </div>
          ) : (
            // Vista con el mapa
            <div className={styles.mapContainer}>
              <Image 
                src="/img/mapa.png" 
                alt="Mapa"
                width={360}
                height={200}
                layout="responsive"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;
