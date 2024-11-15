import {  useContext } from 'react';
import { UserContext } from '../UserContext';


export default function Acceso (){
const { user } = useContext(UserContext);

if (!user) {
    return (
      <div>
        <p className={styles.noUserMessage}>Acceso restringido. Inicie sesión</p>
        <button 
          onClick={() => window.location.href = '/Login'} 
          className={styles.loginButton}
        >
          Ir a Login
        </button>
      </div>
    );
  }
}