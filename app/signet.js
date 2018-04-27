'use strict';

function signet(
    approvalResultFactory
) {
    const typeHelper = require('signet')();

    typeHelper.alias('name', 'string');
    typeHelper.alias('maybe', 'variant<null, undefined, _>');
    typeHelper.alias('existant', 'not<undefined, null>');
    signet.extend('fakeObject', approvalResultFactory.types.isFakeObject);
    signet.alias('apiEndPoints',
        `array
            <
                variant
                    <
                        name:string, 
                        tuple
                            <
                                name:string, 
                                action:function
                            >, 
                        tuple
                            <
                                name:string, 
                                action:function,
                                asSpy:boolean
                            >
                    >
            >`);
    return typeHelper;
}

signet['@singleton'] = true;

module.exports = signet;