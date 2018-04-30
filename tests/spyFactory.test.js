'use strict';

describe('spyFactoryFactory', function () {
    const contextContainer = require('../djectContainer');
    const toolsContainer = require('./toolsContainer');

    const { assert } = toolsContainer.build('chai');
    const sinon = toolsContainer.build('sinon');
    const { asInformationString } = toolsContainer.build('object-information');
    const resultFactory = toolsContainer.build('approval-result-factory');

    toolsContainer.build('approvalsConfig')();

    let spyFactory;

    beforeEach(function () {
        const testContainer = contextContainer.new();

        let stubcontractorFake = {
            getApiEndpoints: function (_notUsed, apiEndpoints) {
                let fakedObject = {};
                apiEndpoints.forEach(endPoint => fakedObject[endPoint] = { onCall: sinon.spy() });
                return fakedObject;
            }
        };

        spyFactory = testContainer.build('spyFactoryFactory')(stubcontractorFake);
    });

    describe('spyFactory', function () {
        it('assigns the name as the module being fake if no name is provided', function () {
            const fakeObject = spyFactory('myModule', []);

            assert.equal('myModule', fakeObject.__name);
        });

        it('assigns the name give if provided', function () {
            const fakeObject = spyFactory('myModule', [], 'awesomeAdder');

            assert.equal('awesomeAdder', fakeObject.__name);
        });

        it('assigns a spy to every function given', function () {
            const fakeObject = spyFactory(
                'myModule',
                [
                    'add',
                    'addMore',
                    'addAgain'
                ]
            );

            let result = {
                'add.onCall': fakeObject.add.onCall.args,
                'addMore.onCall': fakeObject.addMore.onCall.args,
                'addAgain.onCall': fakeObject.addAgain.onCall.args,
            };
            this.verify(asInformationString(result));
        });

        it('can add an action to a spy', function () {
            let called = false;
            const fakeObject = spyFactory(
                'myModule',
                [
                    'add',
                    ['addMore', function recordCall() { called = true; }],
                    'addAgain'
                ]
            );

            fakeObject.addMore.onCall.args[0][0]();

            assert.isOk(called, 'call handler not called');
        });

        it('can be told not to spy', function () {
            const fakeObject = spyFactory(
                'myModule',
                [
                    ['add', function returnTwo() { return 2; }, false],
                    'addMore',
                    'addAgain'
                ]
            );

            let result = {
                'add.onCall': fakeObject.add.onCall.args,
                'addMore.onCall': fakeObject.addMore.onCall.args,
                'addAgain.onCall': fakeObject.addAgain.onCall.args,
            };
            this.verify(asInformationString(result));
        });
    });
});