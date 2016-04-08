'use strict';

const fs = require('fs');
const gonkFs = require('./fs');
const config = require('../src/config');

function ensureScriptsDirExists() {
  if (!gonkFs.existsSync(config.scriptsDir)) {
    fs.mkdirSync(config.scriptsDir);
  }
}

exports.ensureExists = ensureScriptsDirExists;
