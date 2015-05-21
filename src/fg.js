#!/usr/bin/env node

/* global require */

(function () {
    "use strict";

    var walk            = require('walk'),
        path            = require('path'),
        yargs           = require('yargs'),
        regexHelpers    = require('./regexHelpers'),
        fileSearcherMod = require('./fileSearcher');

    var argv = yargs.usage('Usage: $0 ').demand(1).argv;

    // todo: Put the following regexes in an array of search patterns to look for.
    console.log(argv._);

    var walker,
        options       = {},
        ignoreRegexes = [
            /\.DS_Store/
        ];

    walker = walk.walk('.', options);

    walker.on('file', function onFile(root, fileStats, next) {
        var filePath = path.join(root, fileStats.name),
            fileSearcher;

        if (!regexHelpers.matchesAny(filePath, ignoreRegexes)) {

            //fileSearcher = fileSearcherMod.createFileSearcher(filePath)
            fileSearcherMod.searchFile(filePath, [/a/, /b/], {numContextLines: 2});
        }

        next();
    });

    walker.on('errors', function onErrors(root, nodeStatsArray, next) {
    });

    walker.on('end', function onEnd() {
    });


})();


// one hen two ducks three squaking geese four limrick oysters five corpulan porpoises six pairs of don alverzo's tweezers.