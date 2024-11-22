"use client";

import React, { useEffect, useState, useContext } from 'react';
import styles from './page.module.css'; 
import Image from 'next/image';
import { UserContext } from '../components/UserContext'; 
import Link from 'next/link';
import Footer from '../components/footer';


export default function Home() {
  const [showMap, setShowMap] = useState(false);
  const [buttonsVisible, setButtonsVisible] = useState(false);
  const { user } = useContext(UserContext);

 


  const handleMapClick = () => {
    setShowMap(prevState => !prevState); 
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setButtonsVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

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
    <div className={styles.pageContainer}>


      {!showMap ? (
        <>
          <div className={styles.logoContainer}>
            <Image
              src="/img/logos.png"
              alt="Logo"
              layout="intrinsic"
              width={300} 
              height={150} 
            />
          </div>

          {buttonsVisible && (
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
          )}
          <Footer />
        </>
      ) : (
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
