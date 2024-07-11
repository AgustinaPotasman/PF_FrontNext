import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './modal.module.css';
import Boton from '../boton';

const Modal = ({ onClose, children }) => {
  const router = useRouter();

  const handleConfirm = () => {
    router.push('./ProximoTurno'); 
  };

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h5 className={styles.modalTitle}>¿Seguro que quieres confirmar el turno?</h5>
        </div>
        <div className={styles.modalFooter}>
          <Boton sendText="Confirmar" onClick={handleConfirm} />
          <Boton sendText="Rechazar" onClick={onClose} />
        </div>
      </div>
    </div>
  );
};

export default Modal;
