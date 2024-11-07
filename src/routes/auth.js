const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./db');
const router = express.Router();
const cors = require('cors');

app.use(cors({
    origin: '*', // Substitua pelo domínio do front-end
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
    
app.use(express.json());

app.use('/usuarios', require('./routes/usuarios'));


// Rota de registro
router.post('/usuarios', async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    db.query(query, [name, email, hashedPassword], (error) => {
        if (error) return res.status(500).json({ message: 'Erro ao registrar usuário' });
        res.status(201).json({ message: 'Usuário registrado com sucesso' });
    });
});

// Rota de login
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], async (error, results) => {
        if (error || results.length === 0) return res.status(401).json({ message: 'Credenciais inválidas' });
        const user = results[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ message: 'Credenciais inválidas' });

        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    });
});

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ message: 'Token não fornecido' });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(500).json({ message: 'Falha ao autenticar token' });
        req.userId = decoded.id;
        next();
    });
};
