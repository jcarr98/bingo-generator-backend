// Imports
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const musicRouter = require('./src/routes/music.route');
const testRouter = require('./src/routes/test.route');

// Set up development environment
if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// Set up app
const PORT = process.env.PORT || 5001;
const app = express();

// CORS
const corsOptions = {
  origin: process.env.CORS_ORIGIN
}
app.use(cors(corsOptions));

// body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
  })
);

app.get('/', (req, res) => {
  res.json({'message': 'ok'});
});

app.use('/music', musicRouter);
app.use('/test', testRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});