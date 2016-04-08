'use strict';

const sinon = require('sinon');
const assert = require('assert');
const SandboxedModule = require('sandboxed-module');

describe('bin/gonk', () => {
  let runStub;

  beforeEach(() => {
    runStub = sinon.stub();

    SandboxedModule.require('../../../bin/gonk', {
      requires: {
        '../src/cli': {run: runStub}
      },
      globals: {
        process: 'fakeProccess'
      }
    })
  });

  it('runs the cli script, passing it the process global', () => {
    assert.equal(runStub.callCount, 1);
    assert.deepEqual(runStub.args, [['fakeProccess']]);
  });
});
