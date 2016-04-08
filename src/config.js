'use strict';

const path = require('path');

function getUserHome() {
  return process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'];
}

Object.assign(exports, {
    scriptsDir: process.env.GONK_SCRIPTS_DIR || path.join(getUserHome(), '.gonk-scripts')
});
