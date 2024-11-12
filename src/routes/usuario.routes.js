const userControll = require('../controllers/userController')
const Router = require('express')

const rotasUsuarios = new Router();

// Rota de criação (CREATE)
rotasUsuarios.post('/usuarios', userControll.create);

// Rota de leitura (READ)
rotasUsuarios.get('/usuarios', userControll.getAll);
rotasUsuarios.get('/usuarios/:id', userControll.getById);

// Rota de atualização (UPDATE)
rotasUsuarios.put('/usuarios/:id', userControll.put);

// Rota de exclusão (DELETE)
rotasUsuarios.delete('/usuarios/:id', userControll.del);

// Rota para login
rotasUsuarios.post('./usuarios/login', userControll.login);

module.exports = rotasUsuarios;
