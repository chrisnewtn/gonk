'use strict';

const fs = require('fs');
const path = require('path');

const gonk = fs.readFileSync(path.resolve(__dirname, 'gonk.txt'), {encoding: 'utf8'});

function prinkGonk() {
  process.stdout.write(gonk);
}

exports.print = prinkGonk;
