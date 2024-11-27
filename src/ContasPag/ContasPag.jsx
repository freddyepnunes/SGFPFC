import React, { useState } from "react"; //Import do pacote react com o nome React
import "./ContasPag.css"; //Importação do arquivo ContasPag.css que está na mesma página
import "../SGF/SGF.css"; //Importação do arquivo SGF.css que está dentro da pasta SGF
import SGFLogo from "../Imagens/10.png"; //Importação de imagem com o nome UMCLogo
import { Link } from "react-router-dom"; //Importe de Link do "react-router-dom" para o uso das funções Link para definir para onde "tal" botão de navegação levará o usuário
import ContasPagGrid from "./ContasPagGrid.jsx";
import AlterarDespesaModal from "./ModalAltContasPag.jsx";
import DeletarDespesaModal from "./ModalDelContasPag.jsx";

const ContasPag = () => {
  // Estado para armazenar os valores do formulário
  const [formData, setFormData] = useState({
    banco: "",
    dataEmissao: "",
    planoConta: "",
    tipoDocumento: "",
    fornecedor: "",
    valor: "",
    descricao: "",
  });

  // Atualiza os valores do estado ao digitar nas caixas de texto
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Função para enviar os dados ao servidor
  const handleSubmit = async () => {
    const id_usuario = localStorage.getItem("id_usuario"); // Recupere o id_usuario do localStorage

    if (!id_usuario) {
      alert("Usuário não identificado. Faça login novamente.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/despesa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, id_usuario }), // Inclua o id_usuario no corpo da requisição
      });

      if (response.ok) {
        window.location.reload();
        setFormData({
          banco: "",
          dataEmissao: "",
          planoConta: "",
          tipoDocumento: "",
          fornecedor: "",
          valor: "",
          descricao: "",
        }); // Limpa o formulário
      } else {
        const errorText = await response.text();
        alert(`Erro ao cadastrar a despesa: ${errorText}`);
      }
    } catch (error) {
      alert(`Erro ao cadastrar a despesa: ${error.message}`);
    }
  };

  // Função para limpar todos os campos do formulário
  const handleReset = () => {
    setFormData({
      banco: "",
      dataEmissao: "",
      planoConta: "",
      tipoDocumento: "",
      fornecedor: "",
      valor: "",
      descricao: "",
    });
  };

  return (
    <div>
      <div className="form-menu-Complementar"></div>
      <div className="form-menu">
        <img className="SGF_Logo" src={SGFLogo} alt="SGF Logo" />
        <div className="Botoes">
          <Link to="/Home" className="link">
            <button type="button" className="btn btn1 btn-sep" id="button1">
              <i className="fa-solid fa-house"></i>
              <strong>Iniciar</strong>
              <div className="Indicador2"></div>
            </button>
          </Link>
          <Link to="/ContasRec" className="link">
            <button
              type="button"
              className="btn btn5 btn-sep btn-icon5"
              id="button5"
            >
              <i className="fa-solid fa-handshake"></i>
              <strong>Contas a Receber</strong>
              <div className="Indicador2"></div>
            </button>
          </Link>
          <Link to="/ContasPag" className="link">
            <button
              type="button"
              className="btn btn6 btn-sep btn-icon6"
              id="button6"
            >
              <i className="fa-solid fa-money-bill"></i>
              <strong>Contas a Pagar</strong>
              <div className="Indicador2"></div>
            </button>
          </Link>
          <div className="Indicador"></div>
        </div>
      </div>

      <div className="ContasPagar">Contas a Pagar</div>
      <div className="LinhaCabConPag"></div>
      <div className="diretorioPag">
        <div className="diretorioItemPag">Home</div>
        <div className="diretorioItemPag">/</div>
        <div className="diretorioItemPag">
          <strong>Contas a Pagar</strong>
        </div>
      </div>
      <div className="CadastroContas">
        <div className="banco">
          <div className="label">Banco</div>
          <input
            type="text"
            name="banco"
            value={formData.banco}
            onChange={handleChange}
            className="input-text"
            required
          />
        </div>
        <div className="DataEmissao">
          <div className="label">Data Emissão</div>
          <input
            type="date"
            name="dataEmissao"
            value={formData.dataEmissao}
            onChange={handleChange}
            className="input-text"
            required
          />
        </div>
        <div className="plancontapag">
          <div className="label">Plano de Conta</div>
          <select
            name="planoConta"
            value={formData.planoConta}
            onChange={handleChange}
            className="input-text"
            id="plancontapag-dropbox"
          >
            <option value="">Selecione</option>
            <option value="Despesas com Ocupação">Despesas com Ocupação</option>
            <option value="Despesas com Serviços">Despesas com Serviços</option>
            <option value="Despesas com Pessoal">Despesas com Pessoal</option>
            <option value="Outras Despesas">Outras Despesas</option>
            <option value="Impostos">Impostos</option>
            <option value="Custos Variáveis">Custos Variáveis</option>
          </select>
        </div>
        <div className="tipodocpag">
          <div className="label">Tipo de Documento</div>
          <select
            name="tipoDocumento"
            value={formData.tipoDocumento}
            onChange={handleChange}
            className="input-text"
            id="tipodocpag-dropbox"
          >
            <option value="">Selecione</option>
            <option value="Pix">Pix</option>
            <option value="Crédito">Crédito</option>
            <option value="Débito">Débito</option>
            <option value="NF">NF</option>
            <option value="Transferência">Transferência</option>
            <option value="Fatura">Fatura</option>
          </select>
        </div>
        <div className="fornpag">
          <div className="label">Fornecedor</div>
          <input
            type="text"
            name="fornecedor"
            value={formData.fornecedor}
            onChange={handleChange}
            className="input-text"
            required
          />
        </div>
        <div className="valor">
          <div className="label">Valor (R$)</div>
          <input
            type="number"
            name="valor"
            value={formData.valor}
            onChange={handleChange}
            className="input-text"
            required
          />
        </div>
        <div className="desc">
          <div className="label">Descrição</div>
          <input
            type="text"
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
            className="input-text"
            required
          />
        </div>
        <button type="button" className="BtnLimparCadPag" onClick={handleReset}>
          <strong>Limpar Cadastro</strong>
        </button>
        <div className="cadPag">
          <button type="button" className="btnCadPag" onClick={handleSubmit}>
            <strong>Cadastrar Despesa</strong>
          </button>
        </div>
        <AlterarDespesaModal />
        <DeletarDespesaModal />
      </div>
      <div className="QuadroContaS">
        <ContasPagGrid />
      </div>
    </div>
  );
};

export default ContasPag;
