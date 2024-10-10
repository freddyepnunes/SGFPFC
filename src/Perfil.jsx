import React, { useState } from "react";
import "./Perfil.css";
import UMCLogo from "./Imagens/UMC.png";
import { Link } from "react-router-dom";

const Perfil = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [telefone, setTelefone] = useState("");
  const [celular, setCelular] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica para salvar as informações do perfil
    console.log("Nome:", nome);
    console.log("Email:", email);
    console.log("Senha:", senha);
    console.log("Telefone:", telefone);
    console.log("Celular:", celular);
  };

  return (
    <div className="perfil-container">
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
          <button
            type="button"
            className="btn btn2 btn-sep btn-icon2"
            id="button2"
          >
            <Link to="/dash" className="link">
              <i className="fa-solid fa-chart-simple"></i>Dashboard
              <div className="Indicador2"></div>
            </Link>
          </button>
          <div className="Indicador"></div>
        </div>
      </div>

      <div className="PerfilUser">Perfil do Usuário</div>
      <div className="LinhaCabUser"></div>

      <form className="FormUser" onSubmit={handleSubmit}>
        <div className="Nome input-label">
          <div>Nome</div>
          <div>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>
        </div>
        <div className="Email input-label">
          <div>Email</div>
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="Senha input-label">
          <div>Senha</div>
          <div className="senha-container">
            <input
              type={showPassword ? "text" : "password"}
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              maxLength="20"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="toggle-password"
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </div>
        </div>
        <div className="Tel">
          <div>Telefone</div>
          <div>
            <input
              type="text"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              maxLength="14"
            />
          </div>
        </div>
        <div className="Cel">
          <div>Celular</div>
          <div>
            <input
              type="text"
              value={celular}
              onChange={(e) => setCelular(e.target.value)}
              maxLength="15"
            />
          </div>
        </div>
        <button type="submit" className="btnSalvar">
          <strong>Salvar</strong>
        </button>
        <button
          type="button"
          className="btnCancelar"
          onClick={() => console.log("Cancelar")}
        >
          <strong>Cancelar</strong>
        </button>
      </form>

      <div className="Cabeçalho">
        <button type="button" className="btnCab" id="btnCab">
          <FontAwesomeIcon icon={faBars} />
        </button>
        <div className="LinhaCab"></div>
        <div className="Filiais">Filial: N/A</div>
        <div className="BemVindo">Bem Vindo SGF HelpB</div>
        <button
          type="button"
          className="Sair"
          id="btnSair"
          onClick={() => console.log("Sair")}
        >
          Sair
        </button>
      </div>

      <div className="diretorio">
        <div className="diretorioItem">
          <a href="C:/Users/lenovo/Documents/SGF - VS Code/SGF.html">Home</a>
        </div>
        <div className="diretorioItem">/</div>
        <div className="diretorioItem">
          <strong>Perfil do Usuário</strong>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
