#!/usr/bin/env node


var MarkdownCompiler = require('./MarkdownCompiler.js'),    // the constructor
    mdCompiler = new MarkdownCompiler();              // a compiler instance


function main() {
    var filesToProcess = process.argv.slice(2),
        curIndex,
        curSourceFile;

    for (curIndex = 0; curIndex < filesToProcess.length; ++curIndex) {

        curSourceFile = filesToProcess[curIndex];

        mdCompiler.compileToHtml(curSourceFile, function (err, results) {
            if (err) {
                //console.log(err);
            } else {
                // Successful compilation.
                // The result is the output file name.
                console.log('Successfully built ' + results);
            }
        });
    }
}

main();
