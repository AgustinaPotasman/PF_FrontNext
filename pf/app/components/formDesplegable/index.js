// FormDesplegable.js
import React from 'react';
import styles from './formDesplegable.module.css'; // Importa los estilos CSS

export default function FormDesplegable({}) {
  return (
    <div className={styles.formDesplegable}>
      <form action="/submit" method="post">
        <select id="opciones" name="opciones" className={styles.select}>
          <option value="opcion1">Pediatría</option>
          <option value="opcion2">Ginecología</option>
          <option value="opcion3">Neonatología</option>
          <option value="opcion4">Cardiología</option>
          <option value="opcion5">Otorrinolaringología</option>
          <option value="opcion6">Cirugía</option>
        </select>
      </form>
    </div>
  );
}
