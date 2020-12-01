const passport = require('passport');
const keys = require('../config/keys');
const { IP, PORT } = require('../utils/ip');
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
      callbackURL: `http://${IP}:${PORT}/auth/twitch/callback`,
      scope: 'user:read:email channel:read:stream_key chat:read chat:edit',
    },
    async (accessToken, refreshToken, params, profile, done) => {
      const expiresIn = params.expires_in;
      console.log(profile);
      done(null, { ...profile, accessToken, refreshToken, expiresIn });
    }
  )
);
