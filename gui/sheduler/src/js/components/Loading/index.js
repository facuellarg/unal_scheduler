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

const list_images=[
    'https://gifsanimados.de/img-gifsanimados.de/i/informatica/usuarios.gif',
    'https://gifsanimados.de/img-gifsanimados.de/i/informatica/ordenador-14.gif',
    'https://gifsanimados.de/img-gifsanimados.de/i/informatica/informatica-12.gif',
    'https://gifsanimados.de/img-gifsanimados.de/i/informatica/animation.gif'

]

const randomLoading= (list)=>{
    return list[Math.round(Math.random() * list.length)]
}
const Loading = props=>{
    const {show} = props

if (show){
    return(
        <div className={'loading-container'}>
            <ReactLoading type={randomLoading(list).prop} color="rgb(148,180,56)" />
            <h1>Estamos hackeando la NASA para conseguir su horario, por favor espere</h1>
            <img src={randomLoading(list_images)} alt="hacking"/>
        </div>
    )
}else{
   return( <div display="none"></div>)
}
}
export default Loading