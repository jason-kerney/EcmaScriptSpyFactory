'use strict';

'use strict';

describe('spyFactoryFactory',function () {
    const toolsContainer = require('./toolsContainer');
    const contextContainer = require('../djectContainer');

    const { assert } = toolsContainer.build('chai');

    let spyFactory;

    beforeEach(function () {
        const testContainer = contextContainer.new();

        let fake = {};

        let stubFake = {
            getApiEndpoints: function (ignored, names) {
                names.forEach(function(name) {
                    fake[name] = () =>  name;
                    fake[name].onCall = () => { };
                });
                return fake;
            }
        };

        spyFactory = testContainer.build('spyFactoryFactory')(stubFake);
    });

    describe('renameTo', function () {
        it('renames a function', function () {
            let spyService = spyFactory(
                'someModule',
                [
                    'internalFunction',
                ],
            );

            spyService.internalFunction.renameTo('externalFunction');

            assert.isNotOk(spyService.internalFunction, 'did not remove old function');
            assert.isOk(spyService.externalFunction, 'did not add new function');
            
            assert.equal(spyService.externalFunction(), 'internalFunction');
        });
    });
});