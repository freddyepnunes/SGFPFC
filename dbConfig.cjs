const sqlite3 = require("sqlite3").verbose(); // Importa o módulo sqlite3

// Configuração do banco de dados SQLite
const dbPath = "./PFC.db";

// Função para conectar ao banco de dados SQLite
function connectDB() {
  // Cria uma conexão com o banco de dados
  const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error("Erro ao conectar ao banco de dados SQLite:", err.message);
    } else {
      console.log("Conectado ao banco de dados SQLite.");
    }
  });
  return db; // Retorna a instância de conexão
}

// Exporta a função de conexão para uso em outros arquivos
module.exports = {
  connectDB,
};
