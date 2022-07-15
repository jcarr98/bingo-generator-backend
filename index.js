// Imports
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const musicRouter = require('./src/routes/music.route');
const authRouter = require('./src/routes/auth.route');
const testRouter = require('./src/routes/test.route');

// Set up development environment
if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// Set up app
const PORT = process.env.PORT || 5001;
const app = express();

// CORS
app.use(cors({
  origin: process.env.CORS_ORIGIN
}));

// body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
  })
);

app.get('/', (req, res) => {
  res.json({'message': 'ok'});
});

app.get('/auth/error', (req, res) => {
  console.log('auth error');
  res.send('Unknown Error');
});

app.use('/music', musicRouter);
app.use('/auth', authRouter);
app.use('/test', testRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});