import React, { useEffect, useState } from "react";
import Boton from "../boton";
import styles from "./formDesplegable.module.css"; 
import axios from "axios";

export default function FormDesplegable() {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/api/areas")
      .then(response => {
        setCategorias(response.data); 
      })
      .catch(error => {
        console.error('Error fetching categorias:', error);
      });
  }, []); 

  return (
    <div className={styles.dropdown}>
      <form action="/submit" method="post">
        <select id="opciones" name="opciones">
          {categorias.map(cat =>  
            <option key={cat.id}>{cat.Especialidad}</option>
          )}
        </select>
      </form>
    </div>
  );
}
