/* global module */
/* global require */

var fs = require('fs'),
    q  = require('q');


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
     * Reads a file and invokes func with each line read.
     * @param {string} filePath - Path to the file to be read
     * @param {callback} func - Called as each line is read. Accepts one
     * parameter, which is the line of text (without trailing \n).
     */
    //function readLines(filePath, func) {
    //    var readStream,
    //        remaining = '';
    //
    //    readStream = fs.createReadStream(filePath);
    //
    //    readStream.on('data', function(data) {
    //        remaining += data;
    //        var index = remaining.indexOf('\n');
    //        var last  = 0;
    //        while (index > -1) {
    //            var line = remaining.substring(last, index);
    //            last = index + 1;
    //            func(line);
    //            index = remaining.indexOf('\n', last);
    //        }
    //
    //        if (last > 0) {
    //            remaining = remaining.substring(last);
    //        }
    //
    //    });
    //
    //    readStream.on('end', function() {
    //        if (remaining.length > 0) {
    //            func(remaining);
    //        }
    //    });
    //}

    /**
     * Reads the specified file and notifies as each line is read.
     * @param {string} filePath - The file to be read
     * @returns {promise} Notification supplies each line as it is read.
     *      Resolution supplies an empty object.
     */
    function readLines(filePath) {
        var dfd       = q.defer(),
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
                dfd.notify(line);
                index = remaining.indexOf('\n', last);
            }

            if (last > 0) {
                remaining = remaining.substring(last);
            }
        });

        readStream.on('end', function () {
            if (remaining.length > 0) {
                dfd.notify(remaining);
            }

            dfd.resolve({});
        });

        return dfd.promise;
    }


    return {
        readLines:     readLines,
        readLinesSync: readLinesSync
    };
})();