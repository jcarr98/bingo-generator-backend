// Imports
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

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

// Express-session
app.use(
  session({ 
    secret: process.env.EXPRESS_SECRET,
    resave: true,
    saveUninitialized: true
  })
);

// passport
require('./src/services/passport.service');
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.json({'message': 'ok'});
});

app.get('/auth/error', (req, res) => {
  console.log('auth error');
  res.send('Unknown Error');
});

app.get('/auth/spotify', passport.authenticate('spotify'));

app.get('/auth/spotify/callback', passport.authenticate('spotify', { 
    successRedirect: 'http://localhost:8080/landing',
    failureRedirect: 'http://localhost:8080/login'
  }),
);

app.use('/music', musicRouter);
app.use('/test', testRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});