#!/usr/bin/env node

var path = require("path"),
    _ = require("lodash"),
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
    var fileParts = regexHelpers.isMatch(absPath, filesystemRegex);

    if (fileParts) {
        var fileHelpers = require("./fileHelpers");

        fileHelpers.readLines(absPath)
            .then(function (lines) {
                var matchingLines = _.chain(lines)
                    .map(
                        function (curLine) {
                            return regexHelpers.isMatch(curLine, contentsRegex);
                        }
                    )
                    .filter(
                        function (matchParts) {
                            return matchParts;
                        }
                    )
                    .value();

                highlightLine(fileParts);
                _.forEach(matchingLines, function (lineParts) { highlightLine(lineParts); });
            });
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
