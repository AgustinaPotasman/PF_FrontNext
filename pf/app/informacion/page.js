'use client';

import React, { useState } from 'react';
import Titulo from '../components/titulo';
import Input from '../components/input';
import styles from './page.module.css';
import formDesplegable from '../components/formDesplegable';
import Boton from '../components/boton';
import Modal from '../components/Modal';
import Footer from '../components/footer';
import Subtitulo from '../components/subtitulo/page';

export default function Home() {
  const [openAlert, setOpenAlert] = useState(false);

  const handleOpenAlert = () => {
    console.log('Abriendo modal');  
    setOpenAlert(true);
  };

  const handleCloseAlert = () => {
    console.log('Cerrando modal'); 
    setOpenAlert(false);

  };

  return (
    <main className={styles.container}>
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
    <PerfilMedico></PerfilMedico>
    <Footer></Footer>
    </main>
  );
}
// <FormDesplegable categorias={categorias} /> {/* Asegúrate de pasar las categorías al componente FormDesplegable */}


