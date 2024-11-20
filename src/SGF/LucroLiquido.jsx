import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { AgCharts } from "ag-charts-react";

function FinanceGraph() {
  const [chartData, setChartData] = useState([]);

  // Função para buscar dados das APIs de receita e despesa
  async function fetchData() {
    try {
      const receitaResponse = await fetch("/api/dados/receita");
      const receitaData = await receitaResponse.json();
      const despesaResponse = await fetch("/api/dados/despesa");
      const despesaData = await despesaResponse.json();

      processChartData(receitaData, despesaData);
    } catch (error) {
      console.error("Erro ao buscar os dados:", error);
    }
  }

  // Função para processar os dados e agrupar valores por mês
  function processChartData(receitaData, despesaData) {
    const dataMap = {};

    // Função auxiliar para extrair o mês de uma data no formato "YYYY-MM-DD" e formatar como "Jan", "Fev", etc.
    function extractMonthYear(dateString) {
      if (!dateString) return "";
      const date = new Date(dateString);
      const monthFormatter = new Intl.DateTimeFormat("pt-BR", {
        month: "short",
      });
      const formattedMonth = monthFormatter.format(date);
      const monthNumber = date.getMonth(); // Extrai o número do mês (0 = Janeiro, 1 = Fevereiro, etc.)
      return { formattedMonth, monthNumber };
    }

    // Processa os dados de receita
    receitaData.forEach((item) => {
      const { formattedMonth, monthNumber } = extractMonthYear(item.data);
      if (!dataMap[monthNumber]) {
        dataMap[monthNumber] = {
          month:
            formattedMonth.charAt(0).toUpperCase() + formattedMonth.slice(1),
          monthNumber: monthNumber,
          receitas: 0,
          despesas: 0,
        };
      }
      dataMap[monthNumber].receitas += item.valor || 0;
    });

    // Processa os dados de despesa
    despesaData.forEach((item) => {
      const { formattedMonth, monthNumber } = extractMonthYear(item.data);
      if (!dataMap[monthNumber]) {
        dataMap[monthNumber] = {
          month:
            formattedMonth.charAt(0).toUpperCase() + formattedMonth.slice(1),
          monthNumber: monthNumber,
          receitas: 0,
          despesas: 0,
        };
      }
      dataMap[monthNumber].despesas += item.valor || 0;
    });

    // Converte o mapa de dados em um array para o gráfico e ordena pelos números dos meses
    const processedData = Object.values(dataMap).sort(
      (a, b) => a.monthNumber - b.monthNumber
    );
    setChartData(processedData);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const series = [
    {
      type: "bar",
      xKey: "month",
      yKey: "receitas",
      yName: "Receitas",
      fill: "#27ae60",
    },
    {
      type: "line",
      xKey: "month",
      yKey: "despesas",
      yName: "Despesas",
      strokeWidth: 2.5,
      marker: {
        enabled: true,
        shape: "circle",
        fill: "#2980b9",
      },
    },
  ];

  const options = {
    height: 430,
    data: chartData,
    series,
    legend: {
      position: "bottom",
    },
    axes: [
      {
        type: "category",
        position: "bottom",
        label: {
          rotation: 0,
        },
      },
      {
        type: "number",
        position: "left",
        label: {
          formatter: (params) => {
            // Formata os valores com separador de milhar e pontos decimais
            return params.value.toLocaleString("pt-BR", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            });
          },
        },
      },
    ],
  };

  return <AgCharts options={options} />;
}

const root = createRoot(document.getElementById("root"));
root.render(<FinanceGraph />);

export default FinanceGraph;
