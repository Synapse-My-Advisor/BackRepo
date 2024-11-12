const express = require('express');
const db = require('../config/db');
const prompt = require('./vendor/llm');
const cors = require('cors');
const rotasUsuarios = require('./routes/usuario.routes');

const app = express();
const porta = 3000;

app.use(cors());

db.sincroniza();

app.use(express.json());

app.use(rotasUsuarios);

app.listen(porta, () => {
    console.log(`Servidor rodando em http://localhost:${porta}`);
});

prompt().then(console.log);

