const db = require('../../config/db');
const model = require('../models/userModel');

function create(req, res) {
    try {
        model.create(req.body);
        res.status(201).send('Usuario criado com sucesso')
    } catch (error) {
        console.error(error);
        res.status(500).send('Não foi possivel criar o usuario');
    }
}

async function get(req, res) {
    try {
        const users = await model.get()
        res.json(users)
    } catch(error) {
        res.json(error)
    }
}

function put(req, res) {
    const { id } = req.params;
    const { nome, email } = req.body;
    const sql = 'UPDATE users SET nome = ?, email = ? WHERE id = ?';
    db.query(sql, [nome, email, id], (erro, resultado) => {
        if (erro) {
            res.status(500).send('Erro ao atualizar usuário');
        } else {
            res.send('Usuário atualizado com sucesso!');
        }
    });
}

function del(req, res) {
    const { id } = req.params;
    const sql = 'DELETE FROM users WHERE id = ?';
    db.query(sql, [id], (erro, resultado) => {
        if (erro) {
            res.status(500).send('Erro ao deletar usuário');
        } else {
            res.send('Usuário deletado com sucesso!');
        }
    });
}

module.exports = {
    create,
    get,
    put,
    del
}