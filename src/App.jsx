import React from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom"; // Importa os componentes necessários
import SGF from "./SGF.jsx";
import ContasRec from "./ContasRec.jsx";
import ContasPag from "./ContasPag.jsx";
import Perfil from "./Perfil.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SGF />} />
      <Route path="/ContasRec" element={<ContasRec />} />
      <Route path="/ContasPag" element={<ContasPag />} />
      <Route path="/Perfil" element={<Perfil />} />
    </Routes>
  );
}

export default App;
