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
      <form className={styles.formContainer}> {/* Aplica la clase CSS local al form */}
        <select
          id="opciones"
          name="opciones"
          onChange={handleChange}
          defaultValue=""
          className={styles.selectDropdown}  // Aplica la clase CSS local al select
        >
          <option value="" disabled>Seleccione un área</option>
          {categorias.map((cat) => (
            <option key={cat.Id} value={cat.Id}>
              {cat.Especialidad}
            </option>
          ))}
        </select>
      </form>
    </div>
  );
}
