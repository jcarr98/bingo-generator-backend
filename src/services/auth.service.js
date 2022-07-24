const helper = require('../utils/helper.utils');
const fetch = require('node-fetch');
const db = require('./db.service');

async function login() {
  let state = helper.generateRandomString(16);

  // Generate redirect package
  let redirPackage = {
    response_type: 'code',
    client_id: process.env.CLIENT_ID,
    scope: 'playlist-read-private',
    redirect_uri: `${process.env.FRONTEND_URL}/landing`,
    state: state
  }

  return JSON.stringify(redirPackage);
}

async function getaccessToken(req, res) {
  let code = req.query.code;
  let state = req.query.state;

  // TODO - Check correct state

  let authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri: `${process.env.FRONTEND_URL}/landing`,
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

async function validateUser(token) {
  let user = await fetch(`${process.env.SPOTIFY_URL}/me`, {
    method: 'get',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }).catch(err => {console.log(`Spotify error`, err)});

  // Check if user is valid
  return user.status === 200;
}

module.exports = {
  login,
  getaccessToken,
  validateUser
};