const firebase = require('../config/gCloud.config')
const firebaseAuth = require('firebase/auth')

const firebaseApp =  firebaseAuth.getAuth(firebase.user)

const createUser = async (email, password) => {
    return firebaseAuth.createUserWithEmailAndPassword(firebaseApp, email, password)
}

const emailSignIn = async (email, password) => {
    return firebaseAuth.signInWithEmailAndPassword(firebaseApp, email, password)
}

const verifyToken = async (token) => {
    return firebase.admin.auth().verifyIdToken(token)
}

module.exports = { createUser, emailSignIn, verifyToken }