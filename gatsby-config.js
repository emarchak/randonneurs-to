'use strict';

/**
* Source-map-support mimics node's stack trace making debugging easier
* ts-node register helps importing and compiling TypeScript modules into JS
*/
require('source-map-support').install();
require('ts-node').register({
  compilerOptions: {
    module: 'commonjs',
    target: 'es2017',
  },
})

module.exports = require('./gatsby/config.ts');
