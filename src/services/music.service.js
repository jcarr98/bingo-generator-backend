const fetch = require('node-fetch');
const helper = require('../utils/helper.utils');
// const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

async function getMe(userToken) {
  if(!userToken) {
    console.log('error');
    const err = "Error";
    return {err};
  }

  // Check for demo user
  if(userToken === 'demo') {
    return {
      "display_name": 'Demo User',
      "href": '',
      "id": -1
    };
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
  if(!userToken) {
    console.log('error');
    const Response = 'Error with user token';
    return {Response};
  }

  let data;

  // Check for demo user
  if(userToken === 'demo') {
    // Read playlists from JSON file
    let item = await readJson('playlists.json');
    // Parse json
    let json = JSON.parse(item);
    data = [];

    // Create array of objects
    for(const key in json) {
      data.push(json[key]);
    }
  } else {
    data = await helper.getAllItems(userToken, `${process.env.SPOTIFY_URL}/me/playlists`);
  }

  return data;
}

async function getTracks(userToken, playlistId) {
  if(!userToken || !playlistId) {
    console.log('error');
    const Response = 'Error';
    return {Response};
  }

  let data;

  if(userToken === 'demo') {
    // Read tracks file
    let jsonPromise = await readJson('tracks.json');
    // Tracks file has every track for every playlist
    let fullJson = JSON.parse(jsonPromise);
    // Find playlist-specific tracks
    let json = fullJson[playlistId].tracks;

    data = [];

    // Create array of objects
    for(const key in json) {
      const track = {
        "track": json[key]
      };
      data.push(track);
    }
  } else {
    data = await helper.getAllItems(userToken, `${process.env.SPOTIFY_URL}/playlists/${playlistId}/tracks`, 100);
  }

  return data;
}

async function readJson(file) {
  return await fsPromises.readFile(path.join(__dirname, '..', 'demo', file));
}

module.exports = {
  getMe,
  getPlaylists,
  getTracks
}