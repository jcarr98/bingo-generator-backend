const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;

// Set up passport strategy
passport.use(
  new SpotifyStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: 'http://localhost:3001/auth/login/callback'
    },
    function(accessToken, refreshToken, expires_in, profile, done) {
      console.log(profile);
      return done(null, profile);
    }
  )
);

async function login(req) {
  passport.authenticate('spotify', {
    scope: ['playlist-read-private'],
    showDialog: true
  })
}

async function loginCallback(req, res) {
  passport.authenticate('spotify', {failureRedirect: '/login'}),
  function (req, res) {
    res.redirect('/');
  }
}