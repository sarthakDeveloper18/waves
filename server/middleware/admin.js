let admin = (req, res, next) => {
    if(req.user.role === 0){
        return res.send('You are now allowed')
    }
    next()
}

module.exports = {admin}