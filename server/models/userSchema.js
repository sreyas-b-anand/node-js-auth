const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const crypto = require("crypto")
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: function () {
      return !this.googleId; // Password is required only if googleId is not present
    },
  },
  googleId: {
    type: String,
    sparse: true,
    unique: true,
  },
  resetToken: {
    type: String,
    default: null,
  },
  resetTokenExpiry: {
    type: Date,
    default: null,
  },
});

userSchema.statics.signup = async function (username, email, password) {
  if (!username || !email || !password) {
    throw new Error("All fields must be filled");
  }

  const exists = await this.findOne({ $or: [{ email }, { username }] });

  if (exists) {
    throw new Error("Email or username already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  try {
    const user = await this.create({ username, email, password: hash });
    return user;
  } catch (error) {
    throw new Error(`Error creating user: ${error.message}`);
  }
};

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw new Error("All fields must be filled");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw new Error("Incorrect email");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new Error("Incorrect password");
  }
  return user;
};

userSchema.statics.forgotPassword = async function(email) {
  if (!email) {
    throw new Error("Email should be provided");
  }
  const user = await this.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }

  const resetToken = crypto.randomBytes(32).toString("hex");
  const resetTokenExpiry = Date.now() + 3600000; // Token expires in 1 hour

  user.resetToken = resetToken;
  user.resetTokenExpiry = resetTokenExpiry;

  try {
    await user.save();
    return resetToken;
  } catch (error) {
    throw new Error(`Error saving reset token: ${error.message}`);
  }
};

userSchema.statics.resetPassword = async function(resetToken, newPassword) {
  if (!resetToken || !newPassword) {
    throw new Error("All fields must be filled");
  }
  
  const user = await this.findOne({
    resetToken,
    resetTokenExpiry: { $gt: Date.now() },
  });

  if (!user) {
    throw new Error("Invalid or expired reset token");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  user.password = hashedPassword;
  user.resetToken = null;
  user.resetTokenExpiry = null;

  try {
    await user.save();
    return user;
  } catch (error) {
    throw new Error(`Error resetting password: ${error.message}`);
  }
};



const User = mongoose.model("users", userSchema);

module.exports = User;
