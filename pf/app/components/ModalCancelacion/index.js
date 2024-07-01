import React from 'react';
import Boton from '../boton';
import styles from '../ModalCancelacion/ModalCancelacion.module.css';


const Modal = ({ onClose, children }) => {
  return (
    <div className={styles.modalBackdrop}>
    <div className={styles.modalContent}>
      <div className={styles.modalHeader}>
        <h5 className={styles.modalTitle}>¿Seguro que quieres cancelar el turno?</h5>
      </div>
      <div className={styles.modalFooter}>
      <Boton sendText= "Si, cancelar" onClick={onClose}/>
      <Boton sendText="No, volver" onClick={onClose}/>
      </div>
    </div>
  </div>
  );
};

export default Modal;
