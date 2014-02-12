#!/usr/bin/env node

var MarkdownCompiler = require('./MarkdownCompiler.js'), // the constructor
    mdCompiler = new MarkdownCompiler(),                 // a compiler instance
    argv = require('optimist').argv,
    os = require('os'),
    fs = require('fs');


function main() {
    var filesToProcess = argv['_'],
        curIndex,
        curSourceFile,
        cssFiles = [].concat(argv['cssFile']),
        linkElems = [],
        cssStr;

    // Build the link elements that will pull in the desired CSS files.
    for (curIndex = 0; curIndex < cssFiles.length; ++curIndex) {
        linkElems.push('<link rel="stylesheet" href="' + cssFiles[curIndex] + '">');
    }
    cssStr = linkElems.join(os.EOL);

    for (curIndex = 0; curIndex < filesToProcess.length; ++curIndex) {

        curSourceFile = filesToProcess[curIndex];

        mdCompiler.compileToHtml(curSourceFile, function (err, results) {
            if (err) {
                //console.log(err);
            } else {
                // Successful compilation.
                // The result is the output file name.

                fs.appendFileSync(results, cssStr);
                console.log('Successfully built ' + results);
            }
        });
    }
}

main();
