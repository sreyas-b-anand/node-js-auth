const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const passport = require("./middlewares/passport");
const session = require("express-session");
const app = express();
const cors = require("cors");
const URI = process.env.DBURI;
const userRouter = require("./routes/userRoutes");
const requireAuth = require("./middlewares/jwt");
const OAuthRouter = require("./routes/OAuthRoutes");
mongoose
  .connect(URI)
  .then(() => {
    app.listen(process.env.PORT || 4000, () => {
      console.log(`Server running on port 4000`);
    });
    console.log("Database connected");
  })
  .catch((err) => console.error("Database connection error:", err));

let corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 200
};

app.use(cors(corsOptions));
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", userRouter);
app.use("/", OAuthRouter);
//app.use(requireAuth); ////////////////////////////////////
//console.log("hello"); ////////////////////////////////////////////
