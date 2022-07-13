const express = require('express');
const router = express.Router();
const musicController = require('../controllers/music.controller');

/* GET user info */
router.get('/playlist', musicController.getPlaylist);
router.get('/me', musicController.getMe);
router.get('/tracks', music.musicController.getTracks);

module.exports = router;