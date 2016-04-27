#!/usr/bin/env node

doit();

function doit() {
    "use strict";

    var walk         = require("walk"),
        path         = require("path"),
        regexHelpers = require("./regexHelpers"),
        ignoreDirs   = [".git", ".idea"],
        chalk        = require("chalk"),
        highlight    = chalk.bold.red;;

    var pattern = new RegExp(process.argv[2], "i");

    var walker = walk.walk(process.cwd(), {filters: ignoreDirs});

    walker.on("file", function (root, fileStats, next) {
        var absPath = path.join(root, fileStats.name);
        var parts = regexHelpers.isMatch(absPath, pattern);
        if (parts) {
            console.log(parts[0] + highlight(parts[1]) + parts[2]);
        }
        next();
    });

    walker.on("directory", function (root, dirStats, next) {
        var absPath = path.join(root, dirStats.name);
        var parts = regexHelpers.isMatch(absPath, pattern);
        if (parts) {
            console.log(parts[0] + highlight(parts[1]) + parts[2]);
        }
        next();
    });
}
