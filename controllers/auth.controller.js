const firebase = require("../services/firebase.services")
const userService = require("../services/users.services")

const signup = async (req, res, next) => {
    const { email, password, name } = req.body

    try {
        const firebaseUser = await firebase.createUser(email, password)
        const localUser = await userService.createUser(firebaseUser.user.uid, name, email, false)

        return res.status(200).json({
            token: firebaseUser._tokenResponse.idToken,
            refreshToken: firebaseUser._tokenResponse.refreshToken,
            expiresIn: firebaseUser._tokenResponse.expiresIn,
            isAdmin: false
        })
    } catch (error) {
        console.log(error);
        const err = new Error()
        err.status = 403
        err.message = error.message
        return next(err)
    }
}

const signIn = async (req, res, next) => {
    const { email, password } = req.body

    try {
        const firebaseUser = await firebase.emailSignIn(email, password)
        const localUser = await userService.searchWithFirebaseUserId(firebaseUser.user.uid)

        if (!localUser) {
            const err = new Error()
            err.status = 403
            err.message = "user not found"
            return next(err)
        }

        return res.status(200).json({
            token: firebaseUser._tokenResponse.idToken,
            refreshToken: firebaseUser._tokenResponse.refreshToken,
            expiresIn: firebaseUser._tokenResponse.expiresIn,
            isAdmin: localUser.isAdmin
        })
    } catch (error) {
        console.log(error);
        const err = new Error()
        err.status = 403
        err.message = error.message
        return next(err)
    }
}


const changePrivilege = async (req, res, next) => {
    const {userId, isAdmin} = req.body

    try {
        const user = userService.changePrivilege(userId, isAdmin)
        return res.status(200).json({
            success: true,
            message: "privilege updated"
        })
    } catch (error) {
        console.log(error);
        const err = new Error()
        err.status = 403
        err.message = error.message
        return next(err)
    }
}

module.exports = { signup, signIn, changePrivilege }