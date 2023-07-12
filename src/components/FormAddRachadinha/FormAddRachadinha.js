import React from 'react'

function FormAddRachadinha(handleAdd, setNome, setLink, setValor, setQuantidade_participantes) {
  return (
    <div className="container-form-add">
        <form onSubmit={(e) => handleAdd}>
          <input type="text" name="nome" id="nome" placeholder="nome" onChange={e => setNome(e.target.value)} />
          <input type="text" name="link" id="link" placeholder="link" onChange={e => setLink(e.target.value)} />
          <input 
            type="text" 
            name="quantidade_participantes" 
            id="quantidade_participantes" 
            placeholder="quantidade de participantes"
            onChange={e => setQuantidade_participantes(e.target.value)}
          />
          <input type="text" name="valor" id="valor" placeholder="valor do item"  onChange={e => setValor(e.target.value)}/>

          <button type="submit">Buscar</button>
        </form>
    </div>
  )
}

export default FormAddRachadinha