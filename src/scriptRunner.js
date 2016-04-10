'use strict';

const path = require('path');
const spawn = require('child_process').spawn;
const gonkPrinter = require('./gonkPrinter');
const soundPlayer = require('./soundPlayer');

function runScript(runner, pathToScript, argv) {
  const args = [pathToScript].concat(argv);

  const options = {
    stdio: 'inherit',
    env: Object.assign({}, process.env, {
      GONK_PATH: path.resolve(__dirname, '../')
    })
  };

  soundPlayer.load();

  spawn(runner, args, options).on('close', exitCode => {
    if (exitCode === 0) {
      gonkPrinter.print();
      return soundPlayer.play().then(() => process.exit(exitCode));
    }
    process.exit(exitCode);
  });
}

exports.run = runScript;
