import React from 'react';
import "../styles/header.css"

const History = () => {
    return (
      <>
          <h2>Nossa História</h2>
          <p>Uma breve história da empresa...</p>
          <iframe width="420" height="315" src="https://www.youtube.com/embed/tgbNymZ7vqY"></iframe>
          <h2>Galeria de Fotos</h2>
          <div className="gallery">
            <img src="../imagens/Predio1.jpeg" alt="Foto 1" />
            <img src="../imagens/Predio2.jpeg" alt="Foto 2" />
            <img src="../imagens/Predio3.jpeg" alt="Foto 3" />
            <img src="../imagens/Predio4.jpeg" alt="Foto 4" />
          </div>
      </>
    );
  };

  export default History;