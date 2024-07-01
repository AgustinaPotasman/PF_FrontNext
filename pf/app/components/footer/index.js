import React from 'react';
import styles from './footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles['nav-icon']}>
                <img src="../img/casa.png" alt="Ícono de casa"/>
            </div>
            <div className={styles['nav-icon']}>
                <img src="../img/persona.png" alt="Ícono de persona"/>
            </div>
            <div className={styles['nav-icon']}>
                <img src="../img/tiempo.png" alt="Ícono de tiempo"/>
            </div>
            <div className={styles.indicator}></div>
        </footer>
    );
}
