import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { AgCharts } from "ag-charts-react";

function FinanceGraph() {
  const [chartData, setChartData] = useState([]);

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

  function processChartData(receitaData, despesaData) {
    const dataMap = {};

    function extractMonthYear(dateString) {
      if (!dateString) return "";
      const date = new Date(dateString);
      const monthFormatter = new Intl.DateTimeFormat("pt-BR", {
        month: "short",
      });
      const formattedMonth = monthFormatter.format(date);
      const monthNumber = date.getMonth();
      return { formattedMonth, monthNumber };
    }

    receitaData.forEach((item) => {
      const { formattedMonth, monthNumber } = extractMonthYear(item.data);
      if (!dataMap[monthNumber]) {
        dataMap[monthNumber] = {
          month:
            formattedMonth.charAt(0).toUpperCase() + formattedMonth.slice(1),
          monthNumber: monthNumber,
          receitas: 0,
          lucroLiquido: 0,
        };
      }
      dataMap[monthNumber].receitas += item.valor || 0;
    });

    despesaData.forEach((item) => {
      const { formattedMonth, monthNumber } = extractMonthYear(item.data);
      if (!dataMap[monthNumber]) {
        dataMap[monthNumber] = {
          month:
            formattedMonth.charAt(0).toUpperCase() + formattedMonth.slice(1),
          monthNumber: monthNumber,
          receitas: 0,
          lucroLiquido: 0,
        };
      }
      // Calcula o lucro líquido
      dataMap[monthNumber].lucroLiquido =
        (dataMap[monthNumber].receitas || 0) - (item.valor || 0);
    });

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
      yKey: "lucroLiquido",
      yName: "Lucro Líquido",
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
