const express = require('express');
const bodyParser = require('body-parser');
const db = require('../config/db');
const controller = require('./controllers/userController');
const { prompt } = require('./vendor/llm');
const router = express.router;

const app = express();
const porta = 3000;

db.sincroniza()

app.use(bodyParser.json());

// Rota de criação (CREATE)
app.post('/usuarios', controller.create);

// Rota de leitura (READ)
app.get('/usuarios', controller.getAll);

app.get('/usuarios/:id', controller.getById);

// Rota de atualização (UPDATE)
app.put('/usuarios/:id', controller.put);

// Rota de exclusão (DELETE)
app.delete('/usuarios/:id', controller.del);

app.listen(porta, () => {
    console.log(`Servidor rodando em http://localhost:${porta}`);
});

prompt().then(console.log)

module.exports = router;
