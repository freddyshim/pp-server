import passport from 'passport';
import { Keys } from '../config/Keys';
import { Network } from '../utils/Network';
import {
  Strategy as TwitchStrategy,
  Profile as TwitchProfile,
  VerifyCallback as TwitchVerifyCallback,
} from '@oauth-everything/passport-twitch';
import { User, UserDocument } from '../models/User';

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user: UserDocument, done) => {
  done(null, user);
});

// initialize passport
passport.use(
  new TwitchStrategy(
    {
      clientID: Keys.twitchClientId,
      clientSecret: Keys.twitchClientSecret,
      callbackURL: `${Network.address}/auth/twitch/callback`,
      scope: 'user:read:email channel:read:stream_key chat:read chat:edit',
      customHeaders: {
        'client-id': Keys.twitchClientId,
      },
    },
    async (
      accessToken: string,
      refreshToken: string,
      params: any,
      profile: TwitchProfile,
      done: TwitchVerifyCallback
    ) => {
      // Twitch access tokens generally expire after 4 hours
      let tokenExpiryDate = Date.now() + 4 * 60 * 60 * 1000;
      if (params && params.expires_in) {
        tokenExpiryDate = Date.now() + params.expires_in * 1000;
      }

      // extract profile info
      const id: string = profile.id.trim();
      const login: string = profile.username ? profile.username.trim() : '';
      const displayName: string = profile.displayName
        ? profile.displayName.trim()
        : '';
      const description: string = profile.aboutMe ? profile.aboutMe.trim() : '';
      const email: string =
        profile.emails && profile.emails[0]
          ? profile.emails[0].value.trim()
          : '';
      const profileImage =
        profile.photos &&
        profile.photos[0] &&
        profile.photos[0].type === 'profile'
          ? profile.photos[0].value.trim()
          : '';

      // if user exists in database, update user
      // else, insert new user in database
      const user = await User.findOneAndUpdate(
        { id },
        {
          profile: {
            login,
            displayName,
            description,
            email,
            profileImage,
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
