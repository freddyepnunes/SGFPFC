// server.cjs
const express = require("express");
const { connectDB, sql } = require("./dbConfig.cjs");
const app = express();
const port = 5000;

// Rota para buscar dados do SQL Server
app.get("/api/dados/:tipo", async (req, res) => {
  const tipo = req.params.tipo; // tipo pode ser 'usuario', 'receita' ou 'despesa'
  try {
    const pool = await connectDB();
    let query;
    switch (tipo) {
      case "usuario":
        query = "SELECT * FROM usuario";
        break;
      case "receita":
        query = "SELECT * FROM receita";
        break;
      case "despesa":
        query = "SELECT * FROM despesa";
        break;
      default:
        return res.status(400).send("Tipo de dados inválido");
    }

    const result = await pool.request().query(query);
    res.json(result.recordset); // Retorna os dados para o frontend
  } catch (err) {
    res.status(500).send("Erro ao buscar os dados: " + err);
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
