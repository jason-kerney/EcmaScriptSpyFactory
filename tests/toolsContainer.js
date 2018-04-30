'use strict';

var config = {
    cwd: __dirname,
    modulePaths: [
        '',
        'test-utilities',
        'testTypes',
        '../app',
    ],
    allowOverride: false,
    eagerLoad: false
};

module.exports = require('dject').new(config);