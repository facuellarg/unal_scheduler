import React ,{ useState, useEffect } from 'react';
import Cell from './../Cell'
import HeaderCell from './../HeaderCell'
import './Panel.css'





const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}


const useWindowDimensions =()=> {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

const Panel =(props)=>{
  const {horario} = props
  const days =['lunes','martes','miercoles','jueves','viernes','sabado']
  const { height, width } = useWindowDimensions();

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




  const gradient_time = (<linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" style={{stopColor:'rgb(100,100,100)',stopOpacity:.8}} />
                      <stop offset="100%" style={{stopColor:'rgb(180,180,180)',stopOpacity:.5}} />
                    </linearGradient>)
  const gradient_day = (<linearGradient id="grad2" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style={{stopColor:'rgb(100,100,100)',stopOpacity:.5}} />
       <stop offset="100%" style={{stopColor:'rgb(180,180,180)',stopOpacity:.2}} />
          </linearGradient>
)

    const jsUcfirst= (string) => {return(string.charAt(0).toUpperCase() + string.slice(1))}
    const normalize = word=> word.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    const {min, max} = get_hour_interval(horario)
    const rows = (max - min)

    
    return(
        <div className={'panel-container'} style={{gridTemplateRows: `repeat(${rows+1}, auto)`}}>
           <svg style={{height:'100%',width:"100%",gridRow:`1 / span ${rows+1}`, gridColumn:1,margin:0,padding:0}}>
              {gradient_day}
              {gradient_time}
              <rect className={'rectangle'} width="100%" height="100%" style={{fill:`url(#${gradient_time.props['id']})`}}  />
          </svg>
          <HeaderCell day={'Hora'}  style={{gridColumn:1, gridRow:1}}></HeaderCell>
          
          
          {days.map( (day,key)=>{
            return(
              <svg key={key} style={{height:'100%',width:"100%",gridRow:`1 / span ${rows+1}`, gridColumn:key+2,margin:0,padding:0}}>
                <rect className={'rectangle'} width="100%" height="100%" style={{fill:`url(#${gradient_day.props['id']})`}}  />
              </svg>)
          })}
          
          {days.map( (day,key)=>{
            return(
            <HeaderCell day={jsUcfirst(day)} style={{gridRow:1,gridColumn:key+2}} key={key}></HeaderCell>)}
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
          {[...Array(rows).keys()].map( (val,key)=>{
          return(
            <svg key={key} style={{gridColumn:"1 / span 7", gridRow:`${val+2}`}} height="100%" width="100%">
              <line x1="0" y1="100%" x2={width} y2="100%" style={{stroke:"rgba(219,219,219,0.9)",strokeWidth:2}} />
          </svg>
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
          }
          <svg style={{marginBottom:"3%",gridColumn:"1 / span 7", gridRow:1}} height="100%" width="100%" >
            <line x1="0" y1="100%" x2={width} y2="100%" style={{ stroke:"rgba(219,219,219,0.9)",strokeWidth:2}} />
          </svg>
          </div>
    )
}

export default Panel