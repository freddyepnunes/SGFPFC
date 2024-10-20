import React, { useState } from "react";
import "./Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEye,
  faEyeSlash,
  faArrowLeft,
  faAt,
} from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const [nome, setNome] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("As senhas não coincidem!");
      return;
    }

    console.log({
      nome: nome,
      email: username,
      senha: password,
    });

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
        const errorMessage = await response.text(); // Captura a mensagem de erro do servidor
        throw new Error(errorMessage); // Lança um erro com a mensagem recebida
      }

      setErrorMessage("");
      // Limpe os campos após o sucesso
      setNome("");
      setUsername("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
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

          <button type="button" className="btnVoltar">
            <a href="/Login">
              <FontAwesomeIcon icon={faArrowLeft} className="icon" />
            </a>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
