const User = require("../models/userSchema.js");
const jwt = require("jsonwebtoken");
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET_KEY, { expiresIn: "3d" });
};
const signinUser = async (req, res) => {
  console.log(req.method , "Now here " , req.body); ////////////////////////////////////////////////////////
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields must be filled" });
    }
    const user = await User.signup(username, email, password);
    console.log(user)
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
module.exports = { signinUser, loginUser };
