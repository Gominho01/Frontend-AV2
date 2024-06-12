// PaymentMethods.js
import React from 'react';
import pix from '../../imagens/pix.png';
import cartao from '../../imagens/cartao.png';
import boleto from '../../imagens/boleto.png';

const PaymentMethods = () => {
  return (
    <div className="payment">
      <h3>Formas de Pagamento</h3>
      <img src={pix} alt="Forma de pagamento 1" />
      <img src={cartao} alt="Forma de pagamento 2" />
      <img src={boleto} alt="Forma de pagamento 3" />
    </div>
  );
};

export default PaymentMethods;
