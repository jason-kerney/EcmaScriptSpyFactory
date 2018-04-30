'use strict';

function stubcontractor(
    path,
) {
    const stubcontractor = require('stubcontractor');
    const stubcontractorConfig = {
        cwd: path.join(__dirname, '../'),
        sourceDirectories: [
            './testTypes',
        ]
    };

    return stubcontractor(stubcontractorConfig);
}

module.exports = stubcontractor;