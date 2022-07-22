const fetch = require('node-fetch');
const helper = require('../utils/helper.utils');
// const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

async function getMe(accessToken) {
  if(!accessToken) {
    throw 'Cannot get user information: No access token';
  }

  // Check for demo user
  if(accessToken === 'demo') {
    return {
      "display_name": 'Demo User',
      "href": '',
      "id": -1
    };
  }

  let user = await fetch(`${process.env.SPOTIFY_URL}/me`, {
    method: 'get',
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  }).catch(err => {console.log(`Spotify error`, err)});

  // Check for OK from Spotify
  let status = user.status;
  // Get json from response
  let json = await user.json();
  // Include Spotify status in json being sent to client
  json.status = status;

  return json;
}

async function getPlaylists(accessToken) {
  if(!accessToken) {
    throw 'Cannot get user playlists: No access token';
  }

  let data;

  // Check for demo user
  if(accessToken === 'demo') {
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
    data = await helper.getAllItems(accessToken, `${process.env.SPOTIFY_URL}/me/playlists`);
  }

  return data;
}

async function getTracks(accessToken, playlistId) {
  if(!accessToken || !playlistId) {
    throw 'Cannot get tracks: No access token or playlist ID';
  }

  let data;

  if(accessToken === 'demo') {
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
    data = await helper.getAllItems(accessToken, `${process.env.SPOTIFY_URL}/playlists/${playlistId}/tracks`, 100);
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