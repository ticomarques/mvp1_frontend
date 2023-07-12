import React from 'react'

import videoBG_MP4  from '../assets/video_bg_optimized.mp4'
import videoBG_WEBM from '../assets/video_bg_optimized.webm'

import { Cursor, useTypewriter} from 'react-simple-typewriter';

function Home() {

  // eslint-disable-next-line no-unused-vars
  const [text, count] = useTypewriter({
      words:[
          `Aqui não somos o Bolsonaro,`,
          "mas adoramos uma rachadinha...",
          "Não perca tempo, abra uma rachadinha já!"
      ],
      loop: true,
      delaySpeed: 2000,
    });

  return (
    <div className="container-home">
      

      <div className="bg-video">
          <video className="bg-video__content" autoPlay muted loop>
              <source src={videoBG_MP4} type="video/mp4" />
              <source src={videoBG_WEBM} type="video/webm" />
          </video>
      </div>

      <div className="box-texto">
        {text}
        <Cursor cursorColor="#F7AB0A" />
      </div>
      

      <div className="bt-entrar">
        <button>Acesse já</button>
      </div>

      
  </div>
  )
}

export default Home