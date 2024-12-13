import React, { useState, useEffect } from "react";
import { AgCharts } from "ag-charts-react";

function SaidaPlano({
  selectedDocumentType,
  selectedMonth,
  selectedBank,
  selectedPlanoConta,
}) {
  const [chartData, setChartData] = useState([]);

  // Função para buscar dados da API de despesas
  async function fetchData() {
    try {
      const response = await fetch("/api/dados/despesa");
      const data = await response.json();
      processChartData(data);
    } catch (error) {
      console.error("Erro ao buscar os dados de despesas:", error);
    }
  }

  // Processa os dados para agrupar valores por plano de conta e aplicar filtros
  function processChartData(despesaData) {
    const groupedData = {};

    // Aplica filtros
    const filteredData = despesaData.filter((item) => {
      const itemDate = new Date(item.data);
      const itemMonth = itemDate.getMonth();
      return (
        (!selectedDocumentType || item.documento === selectedDocumentType) &&
        (!selectedMonth || itemMonth === selectedMonth) &&
        (!selectedBank || item.tipo_banco === selectedBank) &&
        (!selectedPlanoConta || item.plano_conta === selectedPlanoConta)
      );
    });

    // Agrupa os valores por plano_conta
    filteredData.forEach((item) => {
      const plano = item.plano_conta;
      if (!groupedData[plano]) {
        groupedData[plano] = 0;
      }
      groupedData[plano] += item.valor || 0;
    });

    const totalValue = Object.values(groupedData).reduce(
      (acc, val) => acc + val,
      0
    );

    // Transforma os dados agrupados em um array para o gráfico e ordena por valor em ordem decrescente
    const processedData = Object.keys(groupedData)
      .map((key) => ({
        category: key,
        value: groupedData[key],
        formattedValue: new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(groupedData[key]),
        percentage: ((groupedData[key] / totalValue) * 100).toFixed(2), // Calcula a porcentagem
      }))
      .sort((a, b) => b.value - a.value); // Ordena em ordem decrescente com base no valor

    setChartData(processedData);
  }

  useEffect(() => {
    fetchData();
  }, [selectedDocumentType, selectedMonth, selectedBank, selectedPlanoConta]);

  // Opções do gráfico com tooltip formatado
  const options = {
    data: chartData, // Dados processados para o gráfico
    series: [
      {
        type: "donut", // Tipo de gráfico
        angleKey: "value", // Chave para os valores
        calloutLabelKey: "category", // Chave para os rótulos
        innerRadiusOffset: -40, // Define a "rosca" do gráfico de donut
        fills: [
          "#FF5722",
          "#FF9800",
          "#FFC107",
          "#FFD700",
          "#8BC34A",
          "#4CAF50",
        ],
        tooltip: {
          renderer: ({ datum }) => {
            return {
              content: `<b>${datum.category}</b><br>Valor: ${datum.formattedValue}<br>Porcentagem: ${datum.percentage}%`,
            };
          },
        },
      },
    ],
    legend: {
      position: "right", // Posição da legenda (top, bottom, left, right)
    },
  };

  // Renderizando o gráfico
  return (
      <div
        style={{
          width: "100%",
          height: "100%",
          marginTop: 10,
        }}
      >
        <AgCharts options={options} />
      </div>
    );
}

export default SaidaPlano;
