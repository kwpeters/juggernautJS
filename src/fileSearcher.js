/* global require */
/* global module */

module.exports = (function () {
    "use strict";

    var _            = require('lodash'),
        fileHelpers  = require('./fileHelpers'),
        regexHelpers = require('./regexHelpers');

    //var createFileSearcher = function createFileSearcher(filePath) {
    //
    //    fileHelpers.readLines(filePath).then(
    //        function onResolve(data) {},
    //        function onError(reason) {},
    //        function onNotify(line) {
    //            console.log('notify:', line);
    //        }
    //    );
    //};

    var searchFile = function searchFile(filePath, regexes, options) {

        var lineInfos = [],
            numTrailingContextLines;

        _.defaults(options, {numContextLines: 0});

        fileHelpers.readLines(filePath).then(
            function onResolve(data) {
                console.log(lineInfos);
            },
            function onError(reason) {
            },
            function onNotify(line) {

                var isMatch,
                    prevLineInfos,
                    isInContext;

                isMatch = regexHelpers.matchesAny(line, regexes);

                if (isMatch && options.numContextLines) {
                    // Go back and make sure the preceding context lines are
                    // marked as in-context.
                    prevLineInfos = lineInfos.slice(-1 * options.numContextLines);
                    prevLineInfos.forEach(function (curPrevLineInfo) {
                        curPrevLineInfo.inContext = true;
                    });
                }

                isInContext = isMatch || (numTrailingContextLines > 0);
                lineInfos.push({inContext: isInContext, text: line});

                if (isMatch) {
                    // The line we just pushed was a matching line, so reset
                    // the number of trailing lines that will be considered as
                    // part of the context.
                    numTrailingContextLines = options.numContextLines;
                } else if (numTrailingContextLines > 0) {
                    // The line we just pushed was part of a trailing context.
                    // Decrement the number of trailing context lines.
                    numTrailingContextLines -= 1;
                }
            }
        );


    };


    return {
        //createFileSearcher: createFileSearcher
        searchFile: searchFile
    };
})();