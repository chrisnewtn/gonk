'use strict';

const sinon = require('sinon');
const assert = require('assert');
const SandboxedModule = require('sandboxed-module');

const path = require('path');
const fs = require('fs');
const pathToGonk = path.resolve(__dirname, '..', '..', '..', 'src', 'gonkPrinter', 'gonk.txt');
const gonk = fs.readFileSync(pathToGonk, {encoding: 'utf8'});

describe('gonkPrinter', () => {
  let gonkPrinter;
  let writeStub;

  before(() => {
    writeStub = sinon.stub();

    gonkPrinter = SandboxedModule.require('../../../src/gonkPrinter', {
      globals: {
        process: {
          stdout: {write: writeStub}
        }
      }
    });
  });

  it('prints a glorious gonk droid', () => {
    gonkPrinter.print();
    assert.equal(writeStub.args[0][0], gonk);
  });
});
