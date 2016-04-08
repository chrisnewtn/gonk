'use strict';

const fs = require('fs');
const path = require('path');
const spawn = require('child_process').spawn;

function runScript(runner, pathToScript, argv) {
  const args = [pathToScript].concat(argv);

  const options = {
    stdio: 'inherit',
    env: Object.assign({}, process.env, {
      GONK_PATH: path.resolve(__dirname, '../')
    })
  };

  spawn(runner, args, options).on('close', exitCode => {
    const gonk = fs.readFileSync(path.resolve(__dirname, '../src/gonk.txt'), {encoding: 'utf8'});
    console.log(gonk);
  });
}

exports.run = runScript;
