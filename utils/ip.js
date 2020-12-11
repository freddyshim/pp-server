const _ = require('lodash');
const { networkInterfaces } = require('os');

let ADDRESS;

if (process.env.NODE_ENV === 'production') {
  ADDRESS = 'https://anookday.dev';
} else {
  const ipObj = _.filter(networkInterfaces().en0, (v) => v.family === 'IPv4');
  const IP = ipObj && ipObj[0] ? ipObj[0].address : 'localhost';
  const PORT = process.env.PORT || 3000;
  ADDRESS = `http://${IP}:${PORT}`;
}

module.exports = { ADDRESS };
