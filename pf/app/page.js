import styles from './page.module.css'
import Titulo from "./components/titulo";
import Boton from "./components/boton";
import Subtitulo from './components/subtitulo/page';
import Link from "next/link";
export default function Home() {
  return (
    <main className={styles.main}>
      <Titulo params="Reserva un turno turnos medicos!"></Titulo>
      <Subtitulo subtitulo="Te asesoramos y atendemos en cualquier inquitud que tengas."></Subtitulo>
      <div className={styles.container}>
        <Link href="/informacion"><Boton sendText={"¡Empeza aca!"} type={"secondary"}></Boton></Link>
      </div>
    </main>
  );
}