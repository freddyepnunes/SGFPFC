import React from "react";
import "./ContasPag.css";
import "./SGF.css";
import UMCLogo from "./Imagens/UMC.png";
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
          <Link to="/" className="link">
            <button type="button" className="btn btn1 btn-sep" id="button1">
              <i className="fa-solid fa-house"></i>Home
              <div className="Indicador2"></div>
            </button>
          </Link>
          <Link to="/Clientes" className="link">
            <button
              type="button"
              className="btn btn3 btn-sep btn-icon3"
              id="button3"
            >
              <i className="fa-solid fa-user-group"></i>Clientes/
              <br />
              Fornecedores
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

        <div className="ClientePag">
          <div className="label">Fornecedores</div>
          <div className="input-text cliente">
            <select name="Cliente" id="Cliente-dropbox">
              <option value="Cliente1">Fornecedore1</option>
              <option value="Cliente2">Fornecedore2</option>
              <option value="Cliente3">Fornecedore3</option>
              <option value="Cliente4">Fornecedore4</option>
              <option value="Cliente5">Fornecedore5</option>
              <option value="Cliente6">Fornecedore6</option>
              <option value="Cliente7">Fornecedore7</option>
              <option value="Cliente8">Fornecedore8</option>
              <option value="Cliente9">Fornecedore9</option>
            </select>
          </div>
        </div>
        <div className="valor">
          <div className="label">Valor (R$)</div>
          <div>
            <input type="text" className="input-text" />
          </div>
        </div>
        <div className="BuscarPag">
          <button type="button" className="btnBuscarPag" id="btnBuscarPag">
            <strong>Buscar</strong>
          </button>
        </div>
        <div className="ExportarPag">
          <button type="button" className="btnExportarPag" id="btnExportarPag">
            <strong>Exportar</strong>
          </button>
        </div>
      </div>

      <div className="QuadroContas">
        <div className="Titulos">
          <span className="Total">Total de Títulos</span>
          <div className="Valor">
            <strong>R$ 2.000,00</strong>
          </div>
          <div className="Titulo">Título</div>
          <div className="DataVencimento">Data de Vencimento</div>
          <div className="Status">Status</div>
          <div className="Fornecedor">Fornecedor</div>
          <div className="Acoes">Ações</div>
        </div>
        <div className="LinhaContas"></div>
        <div className="DadosContas">
          <div className="DataVencimentoDados">05/11/2023</div>
          <div className="StatusDados">Aberto</div>
          <div className="FornecedorDados">Fornecedor 1</div>
          <div className="AcoesDados">
            <button type="button" className="btnVisualizar">
              <i className="fa-solid fa-eye"></i>Visualizar
            </button>
            <button type="button" className="btnEditar">
              <i className="fa-solid fa-pen"></i>Editar
            </button>
            <button type="button" className="btnDeletar">
              <i className="fa-solid fa-trash-can"></i>Deletar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContasPag;
