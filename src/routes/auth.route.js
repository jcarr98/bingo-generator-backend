const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.get('/login', authController.login);
router.get('/token', authController.getUserToken);
router.get('/login/callback', authController.loginCallback);

module.exports = router;