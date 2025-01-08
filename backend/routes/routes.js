const express = require('express');
const router = express.Router();
const webAuthController = require('../controllers/webAuthendicationController');
const manageClientController = require('../controllers/manageClientController');
const dashboardController = require('../controllers/DashboardController');
const verifyToken = require('../middleware/auth');

// Login Controller
router.post('/userLogin', webAuthController.clientLogin);
router.post('/userSignup', webAuthController.clientSignup);

router.use(verifyToken);
//Client Controller
router.post('/addClient',manageClientController.addClient);
router.get('/getClient',manageClientController.getClient)
router.post('/getClientDetailById',manageClientController.getClientDetailById);
router.post('/editClient',manageClientController.editClient);
router.post('/deleteClient',manageClientController.deleteClient);
//Dashboard Controller
router.post('/getDashboardClientData',dashboardController.getDashboardClientData);

module.exports = router;