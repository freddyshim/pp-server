const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

const User = mongoose.model('users');

module.exports = (app) => {
  app.get('/user', requireLogin, (req, res) => {
    res.send(req.user);
  });

  app.post('/user', requireLogin, async (req, res) => {
    const localUser = req.body;
    if (localUser) {
      try {
        await User.updateOne({ id: localUser.id }, localUser);
      } catch (ex) {
        console.log('error: could not save user');
      } finally {
        res.send({});
      }
    }
  });
};
