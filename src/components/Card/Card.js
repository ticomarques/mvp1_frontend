import React from 'react'

function Card(props) {
  return (
    <div className="item">
        <h3>{props.item.nome}</h3>
        <a href={props.item.link}>link - ({props.item.link})</a>
        <p className="preco">{props.item.valor}</p>
        <p>Apenas {props.item.quantidade_participantes} vagas nessa rachadinha</p>
        <button onClick={e => props.handleDelete(e, props.item.nome)}>Deletar</button>
    </div>
  )
}

export default Card