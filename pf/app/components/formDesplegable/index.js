import styles from "./formDesplegable.module.css"
import Boton from "../boton";

export default function formDesplegable({params}){
    return(
        <form action="/submit" method="post">
            <label for="opciones">Opciones:</label>
            <select id="opciones" name="opciones">
                <option value="opcion1">Opción 1</option>
                <option value="opcion2">Opción 2</option>
                <option value="opcion3">Opción 3</option>
                <option value="opcion4">Opción 4</option>
            </select>
            <Boton sendText={"Siguiente"}></Boton>
        </form>
    )
}