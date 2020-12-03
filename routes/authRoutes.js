const passport = require('passport');

module.exports = (app) => {
  app.get('/auth/twitch', passport.authenticate('twitch'));

  app.get(
    '/auth/twitch/callback',
    passport.authenticate('twitch', { failureRedirect: '/' }),
    (req, res) => {
      if (req.user) {
        const redirectUrl =
          `com.anookday.rpistream://oauth2callback?` +
          `id=${req.user.id}&accessToken=${req.user.auth.accessToken}`;
        res.redirect(redirectUrl);
      }
    }
  );

  app.get('/auth/logout', (req, res) => {
    req.logout();
    res.send({ logout: true });
  });
};
