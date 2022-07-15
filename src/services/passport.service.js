const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

// Set up passport strategy
passport.use(
  new SpotifyStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: 'http://localhost:3001/auth/spotify/callback'
    },
    function (req, accessToken, refreshToken, profile, done) {
      console.log(accessToken);
      done(null, profile);
    }
  )
);