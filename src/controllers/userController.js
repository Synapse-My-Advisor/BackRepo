const userModel = require('../models/userModel');
const userService = require('../services/userService');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

class UserController {
    // Método para criar um novo usuário
    static async create(req, res) {
        try {
            const { nome, email, passwd, cargo } = req.body;

            if (!nome || !email || !passwd || !cargo) {
                return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios.' });
            }

            const hashPasswd = await bcrypt.hash(passwd, 10);

            const novoUsuario = await userService.createUser({ nome, email, passwd:hashPasswd, cargo });
            return res.status(201).json(novoUsuario);
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
            return res.status(500).json({ mensagem: error.message || 'Erro interno do servidor.' });
        }
    }

    // Método para obter todos os usuários
    static async getAll(req, res) {
        try {
            const usuarios = await userService.getAllUsers();
            return res.status(200).json(usuarios);
        } catch (error) {
            console.error('Erro ao obter usuários:', error);
            return res.status(500).json({ mensagem: error.message || 'Erro interno do servidor.' });
        }
    }

    // Método para obter um usuário por ID
    static async getById(req, res) {
        try {
            const { id } = req.params;
            const usuario = await userService.getUserById(id);

            if (!usuario) {
                return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
            }

            return res.status(200).json(usuario);
        } catch (error) {
            console.error('Erro ao obter usuário:', error);
            return res.status(500).json({ mensagem: error.message || 'Erro interno do servidor.' });
        }
    }

    // Método para atualizar um usuário
    static async put(req, res) {
        try {
            const { id } = req.params;
            const { nome, email, passwd, cargo } = req.body;

            if (!nome || !email || !passwd || !cargo) {
                return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios.' });
            }

            const usuario = await userService.updateUser(id, { nome, email, passwd, cargo });
            return res.status(200).json(usuario);
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
            return res.status(500).json({ mensagem: error.message || 'Erro interno do servidor.' });
        }
    }

    // Método para deletar um usuário
    static async del(req, res) {
        try {
            const { id } = req.params;

            const mensagem = await userService.deleteUser(id);
            return res.status(200).json({ mensagem });
        } catch (error) {
            console.error('Erro ao excluir usuário:', error);
            return res.status(500).json({ mensagem: error.message || 'Erro interno do servidor.' });
        }
    }

    // Método para autenticação de usuário (Login)
    static async login(req, res) {
        try {
            const { email, password } = req.body;

            // Verifica se o usuário existe
            const user = await userModel.User.findOne({ where: { email } });
            if (!user) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }

            // Verifica se a senha está correta
            const isPasswordValid = await bcrypt.compare(password, user.passwd);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Credenciais inválidas' });
            }

            // Gera um token JWT
            const token = jwt.sign(
                { id: user.id, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            return res.json({ message: 'Autenticado com sucesso', token });
        } catch (error) {
            console.error('Erro ao autenticar usuário:', error);
            return res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }
}

module.exports = UserController;
