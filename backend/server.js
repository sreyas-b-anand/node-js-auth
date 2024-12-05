const express = require("express");
require('dotenv').config()
const mongoose = require("mongoose");

const app = express();
const Uri = process.env.DBURI;
const userRouter = require('./routes/userRoutes');   
const { config } = require("dotenv");
mongoose.connect(process.env.DBURI)
  .then(() => {
    app.listen(process.env.PORT || 4000, () => {
      console.log(`Server running on port 4000`);
    });
    console.log('Database connected');
  })
  .catch(err => console.error('Database connection error:', err));



app.use("/api/auth" ,userRouter);

