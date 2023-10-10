const usersModel = require('../models/users.model')

const createUser = async (uid, name, email, isAdmin) => {
    return usersModel.create({
        uid, name, email, isAdmin
    })
}

module.exports = { createUser }