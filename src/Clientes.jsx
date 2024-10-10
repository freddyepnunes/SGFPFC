import React from "react";
import "./Clientes.css"; // Importar os estilos
import "./SGF.css"; // Importar os estilos adicionais
import UMCLogo from "./Imagens/UMC.png";
import { Link } from "react-router-dom";

const Clientes = () => {
  const toggleMenu = () => {
    // Função para alternar o menu suspenso
  };

  const selecionarOpcao = (opcao) => {
    // Função para selecionar uma opção no menu
  };

  const NovoCliente = () => {
    // Função para novo cliente
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

      <div className="Pessoas">Clientes / Fornecedores</div>
      <div className="LinhaCabCliente"></div>
      <button
        onClick={NovoCliente}
        className="btnNovoCli"
        id="btnNovoCli"
        type="button"
      >
        <strong>Novo Cadastro</strong>
      </button>

      <div className="TabelaCli" id="TabelaCli"></div>

      <div
        className="FormularioCli"
        id="FormularioCli"
        style={{ display: "none" }}
      >
        <div className="Codigo">
          <div className="label">
            Código
            <i
              className="fa-regular fa-circle-question tooltip"
              id="Tooltip"
              aria-label="Código gerado automaticamente"
            ></i>
          </div>
          <div>
            <input type="number" id="Cod" className="input-text" />
          </div>
          <div className="tooltip-box" id="tooltipBox">
            Código gerado automaticamente
          </div>
        </div>

        <div className="Tipo">
          <div className="label">Tipo</div>
          <div className="input-text tipo">
            <select name="Tipo" id="Tipo-dropbox">
              <option value="Cliente">Cliente</option>
              <option value="Fornecedor">Fornecedor</option>
            </select>
          </div>
        </div>

        <div className="CPF input-label">
          <div className="label">CPF/CNPJ</div>
          <div>
            <input
              type="text"
              className="input-text"
              onInput={(e) => formatarCpfCnpj(e.target)}
              maxLength="18"
              required
            />
          </div>
        </div>

        <div className="NomeCli input-label">
          <div className="label">Nome</div>
          <div>
            <input type="text" id="NomeCli" className="input-text" required />
          </div>
        </div>

        <div className="TelCli input-label">
          <div className="label">Telefone</div>
          <div>
            <input
              type="text"
              id="telefoneInput"
              className="input-text"
              required
              maxLength="14"
              onKeyPress={(e) => mask(e.target, mtel)}
              onBlur={(e) => mask(e.target, mtel)}
            />
          </div>
        </div>

        <div className="EmailCli">
          <div className="label">Email</div>
          <div>
            <input type="text" id="Email" className="input-text" />
          </div>
        </div>

        <div className="NomeContato">
          <div className="label">Nome do contato</div>
          <div>
            <input type="text" className="input-text" />
          </div>
        </div>

        <div className="Observacao Opcional">
          <div className="label">Observacao</div>
          <div className="input-text" contentEditable="true"></div>
        </div>

        <div className="Endereco">
          <strong>Endereço</strong>
        </div>
        <div className="LinhaEnd"></div>

        <div className="CEP">
          <div className="label">CEP</div>
          <div>
            <input
              type="text"
              className="input-text"
              onInput={(e) => formatarCep(e.target)}
              maxLength="9"
            />
          </div>
        </div>

        <div className="Cidade">
          <div className="label">Cidade</div>
          <div>
            <input type="text" className="input-text" />
          </div>
        </div>

        <div className="UF">
          <div className="label">UF</div>
          <div>
            <input type="text" className="input-text" />
          </div>
        </div>

        <div className="Rua">
          <div className="label">Endereço</div>
          <div>
            <input type="text" className="input-text" />
          </div>
        </div>

        <div className="Bairro">
          <div className="label">Bairro</div>
          <div>
            <input type="text" className="input-text" />
          </div>
        </div>

        <div className="Numero">
          <div className="label">Numero</div>
          <div>
            <input type="text" className="input-text" />
          </div>
        </div>

        <div className="Complemento">
          <div className="label">Complemento</div>
          <div>
            <input type="text" className="input-text" />
          </div>
        </div>

        <div className="BotoesSalvamento">
          <button type="button" className="btnSalvar" id="btnSalvar">
            Salvar
          </button>
          <button type="button" className="btnFechar" id="btnFechar">
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Clientes;
