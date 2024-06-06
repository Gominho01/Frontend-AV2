// PaymentMethods.js
import React from 'react';

const PaymentMethods = () => {
  return (
    <div className="payment">
      <h3>Formas de Pagamento</h3>
      <img src="../imagens/pix.png" alt="Forma de pagamento 1" />
      <img src="../imagens/cartao.png" alt="Forma de pagamento 2" />
      <img src="../imagens/boleto.png" alt="Forma de pagamento 3" />
      {/* Adicione mais imagens conforme necessário */}
    </div>
  );
};

export default PaymentMethods;
