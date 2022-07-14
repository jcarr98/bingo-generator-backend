const musicServices = require('../services/music.service');

async function getMe(req, res, next) {
  console.log(`User requesting account information with token ${req.query.userToken}`);

  try {
    console.log('Running controller');
    res.json(await musicServices.getMe(req.query.userToken));
  } catch (err) {
    console.error(`Error getting user info:`, err.message);
    next(err);
  }
}

async function getPlaylists(req, res, next) {
  console.log(`User requesting all playlists with token ${req.query.userToken}`);

  try {
    res.json(await musicServices.getPlaylists(req.query.userToken));
  } catch (err) {
    console.error(`Error getting playlist`, err.message);
    next(err);
  }
}

async function getTracks(req, res, next) {
  console.log(`User requesting playlist tracks with token ${req.query.userToken}`);

  try {
    res.json(await musicServices.getTracks(req.query.userToken, req.query.playlistId));
  } catch (err) {
    console.error(`Error getting playlist tracks`, err.message);
    next(err);
  }
}

module.exports = {
  getMe,
  getPlaylists,
  getTracks
}