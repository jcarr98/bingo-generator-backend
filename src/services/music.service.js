const fetch = require('node-fetch');
const helper = require('../utils/helper.utils');

async function getMe(userToken) {
  if(!userToken) {
    console.log('error');
    const err = "Error";
    return {err};
  }

  let user = await fetch(`${process.env.SPOTIFY_URL}/me`, {
    method: 'get',
    headers: {
      'Authorization': `Bearer ${userToken}`
    }
  }).catch(err => {console.log(`Spotify error`, err)});

  let json = await user.json();

  return json;
}

async function getPlaylists(userToken) {
  console.log('Running service');
  if(!userToken) {
    console.log('error');
    console.log(`usertoken: ${userToken}`);
    const Response = 'Error with user token';
    return {Response};
  }

  let allPlaylists = await helper.getAllItems(userToken, `${process.env.SPOTIFY_URL}/me/playlists`);

  return allPlaylists;
}

async function getTracks(userToken, playlistId) {
  if(!userToken || !playlistId) {
    console.log('error');
    const Response = 'Error';
    return {Response};
  }

  let allTracks = await helper.getAllItems(userToken, `${process.env.SPOTIFY_URL}/playlists/${playlistId}/tracks`, 100);

  return allTracks;
}

module.exports = {
  getMe,
  getPlaylists,
  getTracks
}