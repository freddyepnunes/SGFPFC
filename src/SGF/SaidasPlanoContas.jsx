import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { AgCharts } from "ag-charts-react";

function SaidaPlano() {
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

  // Processa os dados para agrupar valores por plano de conta
  function processChartData(despesaData) {
    const groupedData = {};

    // Agrupa os valores por plano_conta
    despesaData.forEach((item) => {
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
  }, []);

  // Opções do gráfico com tooltip formatado
  const options = {
    width: 700, // Largura específica
    height: 420, // Altura específica
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
  return <AgCharts options={options} />;
}

const root = createRoot(document.getElementById("root"));
root.render(<SaidaPlano />);

export default SaidaPlano;
