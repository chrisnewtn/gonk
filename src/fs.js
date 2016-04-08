'use strict';

const fs = require('fs');

function existsSync(path) {
  try {
    return !!fs.statSync(path);
  } catch (e) {
    return false;
  }
}

exports.existsSync = existsSync;
