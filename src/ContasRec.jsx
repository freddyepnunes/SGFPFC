import React from "react";
import "./ContasRec.css";
import "./SGF.css";
import UMCLogo from "./Imagens/UMC.png";
import { Link } from "react-router-dom";

const ContasRec = () => {
  const toggleMenu = () => {
    // Lógica para alternar o menu
  };

  const selecionarOpcao = (opcao) => {
    // Lógica para selecionar uma opção do menu
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

      <div className="LinhaCabConRec"></div>
      <div className="diretorioRec">
        <div className="diretorioItemRec">
          <a href="C:/Users/lenovo/Documents/SGF - VS Code/SGF.html">Home</a>
        </div>
        <div className="diretorioItemRec">/</div>
        <div className="diretorioItemRec">
          <a href="C:/Users/lenovo/Documents/SGF - VS Code/ContasRec.html">
            <strong>Contas a Receber</strong>
          </a>
        </div>
      </div>
      <div className="CadastroContas">
        <div className="NumContas">
          <div className="label">Número</div>
          <div>
            <input type="text" className="input-text" required />
          </div>
        </div>
        <div className="DataEmissao">
          <div className="label">Data Emissão</div>
          <div className="date-range-container">
            <input
              type="text"
              className="date-input start-date"
              maxLength="10"
              placeholder="Inicial"
            />
            <div className="calendar-icon" onClick={showCalendar}>
              <i className="fa fa-calendar"></i>
            </div>
            <input
              type="text"
              className="date-input end-date"
              maxLength="10"
              placeholder="Final"
            />
          </div>
        </div>

        <div className="plancontarec">
          <div className="label">Plano de Conta</div>
          <div className="input-text status">
            <select name="Status" id="plancontarec-dropbox">
              <option value="recprod">Receita com Proddutos</option>
              <option value="recserv">Receita com Serviços</option>
              <option value="outras">Outras Receitas</option>
            </select>
          </div>
        </div>

        <div className="tipodocrec">
          <div className="label">Tipo de Documento</div>
          <div className="input-text status">
            <select name="plancontapag" id="tipodocrec-dropbox">
              <option value="pix">Pix</option>
              <option value="cred">Crédito</option>
              <option value="deb">Débito </option>
              <option value="nf">NF</option>
              <option value="transf">Transferência</option>
              <option value="fat">Fatura</option>
            </select>
          </div>
        </div>

        <div className="ClienteRec">
          <div className="label">Clientes</div>
          <div className="input-text cliente">
            <select name="Cliente" id="Cliente-dropbox">
              <option value="Cliente1">Cliente1</option>
              <option value="Cliente2">Cliente2</option>
              <option value="Cliente3">Cliente3</option>
              <option value="Cliente4">Cliente4</option>
              <option value="Cliente5">Cliente5</option>
              <option value="Cliente6">Cliente6</option>
              <option value="Cliente7">Cliente7</option>
              <option value="Cliente8">Cliente8</option>
              <option value="Cliente9">Cliente9</option>
            </select>
          </div>
        </div>
        <div className="valor">
          <div className="label">Valor (R$)</div>
          <div>
            <input type="text" className="input-text" />
          </div>
        </div>
        <div className="BuscarRec">
          <button type="button" className="btnBuscarRec" id="btnBuscarRec">
            <strong>Buscar</strong>
          </button>
        </div>
        <div className="ExportarRec">
          <button type="button" className="btnExportarRec" id="btnExportarRec">
            <strong>Exportar</strong>
          </button>
        </div>
      </div>

      <div className="QuadroContas"></div>
    </div>
  );
};

export default ContasRec;
