var _ = require('lodash');

module.exports = (function () {
    var exports = {};

    exports.range = function (begin, end) {
        return new Range(begin, end);
    };

    exports.ranges = function () {
        return new Ranges();
    };

    return exports;
})();


function Range(begin, end) {
    var _begin = begin,
        _end   = end;

    Object.defineProperty(
        this,
        'begin',
        {
            configurable: false,
            enumerable:   true,
            value:        begin,
            writable:     false
        }
    );

    Object.defineProperty(
        this,
        'end',
        {
            configurable: false,
            enumerable:   true,
            value:        end,
            writable:     false
        }
    );

    this.contains = function contains(value) {
        return _.inRange(value, _begin, _end);
    }
}


function Ranges() {

    // Data members
    var self = this,
        _ranges = [];


    this.ranges = function ranges() {
        return _ranges;
    };


    this.union = function union(range) {
        if (_ranges.length === 0) {
            _ranges.push(range);
        }

        return self;
    };
    

}