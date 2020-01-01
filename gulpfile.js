"use strict";

const { Command } = require('./');

const gulpCommand = new Command();

gulpCommand
    .option('builds', '-s', '--site', 'Building styling for a specific site')
    .subOption('builds', '--site', '-o', '--overwrite', 'Overwrite files in destination')
    .subOption('builds', '--site', '-m', '--minify', 'Minify files in destination')
    .option('builds', '-t', '--moveto', 'Move to new location')
    .subOption('builds', '--to', '-n', '--new-name', 'Using a new file name')
    .option('release', '-s', '--site', 'Release styling for a specific site')
    .subOption('release', '--site', '-e', '--new-version', 'Using new version number');

function builds(cb) {
    const result = gulpCommand.parse(process.argv.slice(2));

    //console.log(gulpCommand.getOptions());
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