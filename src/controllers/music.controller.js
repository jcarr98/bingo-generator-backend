const musicServices = require('../services/music.service');

async function getPlaylist(req, res, next) {
  try {
    res.json(await musicServices.getPlaylist(req.query.page));
  } catch (err) {
    console.error(`Error getting playlist`, err.message);
    next(err);
  }
}

async function getMe(req, res, next) {
  try {
    res.json(await musicServices.getMe(req.query.page));
  } catch (err) {
    console.error(`Error getting user info`, err.message);
    next(err);
  }
}

async function getTracks(req, res, next) {
  try {
    res.json(await musicServices.getTracks(req.query.page));
  } catch (err) {
    console.error(`Error getting playlist tracks`, err.message);
    next(err);
  }
}