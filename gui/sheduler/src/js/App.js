import React from 'react';
import Panel from './components/Panel'
import horario from './../data/horarios.json'
// import 'resize-observer-polyfill/dist/ResizeObserver.global';
const App=()=> {

  return (
    <div>
    <Panel horario={horario}></Panel>

    </div>
    
  // <Cell 
  //   name={"Clase prueba"}
  //   group={4}
  //   professor={'Profesor de prueba'}
  //   classroom={[423,101]}>
  //   </Cell>
  )

}
export default App;


