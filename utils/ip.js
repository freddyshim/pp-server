const _ = require('lodash');
const { networkInterfaces } = require('os');

const ipObj = _.filter(networkInterfaces().en0, (v) => v.family === 'IPv4');
const IP = ipObj && ipObj[0] ? ipObj[0].address : 'localhost';
const PORT = process.env.PORT || 8000;

module.exports = { IP, PORT };
