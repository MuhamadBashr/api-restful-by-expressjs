"use strict";

const crypto = require('crypto');

const hashPassword = function hashPassword(password) {
  let salt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'scret';
  return crypto.createHmac('sha256', salt).update(password).digest('hex');
};

module.exports = hashPassword;