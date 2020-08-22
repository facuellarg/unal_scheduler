import React from 'react';
import Cell from './../Cell'
import HeaderCell from './../HeaderCell'
import './Panel.css'

const Panel =(props)=>{
    const {horario} = props
    const days =['lunes','martes','miercoles','jueves','viernes','sabado']
    const get_hour_interval=(horario)=>{
      let max = 0
      let min = 25 
      Object.keys(horario).map( code=>{
        Object.keys(horario[code]).map( day=>{
          let hour = horario[code][day]['hour']
          let start_hour = hour[0].split(':')[0]
          let end_hour = hour[1].split(':')[0]
          if( min > start_hour){
            min = start_hour
          }
          if( max < end_hour){
            max = end_hour
          }     
          return ""
        })
        return ""
      })
      return {'min':min,'max':max}
    }

    const jsUcfirst= (string) => {return(string.charAt(0).toUpperCase() + string.slice(1))}
    const normalize = word=> word.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    const {min, max} = get_hour_interval(horario)
    const rows = (max - min)

    
    return(
        <div className={'panel-container'} style={{gridTemplateRows: `repeat(${rows+1}, auto)`}}>
          <HeaderCell day={'Hora'}></HeaderCell>
          {days.map( (day,key)=>
            <HeaderCell day={jsUcfirst(day)} key={key}></HeaderCell>
          )}
          {[...Array(rows).keys()].map( (val,key)=>{
          
          return(
            <HeaderCell day={parseInt(min)+val} 
                        key={key}
                        style={{gridRow:`${val+2}`,
                                gridColumn:1,
                                }}>
                        </HeaderCell>
          )
          })}
        {Object.keys(horario).map( (code) =>{
            return(
                Object.keys(horario[code]).map( (day,key)=>{
                  const{name,group,classroom,professor,hour} =horario[code][day]
                  const column = days.findIndex(element=>element === normalize(day))+2
                  const start_hour = parseInt(hour[0].split(':')[0])
                  const end_hour = parseInt(hour[1].split(':')[0])
                  const size = end_hour-start_hour
                  console.log(start_hour-min+1)
                  return(
                    <Cell key={key}
                    name={name}
                    group={group}
                    professor={professor}
                    classroom={`${classroom[0]}-${classroom[1]}`}
                    hour={`${hour[0]}-${hour[1]}`}
                    style={{
                            gridColumn:column,
                            gridRow:`${start_hour-min+2} / span ${size}`,
                          }}>
                    </Cell>
                  )
                }
                  
                )
            )
        })
          }</div>
    )
}

export default Panel