const webAuthendicationModel = require('../models/webAuthendicationModel.js');
const SECRET_KEY = process.env.SECRET_KEY;
const dotenv = require('dotenv');

exports.clientLogin = (req, res) => {
    const loginData = req.body;
    webAuthendicationModel.loginUser(loginData, (err, user) => {
      console.log(user);
        if (err) {
            return res.status(500).json({ 
              status: 500,
              message: 'Login failed' 
            });
        }
        if (!user) {
            return res.status(401).json({ 
              status: 401,
              message: 'Invalid email or password'
            });
        }
        res.status(200).json({ 
          status: 200,
          message: 'Login successful', 
          user ,
        });
      });
};

exports.clientSignup = (req, res) => {
  const signInData = req.body;
    webAuthendicationModel.clientSignup(signInData, (err) => {
      if (err) {
        console.error('Error adding Admin:', err);
        return res.status(500).send({ error: 'Failed to add admin' });
      }
      res.status(201).send({ message: 'Admin added successfully'});
    });
};