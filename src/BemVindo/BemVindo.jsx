// Página apenas para receber os novos usuários
import React from "react"; //Faz a importação do pacote React
import { useNavigate } from "react-router-dom"; // Importa o pacote para fazer a navegação entre páginas
import "./BemVindo.css"; // Importa o BemVindo.CSS

const Welcome = () => { //Usado para definir todas as funções, variáveis e o retorno da aplicação da página de Bem Vindo
  const navigate = useNavigate(); //Criado uma constante navigate para atribuir a função "useNavigate()", para que se possa ser usado em qualquer lugar do código a função useNavigate onde é apenas para atribuir os valores de páginas de navegação, que normalmente são definidos dentro de App.jsx, que por exemplo são seguidos de "/Página".

  const handleRedirect = () => { //Const handleRedirect para definir uma variável constante para aplicação dentro do return
    navigate("/Login"); // O "navigate" usado antes para atribuir a funçao useNavigate, agora recebe o valor da página em que poderá navegar
  };

  return ( //Faz um retorno do que vai aparecer nas telas, linhas de código bem semelhantes ao "HTML5".
    <div className="welcome-container">
      <h1>Bem-vindo!</h1>
      <button className="redirect-button" onClick={handleRedirect}>
        Ir para outra página
      </button>
    </div>
  );
};

export default Welcome; //"export default" para que eu consiga fazer a exportação da função Welcome e poder usar em outra página
