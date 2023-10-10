const usersModel = require('../models/users.model')

const createUser = async (uid, name, email, isAdmin) => {
    return usersModel.create({
        uid, name, email, isAdmin
    })
}

const searchWithFirebaseUserId = async (uid) => {
    return usersModel.findOne({ uid })
}

const changePrivilege = async (userId, isAdmin) => {
    return usersModel.findByIdAndUpdate(userId, {$set: {isAdmin: isAdmin}} )
}


module.exports = { createUser, searchWithFirebaseUserId, changePrivilege }