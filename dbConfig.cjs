// dbConfig.cjs
const sql = require("mssql"); // Importa o módulo mssql para interação com o SQL Server

// Configuração do banco de dados
const dbConfig = {
  user: "sa", // seu nome de usuário do SQL Server
  password: "admin", // sua senha do SQL Server
  server: "192.168.0.17", // Seu servidor SQL
  database: "SQL_SGF", // Nome do banco de dados
  options: {
    encrypt: false, // Defina como true se estiver usando o Azure
    trustServerCertificate: true, // Permite conexões locais não seguras
    debug: { packet: true, data: true, payload: true }, // Ativa o modo de depuração para detalhes adicionais (opcional)
  },
};

// Função assíncrona para conectar ao banco de dados
async function connectDB() {
  try {
    const pool = await sql.connect(dbConfig); // Tenta estabelecer uma conexão usando a configuração fornecida
    console.log("Conexão bem-sucedida ao SQL Server"); // Mensagem de sucesso na conexão
    return pool; // Retorna o objeto de conexão (pool) se bem-sucedido
  } catch (err) {
    console.error("Erro na conexão:", err); // Exibe um erro no console caso a conexão falhe
  }
}

// Exporta a função de conexão e o módulo sql para uso em outros arquivos
module.exports = {
  connectDB,
  sql,
};
