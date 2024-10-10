import React from "react";
import "./Dash.css";
import "./SGF.css";
import UMCLogo from "./Imagens/UMC.png";
import { Link } from "react-router-dom";

const FinanceControl = () => {
  return (
    <div>
      {/* Menu */}
      <div className="form-menu">
        <img className="UMC_Logo" src={UMCLogo} alt="UMC Logo" />
        <div className="Botoes">
          <Link to="/" className="link">
            <button type="button" className="btn btn1 btn-sep" id="button1">
              Home
              <div className="Indicador2"></div>
            </button>
          </Link>
          <Link to="/Clientes" className="link">
            <button
              type="button"
              className="btn btn3 btn-sep btn-icon3"
              id="button3"
            >
              Clientes/
              <br />
              Fornecedores
              <div className="Indicador2"></div>
            </button>
          </Link>
          <Link to="/ContasRec" className="link">
            <button
              type="button"
              className="btn btn5 btn-sep btn-icon5"
              id="button5"
            >
              Contas a Receber
              <div className="Indicador2"></div>
            </button>
          </Link>
          <Link to="/ContasPag" className="link">
            <button
              type="button"
              className="btn btn6 btn-sep btn-icon6"
              id="button6"
            >
              Contas a Pagar
              <div className="Indicador2"></div>
            </button>
          </Link>
          <Link to="/dash" className="link">
            <button
              type="button"
              className="btn btn2 btn-sep btn-icon2"
              id="button2"
            >
              <i className="fa-solid fa-chart-simple"></i>Dashboard
              <div className="Indicador2"></div>
            </button>
          </Link>
          <div className="Indicador"></div>
        </div>
      </div>

      {/* Cabeçalho */}
      <div className="Cabeçalho">
        <button type="button" className="btnCab">
          {/* Removeu o FontAwesomeIcon */}
        </button>
        <div className="LinhaCab"></div>
        <div className="Filiais">Filial: N/A</div>
        <div className="BemVindo">Bem Vindo SGF HelpB</div>
        <button type="button" className="Sair">
          Sair
        </button>
      </div>

      {/* Quadrado 1 */}
      <div className="quadrado1">
        <div className="TipoRelatoriotxt">
          <strong>Tipo de Relatório</strong>
        </div>
        <div className="Anotxt">
          <strong>Ano</strong>
        </div>
        <div className="Filialtxt">
          <strong>Filial</strong>
        </div>
        <button className="btnBuscar">
          <strong>Buscar</strong>
        </button>
        <select className="dropdown">
          <option value="Projetadotxt">Projetado</option>
          <option value="Realizadotxt">Realizado</option>
        </select>
        <select className="dropdown2">
          <option value="2023">2023</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
          <option value="2026">2026</option>
        </select>
        <select className="dropdown3">
          <option value="Filial 1">Filial 1</option>
          <option value="Filial 2">Filial 2</option>
          <option value="Filial 3">Filial 3</option>
          <option value="Filial 4">Filial 4</option>
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
        <div className="gf4">
          <div className="saldofinaltxt">
            <strong>Evolução do Saldo Final</strong>
          </div>
        </div>
        <button type="button2" className="btnsaldofinal">
          {/* Removeu o FontAwesomeIcon */}
        </button>
        <div className="gf5">
          <div className="bancotxt">
            <strong>Banco</strong>
          </div>
          <select className="dropdown4">
            <option value="Selecione">Selecione</option>
          </select>
          <div className="saldofinalevolBancotxt">
            <strong>Evolução do Saldo Final por Banco</strong>
          </div>
        </div>
        <button type="button3" className="btnsaldofinalbanco">
          {/* Removeu o FontAwesomeIcon */}
        </button>
        <div className="gf6">
          <div className="saldocaixaempresatxt">Saldo Caixa Empresa</div>
        </div>
        <div className="gf7">
          <div className="saldocontacorrentetxt">Saldo Conta Corrente</div>
        </div>
        <div className="gf8">
          <div className="saldobanco1txt">Saldo BANCO 1</div>
        </div>
        <div className="gf9">
          <div className="saldobanco2txt">Saldo BANCO 2</div>
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
        <div className="analisedretxt">Analise Mensal (DRE)</div>
        <div className="mesanotxt">Mês/Ano</div>

        <div className="mesdre">
          <input className="dremes" type="text" />
        </div>

        <div className="gf14">
          <div className="entradaplanotxt">
            <strong>Entradas por Plano de Contas</strong>
          </div>
        </div>
        <div className="gf15">
          <div className="saidaplanotxt">
            <strong>Saída por Plano de Contas</strong>
          </div>
        </div>
        <div className="gf16">
          <div className="margemcontibuicaotxt">Margem de Contribuição</div>
        </div>
        <div className="gf17">
          <div className="margemcontribuicao2txt">Margem de Contribuição %</div>
        </div>
        <div className="gf18">
          <div className="lucrooperacionaltxt">Lucro Operacional</div>
        </div>
        <div className="gf19">
          <div className="lucriliquidotxt">Lucro Líquido</div>
        </div>
        <div className="gf20">
          <div className="margemliqquidatxt">Margem Líquida %</div>
        </div>
      </div>
    </div>
  );
};

export default FinanceControl;
