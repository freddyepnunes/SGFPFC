// dbConfig.cjs
const sql = require("mssql");

const dbConfig = {
  user: "sa", // seu nome de usuário do SQL Server
  password: "admin", // sua senha do SQL Server
  server: "192.168.0.17", // Seu servidor SQL
  database: "SQL_SGF", // Nome do banco de dados
  options: {
    encrypt: false, // Defina como true se estiver usando o Azure
    trustServerCertificate: true, // Pode precisar para conexões locais
    debug: { packet: true, data: true, payload: true },
  },
};

async function connectDB() {
  try {
    const pool = await sql.connect(dbConfig);
    console.log("Conexão bem-sucedida ao SQL Server");
    return pool;
  } catch (err) {
    console.error("Erro na conexão:", err);
  }
}

module.exports = {
  connectDB,
  sql,
};
