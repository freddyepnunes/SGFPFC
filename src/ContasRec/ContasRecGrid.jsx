import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-alpine.css"; // Tema claro Alpine
import React, { useEffect, useRef, useState } from "react";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const ContasRecGrid = () => {
  const [rowData, setRowData] = useState([]); // Dados da tabela

  // Definição das colunas
  const [colDefs, setColDefs] = useState([
    {
      field: "id_receita",
      headerName: "ID Receita",
      sortable: true,
      filter: true,
    },
    {
      field: "data",
      headerName: "Data",
      sortable: true,
      filter: true,
      valueFormatter: (params) => {
        if (!params.value) return "";
        const dateParts = params.value.split("-");
        const day = dateParts[2];
        const month = dateParts[1];
        const year = dateParts[0];
        return `${day}/${month}/${year}`;
      },
    },
    { field: "cliente", headerName: "Cliente", sortable: true, filter: true },
    {
      field: "documento",
      headerName: "Documento",
      sortable: true,
      filter: true,
    },
    {
      field: "tipo_banco",
      headerName: "Tipo Banco",
      sortable: true,
      filter: true,
    },
    {
      field: "plano_conta_receita",
      headerName: "Plano de Conta",
      sortable: true,
      filter: true,
    },
    {
      field: "valor",
      headerName: "Valor",
      sortable: true,
      filter: true,
      valueFormatter: (params) => {
        return params.value.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });
      },
    },
    {
      field: "descricao",
      headerName: "Descrição",
      sortable: true,
      filter: true,
    },
  ]);

  const defaultColDef = {
    flex: 1,
    resizable: true,
  };

  const gridRef = useRef();

  const localeText = {
    // Tradução geral
    page: "Página",
    more: "Mais",
    to: "até",
    of: "de",
    next: "Próximo",
    last: "Último",
    first: "Primeiro",
    previous: "Anterior",
    loadingOoo: "Carregando...",

    // Botões de filtros
    selectAll: "Selecionar Todos",
    searchOoo: "Procurar...",
    blanks: "Vazios",

    // Botões de filtros de texto
    filterOoo: "Filtrar...",
    applyFilter: "Aplicar Filtro...",

    // Filtros numéricos e de texto
    equals: "Igual",
    notEqual: "Diferente",
    lessThan: "Menor que",
    greaterThan: "Maior que",
    lessThanOrEqual: "Menor ou igual a",
    greaterThanOrEqual: "Maior ou igual a",
    inRange: "No intervalo",
    contains: "Contém",
    notContains: "Não contém",
    startsWith: "Começa com",
    endsWith: "Termina com",
    blank: "Em branco",
    notBlank: "Não em branco",
    before: "Antes",
    after: "Depois",

    // Outras configurações de filtro
    noRowsToShow: "Nenhuma linha para mostrar",
    andCondition: "E",
    orCondition: "OU",

    // Outros textos gerais
    copy: "Copiar",
    ctrlC: "Ctrl+C",
    paste: "Colar",
    ctrlV: "Ctrl+V",
  };

  // Função para buscar os dados da API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/dados/receita");
        if (!response.ok) {
          throw new Error("Erro ao buscar os dados.");
        }
        const data = await response.json();
        setRowData(data);
      } catch (error) {
        console.error("Erro ao buscar os dados da API:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="ag-theme-alpine" style={{ width: "100%", height: "100%" }}>
      <AgGridReact
        ref={gridRef}
        rowData={rowData}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
        localeText={localeText}
      />
    </div>
  );
};

export default ContasRecGrid;
