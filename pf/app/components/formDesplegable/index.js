// formDesplegable.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./formDesplegable.module.css";

export default function FormDesplegable({ onSelectArea }) {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/areas")
      .then(response => {
        console.log("Datos recibidos de la API:", response.data); // Verifica los datos recibidos
        setCategorias(response.data); // Guardamos las categorías recibidas
      })
      .catch(error => {
        console.error('Error fetching categorias:', error); // Manejo de errores
      });
  }, []);

  const handleChange = (event) => {
    const selectedId = Number(event.target.value); // Convertimos el valor seleccionado a número
    console.log("ID convertido (en handleChange):", selectedId); // Verificamos que el ID convertido sea correcto
    onSelectArea(!isNaN(selectedId) ? selectedId : null); // Actualizamos el área seleccionada
  };

  return (
    <div className={styles.dropdown}>
      <form>
        <select id="opciones" name="opciones" onChange={handleChange} defaultValue="">
          <option value="" disabled>Seleccione un área</option>
          {categorias.map(cat =>  
            <option key={cat.Id} value={cat.Id}>
              {cat.Especialidad}
            </option>
          )}
        </select>
      </form>
    </div>
  );
}
