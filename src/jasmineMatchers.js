function replacer(k, v) {
    if (typeof v === 'function') {
        v = v.toString();
    }

    return v;
}

jasmine.Matchers.prototype.toBeJsonEqual = function (expected) {
    var one = JSON.stringify(this.actual, replacer).replace(/(\\t|\\n)/g, ''),
        two = JSON.stringify(expected, replacer).replace(/(\\t|\\n)/g, '');

    return one === two;
};
