/* global describe */
/* global beforeEach */
/* global inject */
/* global it */
/* global expect */
/* global module */

require('./jasmineMatchers');

describe('Range', function () {
    "use strict";

    var rm = require('./ranges'),
        _  = require('lodash');

    it('factory function should exist and should create a new range instance', function () {
        var range;

        expect(_.isFunction(rm.range)).toBeTruthy();
        range = rm.range(3, 6);
    });

    it('should have a begin property', function () {
        var range = rm.range(3, 6);
        expect(range.begin).toEqual(3);
    });

    it('should have an end property', function () {
        var range = rm.range(3, 6);
        expect(range.end).toEqual(6);
    });

    it('should have a contains method that determines if the specified value is in the range', function () {
        var range = rm.range(3, 6);

        expect(range.contains(2)).toBeFalsy();
        expect(range.contains(3)).toBeTruthy();
        expect(range.contains(4)).toBeTruthy();
        expect(range.contains(6)).toBeFalsy();
        expect(range.contains(7)).toBeFalsy();
    });

});


describe('Ranges', function () {
    "use strict";

    var rm = require('./ranges'),
        _  = require('lodash');

    beforeEach(function () {
    });

    it('factory function should exist and should create new empty instances', function () {

        var ranges;
        expect(_.isFunction(rm.ranges)).toBeTruthy();

        ranges = rm.ranges();
        expect(ranges).toBeTruthy();

        expect(_.isFunction(ranges.ranges)).toBeTruthy();
        expect(ranges.ranges()).toEqual([]);
    });


    it('should support union', function () {
        var ranges = rm.ranges();

        expect(_.isFunction(ranges.union)).toBeTruthy();
        ranges.union(rm.range(5, 10));
        expect(ranges.ranges()).toBeEqualSansFuncs([rm.range(5, 10)]);

        ranges.union(rm.range(1, 2));
        //expect(ranges.ranges()).toBeEqualSansFuncs(([rm.range(1, 2), rm.range(5, 10)]));
    });

});