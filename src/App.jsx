import React from "react"; // Importa o React para criar o componente
import { Route, Routes } from "react-router-dom"; // Importa as funcionalidades de roteamento para a definição de rotas de navegação
import SGF from "./SGF/SGF.jsx"; // Página principal (Sistema de Gestão Financeira - SGF)
import ContasRec from "./ContasRec/ContasRec.jsx"; // Página de Contas a Receber
import ContasPag from "./ContasPag/ContasPag.jsx"; // Página Contas a Pagar
import Login from "./Login/Login.jsx"; // Página de Login
import Cadastro from "./Login/Cadastro.jsx"; // Página de Cadastro
import BemVindo from "./BemVindo/BemVindo.jsx"; // Página de Boas-Vindas

// Função principal do aplicativo que define as rotas de cada página
function App() {
  return (
    <Routes>
      {/* Define o caminho (URL) e o componente exibido em cada rota */}
      <Route path="/" element={<BemVindo />} /> {/* Página inicial de boas-vindas */}
      <Route path="/Login" element={<Login />} /> {/* Página de Login */}
      <Route path="/Home" element={<SGF />} /> {/* Página principal do sistema (SGF) */}
      <Route path="/ContasRec" element={<ContasRec />} /> {/* Página de Contas a Receber */}
      <Route path="/ContasPag" element={<ContasPag />} /> {/* Página de Contas a Pagar */}
      <Route path="/CadastroLogin" element={<Cadastro />} /> {/* Página de Cadastro */}
    </Routes>
  );
}

export default App; // Exporta o componente App para ser usado em outros arquivos
