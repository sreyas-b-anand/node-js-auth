const User = require('../models/userSchema.js')

const signinUser = async(req , res)=>{
    console.log(req.method)
    User.create()
    res.status(200).json({})//////////////////////
    
}

const loginUser = async (req, res) => {
    console.log(req.method)
    User.create()
    res.status(200).json({})/////////////////////
}
module.exports = { signinUser , loginUser}