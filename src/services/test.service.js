async function getTest(req){
  console.log(req);

  const message = "ok";
  const value = req.query.data;

  return {message, value};
}

module.exports = {
  getTest
}