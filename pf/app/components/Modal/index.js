import React from 'react';
import styles from './modal.module.css';
import Boton from '../boton';


const Modal = ({ onClose, children }) => {
  return (
    <div className={styles.modalBackdrop}>
    <div className={styles.modalContent}>
      <div class="modal-header">
        <h5 class="modal-title">¿Seguro que quieres confriamr el turno?</h5>
      </div>
      <div class="modal-footer">
      <Boton sendText= "Confirmar" onClick={onClose}/>
      <Boton sendText="Rechazar" onClick={onClose}/>
      </div>
    </div>
  </div>
  );
};

export default Modal;
