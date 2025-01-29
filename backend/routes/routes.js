const express = require('express');
const router = express.Router();
const webAuthController = require('../controllers/webAuthendicationController');
const manageClientController = require('../controllers/manageClientController');
const dashboardController = require('../controllers/DashboardController');
const userRoleController = require('../controllers/manageRoleController');

const verifyToken = require('../middleware/auth');
const { graphqlHTTP } = require('express-graphql');
const schema = require('../common/gSchemas');
const userRoleSchema = require('../common/manageRoleSchema');
const dashboardSchema = require('../common/DashboardSchema');
const manageClientModel = require('../models/manageClientModel');

// Login Controller
router.post('/userLogin', webAuthController.clientLogin);
router.post('/userSignup', webAuthController.clientSignup);

router.use(verifyToken);
//Client Controller
router.post('/addClient',manageClientController.addClient);
router.post('/getClient',manageClientController.getClient)
router.post('/getClientDetailById',manageClientController.getClientDetailById);
router.post('/editClient',manageClientController.editClient);
router.post('/deleteClient',manageClientController.deleteClient);
//User Role Controller
router.post('/getUserRole', graphqlHTTP({
  schema: schema,
  graphiql: false,
  context: {
    model: manageClientModel
  }
}));

router.use('/graphql/userRole', graphqlHTTP({
  schema: userRoleSchema,
  graphiql: true,
}));

//Dashboard Controller
router.post('/getDashboardClientData',dashboardController.getDashboardClientData);
router.use('/graphql/dashboard', graphqlHTTP({
  schema: dashboardSchema,
  graphiql: true,
}));
//UserRole Controller
router.post('/getUserRoleData',userRoleController.getUserRoleData);

module.exports = router;