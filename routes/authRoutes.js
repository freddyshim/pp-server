const passport = require('passport');

module.exports = (app) => {
  app.get('/auth/twitch', passport.authenticate('twitch'));

  app.get(
    '/auth/twitch/callback',
    passport.authenticate('twitch', { failureRedirect: '/' }),
    (req, res) => {
      console.log(req.user);
      res.redirect('/');
    }
  );
};
