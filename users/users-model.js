const db = require('../database/dbConfig.js');

module.exports = {
    add,
    getUser
};

function add(user) {
    return db('users').insert(user);
}

function getUser(username) {
    return db('users').select('id', 'username', 'password').where('username', username);
}