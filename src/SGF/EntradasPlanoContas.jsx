import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { AgCharts } from "ag-charts-react";

function EntradaPlano() {
  const [chartData, setChartData] = useState([]);

  // Função para buscar dados da API de receita
  async function fetchData() {
    try {
      const response = await fetch("/api/dados/receita");
      const receitaData = await response.json();
      processChartData(receitaData);
    } catch (error) {
      console.error("Erro ao buscar os dados de receita:", error);
    }
  }

  // Função para processar os dados de receita
  function processChartData(receitaData) {
    const groupedData = {};

    // Agrupa os valores por plano_conta
    receitaData.forEach((item) => {
      const plano = item.plano_conta_receita;
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
    data: chartData, // Dados para o gráfico
    series: [
      {
        type: "donut", // Tipo de gráfico
        angleKey: "value", // Chave para os valores
        calloutLabelKey: "category", // Chave para os rótulos
        innerRadiusOffset: -40, // Define a "rosca" do gráfico de donut
        fills: ["#673AB7", "#3F51B5", "#2196F3"],
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
root.render(<EntradaPlano />);

export default EntradaPlano;
