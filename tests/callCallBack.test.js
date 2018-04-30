'use strict';

describe('spyFactoryFactory', function () {
    const contextContainer = require('../djectContainer');
    const toolsContainer = require('./toolsContainer');

    const stubcontractor = toolsContainer.build('stubcontractor');
    const signet = toolsContainer.build('signet');
    const { assert } = toolsContainer.build('chai');

    const isUndefined = signet.isTypeOf('undefined');

    let spyFactory;

    beforeEach(function () {
        const testContainer = contextContainer.new();

        spyFactory = testContainer.build('spyFactoryFactory')(stubcontractor);
    });

    describe('callCallBack', function () {
        it('will calls the last parameter as a callback of a function it is given', function () {
            const callbackCaller = spyFactory.callCallBack();
            let called = false;

            callbackCaller(1, 'second parameter', 3, function () {
                called = true;
            });

            assert.isOk(called, 'Callback not called');
        });

        it('will calls the last parameter as a callback of a function it is given even if it is the only parameter', function () {
            const callbackCaller = spyFactory.callCallBack();
            let called = false;

            callbackCaller(function () {
                called = true;
            });

            assert.isOk(called, 'Callback not called');
        });

        it('will call the callback with nothing if nothing was given to it', function () {
            const callbackCaller = spyFactory.callCallBack();

            callbackCaller(1, 'second parameter', 3, function (error, data) {
                assert.isOk(isUndefined(error), 'Error was expected to have no value');
                assert.isOk(isUndefined(data), 'Data was expected to have no value');
            });
        });

        it('will call the callback with the parameters it was called with', function () {
            const expectedErrorParameter = 'Error Parameter';
            const expectedDataParameter = 'Data Parameter';

            const callbackCaller = spyFactory.callCallBack(expectedErrorParameter, expectedDataParameter);

            callbackCaller(1, 'second parameter', 3, function (error, data) {
                assert.equal(expectedErrorParameter, error);
                assert.equal(expectedDataParameter, data);
            });
        });
    });
});