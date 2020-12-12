const mongoose = require('mongoose');

const User = mongoose.model('users');

/**
 * Middleware for verifying login credentials.
 */
module.exports = async (req, res, next) => {
  const id = req.header('User-id');
  const token = req.header('Authorization');

  // missing credentials
  if (!id || !token) {
    return res.status(400).send();
  }

  // invalid credentials
  const user = await User.findOne({ id, 'auth.accessToken': token });
  if (!user) {
    return res.status(404).send();
  }

  // attach user to request
  req.user = user;
  next();
};
