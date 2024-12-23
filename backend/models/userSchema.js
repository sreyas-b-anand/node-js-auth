const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
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
      
  },
  googleId: {
    type: String,  
    unique: true,  
  },
});
userSchema.statics.signup = async (username, email, password) => {
    try {
      if(!password){
        throw new Error("Enter Password");
      }
      if (password.length < 6) {
        throw new Error("Password length should be min 6 characters");
      }
  
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error("Email or username already in use");
      }
  
      const salt = await bcrypt.genSalt(10);
      
      const hashed = await bcrypt.hash(password, salt);
  
      const user = await User.create({ email, username, password: hashed });
      return user; // This ensures the created user is returned
    } catch (error) {
      //console.error(error);
      //throw error;
    }
  };
  
  userSchema.statics.login = async (username, email, password) => {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("No user found with this email");
      }
  
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        throw new Error("Invalid password");
      }
  
      return user; // Ensure the found user is returned
    } catch (error) {
      //console.error(error);
      //throw error;
    }
  };
  
const User = mongoose.model("users", userSchema);

module.exports = User;
