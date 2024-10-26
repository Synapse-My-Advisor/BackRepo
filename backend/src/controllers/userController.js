const userService = require('../services/userService');

const create = async (req, res) => {
    try {
        const { nome, email, passwd, cargo } = req.body;
        
        if (!nome || !email || !passwd || !cargo) {
            return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios.' });
        }

        const novoUsuario = await userService.createUser({ nome, email, passwd, cargo });
        return res.status(201).json(novoUsuario);
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        return res.status(500).json({ mensagem: error.message || 'Erro interno do servidor.' });
    }
};

const getAll = async (req, res) => {
    try {
        const usuarios = await userService.getAllUsers();
        return res.status(200).json(usuarios);
    } catch (error) {
        console.error('Erro ao obter usuários:', error);
        return res.status(500).json({ mensagem: error.message || 'Erro interno do servidor.' });
    }
};

const getById = async (req, res) => {
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
};

const put = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, email, passwd, cargo } = req.body;

        const usuario = await userService.updateUser(id, { nome, email, passwd, cargo });
        return res.status(200).json(usuario);
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        return res.status(500).json({ mensagem: error.message || 'Erro interno do servidor.' });
    }
};

const del = async (req, res) => {
    try {
        const { id } = req.params;

        const mensagem = await userService.deleteUser(id);
        return res.status(200).json(mensagem);
    } catch (error) {
        console.error('Erro ao excluir usuário:', error);
        return res.status(500).json({ mensagem: error.message || 'Erro interno do servidor.' });
    }
};

module.exports = {
    create,
    getAll,
    getById,
    put,
    del,
};
