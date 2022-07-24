const fetch = require('node-fetch');
const db = require('./db.service');

async function log(token, action) {
  // Use user token to get id
  const user = await fetch(`${process.env.SPOTIFY_URL}/me`, {
    method: 'get',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }).catch(err => { console.log(`Spotify error: ${err.message}`); });

  // Confirm /me
  if(user.status !== 200) {
    console.log('Non-200 code from Spotify');
    return { status: 500, message: 'Error retrieving from Spotify' };
  }

  const json = await user.json();
  const id = json.id;

  // Confirm we have an action
  if(action.split(' ').join('').length < 1) {
    console.log('No action provided');
    return { status: 500, message: 'No action provided' };
  }

  // Log action with db
  db.logAction(id, action);
  return { status: 200 };
}

module.exports = {log};