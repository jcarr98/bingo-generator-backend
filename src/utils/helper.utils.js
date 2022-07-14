const fetch = require('node-fetch');

async function getAllItems(userToken, url, limit=20) {
  let currentList, fullList = [];
  let offset = 0;

  do {
    currentList = await fetch(`${url}?offset=${offset}&limit=${limit}`, {
      method: 'get',
      headers: {
        'Authorization': `Bearer ${userToken}`
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

module.exports = {
  getAllItems
}