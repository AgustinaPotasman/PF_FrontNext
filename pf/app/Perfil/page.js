'use client';

import React, { useState } from 'react';
import Titulo from '../components/titulo';
import Input from '../components/input';
import styles from './page.module.css';
import FormDesplegable from '../components/formDesplegable';
import Boton from '../components/boton';
import Modal from '../components/Modal';

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
            <Titulo params="Proximo Turno" />
        </main>
    );
};
