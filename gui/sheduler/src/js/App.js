import React from 'react';
import Cell from './components/Cell'
import horario from './../data/horarios.json'
// import 'resize-observer-polyfill/dist/ResizeObserver.global';
const App=()=> {

  return (
    <diiv>
    {Object.keys(horario).map( (code) =>{
      return(
          Object.keys(horario[code]).map( (day,key)=>{
            const{name,group,classroom,professor} =horario[code][day]
            return(
              <Cell key={key}
              name={name}
              group={group}
              professor={professor}
              classroom={classroom}>
              </Cell>
            )
          }
            
          )
      )
    })
    }

    </diiv>
    
  // <Cell 
  //   name={"Clase prueba"}
  //   group={4}
  //   professor={'Profesor de prueba'}
  //   classroom={[423,101]}>
  //   </Cell>
  )

}
export default App;


