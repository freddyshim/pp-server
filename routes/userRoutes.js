const mongoose = require('mongoose');

const User = mongoose.model('users');

module.exports = (app) => {
  app.get('/user', async (req, res) => {
    const id = req.header('User-id');
    const token = req.header('Authorization');

    if (!id || !token) {
      return res.status(400).send();
    }

    if (id != null && token != null) {
      const user = await User.findOne({ id, 'auth.accessToken': token });
      if (!user) {
        return res.status(404).send();
      }
      return res.send(user);
    }
  });
};
