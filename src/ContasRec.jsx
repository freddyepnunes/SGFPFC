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

      <div className="ContasReceber">Contas a Receber</div>
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
        <div className="DataVenc">
          <div className="label">Data Vencimento</div>
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
        <div className="StatusRec">
          <div className="label">Status</div>
          <div className="input-text status">
            <select name="Status" id="Status-dropbox">
              <option value="Aberto">Aberto</option>
              <option value="Pago">Pago</option>
              <option value="PagoParcial">Pago Parcial</option>
              <option value="Vencido">Vencido</option>
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
        <div className="Filial">
          <div className="label">Filiais</div>
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

      <div className="QuadroContas">
        <div className="Titulos">
          <span className="Total">Total de Títulos</span>
          <div className="Valor">
            <strong>R$ 0,00</strong>
          </div>
        </div>
        <div className="TotalPago">
          <span className="Total">Total Pago</span>
          <div className="Valor">
            <strong>R$ 0,00</strong>
          </div>
        </div>
        <div className="TotalVencido">
          <span className="Total">Total Vencido</span>
          <div className="Valor">
            <strong>R$ 0,00</strong>
          </div>
        </div>
      </div>

      <div className="tabelaContas">
        <table>
          <thead>
            <tr>
              <th>Número</th>
              <th>Data de Emissão</th>
              <th>Data de Vencimento</th>
              <th>Status</th>
              <th>Cliente</th>
              <th>Filial</th>
              <th>Valor</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>01/10/2024</td>
              <td>31/10/2024</td>
              <td>Aberto</td>
              <td>Cliente1</td>
              <td>Filial1</td>
              <td>R$ 100,00</td>
              <td>
                <button className="btn-edit">Editar</button>
                <button className="btn-delete">Excluir</button>
              </td>
            </tr>
            {/* Adicione mais linhas conforme necessário */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContasRec;
