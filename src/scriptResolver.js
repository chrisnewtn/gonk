'use strict';

const gonkFs = require('./fs');
const path = require('path');
const config = require('./config');

function resolveScriptPath(scriptName) {
  let pathToScript = path.join(config.scriptsDir, scriptName);

  if (!gonkFs.existsSync(pathToScript)) {
    if (gonkFs.existsSync(`${pathToScript}.js`)) {
      pathToScript += '.js';
    } else {
      return false;
    }
  }

  return {
    path: pathToScript,
    ext: path.extname(pathToScript)
  };
}

exports.resolve = resolveScriptPath;
