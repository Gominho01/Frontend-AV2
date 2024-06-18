// FounderTable.js
import React from 'react';
import "../styles/home.css";

const FounderTable = () => {
  return (
    <div className="tabela">
      <table>
        <caption>Fundadores</caption>
        <thead>
          <tr>
            <th>Cargo</th>
            <th>Nome</th>
            <th>Breve CV</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>CEO</td>
            <td>João Silva</td>
            <td>Experiência em administrar</td>
          </tr>
          <tr>
            <td>CTO</td>
            <td>Maria Santos</td>
            <td>Experiência em ML</td>
          </tr>
          <tr>
            <td>COO</td>
            <td>Carlos Oliveira</td>
            <td>Experiência em operações</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default FounderTable;
