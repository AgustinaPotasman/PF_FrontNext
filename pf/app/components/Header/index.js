import React from 'react';
import styles from './header.module.css'; 
import Link from 'next/link';

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href="/informacion" className={styles["nav-link"]}>Sacar turno</Link>
      <Link href="/Perfil" className={styles["nav-link"]}>Perfil</Link>
    </header>
  );
}
