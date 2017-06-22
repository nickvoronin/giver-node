/**
 * Created by palzuncoff on 6/22/17.
 */
const dns = require('dns');
const config = require('../config');
const Logger = require('../logger');
const logger = new Logger();
const options = {
  family: 6,
  hints: dns.ADDRCONFIG | dns.V4MAPPED,
};

module.exports = dns.lookup(config.hostanme, options, (err, address, family) => {
  if (err) throw new Error(err);
  return address;

});