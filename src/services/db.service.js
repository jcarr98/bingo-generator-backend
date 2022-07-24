const { Client } = require('pg');
const authServices = require('./auth.service');  // Confirm user is allowed to do things

async function logAction(id, action) {
  console.log(`Logging => ${id}:${action}`);
  const client = new Client(process.env.DATABASE_URL);
  try {
    await client.connect();
    await client.query(`INSERT INTO logs (user_id, action, time) VALUES ($1, $2, (SELECT NOW()))`, [id, action]);
  } catch (err) {
    console.log('Error executing query:', err);
  } finally {
    client.end();
  }
}

module.exports = {
  logAction
}