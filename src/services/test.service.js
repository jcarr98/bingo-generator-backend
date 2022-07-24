async function getTest(req){
  const message = "ok";
  const value = req.query.data;

  return {message, value};
}

async function resTest(res) {
  console.log('Redirecting user');

  res.send({'status': 200, 'url': 'http://localhost:8080/dashboard'});
}

async function ping() {
  console.log('pong');
  return { 'message': 'pong' };
}

module.exports = {
  getTest,
  resTest,
  ping
}