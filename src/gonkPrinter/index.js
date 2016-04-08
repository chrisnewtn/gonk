'use strict';

const fs = require('fs');
const path = require('path');

const gonk = fs.readFileSync(path.resolve(__dirname, './gonk.txt'), {encoding: 'utf8'});

function prinkGonk() {
  console.log(gonk);
}

exports.print = prinkGonk;
