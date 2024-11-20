import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-alpine.css";
import React, { useEffect, useRef, useState } from "react";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const ContasPagGrid = () => {
  const [rowData, setRowData] = useState([]); // Dados da tabela

  // Definição das colunas
  const [colDefs, setColDefs] = useState([
    {
      field: "id_despesa",
      headerName: "ID Despesa",
      sortable: true,
      filter: true,
    },
    { field: "data", headerName: "Data", sortable: true, filter: true },
    {
      field: "fornecedor",
      headerName: "Fornecedor",
      sortable: true,
      filter: true,
    },
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
      field: "plano_conta",
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
        // Formata o valor como moeda
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

  // Função para buscar os dados da API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/dados/despesa");
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
      />
    </div>
  );
};

export default ContasPagGrid;
