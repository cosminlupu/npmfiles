npmfiles
================

[![Build Status](https://travis-ci.org/cosminlupu/npmfiles.svg?branch=master)](https://travis-ci.org/cosminlupu/npmfiles) [![Coverage Status](https://coveralls.io/repos/github/cosminlupu/npmfiles/badge.svg?branch=master)](https://coveralls.io/github/cosminlupu/npmfiles?branch=master)

- [Inspiration](#inspiration)
- [Usage](#usage)
    - [Usage with gulp](#usage-with-gulp)
- [Options](#options)
    - [Overrides Options](#overrides-options)
        - [main](#main)
        - [ignore](#ignore)
    - [Common Options](#common-options)
        - [nodeModulesPath](#nodeModulesPath)
        - [nodePackageJsonPath](#nodePackageJsonPath)
        - [includeDev](#includedev)
        - [showWarnings](#showwarnings)

## Inspiration

Functionality ( and README ) heavily inspired by [ck86's main-bower-files](https://github.com/ck86/main-bower-files)

## Usage

```javascript
var mainNPMFiles = require('npmfiles');
var files = mainNPMFiles([options]);
```

This will read your `package.json`, iterate through your dependencies and returns an array of files defined in the main property of the packages `package.json`.

You can override the behavior if you add an `overrides` property to your own `package.json`.

### Usage with gulp

```javascript
var gulp = require('gulp');
var mainNPMFiles = require('npmfiles');

gulp.task('TASKNAME', function() {
    return gulp.src(mainNPMFiles())
        .pipe(/* what you want to do with the files */)
});
```

## Options

### Overrides Options

These options can be set directly in your `package.json` file, e.g.:

```js
{
    "name": "your-package-name",
    "dependencies": {
        "NPM-PACKAGE": "*"
    },
    "overrides": {
        "NPM-PACKAGE": {
            "main": [
                // Here you can override the main files or ignoring this package, for more info see options
            ]
        }
    }
}
```

#### main

Type: `String` or `Array`

You can specify which files should be selected. e.g.:

You can also use glob pattern to select files, e.g.:

```json
{
    "overrides": {
        "NPM-PACKAGE": {
            "main": "**/*.js"
        }
    }
}
```

#### ignore

Type: `Boolean` Default: `false`

Set to `true` if you want to ignore this package.

### Common Options

These options can be passed to this plugin, e.g: `mainNPMFiles(/* options*/)`

#### nodeModulesPath

Type: `String`

You can specify the `node_modules` folder path where the modules are located.

For example:

```javascript
mainNPMFiles({
    nodeModulesPath: 'path/for/node_modules'
})
.pipe(gulp.dest('client/src/lib'));
```

#### nodePackageJsonPath

Type: `String`

You can specify the `package.json` file path.

For example:

```javascript
mainNPMFiles({
    packageJsonPath: 'path/for/package.json'
})
.pipe(gulp.dest('client/src/lib'));
```

#### includeDev

Type: `Boolean` Default: `false`

Set this option to `true` to add the devDependencies to your dependencies

#### showWarnings

Type: `Boolean` Default: `false`

Set this option to `true` to show warnings for packages that don't have any files in the main entry or overrides

## LICENSE

(MIT License)

Copyright (c) 2017 Cosmin Lupu

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.