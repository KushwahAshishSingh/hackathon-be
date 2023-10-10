const firebaseAdmin = require('firebase-admin');
const firebaseUser = require('firebase/app')

var admin = firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
        "type": "service_account",
        "project_id": process.env.FIREBASE_PROJECT_ID,
        "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID,
        "private_key": process.env.FIREBASE_PRIVATE_KEY,
        "client_email": process.env.FIREBASE_CLIENT_EMAIL,
        "client_id": process.env.FIREBASE_CLIENT_ID,
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": process.env.FIREBASE_CLIENT_X509_CERT_URL,
        "universe_domain": "googleapis.com"
    })
});

const user = firebaseUser.initializeApp({
    // "type": "service_account",
    // "project_id": process.env.FIREBASE_PROJECT_ID,
    // "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID,
    // "private_key": process.env.FIREBASE_PRIVATE_KEY,
    // "client_email": process.env.FIREBASE_CLIENT_EMAIL,
    // "client_id": process.env.FIREBASE_CLIENT_ID,
    // "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    // "token_uri": "https://oauth2.googleapis.com/token",
    // "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    // "client_x509_cert_url": process.env.FIREBASE_CLIENT_X509_CERT_URL,
    // "universe_domain": "googleapis.com",
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGINING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
});




module.exports = { admin, user } 