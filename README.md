# gulp-command-handling
[![Node.js version](https://img.shields.io/node/v/gulp-command-handling.svg?style=flat)](https://nodejs.org) [![gulp-command-handling](https://img.shields.io/npm/v/gulp-command-handling.svg?style=flat&color=red)](https://www.npmjs.com/package/gulp-command-handling/)

## Table of contents

1. [Introduction](#1-introduction)
2. [Installation](#2-installation)
    - [System requirements](#system-requirements)
3. [Main features](#3-main-features)
4. [Usage](#4-usage)
    - [Command line structure](#command-line-structure)
    - [Methods](#methods)
    - [Custom definition](#custom-definition)
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
    -   [Gulp.js](https://gulpjs.com/) version is **4.0.0** _(Gulp CLI is installed on global)_.

## 3. Main features

-   Enhancement for the Gulp CLI with your own parameters _(option, sub option, argument)_.
-   Using alias for option and sub option.
-   Command combination for many times you need.
-   Using custom regular expression (RegExp) for your reason when needed. _(It applies for params validation)_

**Examples:**

- $ gulp build -s -m FlowerSite _(Simple using)_
- $ gulp release --site --minify FlowerSite _(Using alias)_
- $ gulp build --site --minify FlowerSite --move-to "/home/dev" _(Combination 2 times)_
- $ gulp build -s -m -o FlowerSite -t "/home/dev" -n flowersite-v1.0.0 _(Combination 3 times)_

## 4. Usage

### Command line structure

The simple command line structure is used in this library:

`$ gulp <task> [-option] [-subOptions] [argument]`

-   An option has only an alias and it has many sub options.
-   An alias is used as a key in the result object.
-   An argument is the end of a part in the command.

**BEWARE!** You should not using the options that are already using for Gulp CLI. Example: `-h` , `-v`, `-f` etc. Use the command `gulp --help` to view more about that.

### Methods

| Method | Argument | Description |
|---|---|---|
|.setting()|Object|Custom definition _(Ex: custom RegExp)_|
|.option()|`<task>`, `<option>`, `<optionAlias>`, `[description]`|Option definition|
|.subOption()|`<task>`, `<optionAlias>`, `<subOption>`, `<subOptionAlias>`, `[description]`|Sub option definition|
|.getOptions()||It returns an option list that is an object|
|.parse()|`<process.argv>`|Parse the command line _(Ex: process.argv.slice(2))_|

You can use method chaining with the following order:

|Method|Order|Description|
|---|---|---|
|.setting()|First|The method must be in the first position of chaining|
|.option()|Between||
|.subOption()|Between||
|.parse()|Last|The method must be in the last position of chaining|

### Custom definition
Regular Express (RegExp) is used for data validation. You can redefine them for your reason when needed by using the method `.setting()`. The general regexps are using if you don't use your own.

It just now supports regexps for **option**, **alias** and **argument** validation. You should only change values of the properties: `regexOption`, `regexAlias` and `regexArgument`.

View the [example](#5-example) for more detail.

## 5. Example

View more in the example `/gulpfile.js` on [GitHub repo](https://github.com/nguyenkhois/gulp-command-handling).

```
/* gulpfile.js */

const { Command } = require('gulp-command-handling');
const gulpCommand = new Command();

// Using custom RegExp when needed
const customSettings = {
    regexOption: false, //Default is false
    regexAlias: false,
    regexArgument: [a-z]/i,
};

// Command definition
gulpCommand
    .setting(customSettings)
    .option('build', '-s', '--site', 'Building styling for a specific site')
    .subOption('build', '--site', '-m', '--minify', 'Minify files in destination');
    .subOption('build', '--site', '-o', '--overwrite', 'Overwrite files in destination')

// Using in a Gulp task
function build(cb) {
    const result = gulpCommand.parse(process.argv.slice(2));

    if (result.site) {
        if (result.site.minify) {
            console.log('Minification task -> Done!');
        }

        if (result.site.overwrite) {
            console.log('Overwriting task -> Done!');
        }
    } else {
        console.log('Nothing to do');
    }

    cb();
}

exports.build = build;
```

```
// Running the commands for testing purpose
$ gulp build -s -m -o FlowerSite
$ gulp build --site --minify --overwrite FlowerSite
```

## 6. Thank you!
Many thanks to [Commander.js](https://github.com/tj/commander.js) for the inspiration.
