const logServices = require('../services/log.service');

async function logLogin(req, res, next) {
  try {
    const token = req.query.accessToken;
    res.json(await logServices.log(token, 'Logged in'));
  } catch(err) {
    console.log(err.message);
    next(err);
  }
}

async function logCreation(req, res, next) {
  try {
    const token = req.query.accessToken;
    res.json(await logServices.log(token, 'Created bingo sheets'));
  } catch(err) {
    console.log(err.message);
    next(err);
  }
}

module.exports = {
  logLogin,
  logCreation
}