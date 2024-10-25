const db = require('../../config/db');
const model = require('../models/userModel');
const { User } = require('../models/userModel');

const create = async (req, res) => {
    try {
        const { nome, email, passwd, cargo } = req.body;

        // Validação básica
        if (!nome || !email || !passwd || !cargo) {
            return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios.' });
        }

        // Criar o usuário
        const novoUsuario = await User.create({ nome, email, passwd, cargo });

        return res.status(201).json(novoUsuario);
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    };
}

// puxar todos os usuários
const getAll = async (req, res) => {
    try {
        const usuarios = await User.findAll();
        return res.status(200).json(usuarios);
    } catch (error) {
        console.error('Erro ao obter usuários:', error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
};

// puxar usuario por id
const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await User.findByPk(id);

        if (!usuario) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
        }

        return res.status(200).json(usuario);
    } catch (error) {
        console.error('Erro ao obter usuário:', error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
};

// update por id    
const put = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, email, passwd, cargo } = req.body;

        const usuario = await User.findByPk(id);

        if (!usuario) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
        }

        // Atualizar os campos fornecidos
        await usuario.update({ nome, email, passwd, cargo });

        return res.status(200).json(usuario);
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
};

// deletar usuario por id
const del = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await User.findByPk(id);

        if (!usuario) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
        }

        await usuario.destroy();

        return res.status(200).json({ mensagem: 'Usuário excluído com sucesso.' });
    } catch (error) {
        console.error('Erro ao excluir usuário:', error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
};

module.exports = {
    create,
    getAll,
    getById,
    put,
    del
};