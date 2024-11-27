import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { AgCharts } from "ag-charts-react";

function FinanceGraph({
  selectedDocumentType,
  selectedMonth,
  selectedBank,
  selectedPlanoConta,
}) {
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

    receitaData
      .filter(
        (item) =>
          (!selectedDocumentType || item.documento === selectedDocumentType) &&
          (!selectedMonth ||
            new Date(item.data).getMonth() === selectedMonth) &&
          (!selectedBank || item.tipo_banco === selectedBank) &&
          (!selectedPlanoConta ||
            item.plano_conta_receita === selectedPlanoConta)
      )
      .forEach((item) => {
        const { formattedMonth, monthNumber } = extractMonthYear(item.data);
        if (!dataMap[monthNumber]) {
          dataMap[monthNumber] = {
            month:
              formattedMonth.charAt(0).toUpperCase() + formattedMonth.slice(1),
            receitas: 0,
            despesas: 0,
          };
        }
        dataMap[monthNumber].receitas += item.valor || 0;
      });

    despesaData
      .filter(
        (item) =>
          (!selectedDocumentType || item.documento === selectedDocumentType) &&
          (!selectedMonth ||
            new Date(item.data).getMonth() === selectedMonth) &&
          (!selectedBank || item.tipo_banco === selectedBank) &&
          (!selectedPlanoConta || item.plano_conta === selectedPlanoConta)
      )
      .forEach((item) => {
        const { formattedMonth, monthNumber } = extractMonthYear(item.data);
        if (!dataMap[monthNumber]) {
          dataMap[monthNumber] = {
            month:
              formattedMonth.charAt(0).toUpperCase() + formattedMonth.slice(1),
            receitas: 0,
            despesas: 0,
          };
        }
        dataMap[monthNumber].despesas += item.valor || 0;
      });

    const processedData = Object.values(dataMap).sort(
      (a, b) => a.monthNumber - b.monthNumber
    );
    setChartData(processedData);
  }

  useEffect(() => {
    fetchData();
  }, [selectedDocumentType, selectedMonth, selectedBank, selectedPlanoConta]);

  const series = [
    {
      type: "bar",
      xKey: "month",
      yKey: "receitas",
      yName: "Receitas",
      fill: "#27ae60",
    },
    {
      type: "bar",
      xKey: "month",
      yKey: "despesas",
      yName: "Despesas",
      fill: "#c0392b",
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
          formatter: (params) =>
            `R$ ${params.value.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
            })}`,
        },
      },
    ],
  };

  return <AgCharts options={options} />;
}

const root = createRoot(document.getElementById("root"));
root.render(<FinanceGraph />);

export default FinanceGraph;
