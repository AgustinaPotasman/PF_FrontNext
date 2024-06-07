'use client'

import React, {useState} from "react"

import Titulo from "../components/Titulo";
import Input from "../components/Input";
import styles from "./page.module.css";
import FormDesplegable from "../components/FormDesplegable";
import Boton from "../components/Boton";
import Formulario from "../components/AlertConf";

export default function Home() {

  const [openAlert, setOpenAlert] = useState(false)

  
const handleOpenAlert = () => {
setOpenAlert(true)
}

  return (
    <main>
        <Titulo params="Informacion"></Titulo>
        <Input iType="text" iPlaceholder="Ingrese sus sintomas"></Input>
        <FormDesplegable/>
        {openAlert && <Formulario/>}
        <Boton sendText={"Siguiente"} onClick={() => handleOpenAlert}/>
    </main>
  );
}


/*
// Obtiene el botón y el modal
var openModalBtn = document.getElementById("openModalBtn");
var modal = document.getElementById("myModal");

// Abre el modal cuando se hace clic en el botón
openModalBtn.onclick = function() {
  modal.style.display = "block";
};

// Cierra el modal cuando se hace clic fuera del contenido del modal
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
*/