const User = require('../models/userSchema')
const jwt = require('jsonwebtoken')
const requireAuth = async(req , res , next) =>{
    const { authorization } = req.headers;
    if(!authorization){
        return res.status(401).json({error : "Authorization error"})
    }
    const token = authorization.split(' ')[1]
    
    try {
        const {_id} = await jwt.verify(token , process.env.SECRET_KEY)

        req.user = await User.findById({_id}).select('_id');
        console.log(req.user)
        next();
    } catch (error) {
        res.status(401).json({error : "User not found"})
    }
    
}

module.exports = requireAuth