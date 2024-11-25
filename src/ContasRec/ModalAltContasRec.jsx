import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "./ContasRec.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 500,
  bgcolor: "#e2e2e2",
  border: "2px solid #000",
  p: 4,
  borderRadius: 2.5,
};

export default function AlterarReceitaModal() {
  const [open, setOpen] = useState(false); // Controle do modal
  const [formData, setFormData] = useState({
    idReceita: "",
    banco: "",
    dataEmissao: "",
    planoConta: "",
    tipoDocumento: "",
    cliente: "",
    valor: "",
    descricao: "",
  });

  // Abre e fecha o modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Atualiza os valores do formulário ao digitar
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Função para buscar os dados pelo ID ao pressionar Enter
  const handleSearch = async (e) => {
    if (e.key === "Enter") {
      try {
        const response = await fetch(
          `http://localhost:5000/api/receita/${formData.idReceita}`
        );
        if (!response.ok) {
          throw new Error("Receita não encontrada.");
        }
        const data = await response.json();
        setFormData({
          idReceita: data.id_receita,
          banco: data.tipo_banco,
          dataEmissao: data.data,
          planoConta: data.plano_conta_receita,
          tipoDocumento: data.documento,
          cliente: data.cliente,
          valor: data.valor,
          descricao: data.descricao,
        });
      } catch (error) {
        alert(error.message);
      }
    }
  };

  // Envia as alterações para o servidor
  const handleUpdate = async () => {
    if (!formData.idReceita) {
      alert("Por favor, insira o ID da receita.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/receita/${formData.idReceita}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        window.location.reload();
        handleClose();
      } else {
        const errorText = await response.text();
        alert(`Erro ao alterar a receita: ${errorText}`);
      }
    } catch (error) {
      console.error("Erro ao alterar a receita:", error);
      alert("Erro ao alterar a receita.");
    }
  };

  const handleCancel = () => {
    setFormData({
      idReceita: "",
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
    <div>
      <div className="AltRec">
        <button
          type="button"
          className="btnAltRec"
          id="btnAltRec"
          onClick={handleOpen}
        >
          <strong>Alterar Receita</strong>
        </button>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ ml: 25 }}
          >
            Alterar Receita
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className="modalIdRec">
              <div className="label">ID Receita</div>
              <input
                type="text"
                name="idReceita"
                value={formData.idReceita}
                onChange={handleChange}
                onKeyDown={handleSearch}
                className="input-text"
                required
              />
            </div>
            <div className="modalBanco">
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
            <div className="modalDataEmissaO">
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
            <div className="modalPlanoConta">
              <div className="label">Plano de Conta</div>
              <select
                name="planoConta"
                value={formData.planoConta}
                onChange={handleChange}
                className="input-text"
                id="modalPlanContaRec-dropbox"
              >
                <option value="">Selecione</option>
                <option value="Receita com Produtos">
                  Receita com Produtos
                </option>
                <option value="Receita com Serviços">
                  Receita com Serviços
                </option>
                <option value="Outras Receitas">Outras Receitas</option>
              </select>
            </div>
            <div className="modalTipoDocRec">
              <div className="label">Tipo de Documento</div>
              <select
                name="tipoDocumento"
                value={formData.tipoDocumento}
                onChange={handleChange}
                className="input-text"
                id="modalTipoDocRec-dropbox"
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
            <div className="modalCliente">
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
            <div className="modalValoR">
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
            <div className="modalDescricao">
              <div className="label">Descrição</div>
              <input
                type="text"
                name="descricao"
                value={formData.descricao}
                onChange={handleChange}
                className="input-text"
              />
            </div>
          </Typography>
          <button onClick={handleClose} className="FecharModalRec">
            X
          </button>
          <button onClick={handleUpdate} className="AlterarDadosRec">
            Alterar Receita
          </button>
          <button
            onClick={() => {
              handleCancel();
            }}
            className="CancelarDadosRec"
          >
            Cancelar Alteração
          </button>
        </Box>
      </Modal>
    </div>
  );
}
