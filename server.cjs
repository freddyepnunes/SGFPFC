// server.cjs
const express = require("express");
const { connectDB, sql } = require("./dbConfig.cjs");
const cors = require("cors");

const app = express();
const port = 5000;

// Configure o CORS para permitir o acesso de localhost:5173
const corsOptions = {
  origin: "http://localhost:5173", // Permite apenas essa origem
  methods: "GET,POST,PUT,DELETE,OPTIONS", // Métodos permitidos
  allowedHeaders: "Content-Type,Authorization", // Cabeçalhos permitidos
  optionsSuccessStatus: 200, // Para navegadores antigos
};

// Aplica o middleware CORS globalmente (antes das rotas)
app.use(cors(corsOptions));

// Middleware para parsing de JSON
app.use(express.json());

// Middleware para logging das requisições
app.use((req, res, next) => {
  console.log(`Recebendo requisição: ${req.method} ${req.url}`);
  next();
});

// Tratamento específico para preflight requests (opcional)
app.options("*", cors(corsOptions));

// Rota para buscar dados do SQL Server
app.get("/api/dados/:tipo", async (req, res) => {
  const tipo = req.params.tipo;
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
    res.json(result.recordset); // Retorna os dados
  } catch (err) {
    res.status(500).send("Erro ao buscar os dados: " + err);
  }
});

// Rota para cadastrar um novo usuário
app.post("/api/usuario", async (req, res) => {
  const { nome, email, senha } = req.body;

  // Validação básica
  if (!nome || !email || !senha) {
    return res.status(400).send("Todos os campos são obrigatórios.");
  }

  try {
    const pool = await connectDB();

    // Verifique se o email já existe
    const emailCheckQuery = `SELECT * FROM usuario WHERE email = @Email`;
    const emailCheck = await pool
      .request()
      .input("Email", sql.VarChar, email)
      .query(emailCheckQuery);

    // Se o e-mail já estiver cadastrado, retorna uma mensagem de erro
    if (emailCheck.recordset.length > 0) {
      return res.status(400).send("E-mail já cadastrado.");
    }

    // Inserir o novo usuário no banco de dados
    const query = `
        INSERT INTO usuario (nome, email, senha)
        VALUES (@nome, @email, @senha)
      `;

    await pool
      .request()
      .input("nome", sql.VarChar, nome)
      .input("email", sql.VarChar, email)
      .input("senha", sql.VarChar, senha)
      .query(query);

    return res.status(201).send("Usuário cadastrado com sucesso!");
  } catch (err) {
    return res.status(500).send("Erro ao cadastrar o usuário: " + err.message);
  }
});

// Rota para efetuar login
app.post("/api/login", async (req, res) => {
  const { email, senha } = req.body;

  // Validação básica
  if (!email || !senha) {
    return res.status(400).json({ error: "E-mail e senha são obrigatórios." });
  }

  try {
    const pool = await connectDB();

    // Verifique se o email existe
    const userCheckQuery = `SELECT * FROM usuario WHERE email = @Email`;
    const userCheck = await pool
      .request()
      .input("Email", sql.VarChar, email)
      .query(userCheckQuery);

    // Verifica se o usuário foi encontrado
    if (userCheck.recordset.length === 0) {
      return res.status(404).json({ error: "E-mail não cadastrado." });
    }

    // Verifica se a senha está correta
    if (userCheck.recordset[0].senha !== senha) {
      return res.status(401).json({ error: "Senha incorreta." });
    }

    // Se o e-mail e a senha estão corretos
    return res.status(200).json({ message: "Login efetuado." });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Erro ao efetuar login: " + err.message });
  }
});

// Inicializa o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
