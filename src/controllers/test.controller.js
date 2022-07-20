const testServices = require('../services/test.service');

async function getTest(req, res, next) {
  try {
    res.json(await testServices.getTest(req));
  } catch (err) {
    console.log(`Error getting test`, err.message);
    next(err);
  }
}

async function resTest(req, res, next) {
  try {
    testServices.resTest(res);
  } catch (err) {
    console.log(err.message);
    next(err);
  }
}

async function playlists(req, res, next) {
  try {
    testServices.savePlaylist(req);
  } catch (err) {
    console.log(err.message);
    next(err);
  }
}

async function tracks(req, res, next) {
  try {
    testServices.saveTracks(req);
  } catch (err) {
    console.log(err.message);
    next(err);
  }
}

module.exports = {
  getTest,
  resTest,
  playlists,
  tracks
}