var _ = require('lodash');

module.exports = (function () {
    "use strict";

    /**
     * Determines whether the specified string matches any of the specified regexes.
     * @param {string} theString - The string to match
     * @param {RegExp[]} regexes - The regular expressions to use
     * @returns {Boolean} true if one or more of the specified regular expressions
     * match the string.  false otherwise.
     */
    function matchesAny(theString, regexes) {
        return _.any(regexes, function testCurRegex(curRegex) {
            return curRegex.test(theString);
        });
    }

    /**
     * Determines whether the specified regex matches the specified string.
     * @param {string} str - The string to test
     * @param {RegExp} regex
     * @returns {null | string[]} null if a match was not found.  A 3-element array
     * if a match was found.  The first element contains the substring before the match.
     * The second element contains the substring matching the pattern.  The third
     * element contains the substring following the match.
     */
    function isMatch(str, regex) {
        "use strict";

        var chalk = require("chalk");

        var match = str.match(regex);
        if (match !== null) {
            var before = match.input.slice(0, match.index);
            var matching = match[0];
            var after = match.input.slice(match.index + matching.length);

            return [before, matching, after];
        } else {
            return null;
        }
    }


    return {
        matchesAny: matchesAny,
        isMatch:    isMatch
    };
})();
