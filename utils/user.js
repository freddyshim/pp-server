const _ = require('lodash');

const usersAreEqual = (user, other) => {
  return _.isEqual(user, other);
};

module.exports = { usersAreEqual };
