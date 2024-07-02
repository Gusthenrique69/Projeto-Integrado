const express = require('express');
const mysql = require('mysql');
const app = express();

// Configuração da conexão com o MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'seu_usuario_mysql',
    password: 'sua_senha_mysql',
    database: 'agroinfa'
});

// Conectar ao MySQL
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Conectado ao MySQL...');
});

// Middleware para processar JSON
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rota para processar o formulário de cadastro
app.post('/processar_cadastro', (req, res) => {
    const { nome, email, telefone, endereco, senha } = req.body;
    const INSERT_QUERY = `INSERT INTO usuarios (nome, email, telefone, endereco, senha) VALUES (?, ?, ?, ?, ?)`;
    db.query(INSERT_QUERY, [nome, email, telefone, endereco, senha], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Erro ao cadastrar usuário.');
        } else {
            console.log('Usuário cadastrado com sucesso.');
            res.status(200).send('Cadastro realizado com sucesso!');
        }
    });
});

// Porta que o servidor irá escutar
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Servir arquivos estáticos
app.use(express.static('public'));

// Rota para servir a página do chat
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Socket.io configuração
io.on('connection', (socket) => {
    console.log('Um usuário se conectou');

    socket.on('disconnect', () => {
        console.log('Um usuário se desconectou');
    });

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
