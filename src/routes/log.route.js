const express = require('express');
const router = express.Router();
const logController = require('../controllers/log.controller');

router.get('/login', logController.logLogin);
router.get('/created', logController.logCreation);

module.exports = router;