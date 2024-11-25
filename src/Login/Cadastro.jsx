import React, { useState } from "react"; // Importa o React e o useState
import "./Login.css"; // Importa os estilos da página
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Importa ícones do FontAwesome
import {
  faUser,
  faEye,
  faEyeSlash,
  faAt,
} from "@fortawesome/free-solid-svg-icons"; // Ícones específicos
import { useNavigate } from "react-router-dom"; // Importa o hook useNavigate para redirecionar
import Swal from "sweetalert2"; // Importa a biblioteca SweetAlert2
import "sweetalert2/dist/sweetalert2.min.css"; // Importa os estilos do SweetAlert2

const Cadastro = () => {
  const navigate = useNavigate(); // Hook para redirecionar
  const [nome, setNome] = useState(""); // Nome do usuário
  const [username, setUsername] = useState(""); // E-mail do usuário
  const [password, setPassword] = useState(""); // Senha
  const [confirmPassword, setConfirmPassword] = useState(""); // Confirmação da senha
  const [errorMessage, setErrorMessage] = useState(""); // Mensagem de erro
  const [showPassword, setShowPassword] = useState(false); // Controle da exibição da senha
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Controle da exibição da confirmação da senha

  // Função chamada ao enviar o formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("As senhas não coincidem!"); // Validação de senha
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/usuario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: nome,
          email: username,
          senha: password,
        }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      // Exibe mensagem de sucesso com SweetAlert2
      Swal.fire({
        title: "Usuário cadastrado!",
        text: "Redirecionando para a página de login.",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/Login"); // Redireciona para a página de login
      });

      // Limpa os campos do formulário
      setNome("");
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(error.message); // Exibe a mensagem de erro em caso de falha
    }
  };

  return (
    <div className="Cadastro-page">
      <div className="background-image">
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <h1>Criar conta</h1>
            <div className="input-box">
              <input
                type="text"
                placeholder="Nome"
                value={nome}
                maxLength={70}
                onChange={(e) => setNome(e.target.value)}
                required
              />
              <FontAwesomeIcon icon={faUser} className="icon" />
            </div>

            <div className="input-box">
              <input
                type="email"
                placeholder="E-mail"
                value={username}
                maxLength={50}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <FontAwesomeIcon icon={faAt} className="icon" />
            </div>

            <div className="input-box">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Senha"
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                className="icon"
                onClick={() => setShowPassword(!showPassword)}
                style={{ cursor: "pointer" }}
              />
            </div>

            <div className="input-box">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirmar senha"
                minLength={8}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <FontAwesomeIcon
                icon={showConfirmPassword ? faEyeSlash : faEye}
                className="icon"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{ cursor: "pointer" }}
              />
            </div>

            {errorMessage && <p className="error">{errorMessage}</p>}

            <button type="submit" className="btnLogin">
              Cadastrar-se
            </button>

            <div className="login-link">
              <p>
                Já possui uma conta ? <a href="/Login">Faça o Login aqui!</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Cadastro;
