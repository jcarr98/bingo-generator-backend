const testServices = require('../services/test.service');
const dbServices = require('../services/db.service');

async function getTest(req, res, next) {
  try {
    res.json(await testServices.getTest(req));
  } catch (err) {
    console.log(`Error getting test`, err.message);
    next(err);
  }
}

async function resTest(req, res, next) {
  try {
    testServices.resTest(res);
  } catch (err) {
    console.log(err.message);
    next(err);
  }
}

async function dbTest(req, res, next) {
  dbServices.insertItem(req.query.email, req.query.action);
}

async function ping(req, res, next) {
  res.json(testServices.ping());
}

module.exports = {
  getTest,
  resTest,
  dbTest,
  ping
}