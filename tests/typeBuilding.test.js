'use strict';

describe('type building', function () {
    const contextContainer = require('../djectContainer');

    let testContainer;

    beforeEach(function () {
        testContainer = contextContainer.new();
    });

    it('will not crash if built twice', function () {
        testContainer.build('spyFactoryFactory');
        testContainer.build('spyFactoryFactory');
    });
});