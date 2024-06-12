import React from 'react';
import "../../styles/header.css"
import Predio1 from '../../imagens/Predio1.jpeg';
import Predio2 from '../../imagens/Predio2.jpeg';
import Predio3 from '../../imagens/Predio3.jpeg';
import Predio4 from '../../imagens/Predio4.jpeg';

const History = () => {
    return (
      <>
          <h2>Nossa História</h2>
          <p>Uma breve história da empresa...</p>
          <iframe width="420" height="315" src="https://www.youtube.com/embed/tgbNymZ7vqY"></iframe>
          <h2>Galeria de Fotos</h2>
          <div className="gallery">
            <img src={Predio1} alt="Foto 1" />
            <img src={Predio2} alt="Foto 2" />
            <img src={Predio3} alt="Foto 3" />
            <img src={Predio4} alt="Foto 4" />
          </div>
      </>
    );
  };

  export default History;