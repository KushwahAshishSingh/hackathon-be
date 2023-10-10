const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UsersSchema = new Schema({
    uid: {
        type: String,
        required: true,
        unique: true 
    },
    name: {
        type: String,
        required: true,
    },
    
    isAdmin: {
        type: Boolean,
        default: false
    },
    
    email: {
        type: String,
        required: true,
        unique: true 
    },
    
}, { timestamps: true })

module.exports = Users = mongoose.model('users', UsersSchema)
