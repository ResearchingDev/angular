const express = require('express');
const router = express.Router();
const webAuthController = require('../controllers/webAuthendicationController');
const verifyToken = require('../middleware/auth');

// Web Portal Login
router.post('/userLogin', webAuthController.clientLogin);

router.use(verifyToken);
module.exports = router;