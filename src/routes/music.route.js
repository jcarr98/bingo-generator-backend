const express = require('express');
const router = express.Router();
const musicController = require('../controllers/music.controller');

// User info
router.get('/me', musicController.getMe);
// All user playlists
router.get('/playlists', musicController.getPlaylists);
// All playlist tracks
router.get('/tracks', musicController.getTracks);

module.exports = router;