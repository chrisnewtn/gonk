'use strict';

const sinon = require('sinon');
const assert = require('assert');
const cli = require('../../../src/cli');
const scriptsDir = require('../../../src/scriptsDir');
const scriptResolver = require('../../../src/scriptResolver');
const scriptRunner = require('../../../src/scriptRunner');

describe('cli', function(){
  const sandbox = sinon.sandbox.create();
  let fakeProcess;

  beforeEach(function(){
    sandbox.stub(scriptsDir, 'ensureExists');
    sandbox.stub(scriptResolver, 'resolve');
    sandbox.stub(scriptRunner, 'run');
    sandbox.stub(console, 'error');

    fakeProcess = {
      argv: ['node', 'path/to/gonk'],
      exit: sandbox.stub()
    };
  });

  afterEach(function(){
    sandbox.restore();
  });

  it('ensures the scripts directory exists before anything else', function(){
    cli.run(fakeProcess);
    assert.equal(scriptsDir.ensureExists.callCount, 1);
    assert.equal(scriptsDir.ensureExists.calledBefore(scriptResolver.resolve), true);
    assert.equal(scriptsDir.ensureExists.calledBefore(scriptRunner.run), true);
  });

  describe('when not passed a script argument', function(){
    beforeEach(function(){
      cli.run(fakeProcess);
    });

    it('writes an error message to the terminal', function(){
      assert.deepEqual(console.error.args, [['Script to run not provided']]);
    });

    it('exits the process with a code of 1', function(){
      assert.deepEqual(fakeProcess.exit.args, [[1]]);
    });

    it('does not attempt to run the script', function(){
      assert.equal(scriptRunner.run.callCount, 0);
    });
  });

  describe('when the script passed does not exist', function(){
    beforeEach(function(){
      scriptResolver.resolve.returns(false);
      fakeProcess.argv.push('does-not-exit.ram');

      cli.run(fakeProcess);
    });

    it('writes an error message to the terminal', function(){
      assert.deepEqual(console.error.args, [['Script provided does not exist']]);
    });

    it('exits the process with a code of 1', function(){
      assert.deepEqual(fakeProcess.exit.args, [[1]]);
    });

    it('does not attempt to run the script', function(){
      assert.equal(scriptRunner.run.callCount, 0);
    });
  });

  describe('when the script passed is not a .js file', function(){
    beforeEach(function(){
      scriptResolver.resolve.returns({path: 'path/to/exists.ram', ext: '.ram'});
      fakeProcess.argv.push('exists.ram');

      cli.run(fakeProcess);
    });

    it('writes an error message to the terminal', function(){
      assert.deepEqual(console.error.args, [['Unable to parse script of type: .ram']]);
    });

    it('exits the process with a code of 1', function(){
      assert.deepEqual(fakeProcess.exit.args, [[1]]);
    });

    it('does not attempt to run the script', function(){
      assert.equal(scriptRunner.run.callCount, 0);
    });
  });

  describe('when the script passed exists and is a .js file', function(){
    beforeEach(function(){
      scriptResolver.resolve.returns({path: 'path/to/exists.js', ext: '.js'});
      fakeProcess.argv.push('exits.js');
      fakeProcess.argv.push('arg-for-exists.js');

      cli.run(fakeProcess);
    });

    it('runs the scipt with Node, passing along the remaining arguments', function(){
      assert.equal(scriptRunner.run.callCount, 1);
      assert.deepEqual(scriptRunner.run.args, [['node', 'path/to/exists.js', ['arg-for-exists.js']]]);
    });

    it('does not exit the process (script runner takes care of that)', function(){
      assert.equal(fakeProcess.exit.callCount, 0);
    });
  });
});
