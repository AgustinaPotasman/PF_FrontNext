'use client';

import React, { useState } from 'react';
import Titulo from '../components/titulo';
import Input from '../components/input';
import styles from './page.module.css';
import formDesplegable from '../components/formDesplegable';
import Boton from '../components/boton';
import Modal from '../components/Modal';

export default function Home() {
  const [openAlert, setOpenAlert] = useState(false);

  const handleOpenAlert = () => {
    console.log('Opening modal');  // Debug log
    setOpenAlert(true);
  };

  const handleCloseAlert = () => {
    console.log('Closing modal');  // Debug log
    setOpenAlert(false);
  };

  return (
    <main>
      <Titulo params="Informacion" />
      <formDesplegable>
        {formDesplegable({})}
      </formDesplegable>
      <Input iType="text" iPlaceholder="Ingrese sus sintomas" />
      <Boton sendText="siguiente" onClick={handleOpenAlert} />
      {openAlert && (
        <Modal onClose={handleCloseAlert}>
          <div>Contenido del modal</div>
          <button onClick={handleCloseAlert}>Cerrar</button>
        </Modal>
      )}
    </main>
  );
}