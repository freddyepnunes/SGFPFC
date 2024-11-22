import React, { useState } from "react"; // Importa o React e o useState, que é uma função que permite adicionar e gerenciar dados dentro do componente
import "./Login.css"; //Importa o arquivo Login.css para a personalização visual do projeto
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; //Importe do pacote FontAwesome para o uso de fontes e ícones personalizados
import { faUser, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"; //Importe de diferentes tipos de icones da biblioteca FontAwesome
import { useNavigate } from "react-router-dom"; // Importa o pacote para fazer a navegação entre páginas

// Componente de login
const Login = () => {
  // Variáveis para armazenar as informações digitadas pelo usuário
  const [username, setUsername] = useState(""); // Nome do usuário
  const [password, setPassword] = useState(""); // Senha do usuário
  const [showPassword, setShowPassword] = useState(false); // Variável para controlar a exibição das senhas
  const [errorMessage, setErrorMessage] = useState(""); // Variável para exibir mensagens de erro
  const navigate = useNavigate();

  // Função chamada ao enviar o formulário
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita o recarregamento da página

    // Verifica se o email ou a senha estão com os campos devidamente preenchidos
    if (!username || !password) {
      setErrorMessage("E-mail e senha são obrigatórios."); // Exibe a mensagem de erro caso o email ou a senha não estejam preenchidos
      return;
    }

    try {
      // Envia os dados para o servidor
      const response = await fetch("http://localhost:5000/api/login", {
        // Envia uma requisição para o servidor para fazer a validação do usuário
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: username, // Email do usuário
          senha: password, // Senha do usuário
        }),
      });

      // Processa a resposta do servidor
      const data = await response.json();

      // Verifica se a resposta não é ok
      if (!response.ok) {
        throw new Error(data.error || "E-mail ou senha incorretos.");
      }

      // Armazena o id_usuario retornado pelo servidor
      if (data.id_usuario) {
        localStorage.setItem("id_usuario", data.id_usuario); // Armazena o id_usuario no localStorage
      }

      setErrorMessage(""); // Limpa a mensagem de erro
      navigate("/Home"); // Redireciona para a página Home
    } catch (error) {
      setErrorMessage(error.message); // Exibe a mensagem de erro
    }
  };

  return (
    <div className="Login-page">
      <div className="background-image">
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <div className="input-box">
              <input
                type="email"
                placeholder="E-mail"
                value={username}
                maxLength={50}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <FontAwesomeIcon icon={faUser} className="icon" />
            </div>
            <div className="input-box">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Senha"
                value={password}
                minLength={8}
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

            {errorMessage && <p className="error">{errorMessage}</p>}

            <button type="submit" className="btnLogin">
              Login
            </button>
            <div className="register-link">
              <p>
                Não tem uma conta? <a href="/CadastroLogin">Cadastrar-se</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login; // Faz o exporte padrão dos componentes de Login, para que se possa ser usado em outro elemento de outro arquivo
