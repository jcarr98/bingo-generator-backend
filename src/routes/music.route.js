const express = require('express');
const router = express.Router();
const musicController = require('../controllers/music.controller');

// Get user info
router.get('/me', musicController.getMe);
router.get('/playlists', musicController.getPlaylists);
router.get('/tracks', musicController.getTracks);

module.exports = router;