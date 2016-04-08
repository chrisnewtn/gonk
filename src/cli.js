'use strict';

const scriptsDir = require('../src/scriptsDir');
const scriptRunner = require('../src/scriptRunner');
const scriptResolver = require('../src/scriptResolver');

function runCli(process) {
  scriptsDir.ensureExists();

  const scriptToRun = process.argv[2];

  if (!scriptToRun) {
    console.error('Script to run not provided');
    process.exit(1);
  }

  const pathToScript = scriptResolver.resolve(scriptToRun);

  if (!pathToScript) {
    console.error('Script provided does not exist');
    process.exit(1);
  }

  if (pathToScript.ext === '.js') {
    return scriptRunner.run('node', pathToScript.path, process.argv.slice(3));
  }

  console.error(`Unable to parse script of type: ${fileType}`);
  process.exit(1);
}

exports.run = runCli;
