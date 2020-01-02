# gulp-command-handling
[![Node.js version](https://img.shields.io/node/v/gulp-command-handling.svg?style=flat)](https://nodejs.org)   [![gulp-command-handling](https://img.shields.io/npm/v/gulp-command-handling.svg?style=flat&color=red)](https://www.npmjs.com/package/gulp-command-handling/)

## Table of contents

1. [Introduction](#1-introduction)
2. [Installation](#2-installation)
    - [System requirements](#system-requirements)
3. [Main features](#3-main-features)
4. [Usage](#4-usage)
    - [Command line structure](#command-line-structure)
    - [Methods](#methods)
5. [Example](#5-example)
6. [Thank you!](#6-thank-you)

## 1. Introduction

The lightweight library is used for Gulp application. It's useful when you want to enhance the Gulp CLI with your own parameters _(option, sub option, argument)_.

The development is using:

- [x] Plain JavaScript ES6
- [x] No using other library
- [x] Simplification , effect and performance

## 2. Installation

`$ npm install gulp-command-handling`

### System requirements

-   The minimum support for:
    -   [Node.js](https://nodejs.org/) version is **8.17.0** _(LTS version is a good choice for the stability)_.
    -   [Gulp.js](https://gulpjs.com/) version is **4.0.0** _(Gulp CLI is installed on global)_

## 3. Main features

-   Enhancement for the Gulp CLI with your own definition _(option, sub option, argument)_.
-   Using alias for both option and sub option.
-   Command combination for many times you need.
-   Using custom regular expression (RegExp) for your reason. _(It applies to checking input params for option, sub option and argument)_

**Examples:**

- $ gulp build -s -m FlowerSite _(Simple using)_
- $ gulp release --site --minify FlowerSite _(Using alias)_
- $ gulp build --site --minify FlowerSite --move-to "/home/dev/" _(Combination)_
- $ gulp build -s -m -o FlowerSite -t "/home/dev" --new-name flowersite-v1.0.0 _(Combination)_

## 4. Usage

### Command line structure

The simple command line structure is used in this library:

`$ gulp <task> [-option] [-subOptions] [argument]`

-   An option has only an alias and it has many sub options.
-   An alias is used as a key in the result object.
-   An argument is the end of a part in the command.

**BEWARE!** You should not using the options that Gulp has defined. Example: `-h` , `-v`, `-f` etc. Use the command `gulp --help` to view more detail.

### Methods

| Method | Argument | Description |
|---|---|---|
|`.setting()`|Object|Custom definition _(Ex: custom RegExp)_|
|`.option()`|`<task>, <option>, <optionAlias>, [description]`|Option definition|
|`.subOption()`|`<task>, <optionAlias>, <subOption>, <subOptionAlias>, [description]`|Sub option definition|
|`.getOptions()`|-|It returns an option list that is an object|
|`.parse()`|`<process.argv>`|Parse the command line|

You can use method chaining with the following order:

|Order|Method|Description|
|---|---|---|
|First|`.setting()`|The method must be in the first of chaining|
|Between|`.option()`||
|Between|`.subOption()`||
|Last|`.parse()`|The method must be in the last of chaining|

## 5. Example

View more in the example `/gulpfile.js` on [GitHub repo](https://github.com/nguyenkhois/gulp-command-handling).

```
// gulpfile.js

const { Command } = require('gulp-command-handling');
const gulpCommand = new Command();

// Command definition
gulpCommand
    .option('build', '-s', '--site', 'Building styling for a specific site')
    .subOption('build', '--site', '-o', '--overwrite', 'Overwrite files in destination')
    .subOption('build', '--site', '-m', '--minify', 'Minify files in destination');

// Using in a Gulp task
function build(cb) {
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

exports.build = build;
```

```
// Running command
$ gulp build -s -m FlowerSite
$ gulp build --site --minify --overwrite FlowerSite
```

## 6. Thank you!
Many thanks to [Commander.js](https://github.com/tj/commander.js) for the inspiration.
