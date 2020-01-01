# gulp-command-handling
[![Node.js version](https://img.shields.io/node/v/gulp-command-handling.svg?style=flat)](https://nodejs.org)   [![gulp-command-handling](https://img.shields.io/npm/v/gulp-command-handling.svg?style=flat)](https://www.npmjs.com/package/gulp-command-handling/)

## Table of contents

1. [Introduction](#1-introduction)
2. [Installation](#2-installation)
    - [System requirements](#system-requirements)
3. [Main features](#3-main-features)
4. [Usage](#4-usage)
5. [Example](#5-example)
6. [Thank you!](#6-thank-you)

## 1. Introduction

The lightweight library is used for CLI applications that are using Gulp.js and Node.js. It's useful when you want enhance a Gulp application with your own parameters _(option, sub option, argument)_.

The development is using:

-   [x] Plain JavaScript ES6
-   [x] No using other library

## 2. Installation

`$ npm install gulp-command-handling`

### System requirements

-   The minimum support for:
    -   [Node.js](https://nodejs.org/) version is **8.17.0** _(LTS version is a good choice for the stability)_.
    -   [Gulp.js](https://gulpjs.com/) version is **4.0.0** _(Gulp CLI is installed on global)_

## 3. Main features

-   Enhance the Gulp CLI with your own definition _(option, sub option, argument)_.
-   Using alias for both option and sub option.
-   Command combination of many times.

**Examples:**

-   \$ gulp build -s -m FlowerSite _(Simple using)_
-   \$ gulp build -s -m FlowerSite --move-to "/home/dev/" _(Combination)_
-   \$ gulp release --site --minify FlowerSite _(Using alias)_

## 4. Usage

### Command line structure

The simple command line structure is used in this library:

`$ gulp <task> [-option] [-subOptions] [argument]`

-   An option has only an alias and it has many sub options.
-   An alias is used like a key in the result object.
-   An argument is the end of a part in the command.

**BEWARE!** You should not using the options that Gulp has defined. Example: `-h` , `-v`, `-f` etc. Use the command `gulp --help` to view more detail.

### Methods

| Method          | Argument                                                              | Description                                 |
| --------------- | --------------------------------------------------------------------- | ------------------------------------------- |
| `.option()`     | `<task>, <option>, <optionAlias>, [description]`                      | Option definition                           |
| `.subOption()`  | `<task>, <optionAlias>, <subOption>, <subOptionAlias>, [description]` | Sub option definition                       |
| `.getOptions()` | -                                                                     | It returns an option list that is an object |
| `.parse()`      | `<process.argv>`                                                      | Parse the command line                      |

You can use method chaining for these methods:

-   `option`
-   `subOption`
-   `parse` <- This method must be in the end of chaining.

## 5. Example

View more in the example `gulpfile.js` on GitHub repo.

```
// gulpfile.js

const { Command } = require('gulp-command-handling');
const gulpCommand = new Command();

// Command definition
gulpCommand
    .option('builds', '-s', '--site', 'Building styling for a specific site')
    .subOption('builds', '--site', '-o', '--overwrite', 'Overwrite files in destination')
    .subOption('builds', '--site', '-m', '--minify', 'Minify files in destination');

// Using in a Gulp task
function builds(cb) {
    const result = gulpCommand.parse(process.argv.slice(2));
    //console.log(result);

    if (result.site) {
        if (result.site.minify) {
            console.log('Minify it!');
        }

        if (result.site.overwrite) {
            console.log('Overwrite it!');
        }
    } else {
        console.log('Nothing to do');
    }

    cb();
}

exports.builds = builds;
```

```
// Running command
$ gulp builds -s -m FlowerSite
$ gulp builds --site --minify --overwrite FlowerSite
```

## 6. Thank you!
Many thanks to [Commander.js](https://github.com/tj/commander.js) for the inspiration.
