const express = require('express');
const router = express.Router();
const webAuthController = require('../controllers/webAuthendicationController');
const manageClientController = require('../controllers/manageClientController');
const dashboardController = require('../controllers/DashboardController');
const verifyToken = require('../middleware/auth');
const { graphqlHTTP } = require('express-graphql');
const schema = require('../common/gSchemas');
const manageClientModel = require('../models/manageClientModel');

// Login Controller
router.post('/userLogin', webAuthController.clientLogin);
router.post('/userSignup', webAuthController.clientSignup);

// router.use(verifyToken);
//Client Controller
router.post('/addClient',manageClientController.addClient);
router.post('/getClient',manageClientController.getClient)
router.post('/getClientDetailById',manageClientController.getClientDetailById);
router.post('/editClient',manageClientController.editClient);
router.post('/deleteClient',manageClientController.deleteClient);
//User Role Controller
router.post('/getUserRole', graphqlHTTP({
    schema: schema,
    graphiql: false, // Disable GraphiQL UI for POST requests (only enabled for GET /graphql by default)
    context: {
      // Custom context if needed, can be left empty for simple cases
      model: manageClientModel
    }
  }));
//Dashboard Controller
router.post('/getDashboardClientData',dashboardController.getDashboardClientData);

module.exports = router;