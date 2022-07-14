const express = require('express');
const router = express.Router();
const loginController = require('../controllers/login.controller');

// Login route
router.get('/login', loginController.login);

module.exports = router;