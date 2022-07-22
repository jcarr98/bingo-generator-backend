const fetch = require('node-fetch');
const request = require('request');

async function getAllItems(accessToken, url, limit=20) {
  let currentList, fullList = [];
  let offset = 0;

  do {
    currentList = await fetch(`${url}?offset=${offset}&limit=${limit}`, {
      method: 'get',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    }).catch(err => {console.log(err)});

    currentList = await currentList.json();

    for(const item of currentList.items) {
      fullList.push(item);
    }

    offset = offset + limit;
  } while(currentList.items.length > 0)

  return fullList;
}

function generateRandomString(length) {
  const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let str = '';

  for(let i = 0; i < length; i++) {
    str = str + CHARACTERS.charAt(Math.floor(Math.random() * CHARACTERS.length));
  }
  
  return str;
}

function doRequest(url) {
  return new Promise(function(resolve, reject) {
    request.post(url, function(error, res, body) {
      if(!error && res.statusCode == 200) {
        resolve(body);
      } else {
        reject(error);
      }
    })
  })
}

module.exports = {
  getAllItems,
  generateRandomString,
  doRequest
}