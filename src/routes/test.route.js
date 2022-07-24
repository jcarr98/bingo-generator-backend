const express = require('express');
const router = express.Router();
const testController = require('../controllers/test.controller');

/* GET test */
router.get('/getTest', testController.getTest);
router.get('/resTest', testController.resTest);
router.get('/db', testController.dbTest);
router.get('/ping', testController.ping);

module.exports = router;