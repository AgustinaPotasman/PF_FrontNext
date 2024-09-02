'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.css'; 
import Image from 'next/image';
import Link from 'next/link';

const HomePage = () => {
  const [showMap, setShowMap] = useState(false); // Estado para mostrar el mapa

  // Maneja el clic del botón "Ver mapa"
  const handleMapClick = () => {
    setShowMap(prevState => !prevState); // Alterna entre mostrar y ocultar el mapa
  };

  return (
    <div className={styles.pageContainer}>
      {!showMap ? (
        // Pantalla inicial con el logo y los tres botones
        <>
          <div className={styles.logoContainer}>
      <Image
        src="/img/logos.png"
        alt="Logo"
        layout="intrinsic"
        width={300} // Cambia el ancho según lo necesites
        height={150} // Cambia la altura según lo necesites
      />
</div>

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
        </>
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
        <button className={styles.secondaryButton} onClick={handleMapClick}>
          Volver
        </button>
      </div>
      
      )}
    </div>
  );
};

export default HomePage;
