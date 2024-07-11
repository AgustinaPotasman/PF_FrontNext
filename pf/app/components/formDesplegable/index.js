import { useEffect, useState } from "react";
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
    <div className="dropdown">
      <Boton>Dropdown button</Boton>
      <form action="/submit" method="post">
        <select id="opciones" name="opciones">
          {categorias.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.Nombre}</option>
          ))}
        </select>
      </form>
    </div>
  );
}

/* 
import *as axios from “axios”; //en la pantalla del código
const [ pokemones, setDolares] =useState({});
useEffect(() => []{
axios,get(“la url”)
		.then(response =>{
 		console.log(response); //resultado de la api 
setDolares[response.data]
} //la respuesta del json	
console.log(“hola”);
}, [])

*/
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

/*
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
*/ 


/*

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
*/

