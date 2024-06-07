
import Titulo from "../components/titulo";
import Input from "../components/input";
import styles from "./page.module.css";

export default function home() {
  return (
    <main>
        <Titulo params="Informacion sobre el turno!"></Titulo>
        <Input iType="text" iPlaceholder="Ingrese sus sintomas"></Input>
    </main>
  );
}
