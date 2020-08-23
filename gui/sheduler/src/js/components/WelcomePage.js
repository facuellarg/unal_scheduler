import React ,{useState}from 'react';
import Panel from './Panel'
import horario from './../../data/horario.json'
const WelcomePage = (props)=>{
    const {name} = props; 
    // const[schedule, set_schedule] = useState(horario);
    const[schedule, set_schedule] = useState(null);
    const[loading, set_loading] = useState(false);
    const url ='http://127.0.0.1:5000/scheduler'
    let user,password;
    const on_click_test =()=>{
        set_loading(true)
        fetch(`${url}?user=${user.value}&password=${password.value}`)
        .then(res => {
            
            return(res.json())
        })
        .then(
          (result) => {
            if (result['status'] === 200){
                set_schedule(result['data'])
            }
            set_loading(false)
          },
          // Nota: es importante manejar errores aquí y no en 
          // un bloque catch() para que no interceptemos errores
          // de errores reales en los componentes.
          (error) => {
            console.log(error)
            set_loading(false)
          }
        )
    }

        
        if (loading){
            return (<h1>Estamos hackeando la nasa para conseguir su horario, por favor espere</h1>)
        }else{
            if (schedule){
                return <Panel schedule={schedule}></Panel>;
            }else{
                return( 
                    <div>
                    <h1>Esta es una herramienta para tratar de mostrar el horario <br/>de una manera mas agradable y entendible a los estudiantes de la UNAL</h1>
                    <form>
                        <input name="username" ref={(u) => user = u} type='text' autoComplete='off' placeholder="Usuario Unal"></input><br/>
                        <input name="password" ref={(p) => password = p} type='password' placeholder="Contraseña"></input><br/>
                    </form>
                    <button onClick={on_click_test}>MostrarHorario</button>
                </div>)
            }
           
        }
        
       
    
}
export default WelcomePage

