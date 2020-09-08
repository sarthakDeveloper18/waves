const {User} = require('../models/userModel')

let auth = (req, res, next) => {
    let token = req.cookies.w_auth
    User.findByToken(token, (err, user)=>{
        if(err) throw new Error
        if(!user) return res.json({isAuth: false, error: true})
        req.token = token
        req.user = user
        next()

    })
}

module.exports = {auth}