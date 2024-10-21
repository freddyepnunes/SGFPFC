import React, { useState, useEffect } from "react";
import "./SGF.css"; // Importando CSS
import UMCLogo from "../Imagens/UMC.png";
import { Link } from "react-router-dom";

function SGF() {
  // Estado para armazenar os valores de contas a receber
  const [contasReceber, setContasReceber] = useState([]);
  const [contasPagar, setContasPagar] = useState([]);

  // useEffect para buscar os valores da API (ou qualquer fonte de dados)
  useEffect(() => {
    fetch("/api/dados/receita") // Atualize a URL de acordo com a rota definida no servidor
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setContasReceber(data))
      .catch((error) => {
        console.error("Erro ao buscar contas a receber:", error);
        setContasReceber([]); // Caso de erro, definir um array vazio
      });
  }, []);

  useEffect(() => {
    fetch("/api/dados/despesa") // Atualize a URL de acordo com a rota definida no servidor
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setContasPagar(data))
      .catch((error) => {
        console.error("Erro ao buscar contas a receber:", error);
        setContasPagar([]); // Caso de erro, definir um array vazio
      });
  }, []);

  const somaTotalRec = contasReceber.reduce(
    (acc, conta) => acc + conta.valor,
    0
  );
  const somaTotalPag = contasPagar.reduce((acc, conta) => acc + conta.valor, 0);
  const totalLucroLiquido = somaTotalRec - somaTotalPag;

  return (
    <div>
      <div className="form-menu">
        <img className="UMC_Logo" src={UMCLogo} alt="UMC Logo" />
        <div className="Botoes">
          <Link to="/Home" className="link">
            <button type="button" className="btn btn1 btn-sep" id="button1">
              <i className="fa-solid fa-house"></i>Home
              <div className="Indicador2"></div>
            </button>
          </Link>
          <Link to="/ContasRec" className="link">
            <button
              type="button"
              className="btn btn5 btn-sep btn-icon5"
              id="button5"
            >
              <i className="fa-solid fa-handshake"></i>Contas a Receber
              <div className="Indicador2"></div>
            </button>
          </Link>
          <Link to="/ContasPag" className="link">
            <button
              type="button"
              className="btn btn6 btn-sep btn-icon6"
              id="button6"
            >
              <i className="fa-solid fa-money-bill"></i>Contas a Pagar
              <div className="Indicador2"></div>
            </button>
          </Link>
        </div>
      </div>

      <div className="Card">
        <div className="Forma1">
          <p>
            <strong>Contas a receber</strong>
          </p>
          {/* Exibindo os valores recebidos na div Valor1 */}
          <div className="Valor1" id="Valores">
            {contasReceber.length > 0 ? (
              <p>
                R${" "}
                {somaTotalRec.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            ) : (
              <p>R$ 0,00</p>
            )}
          </div>
        </div>
        <div className="Forma2">
          <p>
            <strong>Contas a pagar</strong>
          </p>
          <div className="Valor2" id="Valores">
            {contasPagar.length > 0 ? (
              <p>
                R${" "}
                {somaTotalPag.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            ) : (
              <p>R$ 0,00</p>
            )}
          </div>
        </div>
        <div className="Forma3">
          <p>
            <strong>Lucro Liquído</strong>
          </p>
          <div className="Valor3" id="Valores">
            <p>
              R${" "}
              {totalLucroLiquido.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>
        </div>
      </div>

      <div className="Cabeçalho">
        <button type="button" className="btnCab" id="btnCab">
          <i className="fa-solid fa-bars"></i>
        </button>
        <div className="LinhaCab"></div>
        <div className="BemVindo">Bem Vindo SGF</div>
        <Link to="/Login" className="link">
          <button type="button" className="Sair" id="btnSair">
            Sair
          </button>
        </Link>
      </div>

      {/* Quadrado 1 */}
      <div className="quadrado1">
        <div className="tipodocumentotxt">
          <strong>Tipo de Documento</strong>
        </div>
        <div className="datatxt">
          <strong>Data</strong>
        </div>
        <div className="banctxt">
          <strong>Banco</strong>
        </div>
        <button className="btnBuscar">
          <strong>Buscar</strong>
        </button>
        <select className="dropdown">
          <option value="pix">Pix</option>
          <option value="cred">Crédito</option>
          <option value="deb">Débito </option>
          <option value="nf">NF</option>
          <option value="transf">Transferência</option>
          <option value="fat">Fatura</option>
        </select>
        <select className="dropdown2">
          <option value="2023">2023</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
          <option value="2026">2026</option>
        </select>
        <select className="dropdown3">
          <option value="banc 1">Banco 1</option>
          <option value="banc 2">Banco 2</option>
          <option value="banc 3">Banco 3</option>
          <option value="banc 4">Banco 4</option>
          <option value="banc 5">Banco 5</option>
        </select>
      </div>

      {/* Quadrado 2 */}
      <div className="quadrado2">
        <div className="VisaoFinanceiratxt">Visão Financeira</div>
        <div className="gf1">
          <div className="FluxodeCaixatxt">
            <strong>Fluxo de Caixa</strong>
          </div>
        </div>
        <div className="gf2">
          <div className="saidaplanocontatxt">
            <strong>Saídas por Plano de Contas</strong>
          </div>
        </div>
        <div className="gf3">
          <div className="entradaplanocontatxt">
            <strong>Entradas por Plano de Contas</strong>
          </div>
        </div>
      </div>

      {/* Quadrado 3 */}
      <div className="quadrado3">
        <div className="VisaoEconomicatxt">Visao Econômica</div>
        <div className="gf10">
          <div className="receitastotaistxt">Receitas Totais</div>
        </div>
        <div className="gf11">
          <div className="custostotaistxt">Custos Totais</div>
        </div>
        <div className="gf12">
          <div className="lucroliquidotxt">Lucro Líquido</div>
        </div>
        <div className="gf13">
          <div className="lucroregimecomptxt">
            Lucro Líquido (Regime de Competência)
          </div>
        </div>
      </div>
    </div>
  );
}

export default SGF;
