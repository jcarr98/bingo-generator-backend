const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.get('/login', authController.login);
router.get('/token', authController.getaccessToken);
router.get('/validate', authController.validate);

module.exports = router;