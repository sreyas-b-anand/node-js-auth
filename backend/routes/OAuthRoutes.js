const express = require('express');
const passport = require('passport');
const OAuthrouter = express.Router();

OAuthrouter.get('/auth/google' , passport.authenticate('google'))

OAuthrouter.get('/auth/redirect/google' , passport.authenticate('google' , {
    successRedirect :'/',
    failureRedirect : '/login'
}))