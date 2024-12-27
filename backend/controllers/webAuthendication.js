const customerModel = require('../models/webAuthendicationModel.js');
const SECRET_KEY = process.env.SECRET_KEY;
const jwt = require('jsonwebtoken');