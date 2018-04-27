'use strict';

const container = require('./djectContainer');
const signet = container.build('signet');
let spyFactoryFactory = container.build('spyFactoryFactory');

const types = {
    apiEndPoints: signet.isTypeOf('apiEndPoints'),
    fakeObject: signet.isTypeOf('fakeObject'),
};

spyFactoryFactory.types = types;

module.exports = spyFactoryFactory;