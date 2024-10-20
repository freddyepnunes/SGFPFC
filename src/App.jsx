import React from "react";
import { Route, Routes } from "react-router-dom"; // Importa os componentes necessários
import SGF from "./SGF/SGF.jsx";
import ContasRec from "./ContasRec/ContasRec.jsx";
import ContasPag from "./ContasPag/ContasPag.jsx";
import Perfil from "./Perfil/Perfil.jsx";
import Login from "./Login/Login.jsx";
import Cadastro from "./Login/Cadastro.jsx";
import BemVindo from "./BemVindo/BemVindo.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<BemVindo />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Home" element={<SGF />} />
      <Route path="/ContasRec" element={<ContasRec />} />
      <Route path="/ContasPag" element={<ContasPag />} />
      <Route path="/Perfil" element={<Perfil />} />
      <Route path="/CadastroLogin" element={<Cadastro />} />
    </Routes>
  );
}

export default App;
