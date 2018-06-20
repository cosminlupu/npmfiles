var fs = require('fs');
var path = require('path');
var callerId = require('caller-id');
var glob = require('glob');

module.exports = function (options){
    var defaultOptions = {
        nodeModulesPath: './node_modules',
        packageJsonPath: './package.json',
        includeDev: false
    };

    options = _extend(defaultOptions, (options || {}));

    var buffer, packages, key, keys, caller, override;
    buffer = fs.readFileSync(options.packageJsonPath);
    packages = JSON.parse(buffer.toString());
    keys = [];

    var overrides = packages.overrides || {};

    if(!path.isAbsolute(options.nodeModulesPath)) {
        caller = callerId.getData();
        options.nodeModulesPath = path.join(path.dirname(caller.filePath), options.nodeModulesPath);
    }

    if(!path.isAbsolute(options.packageJsonPath)) {
        caller = callerId.getData();
        options.packageJsonPath = path.join(path.dirname(caller.filePath), options.packageJsonPath);
    }

    for (key in packages.dependencies) {
        override = overrides[key] || {};
        keys = keys.concat(getMainFiles(options.nodeModulesPath + "/" + key, override));
    }

    if (options.includeDev) {
        for (key in packages.devDependencies) {
            override = overrides[key] || {};
            keys = keys.concat(getMainFiles(options.nodeModulesPath + "/" + key, override));
        }
    }

    return keys;
};

function _extend(object, source) {
    var obj = {};
    for (var key in object) {
        obj[key] = source[key] || object[key];
    }
    return obj;
}

/**
 * Gets the main files for a NPM module
 * @param  {String} modulePath        Path to
 * @param  {Array|String} override    Array of overrides for module
 * @return {Array}                    Array of files for module
 */
function getMainFiles(modulePath, override) {
    var json;
    var files = [];
    try {
	    json = JSON.parse(fs.readFileSync(modulePath + '/package.json'));
    } catch (e) { /* it's ok */ }

    if(override.ignore){
        return [];
    }

    //Main override as string
    if(typeof override.main == 'string'){
        files = files.concat(
            glob.sync(path.resolve(modulePath + "/" + override.main))
        );
    //Main override as array
    } else if(typeof override.main == 'object') {
        override.main.forEach( om => {
            files = files.concat(
                glob.sync(path.resolve(modulePath + "/" + om))
            );
        });

    //No main override
    } else if(json && json.main){
        files = files.concat(
            glob.sync(path.resolve(modulePath + "/" + json.main))
        );
    } else {
        throw 'No main files for module ' + path.basename(modulePath);
    }

    return files;
}
