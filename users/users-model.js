const db = require('../database/dbConfig.js');

module.exports = {
    add,
    getUser,
    getAll
};

function add(user) {
    return db('users').insert(user);
}

function getUser(username) {
    return db('users').select('id', 'username', 'password').where('username', username);
}

function getAll() {
    return db('users');
}