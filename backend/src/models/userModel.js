// src/models/userModel.js

const { DataTypes } = require('sequelize');
const { db } = require('../../config/db');

const User = db.define(
  'User',
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
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
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
  {
    tableName: 'users',
    timestamps: true
  }
);

// Verifica se o modelo está registrado corretamente
console.log(User === db.models.User); // Deve imprimir `true`

module.exports = {
  User
};
