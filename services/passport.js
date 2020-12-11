const passport = require('passport');
const mongoose = require('mongoose');
const keys = require('../config/keys');
const { ADDRESS } = require('../utils/ip');
const TwitchStrategy = require('passport-twitch-new').Strategy;

const User = mongoose.model('users');

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
      callbackURL: `${ADDRESS}/auth/twitch/callback`,
      scope: 'user:read:email channel:read:stream_key chat:read chat:edit',
    },
    async (accessToken, refreshToken, params, profile, done) => {
      const tokenExpiryDate = Date.now() + params.expires_in * 1000;
      const {
        id,
        login,
        display_name,
        description,
        email,
        profile_image_url,
      } = profile;

      // if user exists in database, update user
      // else, insert new user in database
      const user = await User.findOneAndUpdate(
        { id },
        {
          profile: {
            login,
            displayName: display_name,
            description,
            email,
            profileImage: profile_image_url,
          },
          auth: {
            accessToken,
            refreshToken,
            tokenExpiryDate,
          },
        },
        {
          new: true,
          upsert: true,
          setDefaultsOnInsert: true,
        }
      );

      done(null, user);
    }
  )
);
