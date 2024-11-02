import React, { useState } from "react"; // Importa o React e o useState, que é uma função que permite adicionar e gerenciar dados dentro do componente
import "./Login.css"; //Importa o arquivo Login.css para a personalização visual do projeto
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; //Importe do pacote FontAwesome para o uso de fontes e ícones personalizados
import {
  faUser,
  faEye,
  faEyeSlash,
  faArrowLeft,
  faAt,
} from "@fortawesome/free-solid-svg-icons"; //Importe de diferentes tipos de icones da biblioteca FontAwesome

// Componente de login
const Cadastro = () => {
  // Variáveis para armazenar as informações digitadas pelo usuário
  const [nome, setNome] = useState(""); // Nome do usuário
  const [username, setUsername] = useState(""); // Nome de usuário ou email
  const [password, setPassword] = useState(""); // Senha
  const [confirmPassword, setConfirmPassword] = useState(""); // Confirmação da senha
  const [errorMessage, setErrorMessage] = useState(""); // Variável para exibir mensagens de erro

  // Variáveis para controlar a exibição das senhas
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Função chamada ao enviar o formulário
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita o recarregamento da página

    // Verifica se as senhas coincidem
    if (password !== confirmPassword) {
      setErrorMessage("As senhas não coincidem!"); // Exibe erro se as senhas não forem iguais
      return;
    }

    //Mostra no console do navegador, dentro de inspecionar, o nome, email e senha colocados pelo usuário. Foi colocar no código apenas por depuração do código
    console.log({
      nome: nome,
      email: username,
      senha: password,
    });

    try {
      // Envia os dados para o servidor
      const response = await fetch("http://localhost:5000/api/usuario", { // Envia uma requisição ao servidor para criar um novo usuário
        method: "POST", // Define o método da requisição como POST (usado para enviar dados)
        // Define o cabeçalho da requisição para indicar que os dados estão em formato JSON
        headers: { 
          "Content-Type": "application/json",
        },
        // Converte os dados do usuário para uma string JSON e os envia no corpo da requisição
        body: JSON.stringify({
          nome: nome, // Nome do usuário
          email: username, // Email do usuário
          senha: password, // Senha do usuário
        }),
      });

      // Verifica se houve erro na resposta do servidor
      if (!response.ok) {
        const errorMessage = await response.text(); // Captura a mensagem de erro do servidor
        throw new Error(errorMessage); // Lança um erro com a mensagem recebida
      }

      setErrorMessage(""); // Limpe os campos após o sucesso
      setNome("");
      setUsername("");
      setPassword("");
      setConfirmPassword("");
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
                onChange={(e) => setNome(e.target.value)} // Pega o valor atual do campo (e.target.value, que é o campo onde o usuário vai preencher) e armazena em 'setNome'
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
                onChange={(e) => setUsername(e.target.value)} // Pega o valor atual do campo (e.target.value, que é o campo onde o usuário vai preencher) e armazena em 'setUsername'
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
                onChange={(e) => setPassword(e.target.value)} // Pega o valor atual do campo (e.target.value, que é o campo onde o usuário vai preencher) e armazena em 'setPassword'
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
                onChange={(e) => setConfirmPassword(e.target.value)} // Pega o valor atual do campo (e.target.value, que é o campo onde o usuário vai preencher) e armazena em 'setConfirmPassword'
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

export default Cadastro; // Faz o exporte padrão dos componentes de Cadastro, para que se possa ser usado em outro elemento de outro arquivo
