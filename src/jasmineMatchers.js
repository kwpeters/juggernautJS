/**
 * This file contains additional Jasmine matchers.  They are written to work
 * with Jasmine 1.3, because that's what the current release (1.14.5) of jasmine-node
 * uses.
 */
var util = require('util'),
    _    = require('lodash');


/**
 * Matcher that will compare the JSON of two objects.
  * @param {object} expected - Object representing expected value
 * @returns {undefined} Returns undefined when the two objects are considered
 *      equal.  Throws an Error() when the two objects are not equal.
 */
jasmine.Matchers.prototype.toBeJsonEqual = function (expected) {
    var msg,
        replacer;

    replacer = function replacer(k, v) {
        if (_.isFunction(v)) {
            v = v.toString();
        }

        return v;
    };

    var actualJson   = JSON.stringify(this.actual, replacer).replace(/(\\t|\\n)/g, ''),
        expectedJson = JSON.stringify(expected,    replacer).replace(/(\\t|\\n)/g, '');

    if (actualJson !== expectedJson) {
        msg = util.format('Expected\n%s to be\n%s', actualJson, expectedJson);
        throw new Error(msg);
    }
};

/**
 * Matcher that will compare all properties of two objects, excluding their
 * function properties.
 * @param {object} expected - Object containing expected properties
 * @returns {undefined} Returns undefined when the two objects are considered
 *      equal.  Throws an Error() when the two objects are not equal.
 */
jasmine.Matchers.prototype.toBeEqualSansFuncs = function (expected) {
    var comparisonCustomizer,
        isEqual,
        msg;

    compareAllExceptFunctions = function compareAllExceptFunctions(thisValue, thatValue, key) {

        if (_.isFunction(thisValue) && _.isFunction(thatValue)) {
            // They are both functions.  Assume the are "equal."
            return true;
        }

        // When undefined is returned, the standard comparison method will be
        // used.
    };

    isEqual = _.isEqual(expected, this.actual, compareAllExceptFunctions);

    if (!isEqual) {
        msg = util.format('%j (expected) does not equal\n%j (actual)', expected, this.actual);
        throw new Error(msg);
    }
};