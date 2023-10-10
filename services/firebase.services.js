const firebase = require('../config/gCloud.config').firebaseAdmin

const createUser = async (email, password) => {
    return firebase.auth().createUser({
        email: email,
        password: password
    })
}

module.exports = { createUser }