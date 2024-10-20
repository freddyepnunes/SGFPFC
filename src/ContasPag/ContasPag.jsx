import React from "react";
import "./ContasPag.css";
import "../SGF/SGF.css";
import UMCLogo from "../Imagens/UMC.png";
import { Link } from "react-router-dom";

const ContasPag = () => {
  const toggleMenu = () => {
    // Lógica para alternar o menu
  };

  const selecionarOpcao = (opcao) => {
    // Lógica para selecionar uma opção
  };

  const showCalendar = () => {
    // Lógica para mostrar o calendário
  };

  return (
    <div>
      <div className="form-menu-Complementar"></div>
      <div className="form-menu">
        <img className="UMC_Logo" src={UMCLogo} alt="UMC Logo" />
        <div className="Botoes">
          <Link to="/Home" className="link">
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
          <div className="Indicador"></div>
        </div>
      </div>

      <div className="ContasPagar">Contas a Pagar</div>
      <div className="LinhaCabConPag"></div>
      <div className="diretorioPag">
        <div className="diretorioItemPag">
          <a href="C:/Users/lenovo/Documents/SGF - VS Code/SGF.html">Home</a>
        </div>
        <div className="diretorioItemPag">/</div>
        <div className="diretorioItemPag">
          <a href="C:/Users/lenovo/Documents/SGF - VS Code/ContasPag.html">
            <strong>Contas a Pagar</strong>
          </a>
        </div>
      </div>
      <div className="CadastroContas">
        <div className="banco">
          <div className="label">Banco</div>
          <div>
            <input type="text" className="input-text" required />
          </div>
        </div>
        <div className="DataEmissao">
          <div className="label">Data Emissão</div>
          <div>
            <input type="text" className="input-text" required />
          </div>
        </div>
        <div className="DataVenc">
          <div className="date-range-container"></div>
        </div>
        <div className="plancontapag">
          <div className="label">Plano de Conta</div>
          <div className="input-text status">
            <select name="plancontapag" id="plancontapag-dropbox">
              <option value="ocup">Despesas com Ocupação</option>
              <option value="Serv">Despesas com Serviços</option>
              <option value="pessoal">Despesas com Pessoal </option>
              <option value="outras">Outras Despesas</option>
              <option value="imposto">Impostos</option>
              <option value="variaveis">Custos Variáveis</option>
            </select>
          </div>
        </div>
        <div className="tipodocpag">
          <div className="label">Tipo de Documento</div>
          <div className="input-text status">
            <select name="plancontapag" id="tipodocpag-dropbox">
              <option value="pix">Pix</option>
              <option value="cred">Crédito</option>
              <option value="deb">Débito </option>
              <option value="nf">NF</option>
              <option value="transf">Transferência</option>
              <option value="fat">Fatura</option>
            </select>
          </div>
        </div>
        <div className="fornpag">
          <div className="label">Fornecedor</div>
          <input type="text" className="input-text" required />
        </div>
        <div className="valor">
          <div className="label">Valor (R$)</div>
          <div>
            <input type="text" className="input-text" />
          </div>
        </div>
        <div className="desc">
          <div className="label">Descrição</div>
          <div>
            <input type="text" className="input-text" />
          </div>
        </div>
        <div className="cadPag">
          <button type="button" className="btncadPag" id="btncadPag">
            <strong>Cadastrar</strong>
          </button>
        </div>
      </div>
      <div className="QuadroContas"></div>
    </div>
  );
};

export default ContasPag;
