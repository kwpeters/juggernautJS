#!/usr/bin/env node

var path = require("path"),
    regexHelpers = require("./regexHelpers"),
    chalk        = require("chalk"),
    highlight    = chalk.bold.red;

var filesystemRegex = new RegExp(process.argv[2], "i"),
    contentsRegex = process.argv[3]? new RegExp(process.argv[3], "i") : null;

doit();

function doit() {
    "use strict";

    var walk         = require("walk"),
        ignoreDirs   = [".git", ".idea"];



    var walker = walk.walk(process.cwd(), {filters: ignoreDirs});

    if (contentsRegex) {
        walker.on("file", contentsSearchOnFile);
        walker.on("directory", contentsSearchOnDirectory);
    } else {
        walker.on("file", filesystemSearchOnFile);
        walker.on("directory", filesystemSearchOnDirectory);
    }


}

function filesystemSearchOnFile(root, fileStats, next) {
    var absPath = path.join(root, fileStats.name);
    var parts = regexHelpers.isMatch(absPath, filesystemRegex);
    if (parts) {
        highlightLine(parts);
    }
    next();

}

function contentsSearchOnFile(root, fileStats, next) {
    var absPath = path.join(root, fileStats.name);
    var parts = regexHelpers.isMatch(absPath, filesystemRegex);

    if (parts) {
        console.log("Searching contents of " + path.join(root, fileStats.name) );
        // todo: Search contents for contentsRegex.
    }

    next();
}

function filesystemSearchOnDirectory(root, dirStats, next) {
    var absPath = path.join(root, dirStats.name);
    var parts = regexHelpers.isMatch(absPath, filesystemRegex);
    if (parts) {
        highlightLine(parts);
    }
    next();
    
    
    
}

function contentsSearchOnDirectory(root, dirStats, next) {
    next();
}


function highlightLine(parts) {
    console.log(parts[0] + highlight(parts[1]) + parts[2]);
}
