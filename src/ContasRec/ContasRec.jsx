//Página Contas a Receber que demonstra os valores que estão em abertos para a entrada na conta do usuário.
import React from "react"; //Importe do pacote "react" com o nome de React
import "./ContasRec.css"; //Importe do arquivo ContasRec.css para a formatação visual do arquivo ContasRec.jsx
import "../SGF/SGF.css"; //Importe do visual SGF.css da pasta SGF
import UMCLogo from "../Imagens/UMC.png"; //Importe de uma imagem com o nome de UMCLogo
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

        <div className="clienterec">
          <div className="label">Cliente</div>
          <input type="text" className="input-text" required />
        </div>
        <div className="valor">
          <div className="label">Valor (R$)</div>
          <div>
            <input type="text" className="input-text" />
          </div>
        </div>

        <div className="descrec">
          <div className="label">Descrição</div>
          <div>
            <input type="text" className="input-text" />
          </div>
        </div>
        <div className="BcadRec">
          <button type="button" className="btncadRec" id="btncadRec">
            <strong>Cadastrar</strong>
          </button>
        </div>
      </div>

      <div className="QuadroContas"></div>
    </div>
  );
};

export default ContasRec;
