import React from 'react';
import ReactLoading from "react-loading";
import './Loading.css'
const list = [
    {
      prop: "balls",
      name: "Balls"
    },
    {
      prop: "bars",
      name: "Bars"
    },
    {
      prop: "bubbles",
      name: "Bubbles"
    },
    {
      prop: "cubes",
      name: "Cubes"
    },
    {
      prop: "cylon",
      name: "Cylon"
    },
    {
      prop: "spin",
      name: "Spin"
    },
    {
      prop: "spinningBubbles",
      name: "SpinningBubbles"
    },
    {
      prop: "spokes",
      name: "Spokes"
    }
];


const randomLoading= (list)=>{
    return list[Math.round(Math.random() * list.length)]
}
const Loading = props=>{
    const {show} = props
    console.log(show)
if (show){
    return(
        <div className={'loading-container'}>
            <ReactLoading type={randomLoading(list).prop} color="rgb(148,180,56)" />
            <h1>Estamos hackeando la nasa para conseguir su horario, por favor espere</h1>
        </div>
    )
}else{
   return( <div display="none"></div>)
}
}
export default Loading