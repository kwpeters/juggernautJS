#!/usr/bin/env node

var walk = require("walk"),
    fs   = require("fs"),
    path = require("path");


var walker = walk.walk(process.cwd());


walker.on("file", function onFile(root, fileStats, next) {
    var absPath = path.join(root, fileStats.name);
    console.log("file: " + absPath);
    next();
});


walker.on("directory", function onFile(root, dirStats, next) {
    var absPath = path.join(root, dirStats.name);
    console.log("dir:  " + absPath);
    next();
});



