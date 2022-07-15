const helper = require('../utils/helper.utils');

async function login() {
  let state = helper.generateRandomString(16);

  // Generate redirect package
  let redirPackage = {
    response_type: 'code',
    client_id: process.env.CLIENT_ID,
    scope: 'playlist-read-private',
    redirect_uri: 'http://localhost:8080/landing',
    state: state
  }

  return JSON.stringify(redirPackage);
}

async function getUserToken(req, res) {
  let code = req.query.code;
  let state = req.query.state;

  // TODO - Check correct state

  let authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri: 'http://localhost:8080/landing',
      grant_type: 'authorization_code'
    },
    headers: {
      'Authorization': 'Basic ' + (Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString('base64'))
    },
    json: true
  };

  let item = await helper.doRequest(authOptions);

  return item;
}

module.exports = {
  login,
  getUserToken
};