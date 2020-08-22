import React from 'react';
import './Cell.css'
const Cell = (props) =>{
    const{group, professor, name, classroom}=props;
    return(
        <div className={"cell-container"}>
            <span className={'name'}>{name}</span><br/>
            <span className={'professor'}>{professor}</span><br/>
            <span className={'classroom'}>Salon:{classroom}</span><br/>
            <span className={'group'}>Grupo:{group}</span>
        </div>
    )
}
export default Cell;