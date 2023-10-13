const firebase = require('../../services/firebase.services')
const userService = require('../../services/users.services')

const verifyUser = async (req, res, next) => {
    const token = String(req.headers.authorization).split(' ')[1]
    if (!token) {
        const err = new Error()
        err.status = 403
        err.message = error.message
        return next(err)
    }
    try {
        const firebaseId = await firebase.verifyToken(token)
        const localUser = await userService.searchWithFirebaseUserId(firebaseId.uid)
        req.user = localUser
    } catch (error) {
        const err = new Error()
        err.status = 403
        err.message = error.message
        return next(err)
    }

    next();
}

const isAdminCheck = async (req, res, next) => {
    if (!req.user.isAdmin) {
        const err = new Error()
        err.status = 403
        err.message = "Not an admin"
        return next(err)
    }
    next();
}

module.exports = { verifyUser, isAdminCheck }