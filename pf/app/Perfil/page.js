'use client';

import React from 'react';
import styles from './page.module.css';
import Form from '../components/Form';
import Titulo from '../components/titulo';
import Footer from '../components/footer';

export default function Home() {
    return (
        <div>
            <ProximoTurnoPage />
        </div>
    );
}

const ProximoTurnoPage = () => {
    return (
        <main className={styles.container}>
            <Titulo params="Agustina Potasman"></Titulo>
            <Form />
            <Footer></Footer>
        </main>
  
    );
};
