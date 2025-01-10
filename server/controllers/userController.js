const User = require("../models/userSchema.js");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET_KEY, { expiresIn: "3d" });
};
const signinUser = async (req, res) => {
  //console.log(req.method , "Now here " , req.body); ////////////////////////////////////////////////////////
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields must be filled" });
    }
    const user = await User.signup(username, email, password);
    //console.log(user)
    const token = createToken(user._id);

    res.status(200).json({ email, username, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  console.log(req.method); ///////////////////////////////////////////////////////////
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ error: "All fields must be filled" });
    }
    const user = await User.login(email, password);
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const forgotPassword = async (req ,res)=>{
  const {email} = req.body;
  try {
    if(!email){
      throw new Error("Email is required")
    }
    const resetToken = await User.forgotPassword(email)  // Added await
    const resetLink = `http://localhost:5173/reset-password/${resetToken}`;
    
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Password Reset Request",
      text: `You requested a password reset. Click the link to reset your password: ${resetLink}`,
    };
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Password reset link sent to your email" });
  } catch (error) {
    //console.log(error)
    res.status(400).json({ error: error.message });
  }
}

const resetPassword = async (req, res) => {
  const { token } = req.params;
  const {  password } = req.body;

  try {
    const user = await User.resetPassword(token, password);
    res.status(200).json({ message: "Password reset successful" });
    //console.log("Here in rp")
    return user
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = { signinUser, loginUser , forgotPassword , resetPassword};
