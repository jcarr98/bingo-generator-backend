const testServices = require('../services/test.service');

async function getTest(req, res, next) {
  try {
    res.json(await testServices.getTest(req));
  } catch (err) {
    console.log(`Error getting test`, err.message);
    next(err);
  }
}

module.exports = {
  getTest
}