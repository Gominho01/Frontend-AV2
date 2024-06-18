// Services.js
import React from 'react';
import "../styles/home.css";

const Services = () => {
  return (
    <div className="services-container">
      <h2>Nossos Serviços de TI</h2>
      <div className="services-list">
        <div className="service">
          <h3>Serviço 1</h3>
          <p>Descrição do serviço 1.</p>
        </div>
        <div className="service">
          <h3>Serviço 2</h3>
          <p>Descrição do serviço 2.</p>
        </div>
        <div className="service">
          <h3>Serviço 3</h3>
          <p>Descrição do serviço 3.</p>
        </div>
        <div className="service">
          <h3>Serviço 4</h3>
          <p>Descrição do serviço 4.</p>
        </div>
      </div>
    </div>
  );
};

export default Services;
