const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const { sincroniza } = require('./config/db');
const errorHandler = require('./middlewares/errorHandler');
require('dotenv').config();

const app = express();

// Middlewares
app.use(bodyParser.json());

// Rotas
app.use('/api', userRoutes);

// Rota padrão
app.get('/', (req, res) => {
  res.send('API do Meu Orientador está funcionando!');
});

// Middleware de Erro (deve estar após todas as outras rotas/middlewares)
app.use(errorHandler);

// Inicializar a aplicação após sincronizar com o banco de dados
const iniciarAplicacao = async () => {
  try {
    await sincroniza();

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error('Erro ao iniciar a aplicação:', error);
  }
};

iniciarAplicacao();
