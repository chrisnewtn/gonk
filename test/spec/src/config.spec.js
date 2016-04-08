'use strict';

const sinon = require('sinon');
const assert = require('assert');
const SandboxedModule = require('sandboxed-module');

describe('config', function(){
  let config;

  describe('when the GONK_SCRIPTS_DIR environment variable is defined', function(){
    beforeEach(function(){
      config = SandboxedModule.require('../../../src/config', {
        globals: {
          process: {
            env: {
              GONK_SCRIPTS_DIR: 'path/to/gonk-scripts'
            }
          }
        }
      });
    });

    it('sets the value of GONK_SCRIPTS_DIR on the scriptsDir property', function(){
      assert.equal(config.scriptsDir, 'path/to/gonk-scripts');
    });
  });

  describe('when the GONK_SCRIPTS_DIR environment variable is NOT defined', function(){
    describe('and gonk is NOT running on Windows', function(){
      beforeEach(function(){
        config = SandboxedModule.require('../../../src/config', {
          globals: {
            process: {
              env: {
                HOME: '/Users/Rey'
              },
              platform: 'darwin'
            }
          }
        });
      });

      it('sets scriptsDir to ".gonk-scripts" in the user\'s home directory ', function(){
        assert.equal(config.scriptsDir, '/Users/Rey/.gonk-scripts');
      });
    });

    describe('and gonk is running on Windows', function(){
      beforeEach(function(){
        config = SandboxedModule.require('../../../src/config', {
          requires: {
            path: {
              join: function(){
                return Array.prototype.slice.apply(arguments).join('\\');
              }
            }
          },
          globals: {
            process: {
              env: {
                USERPROFILE: 'C:\\Users\\Rey'
              },
              platform: 'win32'
            }
          }
        });
      });

      it('sets scriptsDir to ".gonk-scripts" in the user\'s home directory ', function(){
        assert.equal(config.scriptsDir, 'C:\\Users\\Rey\\.gonk-scripts');
      });
    });
  });
});
