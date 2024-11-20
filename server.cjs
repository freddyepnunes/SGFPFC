const express = require("express"); // Framework para criar servidores web
const { connectDB } = require("./dbConfig.cjs"); // Importa a função de conexão com SQLite
const cors = require("cors"); // Middleware para permitir solicitações CORS

// Cria uma constante do aplicativo Express
const app = express();
const port = 5000; // Define a porta que o servidor irá escutar

// Configura o CORS para permitir o acesso de localhost:5173
const corsOptions = {
  origin: "http://localhost:5173", // Permite solicitações apenas dessa origem
  methods: "GET,POST,PUT,DELETE,OPTIONS", // Especifica os métodos HTTP permitidos
  allowedHeaders: "Content-Type,Authorization", // Especifica os cabeçalhos permitidos
  optionsSuccessStatus: 200, // Para suporte a navegadores antigos
};

// Aplica o middleware CORS globalmente (antes das rotas)
app.use(cors(corsOptions));

// Middleware para fazer o parsing de JSON no corpo das requisições
app.use(express.json());

// Middleware para registrar as requisições recebidas no console
app.use((req, res, next) => {
  console.log(`Recebendo requisição: ${req.method} ${req.url}`);
  next(); // Chama o próximo middleware na cadeia
});

// Tratamento específico para requisições de pré-vôo (opcional)
app.options("*", cors(corsOptions)); // Responde a preflight requests com as opções de CORS

// Rota para buscar dados do SQLite com base no tipo solicitado
app.get("/api/dados/:tipo", (req, res) => {
  const tipo = req.params.tipo; // Extrai o tipo de dados da URL
  const db = connectDB(); // Estabelece a conexão com o banco de dados SQLite
  let query; // Variável para armazenar a consulta SQL

  // Define a consulta SQL com base no tipo de dados solicitado
  switch (tipo) {
    case "usuario":
      query = "SELECT * FROM usuario"; // Consulta para usuários
      break;
    case "receita":
      query = "SELECT * FROM receita"; // Consulta para receitas
      break;
    case "despesa":
      query = "SELECT * FROM despesa"; // Consulta para despesas
      break;
    default:
      return res.status(400).send("Tipo de dados inválido"); // Retorna erro se o tipo for inválido
  }

  db.all(query, [], (err, rows) => {
    if (err) {
      res.status(500).send("Erro ao buscar os dados: " + err.message);
    } else {
      res.json(rows); // Retorna os dados encontrados em formato JSON
    }
    db.close(); // Fecha a conexão após a consulta
  });
});

// Rota para cadastrar um novo usuário
app.post("/api/usuario", (req, res) => {
  const { nome, email, senha } = req.body; // Extrai os dados do corpo da requisição

  // Validação básica para verificar se todos os campos foram preenchidos
  if (!nome || !email || !senha) {
    return res.status(400).send("Todos os campos são obrigatórios.");
  }

  const db = connectDB(); // Conecta ao banco de dados

  // Verifica se o e-mail já existe
  const emailCheckQuery = `SELECT * FROM usuario WHERE email = ?`;
  db.get(emailCheckQuery, [email], (err, row) => {
    if (err) {
      res.status(500).send("Erro ao verificar o e-mail: " + err.message);
      db.close();
      return;
    }

    if (row) {
      res.status(400).send("E-mail já cadastrado.");
      db.close();
      return;
    }

    // Insere o novo usuário no banco de dados
    const insertQuery = `INSERT INTO usuario (nome, email, senha) VALUES (?, ?, ?)`;
    db.run(insertQuery, [nome, email, senha], function (err) {
      if (err) {
        res.status(500).send("Erro ao cadastrar o usuário: " + err.message);
      } else {
        res.status(201).send("Usuário cadastrado com sucesso!");
      }
      db.close(); // Fecha a conexão após a inserção
    });
  });
});

// Rota para efetuar login
app.post("/api/login", (req, res) => {
  const { email, senha } = req.body; // Extrai os dados do corpo da requisição

  // Validação básica para verificar se os campos foram preenchidos
  if (!email || !senha) {
    return res.status(400).json({ error: "E-mail e senha são obrigatórios." });
  }

  const db = connectDB(); // Conecta ao banco de dados

  // Verifica se o e-mail existe
  const userCheckQuery = `SELECT * FROM usuario WHERE email = ?`;
  db.get(userCheckQuery, [email], (err, row) => {
    if (err) {
      res.status(500).json({ error: "Erro ao efetuar login: " + err.message });
      db.close();
      return;
    }

    if (!row) {
      res.status(404).json({ error: "E-mail não cadastrado." });
      db.close();
      return;
    }

    // Verifica se a senha está correta
    if (row.senha !== senha) {
      res.status(401).json({ error: "Senha incorreta." });
      db.close();
      return;
    }

    // Se o e-mail e a senha estão corretos, retorna sucesso
    res.status(200).json({ message: "Login efetuado." });
    db.close(); // Fecha a conexão
  });
});

// Inicializa o servidor e escuta na porta definida
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`); // Mensagem indicando que o servidor está ativo
});
