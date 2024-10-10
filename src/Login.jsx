import React, { useState } from "react";
import "./Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica para manipular o login
    console.log("Usuário:", username);
    console.log("Senha:", password);
    console.log("Lembrar-me:", rememberMe);
  };

  return (
    <div className="background-image">
      <div className="overlay"></div>
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div className="input-box">
            <input
              type="text"
              placeholder="Usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <FontAwesomeIcon icon={faUser} />
          </div>

          <div className="input-box">
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <FontAwesomeIcon icon={faLock} />
          </div>

          <div className="lembrar-senha">
            <label>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              Lembrar-me
            </label>
            <a href="#">Esqueceu a senha?</a>
          </div>
          <button type="submit" className="btnLogin">
            Login
          </button>

          <div className="register-link">
            <p>
              Não tem uma conta? <a href="#">Registre-se</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
