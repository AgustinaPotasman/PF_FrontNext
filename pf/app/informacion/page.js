'use client';

import React, { useState } from 'react';
import Titulo from '../components/titulo';
import Input from '../components/input';
import styles from './page.module.css';
import FormDesplegable from '../components/formDesplegable';
import Boton from '../components/boton';
import Modal from '../components/Modal';
import Footer from '../components/footer';

export default function Home() {
  const [openAlert, setOpenAlert] = useState(false);
  const [selectedAreaId, setSelectedAreaId] = useState(null);

  const handleOpenAlert = () => {
    console.log('Abriendo modal');
    console.log('ID del área seleccionada:', selectedAreaId);
    setOpenAlert(true);
  };

  const handleCloseAlert = () => {
    console.log('Cerrando modal');
    setOpenAlert(false);
  };

  const handleSelectArea = (id) => {
    console.log('Área seleccionado:', id);
    setSelectedAreaId(id);
  };

  return (
    <main className={styles.container}>
      <Titulo params="Informacion" />
      <FormDesplegable onSelectArea={handleSelectArea} />
      <Input iType="text" iPlaceholder="Ingrese sus sintomas" />
      <Boton sendText="siguiente" onClick={handleOpenAlert} />
      {openAlert && (
        <Modal onClose={handleCloseAlert}>
          <div>Contenido del modal</div>
          <button onClick={handleCloseAlert}>Cerrar</button>
        </Modal>
      )}
      <Footer />
    </main>
  );
}
