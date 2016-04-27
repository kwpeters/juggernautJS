var _ = require('lodash');

module.exports = (function () {
    "use strict";

    function matchesAny(theString, regexes) {
        return _.any(regexes, function testCurRegex(curRegex) {
            return curRegex.test(theString);
        });
    }

    return {matchesAny: matchesAny};
})();