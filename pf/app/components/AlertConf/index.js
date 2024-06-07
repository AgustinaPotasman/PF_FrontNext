
import Input from "../Input"

export default function Formulario({}){
   
  if(openAlert == true){
    return(
    <>
    <div id="myModal" class="modal">
      <div class="modal-content">
        <form id="myForm" method="post">
          <Input iPlaceholder="Confrmo"></Input><br></br>
          <Input iPlaceholder="Rechazar"></Input><br></br>
        </form>
      </div>
    </div>
    </>      
    )
}}

 
     