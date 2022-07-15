const authServices = require('../services/auth.service');

async function login(req, res, next) {
  console.log('Attempting to authenticate user');

  try {
    let redirPackage = await authServices.login();
    console.log(redirPackage);
    res.json({
      status: 200, 
      url: 'https://accounts.spotify.com/authorize', 
      redirectPackage: redirPackage
    });
  } catch(err) {
    console.log(err.message);
    next(err);
  }
}

async function getUserToken(req, res, next) {
  try {
    res.json(await authServices.getUserToken(req, res));
  } catch (err) {
    console.log(err.message);
    next(err);
  }
}

module.exports = {
  login,
  getUserToken
};