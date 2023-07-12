import './App.css';

import {useState, useEffect} from 'react'; 
import axios from 'axios';
import Modal from 'react-modal';
import { AwesomeButton } from "react-awesome-button";

import videoBG_MP4  from './assets/video_bg_optimized.mp4'
import videoBG_WEBM from './assets/video_bg_optimized.webm'

import Card from './components/Card/Card';

import 'react-awesome-button/dist/styles.css';



function App() {

  //states
  const [rachadinhas, setRachadinhas] = useState([]);
  const [nome, setNome] = useState('');
  const [link, setLink] = useState('');
  const [quantidade_participantes, setQuantidade_participantes] = useState('');
  const [valor, setValor] = useState('');

  //fetch das rachadinhas da base
  const fetchRachadinhas = async () => {
    const result = await axios('http://localhost:8000/rachadinhas');
    if(result.status !== 200) {
      console.log('Erro inesperado!')
    }
    setRachadinhas(result.data.rachadinhas);
  }
  useEffect(() => {
    fetchRachadinhas();
  }, [])
  

  //Handle Search - executa a busca no banco pelo nome do item
  const handleSearch = async (e) => {
    e.preventDefault();
    if(e.target[0].value === '' || e.target[0].value === 0 || e.target[0].value === null) {
      console.log('Campo vazio')
    }
    const fetchResult = await axios(`http://localhost:8000/rachadinha?nome=${e.target[0].value}`)
    console.log(fetchResult);
    setRachadinhas(Array(fetchResult.data));
  }

  //Handle Add - Efetua adição de uma rachadinha no banco
  const handleAdd = async (e) => {
    e.preventDefault();
    const obj = {
      nome,
      link,
      quantidade_participantes,
      valor
    }

    const resultAdd = await axios.post('http://localhost:8000/rachadinha', obj)

    if(resultAdd.status !== 200) {
      console.log('Erro inesperado!')
    }
    closeModal();
    fetchRachadinhas();
  }

  //Handle Delete - Efetua deleção de uma produto pelo nome
  const handleDelete = async (e, item) => {
    e.preventDefault();
    const fetchResult = await axios.delete(`http://localhost:8000/rachadinha?nome=${item}`)

    if(fetchResult.status !== 200) {
      console.log('Erro inesperado!')
    }
    fetchRachadinhas()
  }


  /** MODAL */
  const [modalIsOpen, setIsOpen] = useState(false);
  Modal.setAppElement('#root');

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  const openModal = () => {
    setIsOpen(true);
  }

  const closeModal = () => {
    setIsOpen(false);
  }

  return (
    <div className="container">

      {/** HERO AREA */}
      <div className="bg-video">
          <video className="bg-video-content" autoPlay muted loop>
              <source src={videoBG_MP4} type="video/mp4" />
              <source src={videoBG_WEBM} type="video/webm" />
          </video>

          <div className="box-texto">
           <h4>Aqui não somos o Bolsonaro, mas gostamos de uma rachadinha... Não perca tempo, crie já sua rachadinha. </h4>
          </div>

          <div className="bt-entrar">
            <AwesomeButton type="primary" href="#container-app">Acesse já</AwesomeButton>
          </div>
      </div>

      
      

      

      {/* APLICAÇÃO */}
      <div className="container-app" id="container-app">
          <div className="container-search">
            <form onSubmit={handleSearch}>
              <label htmlFor="search">Buscar </label>
              <input type="text" name="search" id="search" placeholder="Busque por rachadinha" required/>
              <button type="submit">Buscar</button>
            </form>
          </div>

          <div className="container-rachadinhas">
              <div className="add-rachadinhas">
                <button onClick={openModal}>Adicionar rachadinha</button>
              </div>

              <div className="list-rachadinhas">
                {rachadinhas.map((item, index) => {
                    return <Card item={item} key={index} handleDelete={handleDelete}/>
                })}
              </div>
          </div>
        </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Cadastrar rachadinha"
        
      >
        <div className="container-modal">
          <div className="form-add-rachadinha">
          <form method="post" onSubmit={handleAdd}>
            <h1>Cadastre uma nova rachadinha</h1>
            <input type="text" name="nome" id="nome" placeholder="nome" onChange={e => setNome(e.target.value)} required />
            <input 
              type="text" 
              name="link" 
              id="link" 
              placeholder="link" 
              onChange={e => setLink(e.target.value)} 
              required 
            />
            <input 
              type="text" 
              name="quantidade_participantes" 
              id="quantidade_participantes" 
              placeholder="quantidade de participantes"
              onChange={e => setQuantidade_participantes(e.target.value)}
              required
            />
            <input 
              type="text" 
              name="valor" 
              id="valor" 
              placeholder="valor do item"  
              onChange={e => setValor(e.target.value)}
              required
            />

            <button type="submit">Salvar</button>
            <button type="submit" onClick={e => {closeModal()}}>fechar</button>
          </form>
          </div>
        </div>
      </Modal>
  </div>
  );
}

export default App;
