"use strict";

const { Command } = require('./');

const gulpCommand = new Command();

// Using custom RegExp when it's needed
const customSettings = {
    regexOption: false, // Default is false
    regexAlias: false,
    regexArgument: false, // Ex: /[0-9]/i
};

gulpCommand
    .setting(customSettings)
    .option('build', '-s', '--site', 'Building styling for a specific site')
    .subOption('build', '--site', '-o', '--overwrite', 'Overwrite files in destination')
    .subOption('build', '--site', '-m', '--minify', 'Minify files in destination')
    .option('build', '-t', '--move-to', 'Move to new location')
    .option('build', '-n', '--new-name', 'Using a new file name')
    .option('release', '-s', '--site', 'Release styling for a specific site')
    .subOption('release', '--site', '-e', '--new-version', 'Using new version number');

function build(cb) {
    const result = gulpCommand.parse(process.argv.slice(2));

    //console.log(gulpCommand.getOptions());
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

exports.build = build;

/**
 * Run the Gulp command for testing
 * gulp builds --site -m -o FlowerSite -t "/home/dev" --new-name flowersite-v1.0.0
 */