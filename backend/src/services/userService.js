// services/userService.js
const { User } = require('../models/userModel');

const createUser = async ({ nome, email, passwd, cargo }) => {
    return await User.create({ nome, email, passwd, cargo });
};

const getAllUsers = async () => {
    return await User.findAll();
};

const getUserById = async (id) => {
    return await User.findByPk(id);
};

const updateUser = async (id, { nome, email, passwd, cargo }) => {
    const usuario = await User.findByPk(id);
    if (!usuario) {
        throw new Error('Usuário não encontrado.');
    }
    return await usuario.update({ nome, email, passwd, cargo });
};

const deleteUser = async (id) => {
    const usuario = await User.findByPk(id);
    if (!usuario) {
        throw new Error('Usuário não encontrado.');
    }
    await usuario.destroy();
    return { mensagem: 'Usuário excluído com sucesso.' };
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
};
