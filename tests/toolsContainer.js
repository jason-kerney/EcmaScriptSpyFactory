'use strict';

var config = {
    cwd: __dirname,
    modulePaths: [
        '',
        'test-utilities',
        '../app',
    ],
    allowOverride: false,
    eagerLoad: false
};

module.exports = require('dject').new(config);