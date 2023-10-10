const admin = require('firebase-admin');
const firebaseKey = require('./firebase.secrets.config')

var firebaseAdmin = admin.initializeApp({ credential: admin.credential.cert(firebaseKey)});

module.exports = { firebaseAdmin }