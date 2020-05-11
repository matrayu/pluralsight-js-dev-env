// This file isn't transpiled, so must use CommonJS and ES5

// Register babel to transpile before our tests run.
require('babel-register')();

// Disable webpack featues that Mocha doesn't understand.
// importing css in js is something webpack understands but not Mocha
require.extensions['.css'] = function() {};
