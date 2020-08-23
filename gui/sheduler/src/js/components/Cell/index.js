import React from 'react';
import './Cell.css'


// const invertHex= hex => {
//     return (Number(`0x1${hex}`) ^ 0xFFFFFF).toString(16).substr(1).toUpperCase()
// }
  
const adjust =(color, amount)=> {
    return '#' + color.replace(/^#/, '').replace(/../g, color => ('0'+Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
}
const backgroundStyle =(color, color_opacity)=>{
    return(
        {
            // background: color,
            background: `linear-gradient(180deg, ${color}${color_opacity} 10%, ${adjust(color,50)} 95%)`,
            // color:`#${invertHex(color.replace('#',''))}`,
        }
    )
}
const Cell = (props) =>{
    // const{group, professor, name, classroom,style,color,color_opacity, hour}=props;
    const{ name, classroom,style,color,color_opacity}=props;
    
    // console.log(invertHex(color.replace('#','')))
    return(
        <div className={"cell-container item"} style={{...style,...backgroundStyle(color,color_opacity)}}>
            <span className={'name'}>{name}</span>
            {/* <span className={'professor'}>{professor}</span> */}
            <span className={'classroom'}>Salon:{classroom}</span>
            {/* <span className={'group'}>Grupo:{group}</span> */}
            {/* <span className={'hour'}>Hora:{hour}</span> */}
            
        </div>
    )
}
export default Cell;