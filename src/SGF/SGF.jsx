import React, { useState, useEffect } from "react"; // Importa React e hooks useState e useEffect
import "./SGF.css"; // Importa o arquivo CSS para estilos da página
import SGFLogo from "../Imagens/10.png"; // Importa o logo do SGF
import { Link } from "react-router-dom"; // Importa o componente Link para navegação entre páginas
import "@fortawesome/fontawesome-free/css/all.min.css";
import FinanceGraph from "./FluxoCaixa";
import SaidaPlano from "./SaidasPlanoContas";
import EntradaPlano from "./EntradasPlanoContas";
import LucroLiquido from "./LucroLiquido";

function SGF() {
  // Estados para armazenar os valores dos selects
  const [tipoDocumento, setTipoDocumento] = useState("");
  const [banco, setBanco] = useState("");
  const [contasReceber, setContasReceber] = useState([]); // Inicializa a lista de contas a receber
  const [contasPagar, setContasPagar] = useState([]); // Inicializa a lista de contas a pagar
  const [planoConta, setPlanoConta] = useState("");
  const [bancos, setBancos] = useState([]); // Estado para armazenar os bancos únicos
  const [planoContas, setPlanoContas] = useState([]); // Estado para armazenar planos combinados
  const [nomeUsuario, setNomeUsuario] = useState(""); // Estado para armazenar o nome do usuário

  // Função para buscar dados de uma API
  const fetchData = async (url, setData) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error(`Erro ao buscar dados de ${url}:`, error);
      setData([]); // Define um array vazio em caso de erro
    }
  };

  // useEffect para buscar os valores das contas a receber da API
  useEffect(() => {
    fetchData("/api/dados/receita", setContasReceber);
  }, []);

  // useEffect para buscar os valores das contas a pagar da API
  useEffect(() => {
    fetchData("/api/dados/despesa", setContasPagar);
  }, []);

  // useEffect para buscar os valores de contas e bancos
  useEffect(() => {
    fetchData("/api/dados/receita", setContasReceber);
    fetchData("/api/dados/despesa", setContasPagar);
  }, []);

  useEffect(() => {
    // Combinar os bancos de receita e despesa
    const bancosReceita = contasReceber.map((conta) => conta.tipo_banco);
    const bancosDespesa = contasPagar.map((conta) => conta.tipo_banco);

    // Criar um array único de bancos
    const bancosUnicos = Array.from(
      new Set([...bancosReceita, ...bancosDespesa])
    );

    setBancos(bancosUnicos);
  }, [contasReceber, contasPagar]);

  // Combinar planos de contas de receitas e despesas
  useEffect(() => {
    const planosReceita = contasReceber.map(
      (conta) => conta.plano_conta_receita
    );
    const planosDespesa = contasPagar.map((conta) => conta.plano_conta);
    const planosUnicos = Array.from(
      new Set([...planosReceita, ...planosDespesa])
    );
    setPlanoContas(planosUnicos);
  }, [contasReceber, contasPagar]);

  // Recupera o nome do usuário do localStorage quando o componente é montado
  useEffect(() => {
    const nome = localStorage.getItem("nome_usuario");
    if (nome) {
      setNomeUsuario(nome);
    }
  }, []);

  // Calcula a soma total das contas a receber
  const somaTotalRec = contasReceber.reduce(
    (acc, conta) =>
      acc + // Aplica todos os filtros
      ((planoConta === "" || conta.plano_conta_receita === planoConta) &&
      (banco === "" || conta.tipo_banco === banco) &&
      (tipoDocumento === "" || conta.documento === tipoDocumento)
        ? conta.valor
        : 0),
    0
  );

  // Calcula a soma total das contas a pagar
  const somaTotalPag = contasPagar.reduce(
    (acc, conta) =>
      acc + // Aplica todos os filtros
      ((planoConta === "" || conta.plano_conta === planoConta) &&
      (banco === "" || conta.tipo_banco === banco) &&
      (tipoDocumento === "" || conta.documento === tipoDocumento)
        ? conta.valor
        : 0),
    0
  );

  // Calcula o lucro líquido subtraindo a soma das contas a pagar da soma das contas a receber
  const totalLucroLiquido = somaTotalRec - somaTotalPag;

  const handleClear = () => {
    setBanco("");
    setTipoDocumento("");
    setPlanoConta("");
  };

  return (
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
        </div>
      </div>

      <div className="Card">
        <div className="Forma1">
          <p>
            <strong>Contas a receber</strong>
          </p>
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
            <strong>Lucro Líquido</strong>
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
        <div className="LinhaCab"></div>
        <div className="BemVindo">{`Olá, ${nomeUsuario}. Bem-vindo ao SGF.`}</div>
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
        <div className="banctxt">
          <strong>Banco</strong>
        </div>
        <div className="plantxt">
          <strong>Plano de Contas</strong>
        </div>
        <select
          className="dropdown"
          value={tipoDocumento}
          onChange={(e) => setTipoDocumento(e.target.value)}
        >
          <option value="">Selecione</option>
          <option value="Pix">Pix</option>
          <option value="Crédito">Crédito</option>
          <option value="Débito">Débito</option>
          <option value="NF">NF</option>
          <option value="Transferência">Transferência</option>
          <option value="Fatura">Fatura</option>
        </select>
        <select
          className="dropdown3"
          value={banco}
          onChange={(e) => setBanco(e.target.value)}
        >
          <option value="">Selecione</option>
          {bancos.map((banco, index) => (
            <option key={index} value={banco}>
              {banco}
            </option>
          ))}
        </select>
        <select
          className="dropdown4"
          value={planoConta}
          onChange={(e) => setPlanoConta(e.target.value)}
        >
          <option value="">Selecione</option>
          {planoContas.map((plano, index) => (
            <option key={index} value={plano}>
              {plano}
            </option>
          ))}
        </select>
        <button onClick={handleClear} className="BtnLimparFiltros">
          Limpar Filtros
        </button>
      </div>

      {/* Quadrado 2 */}
      <div className="quadrado2">
        <div className="VisaoFinanceiratxt">Visão Financeira</div>
        <div className="gf1">
          <div className="FluxodeCaixatxt">
            <strong>Fluxo de Caixa</strong>
            <FinanceGraph
              selectedDocumentType={tipoDocumento}
              selectedBank={banco}
              selectedPlanoConta={planoConta}
            />
          </div>
        </div>
        <div className="gf2">
          <div className="saidaplanocontatxt">
            <strong>Saídas por Plano de Contas</strong>
            <SaidaPlano
              selectedDocumentType={tipoDocumento}
              selectedBank={banco}
              selectedPlanoConta={planoConta}
            />
          </div>
        </div>
        <div className="gf3">
          <div className="entradaplanocontatxt">
            <strong>Entradas por Plano de Contas</strong>
            <EntradaPlano
              selectedDocumentType={tipoDocumento}
              selectedBank={banco}
              selectedPlanoConta={planoConta}
            />
          </div>
        </div>
      </div>

      {/* Quadrado 3 */}
      <div className="quadrado3">
        <div className="VisaoEconomicatxt">Visão Econômica</div>
        <div className="gf10">
          <div className="receitastotaistxt">
            Receitas Totais
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
        </div>
        <div className="gf11">
          <div className="custostotaistxt">
            Custos Totais
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
        </div>
        <div className="gf12">
          <div className="lucroliquidotxt">
            Lucro Líquido
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
        <div className="gf13">
          <div className="lucroregimecomptxt">
            Lucro Líquido (Regime de Competência)
            <LucroLiquido
              selectedDocumentType={tipoDocumento}
              selectedBank={banco}
              selectedPlanoConta={planoConta}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SGF;
