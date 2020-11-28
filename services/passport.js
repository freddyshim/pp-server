const passport = require('passport');
const keys = require('../config/keys');
const TwitchStrategy = require('passport-twitch-new').Strategy;

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// initialize passport
passport.use(
  new TwitchStrategy(
    {
      clientID: keys.twitchClientId,
      clientSecret: keys.twitchClientSecret,
      callbackURL: 'http://172.30.1.47:8000/auth/twitch/callback',
      scope: 'user:read:email channel:read:stream_key chat:read chat:edit',
    },
    async (accessToken, refreshToken, profile, done) => {
      done(null, { ...profile, accessToken, refreshToken });
    }
  )
);
