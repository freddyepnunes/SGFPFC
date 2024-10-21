import React, { useState } from "react";
import "./Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setErrorMessage("E-mail e senha são obrigatórios.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: username,
          senha: password,
        }),
      });

      let data;
      try {
        data = await response.json();
      } catch (jsonError) {
        throw new Error("Erro ao analisar a resposta do servidor.");
      }

      // Verifica se a resposta não é ok
      if (!response.ok) {
        throw new Error(
          "E-mail ou senha incorretos. Por favor, verifique novamente."
        );
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

export default Login;
