import React from 'react';
import './HeaderCell.css'
const HeaderCell =(props)=>{
    const {day,style} = props
    return(
        <span className="header_cell" style={style}>{day}</span>
    )
}

export default HeaderCell