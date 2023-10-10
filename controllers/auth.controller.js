const firebase = require("../services/firebase.services")
const userService = require("../services/users.services")

const signup = async (req, res, next) => {
    console.log(req.body);
    const { email, password, name } = req.body

    try {
        const firebaseUser = await firebase.createUser(email, password)
        const localUser = await userService.createUser(firebaseUser.uid, name, email, false)
        
        return res.status(200).json({
            user: localUser
        })
    } catch (error) {
        console.log(error);
        const err = new Error()
        err.status = 403
        err.message = error.message
        return next(err)
    }
}

module.exports = { signup }