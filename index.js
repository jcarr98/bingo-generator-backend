// Imports
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// const getRouter = require('./src/routes/get.route');

// Set up development environment
if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
} else {
  
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

// app.use('/routes', getRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});