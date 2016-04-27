#!/usr/bin/env node

var walk         = require("walk"),
    fs           = require("fs"),
    path         = require("path"),
    chalk        = require("chalk"),
    highlight    = chalk.bold.red;


var pattern = new RegExp(process.argv[2]);


var walker = walk.walk(process.cwd());


walker.on("file", function onFile(root, fileStats, next) {
    var absPath = path.join(root, fileStats.name);
    testName(absPath);
    next();
});


walker.on("directory", function onFile(root, dirStats, next) {
    var absPath = path.join(root, dirStats.name);
    testName(absPath);
    next();
});


function testName(name) {

    var match = name.match(pattern);

    if (match !== null) {
        var before = match.input.slice(0, match.index);
        var matching = match[0];
        var after = match.input.slice(match.index + matching.length);

        console.log(before + highlight(matching) + after);
    }
}
