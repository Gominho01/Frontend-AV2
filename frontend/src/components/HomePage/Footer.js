import React from 'react';
import pix from '../../imagens/pix.png';
import cartao from '../../imagens/cartao.png';
import boleto from '../../imagens/boleto.png';

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer contact">
          <h3>Contatos</h3>
          <ul>
            <li>Telefone: (81) 90000-0000</li>
            <li>WhatsApp: (81) 90000-0000</li>
            <li>Email: <a href="mailto:contato@empresa.com">contato@empresa.com</a></li>
          </ul>
        </div>
        <div className="footer address">
          <h3>Endereço</h3>
          <p>Rua Cais do Apolo, 77 - Bairro do Recife - Recife/PE - CEP: 90000-000</p>
        </div>
        <div className="footer payment">
          <h3>Formas de Pagamento</h3>
          <img src={pix} alt="Forma de pagamento 1" />
          <img src={cartao} alt="Forma de pagamento 2" />
          <img src={boleto} alt="Forma de pagamento 3" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
