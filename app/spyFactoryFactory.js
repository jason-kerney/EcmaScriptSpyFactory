'use strict';

function spyFactoryFactory(
    signet,
    sinon
) {
    const isString = signet.isTypeOf('string');
    const isExistant = signet.isTypeOf('existant');


    function factory(stubcontractor) {
        function getEndPointName(endPoint) {
            if (signet.isTypeOf('array')(endPoint)) {
                return endPoint[0];
            }
            return endPoint;
        }

        function spyFactory(moduleFile, apiEndPoints, moduleName) {
            let fake = stubcontractor.getApiEndpoints(moduleFile, apiEndPoints.map(getEndPointName));
            fake.__name = isExistant(moduleName) ? moduleName : moduleFile;

            apiEndPoints.forEach(function (endPoint) {
                let name = getEndPointName(endPoint);
                let func = undefined;

                if (signet.isTypeOf('array')(endPoint)) {
                    func = endPoint[1];
                }

                if (isString(endPoint) || endPoint.length < 3 || (endPoint[2])) {
                    fake[name].onCall(sinon.spy(func));
                } else {
                    fake[name].onCall(func);
                }
            });

            return fake;
        }

        function callCallback(error, data) {
            return function (...args) {
                let callback = args.pop();
                if (signet.isTypeOf('function')(callback)) {
                    if (isExistant(error) || isExistant(data)) {
                        callback(error, data);
                    } else {
                        callback();
                    }
                }
            };
        }

        spyFactory.callCallback = signet.enforce(
            'error:maybe<*>, data:maybe<*> => function<() => undefined>',
            callCallback
        );

        return signet.enforce(
            'moduleFile:string, apiEndPoints:apiEndPoints, maybe<moduleName:name> => fakeObject',
            spyFactory
        );
    }

    return factory;
}

module.exports = spyFactoryFactory;