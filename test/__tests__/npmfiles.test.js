'use strict';

const npmfiles = require('../../index');
const pResolve = require('path').resolve;
const fixturePath = pResolve(__dirname + '/../fixtures');

const expectedResults = {
    simple: [
        `${fixturePath}/simple/node_modules/first/first.js`,
        `${fixturePath}/simple/node_modules/second/second.js`
    ],
    arrayfiles: [
        `${fixturePath}/arrayfiles/node_modules/first/first1.js`,
        `${fixturePath}/arrayfiles/node_modules/first/first2.js`,
        `${fixturePath}/arrayfiles/node_modules/second/second1.js`,
        `${fixturePath}/arrayfiles/node_modules/second/second2.js`
    ],
    'incl-dev': [
        `${fixturePath}/incl-dev/node_modules/first/first.js`,
        `${fixturePath}/incl-dev/node_modules/second/second.js`
    ],
};

const getConfig = function getConfig(folder){
    return {nodeModulesPath: `${fixturePath}/${folder}/node_modules`, packageJsonPath: `${fixturePath}/${folder}/package.json`};
};

describe('NPM files', () => {
    it('Returns main file declared in the modules own package.json', () => {
        const testType = 'simple';
        let resultFiles = npmfiles(getConfig(testType));

        expect(resultFiles).toEqual(expectedResults[testType]);
    });
    it('Doesn\'t return non existing main entries', () => {
        const testType = 'noexist';
        let resultFiles = npmfiles(getConfig(testType));

        expect(resultFiles).toEqual([]);
    });
    it('Returns main file declared in the modules own package.json as array', () => {
        const testType = 'arrayfiles';
        let resultFiles = npmfiles(getConfig(testType));

        expect(resultFiles).toEqual(expectedResults[testType]);
    });
    it('Returns devDependendencies as well if specified as an option', () => {
        const testType = 'incl-dev';
        let conf = getConfig(testType);
        conf.includeDev = true;
        let resultFiles = npmfiles(conf);

        expect(resultFiles).toEqual(expectedResults[testType]);
    });
});