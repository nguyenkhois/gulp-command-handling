"use strict";

const { Command } = require('./');

const gulpCommand = new Command();

// Using your own RegExp when it's needed - Default is false
const appSettings = {
    regexOption: false,
    regexAlias: false,
    regexArgument: false, //Ex: /[0-9]/i
};

gulpCommand
    .setting(appSettings)
    .option('builds', '-s', '--site', 'Building styling for a specific site')
    .subOption('builds', '--site', '-o', '--overwrite', 'Overwrite files in destination')
    .subOption('builds', '--site', '-m', '--minify', 'Minify files in destination')
    .option('builds', '-t', '--moveto', 'Move to new location')
    .subOption('builds', '--moveto', '-n', '--new-name', 'Using a new file name')
    .option('release', '-s', '--site', 'Release styling for a specific site')
    .subOption('release', '--site', '-e', '--new-version', 'Using new version number');

function builds(cb) {
    const result = gulpCommand.parse(process.argv.slice(2));

    console.log(gulpCommand.getOptions());
    console.log(result);

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

exports.builds = builds;