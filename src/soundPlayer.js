'use strict';

const fs = require('fs');
const path = require('path');
const spawn = require('child_process').spawn;

const pathToSounds = path.resolve(__dirname, '..', 'sounds');
let sounds;

function loadSoundFilePaths() {
  sounds = new Promise((resolve, reject) => {
    fs.readdir(pathToSounds, (err, files) => err ? reject(err) : resolve(files));
  });
}

function playRandomGonk(sounds) {
  const gonk = path.resolve(pathToSounds, sounds[Math.floor(Math.random() * sounds.length)]);

  if (process.platform === 'darwin') {
    spawn('afplay', [gonk], {detached: true});
  }
}

function play() {
  return sounds.then(playRandomGonk);
}

exports.load = loadSoundFilePaths;
exports.play = play;
