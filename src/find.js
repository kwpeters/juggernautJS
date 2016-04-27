#!/usr/bin/env node

doit();

function doit() {
    "use strict";

    var walk         = require("walk"),
        path         = require("path"),
        ignoreDirs   = [".git", ".idea"];

    var pattern = new RegExp(process.argv[2], "i");

    var walker = walk.walk(process.cwd(), {filters: ignoreDirs});

    walker.on("file", function (root, fileStats, next) {
        var absPath = path.join(root, fileStats.name);
        testName(absPath, pattern);
        next();
    });

    walker.on("directory", function (root, dirStats, next) {
        var absPath = path.join(root, dirStats.name);
        testName(absPath, pattern);
        next();
    });
}


function testName(name, pattern) {
    "use strict";

    var chalk        = require("chalk"),
        highlight    = chalk.bold.red;
    
    var match = name.match(pattern);

    if (match !== null) {
        if (pattern) {
            var before = match.input.slice(0, match.index);
            var matching = match[0];
            var after = match.input.slice(match.index + matching.length);

            console.log(before + highlight(matching) + after);
        } else {
            console.log(name);
        }
    }
}
