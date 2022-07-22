const musicServices = require('../services/music.service');

async function getMe(req, res, next) {
  try {
    res.json(await musicServices.getMe(req.query.accessToken));
  } catch (err) {
    console.error(`Error getting user info:`, err.message);
    next(err);
  }
}

async function getPlaylists(req, res, next) {
  try {
    res.json(await musicServices.getPlaylists(req.query.accessToken));
  } catch (err) {
    console.error(`Error getting playlist`, err.message);
    next(err);
  }
}

async function getTracks(req, res, next) {
  try {
    res.json(await musicServices.getTracks(req.query.accessToken, req.query.playlistId));
  } catch (err) {
    console.error(`Error getting playlist tracks`, err);
    next(err);
  }
}

module.exports = {
  getMe,
  getPlaylists,
  getTracks
}