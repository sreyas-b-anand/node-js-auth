const User = require("../models/userSchema.js");
const jwt = require("jsonwebtoken");
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET_KEY, { expiresIn: "3d" });
};
const signinUser = async (req, res) => {
  console.log(req.method); ////////////////////////////////////////////////////////
  const { username, email, password } = req.body;
  try {
    const user = await User.signup(username, email, password);

    const token = createToken(user._id);

    res.status(200).json({ email, username, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  console.log(req.method); ///////////////////////////////////////////////////////////
  const { username, email, password } = req.body;
  try {
    const user = await User.login(username, email, password);
    const token = createToken(user._id);

    res.status(200).json({ email, username, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = { signinUser, loginUser };
