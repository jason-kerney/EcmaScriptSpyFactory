'use strict';

describe('spyFactoryFactory',function () {
    const toolsContainer = require('./toolsContainer');
    const contextContainer = require('../djectContainer');

    const { assert } = toolsContainer.build('chai');

    let spyFactory;

    beforeEach(function () {
        const testContainer = contextContainer.new();

        spyFactory = testContainer.build('spyFactoryFactory')({});
    });

    describe('callCallbackVia', function () {
        it('calls a function given to it', function () {
            let called = false;
            let caller = spyFactory.callCallbackVia(() => called = true);

            caller(() => { });

            assert.isOk(called, 'Caller did not call given function');
        });

        it('calls a function with the callback', function () {
            let called = false;
            let caller = spyFactory.callCallbackVia((callback) => callback());

            caller(1, 2, 3, () => called = true);

            assert.isOk(called, 'Caller did not pass the callback into the wrapping function');
        });
    });
});