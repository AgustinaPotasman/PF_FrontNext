import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./formDesplegable.module.css";

export default function FormDesplegable({ onSelectArea }) {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/areas")
      .then(response => {
        console.log("Datos recibidos de la API:", response.data); // Verifica los datos recibidos
        setCategorias(response.data);
      })
      .catch(error => {
        console.error('Error fetching categorias:', error);
      });
  }, []);

  const handleChange = (event) => {
    const selectedId = Number(event.target.value); // Convierte a número
    console.log("ID convertido:", selectedId); // Verifica el ID convertido

    if (!isNaN(selectedId)) {
      onSelectArea(selectedId);
    } else {
      onSelectArea(null);
    }
  };

  return (
    <div className={styles.dropdown}>
      <form>
        <select id="opciones" name="opciones" onChange={handleChange} defaultValue="">
          <option value="" disabled>Seleccione un área</option>
          {categorias.map(cat =>  
            <option key={cat.Id} value={cat.Id}> {/* Asegúrate de que 'Id' sea el nombre correcto */}
              {cat.Especialidad}
            </option>
          )}
        </select>
      </form>
    </div>
  );
}
