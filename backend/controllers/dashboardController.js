const dashboardModel = require('../models/DashboardModel.js');
const SECRET_KEY = process.env.SECRET_KEY;
const dotenv = require('dotenv');

//Get dashboard details
exports.getDashboardClientData = (req, res) => {
    const clientData = req.body;
    dashboardModel.getDashboardClientData(clientData, (err, user) => {
      if (err) return res.status(500).json({ error: 'Failed to fetch users' });
      res.status(200).json(user);
    });
  };