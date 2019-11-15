const db = require('../database/dbConfig.js')

module.exports = {
    register,
    findById,
    find,
    findBy
}

async function register(user) {
    const [id] = await db('users').insert(user);

    return findById(id);
}

function findById(id){
    return db('users')
    .where({ id })
    .first();
}

function find(){
    return db('users').select('id', 'username', 'password');
}

function findBy(filter) {
    return db('users').where(filter);
}