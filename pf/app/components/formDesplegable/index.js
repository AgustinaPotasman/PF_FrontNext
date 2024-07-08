'use client';

import React, { useEffect, useState } from 'react';
import styles from './formDesplegable.module.css';


export default function FormDesplegable() {
/*useEffect(() => {

  const url = 'http://localhost:3001/api/areas'; 

  const fetchCategorias = async () => {
      try {
          const response = await fetch(url);
          if (!response.ok) {
              throw new Error(`Error: ${response.status} ${response.statusText}`);
          }
          const data = await response.json();
          console.log('Obtuve respuesta:', data);
          setCategorias(data);
      } catch (error) {
          setError(error);
          console.error('Error:', error);
      }
  };

  fetchCategorias();
  console.log(fetchCategorias);
}, []); 
*/


const [categorias, setCategorias] = useState([]);
const [error, setError] = useState(null);

const url = 'http://localhost:3001/api/areas'

useEffect(() => {
  const fetchProductos = async () => {
      const response = await fetch(url);
      const categorias = await response.json();
      setCategorias(categorias);
  };

  fetchProductos();
}, []);

  return (
    <div className={styles.formDesplegable}>
      <form action="/submit" method="post">
        <select id="opciones" name="opciones" className={styles.select}>
          {categorias.map((categorias) => (
            <option key={categorias.id} value={categorias.id}>{categorias.nombre}</option>
          ))}
        </select>
      </form>
    </div>
  );
}

