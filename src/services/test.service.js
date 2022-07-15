async function getTest(req){
  console.log(req);

  const message = "ok";
  const value = req.query.data;

  return {message, value};
}

async function resTest(res) {
  console.log('Redirecting user');

  res.send({'status': 200, 'url': 'http://localhost:8080/dashboard'});
}

module.exports = {
  getTest,
  resTest
}