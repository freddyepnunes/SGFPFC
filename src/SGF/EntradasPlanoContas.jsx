import React, { useState, useEffect } from "react";
import { AgCharts } from "ag-charts-react";

function EntradaPlano({
  selectedDocumentType,
  selectedMonth,
  selectedBank,
  selectedPlanoConta,
}) {
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

  // Função para processar os dados de receita e aplicar filtros
  function processChartData(receitaData) {
    const groupedData = {};

    // Aplica filtros
    const filteredData = receitaData.filter((item) => {
      const itemDate = new Date(item.data);
      const itemMonth = itemDate.getMonth();
      return (
        (!selectedDocumentType || item.documento === selectedDocumentType) &&
        (!selectedMonth || itemMonth === selectedMonth) &&
        (!selectedBank || item.tipo_banco === selectedBank) &&
        (!selectedPlanoConta || item.plano_conta_receita === selectedPlanoConta)
      );
    });

    // Agrupa os valores por plano_conta_receita
    filteredData.forEach((item) => {
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
  }, [selectedDocumentType, selectedMonth, selectedBank, selectedPlanoConta]);

  // Opções do gráfico com tooltip formatado
  const options = {
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

export default EntradaPlano;
