import React, {useState} from 'react';
import "../../styles/index.css"
import Predio1 from '../../imagens/Predio1.jpeg';
import Predio2 from '../../imagens/Predio2.jpeg';
import Predio3 from '../../imagens/Predio3.jpeg';
import Predio4 from '../../imagens/Predio4.jpeg';

const History = () => {
  const images = [Predio1, Predio2, Predio3, Predio4];
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
      const isFirstImage = currentIndex === 0;
      const newIndex = isFirstImage ? images.length - 1 : currentIndex - 1;
      setCurrentIndex(newIndex);
  };

  const goToNext = () => {
      const isLastImage = currentIndex === images.length - 1;
      const newIndex = isLastImage ? 0 : currentIndex + 1;
      setCurrentIndex(newIndex);
  };

  return (
    <div className="history-container">
      <h2>Nossa História</h2>
      <p>Uma breve história da empresa...</p>
      <iframe title="history" width="420" height="315" src="https://www.youtube.com/embed/tgbNymZ7vqY"></iframe>
      <h2>Nossas filiais</h2>
      <div className="slider">
        <button className="arrow left-arrow" onClick={goToPrevious}>&#9664;</button>
        <img src={images[currentIndex]} alt={`Foto ${currentIndex + 1}`} className="slider-image" />
        <button className="arrow right-arrow" onClick={goToNext}>&#9654;</button>
      </div>
    </div>
  );
};

export default History;