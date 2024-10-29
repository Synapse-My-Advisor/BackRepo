const { Sequelize } = require('sequelize');
require('dotenv').config();

// Configurações de conexão
const db = new Sequelize('meu_orientador', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
  // quando der bozó no banco, deixa true
  logging:false
});

async function sincroniza() {
  await db.sync()
}

module.exports = {
  db,
  sincroniza
};