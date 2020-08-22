import React from 'react';
import './Cell.css'
const Cell = (props) =>{
    const{group, professor, name, classroom,style}=props;
    console.log(style)
    return(
        <div className={"cell-container item"} style={style}>
            <span className={'name'}>{name}</span><br/>
            <span className={'professor'}>{professor}</span><br/>
            <span className={'classroom'}>Salon:{classroom}</span><br/>
            <span className={'group'}>Grupo:{group}</span>
        </div>
    )
}
export default Cell;