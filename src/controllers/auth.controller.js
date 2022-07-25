const authServices = require('../services/auth.service');

async function login(req, res, next) {

  try {
    let redirPackage = await authServices.login();
    res.json({
      status: 200, 
      url: 'https://accounts.spotify.com/authorize', 
      redirectPackage: redirPackage
    });
  } catch(err) {
    console.log(err);
    next(err);
  }
}

async function getAccessToken(req, res, next) {
  try {
    res.json(await authServices.getaccessToken(req, res));
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function validate(req, res, next) {
  try {
    let valid = await authServices.validateUser(req.query.accessToken, req.query.action);
    
    let obj = valid ? { status: 200 } : { status: 500};

    res.json(obj);
  } catch(err) {
    console.log(err);
    next(err);
  }
}

module.exports = {
  login,
  getAccessToken,
  validate
};