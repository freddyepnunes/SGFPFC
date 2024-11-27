import React, { useState, useEffect } from "react";
import { AgCharts } from "ag-charts-react";

function LucroLiquido({
  selectedDocumentType,
  selectedMonth,
  selectedBank,
  selectedPlanoConta,
}) {
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

    // Aplica filtros e agrupa receitas
    receitaData
      .filter((item) => {
        const itemDate = new Date(item.data);
        const itemMonth = itemDate.getMonth();
        return (
          (!selectedDocumentType || item.documento === selectedDocumentType) &&
          (!selectedMonth || itemMonth === selectedMonth) &&
          (!selectedBank || item.tipo_banco === selectedBank) &&
          (!selectedPlanoConta ||
            item.plano_conta_receita === selectedPlanoConta)
        );
      })
      .forEach((item) => {
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

    // Aplica filtros e agrupa despesas
    despesaData
      .filter((item) => {
        const itemDate = new Date(item.data);
        const itemMonth = itemDate.getMonth();
        return (
          (!selectedDocumentType || item.documento === selectedDocumentType) &&
          (!selectedMonth || itemMonth === selectedMonth) &&
          (!selectedBank || item.tipo_banco === selectedBank) &&
          (!selectedPlanoConta || item.plano_conta === selectedPlanoConta)
        );
      })
      .forEach((item) => {
        const { monthNumber } = extractMonthYear(item.data);
        if (!dataMap[monthNumber]) {
          dataMap[monthNumber] = {
            month: "",
            monthNumber: monthNumber,
            receitas: 0,
            lucroLiquido: 0,
          };
        }
        dataMap[monthNumber].lucroLiquido -= item.valor || 0;
      });

    // Calcula o lucro líquido final
    Object.keys(dataMap).forEach((monthNumber) => {
      dataMap[monthNumber].lucroLiquido += dataMap[monthNumber].receitas;
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
      type: "line",
      xKey: "month",
      yKey: "lucroLiquido",
      yName: "Lucro Líquido",
      stroke: "#2980b9",
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

export default LucroLiquido;
