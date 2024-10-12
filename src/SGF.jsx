import React from "react";
import "./SGF.css"; // Importando CSS
import "./SGF.js"; // Importando JS
import UMCLogo from "./Imagens/UMC.png";
import { Link } from "react-router-dom";

function SGF() {
  return (
    <div>
      <div className="form-menu">
        <img className="UMC_Logo" src={UMCLogo} alt="UMC Logo" />
        <div className="Botoes">
          <Link to="/" className="link">
            <button type="button" className="btn btn1 btn-sep" id="button1">
              <i className="fa-solid fa-house"></i>Home
              <div className="Indicador2"></div>
            </button>
          </Link>
          <Link to="/ContasRec" className="link">
            <button
              type="button"
              className="btn btn5 btn-sep btn-icon5"
              id="button5"
            >
              <i className="fa-solid fa-handshake"></i>Contas a Receber
              <div className="Indicador2"></div>
            </button>
          </Link>
          <Link to="/ContasPag" className="link">
            <button
              type="button"
              className="btn btn6 btn-sep btn-icon6"
              id="button6"
            >
              <i className="fa-solid fa-money-bill"></i>Contas a Pagar
              <div className="Indicador2"></div>
            </button>
          </Link>
          <Link to="/dash" className="link">
            <button
              type="button"
              className="btn btn2 btn-sep btn-icon2"
              id="button2"
            >
              <i className="fa-solid fa-chart-simple"></i>Dashboard
              <div className="Indicador2"></div>
            </button>
          </Link>
          <div className="Indicador"></div>
        </div>
      </div>

      <div className="Card">
        <div className="Forma1">
          <p>
            <strong>Contas a receber</strong>
          </p>
          <div className="Valor1" id="Valores"></div>
        </div>
        <div className="Forma2">
          <p>
            <strong>Contas a pagar</strong>
          </p>
          <div className="Valor2" id="Valores"></div>
        </div>
      </div>

      <div className="Gráfico1">
        <div className="Projecao">
          <strong>Realizado no ultimo Mês</strong>
        </div>
        <div className="SaldoProj">
          Resuno de tudo o que foi realizado no Mês
        </div>
      </div>

      <div className="Container">
        <div className="CardContasPagar">
          <p className="ContasPagar">
            <strong>Contas a Pagar</strong>
          </p>

          <p className="Fornecedor">
            <strong>Fornecedor</strong>
          </p>
          <p className="Vencimento">
            <strong>Vencimento</strong>
          </p>
          <p className="ValorContas">
            <strong>Valor</strong>
          </p>
          <div className="DadosContasPagar"></div>
        </div>
        <div className="CardContasReceber">
          <p className="ContasReceber">
            <strong>Contas a Receber</strong>
          </p>

          <p className="Cliente">
            <strong>Cliente</strong>
          </p>
          <p className="Vencimento">
            <strong>Vencimento</strong>
          </p>
          <p className="ValorContas">
            <strong>Valor</strong>
          </p>
          <div className="DadosContasReceber"></div>
        </div>
      </div>

      <div className="Cabeçalho">
        <button type="button" className="btnCab" id="btnCab">
          <i className="fa-solid fa-bars"></i>
        </button>
        <div className="LinhaCab"></div>
        <div className="Filiais">Filial: N/A</div>
        <div className="BemVindo">Bem Vindo SGF HelpB</div>
        <button type="button" className="Sair" id="btnSair">
          Sair
        </button>
      </div>
    </div>
  );
}

export default SGF;
