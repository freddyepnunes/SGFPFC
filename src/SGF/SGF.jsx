import React, { useState, useEffect } from "react"; // Importa React e hooks useState e useEffect
import "./SGF.css"; // Importa o arquivo CSS para estilos da página
import UMCLogo from "../Imagens/UMC.png"; // Importa o logo da UMC
import { Link } from "react-router-dom"; // Importa o componente Link para navegação entre páginas

function SGF() {
  // Estado para armazenar os valores de contas a receber
  const [contasReceber, setContasReceber] = useState([]); // Inicializa a lista de contas a receber como um array vazio
  const [contasPagar, setContasPagar] = useState([]); // Inicializa a lista de contas a pagar como um array vazio

  // useEffect para buscar os valores das contas a receber da API
  useEffect(() => {
    fetch("/api/dados/receita") // Faz uma requisição para a API na rota especificada
      .then((response) => {
        // Verifica se a resposta da API é ok (status 200-299)
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`); // Lança um erro se a resposta não for ok
        }
        return response.json(); // Converte a resposta para JSON
      })
      .then((data) => setContasReceber(data)) // Atualiza o estado com os dados recebidos
      .catch((error) => {
        // Trata erros na requisição
        console.error("Erro ao buscar contas a receber:", error); // Exibe o erro no console
        setContasReceber([]); // Define um array vazio em caso de erro
      });
  }, []); // O array vazio [] garante que a requisição ocorra apenas uma vez quando o componente é montado

   // useEffect para buscar os valores das contas a pagar da API
  useEffect(() => {
    fetch("/api/dados/despesa") // Faz uma requisição para a API na rota especificada
      .then((response) => {
        // Verifica se a resposta da API é ok
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`); // Lança um erro se a resposta não for ok
        }
        return response.json(); // Converte a resposta para JSON
      })
      .then((data) => setContasPagar(data)) // Atualiza o estado com os dados recebidos
      .catch((error) => {
        // Trata erros na requisição
        console.error("Erro ao buscar contas a receber:", error); // Exibe o erro no console
        setContasPagar([]); // Define um array vazio em caso de erro
      });
  }, []); // O array vazio [] garante que a requisição ocorra apenas uma vez quando o componente é montado

  // Calcula a soma total das contas a receber
  const somaTotalRec = contasReceber.reduce(
    (acc, conta) => acc + conta.valor, // Soma os valores de cada conta
    0 // Inicializa o acumulador em 0
  );

  // Calcula a soma total das contas a pagar
  const somaTotalPag = contasPagar.reduce((acc, conta) => acc + conta.valor, 0);

  // Calcula o lucro líquido subtraindo a soma das contas a pagar da soma das contas a receber
  const totalLucroLiquido = somaTotalRec - somaTotalPag;

  return ( //Faz um retorno do que vai aparecer nas telas, linhas de código bem semelhantes ao "HTML5".
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

export default SGF; // Faz o exporte padrão dos componentes do SGF, para que se possa ser usado em outro elemento de outro arquivo
