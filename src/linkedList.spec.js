/* global describe */
/* global beforeEach */
/* global inject */
/* global it */
/* global expect */
/* global module */

var _ = require('lodash');


describe('LinkedList', function () {
    "use strict";

    var llMod = require('./linkedList');


    it('should be creatable', function () {
        expect(_.isFunction(llMod.linkedList)).toBeTruthy();

        var aList = llMod.linkedList();
        expect(aList).toBeDefined();
    });


    it('should have a length property', function () {
        var aList = llMod.linkedList();

        expect(aList.length).toBeDefined();
        expect(aList.length).toBe(0);

        aList.push(1);
        expect(aList.length).toBe(1);
    });


    it('should have an isEmpty property', function () {
        var aList = llMod.linkedList();
        expect(aList.isEmpty).toBeTruthy();

        aList.push(1);
        expect(aList.isEmpty).toBeFalsy();
    });


    it('should allow pushing items onto the end', function () {
        var aList = llMod.linkedList();
        expect(aList.length).toBe(0);

        aList.push('one hen');
        expect(aList.length).toBe(1);

        aList.push('two ducks');
        expect(aList.length).toBe(2);

        aList.push('three squaking geese');
        expect(aList.length).toBe(3);

        // Should be chainable.
        aList.push('four limerick oysters').push('five corpulan porpoises');
        expect(aList.length).toBe(5);
    });


    it('should allow popping items from the end', function () {
        var aList = llMod.linkedList(),
            curValue;

        aList.push(1).push(2).push(3);
        expect(aList.length).toBe(3);

        curValue = aList.pop();
        expect(curValue).toBe(3);
        expect(aList.length).toBe(2);

        curValue = aList.pop();
        expect(curValue).toBe(2);
        expect(aList.length).toBe(1);

        curValue = aList.pop();
        expect(curValue).toBe(1);
        expect(aList.length).toBe(0);

        // Pop an empty list.
        expect(function () {aList.pop();}).toThrow();
        expect(aList.length).toBe(0);
    });


    it('should allow unshifting onto the beginning', function () {
        var aList = llMod.linkedList();
        expect(aList.length).toBe(0);

        aList.unshift(1);
        expect(aList.length).toBe(1);

        aList.unshift(2);
        expect(aList.length).toBe(2);

        aList.unshift(3);
        expect(aList.length).toBe(3);

        aList.unshift(4).unshift(5);
        expect(aList.length).toBe(5);
    });


    it('should allow shifting items off the beginning', function () {
        var aList = llMod.linkedList(),
            curValue;

        aList.unshift(1).unshift(2).unshift(3);
        expect(aList.length).toBe(3);

        curValue = aList.shift();
        expect(curValue).toBe(3);
        expect(aList.length).toBe(2);

        curValue = aList.shift();
        expect(curValue).toBe(2);
        expect(aList.length).toBe(1);

        curValue = aList.shift();
        expect(curValue).toBe(1);
        expect(aList.length).toBe(0);

        // Shift an empty list.
        expect(function () {aList.shift();}).toThrow();
        expect(aList.length).toBe(0);
    });


    it('should allow retieving the value at a specified index', function () {
        var aList = llMod.linkedList();

        // Indexing of any kind into an empty array should cause it to throw.
        expect(function () {aList.item(0);}).toThrow();
        expect(function () {aList.item(-1);}).toThrow();

        aList.push(1).push(2).push(3).push(4).push(5);

        expect(aList.item(0)).toBe(1);
        expect(aList.item(2)).toBe(3);
        expect(aList.item(4)).toBe(5);
        // Indexing off the end.
        expect(function () {aList.item(5);}).toThrow();

        expect(aList.item(-1)).toBe(5);
        expect(aList.item(-3)).toBe(3);
        expect(aList.item(-5)).toBe(1);
        // Indexing off the beginning.
        expect(function () {aList.item(-6);}).toThrow();
    });


    it('should allow insertion into the list', function () {
        var aList = llMod.linkedList();
        // When inserting into an empty list, only index 0 is allowed.
        expect(function () {aList.insertAt(1, 'foo');}).toThrow();
        aList.insertAt(0, 0);
        expect(aList.length).toBe(1);
        expect(aList.item(0)).toBe(0);

        expect(aList.insertAt(1, 1));
        expect(aList.length).toBe(2);
        expect(aList.item(0)).toBe(0);
        expect(aList.item(1)).toBe(1);

        // Inserting at an invalid index should throw.
        expect(function () {aList.insertAt(3, 3);}).toThrow();
        expect(aList.length).toBe(2);
        expect(aList.item(0)).toBe(0);
        expect(aList.item(1)).toBe(1);

    });


    it('should allow removal from the list', function () {
        var aList = llMod.linkedList();

        // Removing from an empty list should throw.
        expect(function () { aList.removeAt(0); }).toThrow();

        aList.push('foo');

        // Removing one past the end should throw an exception.
        expect(function () { aList.removeAt(1); }).toThrow();

        // Removing an item should return the removed item.
        expect(aList.removeAt(0)).toBe('foo');
    });


    it('should support creation from an array', function () {
        var src = [0, 1, 2, 3, 4],
            list;

        expect(_.isFunction(llMod.linkedList.fromArray)).toBeTruthy();

        list = llMod.linkedList.fromArray(src);
        expect(list.isEmpty).toBeFalsy();
        expect(list.length).toBe(5);
        expect(list.item(0)).toBe(0);
        expect(list.item(1)).toBe(1);
        expect(list.item(2)).toBe(2);
        expect(list.item(3)).toBe(3);
        expect(list.item(4)).toBe(4);
    });


    it('should allow conversion to an array', function () {
        var list = llMod.linkedList.fromArray([0, 1, 2]),
            dest;

        dest = list.toArray();
        expect(_.isArray(dest)).toBeTruthy();
        expect(dest.length).toBe(3);
        expect(dest[0]).toBe(0);
        expect(dest[1]).toBe(1);
        expect(dest[2]).toBe(2);
    });

    // todo: iterator/iterable
    // todo: clear
    // todo: Make insertAt() accept an array of items to insert.
    // todo: find(value, equals?, start?)
    // todo: forEach
    // todo: filter
    // todo: map
    // todo: reduce
});