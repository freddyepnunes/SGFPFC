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
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ error: "E-mail e senha são obrigatórios." });
  }

  const db = connectDB(); // Conecta ao banco de dados SQLite

  const query = `SELECT id_usuario FROM usuario WHERE email = ? AND senha = ?`;

  db.get(query, [email, senha], (err, row) => {
    if (err) {
      res.status(500).json({ error: "Erro no servidor: " + err.message });
      db.close();
      return;
    }

    if (!row) {
      res.status(404).json({ error: "E-mail ou senha incorretos." });
    } else {
      res.status(200).json({ id_usuario: row.id_usuario }); // Retorna o id_usuario ao frontend
    }

    db.close(); // Fecha a conexão
  });
});

// Inicializa o servidor e escuta na porta definida
app.delete("/api/despesa/:id", (req, res) => {
  console.log(`Recebendo requisição DELETE para id_despesa: ${req.params.id}`);
  const { id } = req.params;

  if (!id) {
    return res.status(400).send("ID da despesa é obrigatório.");
  }

  const db = connectDB(); // Conecta ao banco de dados SQLite
  const deleteQuery = "DELETE FROM despesa WHERE id_despesa = ?"; // Consulta SQL para exclusão

  db.run(deleteQuery, [id], function (err) {
    if (err) {
      res.status(500).send("Erro ao excluir a despesa: " + err.message);
    } else if (this.changes === 0) {
      res.status(404).send("Despesa não encontrada.");
    } else {
      res.status(200).send("Despesa excluída com sucesso.");
    }
    db.close(); // Fecha a conexão após a execução
  });
});

// Inicializa o servidor e escuta na porta definida
app.delete("/api/receita/:id", (req, res) => {
  console.log(`Recebendo requisição DELETE para id_receita: ${req.params.id}`);
  const { id } = req.params;

  if (!id) {
    return res.status(400).send("ID da receita é obrigatório.");
  }

  const db = connectDB(); // Conecta ao banco de dados SQLite
  const deleteQuery = "DELETE FROM receita WHERE id_receita = ?"; // Corrige a tabela para 'receita'

  db.run(deleteQuery, [id], function (err) {
    if (err) {
      res.status(500).send("Erro ao excluir a receita: " + err.message);
    } else if (this.changes === 0) {
      res.status(404).send("Receita não encontrada.");
    } else {
      res.status(200).send("Receita excluída com sucesso.");
    }
    db.close(); // Fecha a conexão após a execução
  });
});

app.post("/api/despesa", (req, res) => {
  const {
    dataEmissao,
    valor,
    tipoDocumento,
    planoConta,
    descricao,
    fornecedor,
    banco,
    id_usuario, // Adicione o ID do usuário logado
  } = req.body;

  // Validação para verificar se todos os campos necessários foram preenchidos
  if (
    !dataEmissao ||
    !valor ||
    !tipoDocumento ||
    !planoConta ||
    !descricao ||
    !fornecedor ||
    !banco ||
    !id_usuario
  ) {
    return res.status(400).send("Todos os campos são obrigatórios.");
  }

  const db = connectDB(); // Conecta ao banco de dados SQLite

  const insertQuery = `
    INSERT INTO despesa (data, valor, documento, plano_conta, descricao, fornecedor, tipo_banco, User_idUser)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.run(
    insertQuery,
    [
      dataEmissao,
      valor,
      tipoDocumento,
      planoConta,
      descricao,
      fornecedor,
      banco,
      id_usuario, // Inclua o ID do usuário
    ],
    function (err) {
      if (err) {
        res.status(500).send("Erro ao cadastrar a despesa: " + err.message);
      } else {
        res.status(201).send("Despesa cadastrada com sucesso!");
      }
      db.close(); // Fecha a conexão após a execução
    }
  );
});

app.post("/api/receita", (req, res) => {
  const {
    dataEmissao,
    valor,
    tipoDocumento,
    planoConta,
    descricao,
    cliente,
    banco,
    id_usuario, // Adicione o ID do usuário logado
  } = req.body;

  // Validação para verificar se todos os campos necessários foram preenchidos
  if (
    !dataEmissao ||
    !valor ||
    !tipoDocumento ||
    !planoConta ||
    !descricao ||
    !cliente ||
    !banco ||
    !id_usuario
  ) {
    return res.status(400).send("Todos os campos são obrigatórios.");
  }

  const db = connectDB(); // Conecta ao banco de dados SQLite

  const insertQuery = `
    INSERT INTO receita (data, valor, documento, plano_conta_receita, descricao, cliente, tipo_banco, User_idUser)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.run(
    insertQuery,
    [
      dataEmissao,
      valor,
      tipoDocumento,
      planoConta,
      descricao,
      cliente,
      banco,
      id_usuario, // Inclua o ID do usuário
    ],
    function (err) {
      if (err) {
        res.status(500).send("Erro ao cadastrar a receita: " + err.message);
      } else {
        res.status(201).send("Receita cadastrada com sucesso!");
      }
      db.close(); // Fecha a conexão após a execução
    }
  );
});

app.get("/api/despesa/:id", (req, res) => {
  const { id } = req.params;
  const db = connectDB();

  const query = `SELECT * FROM despesa WHERE id_despesa = ?`;

  db.get(query, [id], (err, row) => {
    if (err) {
      res.status(500).send("Erro ao buscar a despesa: " + err.message);
    } else if (!row) {
      res.status(404).send("Despesa não encontrada.");
    } else {
      res.json(row);
    }
    db.close();
  });
});

app.put("/api/despesa", (req, res) => {
  const {
    idDespesa,
    banco,
    dataEmissao,
    planoConta,
    tipoDocumento,
    fornecedor,
    valor,
    descricao,
  } = req.body;

  const db = connectDB();

  const query = `
    UPDATE despesa
    SET tipo_banco = ?, data = ?, plano_conta = ?, documento = ?, fornecedor = ?, valor = ?, descricao = ?
    WHERE id_despesa = ?
  `;

  db.run(
    query,
    [
      banco,
      dataEmissao,
      planoConta,
      tipoDocumento,
      fornecedor,
      valor,
      descricao,
      idDespesa,
    ],
    function (err) {
      if (err) {
        res.status(500).send("Erro ao atualizar a despesa: " + err.message);
      } else {
        res.status(200).send("Despesa atualizada com sucesso!");
      }
      db.close();
    }
  );
});

// Rota para buscar uma receita pelo ID
app.get("/api/receita/:id", (req, res) => {
  const { id } = req.params; // Extrai o ID dos parâmetros da URL

  const db = connectDB(); // Conecta ao banco de dados SQLite
  const query = "SELECT * FROM receita WHERE id_receita = ?";

  db.get(query, [id], (err, row) => {
    if (err) {
      res.status(500).send("Erro ao buscar a receita: " + err.message);
    } else if (!row) {
      res.status(404).send("Receita não encontrada.");
    } else {
      res.json(row); // Retorna os dados da receita
    }
    db.close(); // Fecha a conexão após a consulta
  });
});

// Rota para atualizar uma receita pelo ID
app.put("/api/receita/:id", (req, res) => {
  const { id } = req.params; // Extrai o ID dos parâmetros da URL
  const {
    dataEmissao,
    valor,
    tipoDocumento,
    planoConta,
    descricao,
    cliente,
    banco,
  } = req.body; // Extrai os dados do corpo da requisição

  // Validação para verificar se todos os campos necessários foram preenchidos
  if (
    !dataEmissao ||
    !valor ||
    !tipoDocumento ||
    !planoConta ||
    !descricao ||
    !cliente ||
    !banco
  ) {
    return res.status(400).send("Todos os campos são obrigatórios.");
  }

  const db = connectDB(); // Conecta ao banco de dados SQLite
  const updateQuery = `
    UPDATE receita
    SET data = ?, valor = ?, documento = ?, plano_conta_receita = ?, descricao = ?, cliente = ?, tipo_banco = ?
    WHERE id_receita = ?
  `;

  db.run(
    updateQuery,
    [
      dataEmissao,
      valor,
      tipoDocumento,
      planoConta,
      descricao,
      cliente,
      banco,
      id,
    ],
    function (err) {
      if (err) {
        res.status(500).send("Erro ao atualizar a receita: " + err.message);
      } else if (this.changes === 0) {
        res.status(404).send("Receita não encontrada.");
      } else {
        res.status(200).send("Receita atualizada com sucesso!");
      }
      db.close(); // Fecha a conexão após a execução
    }
  );
});

// Inicializa o servidor e escuta na porta definida
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`); // Mensagem indicando que o servidor está ativo
});
