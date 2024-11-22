import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "./ContasPag.css";
import { borderRadius } from "@mui/system";

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

export default function AlterarDespesaModal() {
  const [open, setOpen] = useState(false); // Controla o estado do modal
  const handleOpen = () => setOpen(true); // Abre o modal
  const handleClose = () => setOpen(false); // Fecha o modal

  return (
    <div>
      {/* Botão para abrir o modal */}
      <div className="AltPag">
        <button
          type="button"
          className="btnAltPag"
          id="btnAltPag"
          onClick={handleOpen} // Chama handleOpen ao clicar
        >
          <strong>Alterar Despesa</strong>
        </button>
      </div>

      {/* Modal */}
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
            sx={{ ml: 23 }}
          >
            Alterar Despesa
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className="modalBanco">
              <div className="label">Banco</div>
              <div>
                <input type="text" className="input-text" required />
              </div>
            </div>
            <div className="modalDataEmissao">
              <div className="label">Data Emissão</div>
              <div>
                <input type="text" className="input-text" required />
              </div>
            </div>
            <div className="modalDataVenc">
              <div className="date-range-container"></div>
            </div>
            <div className="modalPlancontapag">
              <div className="label">Plano de Conta</div>
              <div className="input-text status">
                <select name="plancontapag" id="modalPlancontapag-dropbox">
                  <option value="ocup">Despesas com Ocupação</option>
                  <option value="Serv">Despesas com Serviços</option>
                  <option value="pessoal">Despesas com Pessoal </option>
                  <option value="outras">Outras Despesas</option>
                  <option value="imposto">Impostos</option>
                  <option value="variaveis">Custos Variáveis</option>
                </select>
              </div>
            </div>
            <div className="modalTipodocpag">
              <div className="label">Tipo de Documento</div>
              <div className="input-text status">
                <select name="plancontapag" id="modalTipodocpag-dropbox">
                  <option value="pix">Pix</option>
                  <option value="cred">Crédito</option>
                  <option value="deb">Débito </option>
                  <option value="nf">NF</option>
                  <option value="transf">Transferência</option>
                  <option value="fat">Fatura</option>
                </select>
              </div>
            </div>
            <div className="modalFornpag">
              <div className="label">Fornecedor</div>
              <input type="text" className="input-text" required />
            </div>
            <div className="modalValor">
              <div className="label">Valor (R$)</div>
              <div>
                <input type="text" className="input-text" />
              </div>
            </div>
            <div className="modalDesc">
              <div className="label">Descrição</div>
              <div>
                <input type="text" className="input-text" />
              </div>
            </div>
          </Typography>
          {/* Botão para fechar o modal */}
          <button onClick={handleClose} className="FecharModalPag">
            X
          </button>
          <button onClick={handleClose} className="AlterarDadosPag">
            Alterar Despesa
          </button>
          <button onClick={handleClose} className="CancelarDadosPag">
            Cancelar Alteração
          </button>
        </Box>
      </Modal>
    </div>
  );
}
