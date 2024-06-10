import Boton from "../boton"
import styles from "./formDesplegable.module.css"

export default function formDesplegable({}){
    return (
        <div class= "dropdown">
        <form action="/submit" method="post">
            <select id="opciones" name="opciones">
                <option value="opcion1">Pediatria</option>
                <option value="opcion2">Ginecología</option>
                <option value="opcion3">Neonatología</option>
                <option value="opcion4">Cardiología</option>
                <option value="opcion4">Otorrinolaringología</option>
                <option value="opcion4">Cirugía</option>
            </select>
        </form>
        </div>
    )
}
