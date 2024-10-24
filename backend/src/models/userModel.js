const { sequelize, DataTypes } = require('sequelize');
const db = require('../../config/db');

const User = db.define(
  'users',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    passwd: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cargo: {
      type: DataTypes.ENUM('aluno', 'professor', 'admin'),
      allowNull: false
    }
  },
);

// `sequelize.define` também retorna o modelo
console.log(User === sequelize.models.User); // true

module.exports = {
  User
}
