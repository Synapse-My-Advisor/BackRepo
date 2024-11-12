const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./db');
const router = express.Router();

app.use('/usuarios', require('./routes/usuarios'));

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ message: 'Token não fornecido' });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(500).json({ message: 'Falha ao autenticar token' });
        req.userId = decoded.id;
        next();
    });
};
