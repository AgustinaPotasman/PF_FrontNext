import React from 'react';
import styles from './modal.module.css';
import Boton from '../boton';


const Modal = ({ onClose, children }) => {
  return (
    <div className={styles.modalBackdrop}>
    <div className={styles.modalContent}>
      <div className={styles.modalHeader}>
        <h5 className={styles.modalTitle}>¿Seguro que quieres confriamr el turno?</h5>
      </div>
      <div className={styles.modalFooter}>
      <Boton sendText= "Confirmar" onClick={onClose}/>
      <Boton sendText="Rechazar" onClick={onClose}/>
      </div>
    </div>
  </div>
  );
};

export default Modal;
