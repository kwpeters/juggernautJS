/* global module */
/* global require */

var fs = require('fs'),
    Promise  = require('bluebird');


module.exports = (function () {
    "use strict";

    /**
     * Returns a file's contents as an array of strings.
     * @param {string} filePath - The file to be read
     * @returns {string[]} The lines of the file (without trailing \n)
     */
    function readLinesSync(filePath) {
        var buffer,
            contents,
            lines;

        buffer = fs.readFileSync(filePath);
        contents = buffer.toString().trim();
        lines = contents.split('\n');

        return lines;
    }


    /**
     * Reads the specified file and returns the contents as an array of lines.
     * @param {string} filePath - The file to be read
     * @returns {promise} A promise that is resolved with an array cotaining one
     *      string for each line of text from the file.
     */
    function readLines(filePath) {

        return new Promise(function (resolve, reject) {

            var lines = [],
                readStream,
                remaining = '';

            readStream = fs.createReadStream(filePath);

            readStream.on('data', function onData(data) {
                remaining += data;
                var index = remaining.indexOf('\n');
                var last = 0;
                while (index > -1) {
                    var line = remaining.substring(last, index);
                    last = index + 1;
                    lines.push(line);
                    index = remaining.indexOf('\n', last);
                }

                if (last > 0) {
                    remaining = remaining.substring(last);
                }
            });

            readStream.on('end', function () {
                if (remaining.length > 0) {
                    lines.push(remaining);
                }

                resolve(lines);
            });
        });
    }


    return {
        readLines:     readLines,
        readLinesSync: readLinesSync
    };
})();
