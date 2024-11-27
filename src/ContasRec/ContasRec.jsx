import React, { useState } from "react"; //Importe do pacote "react" com o nome de React
import "./ContasRec.css"; //Importe do arquivo ContasRec.css para a formatação visual do arquivo ContasRec.jsx
import "../SGF/SGF.css"; //Importe do visual SGF.css da pasta SGF
import SGFLogo from "../Imagens/10.png"; //Importe de uma imagem com o nome de UMCLogo
import { Link } from "react-router-dom";
import ContasRecGrid from "./ContasRecGrid.jsx";
import AlterarReceitaModal from "./ModalAltContasRec.jsx"; // Ajuste o caminho conforme a localização do componente
import DeletarReceitaModal from "./ModalDelContasRec.jsx";

const ContasRec = () => {
  // Estado para armazenar os valores do formulário
  const [formData, setFormData] = useState({
    banco: "",
    dataEmissao: "",
    planoConta: "",
    tipoDocumento: "",
    cliente: "",
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
      const response = await fetch("http://localhost:5000/api/receita", {
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
          cliente: "",
          valor: "",
          descricao: "",
        }); // Limpa o formulário
      } else {
        const errorText = await response.text();
        alert(`Erro ao cadastrar a receita: ${errorText}`);
      }
    } catch (error) {
      alert(`Erro ao cadastrar a receita: ${error.message}`);
    }
  };

  // Função para limpar todos os campos do formulário
  const handleReset = () => {
    setFormData({
      banco: "",
      dataEmissao: "",
      planoConta: "",
      tipoDocumento: "",
      cliente: "",
      valor: "",
      descricao: "",
    });
  };

  return (
    //Função de return para retornar os componentes visuais e funcionais do nosso código
    <div>
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

      <div className="ContasReceber">Contas a Receber</div>
      <div className="LinhaCabConRec"></div>
      <div className="diretorioRec">
        <div className="diretorioItemRec">Home</div>
        <div className="diretorioItemRec">/</div>
        <div className="diretorioItemRec">
          <strong>Contas a Receber</strong>
        </div>
      </div>
      <div className="CadastroContaS">
        <div className="bancO">
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
        <div className="DataEmissaO">
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
        <div className="plancontarec">
          <div className="label">Plano de Conta</div>
          <select
            name="planoConta"
            value={formData.planoConta}
            onChange={handleChange}
            className="input-text"
            id="plancontapag-dropbox"
          >
            <option value="">Selecione</option>
            <option value="Receita com Produtos">Receita com Produtos</option>
            <option value="Receita com Serviços">Receita com Serviços</option>
            <option value="Outras Receitas">Outras Receitas</option>
          </select>
        </div>
        <div className="tipodocrec">
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
        <div className="clienterec">
          <div className="label">Cliente</div>
          <input
            type="text"
            name="cliente"
            value={formData.cliente}
            onChange={handleChange}
            className="input-text"
            required
          />
        </div>
        <div className="valoR">
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
        <div className="descrec">
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
        <button type="button" className="BtnLimparCadRec" onClick={handleReset}>
          <strong>Limpar Cadastro</strong>
        </button>
        <div className="BcadRec">
          <button type="button" className="btncadRec" onClick={handleSubmit}>
            <strong>Cadastrar Receita</strong>
          </button>
        </div>
        <AlterarReceitaModal />
        <DeletarReceitaModal />
      </div>
      <div className="QuadroContaS">
        <ContasRecGrid />
      </div>
    </div>
  );
};

export default ContasRec; //Faz a exportação padrão de ContasRec para que se consiga usar em outros elementos de outros arquivos
