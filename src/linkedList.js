module.exports = (function () {
    "use strict";


    var exports = {},
        dlNode  = function dlNode(prev, next, data) {
            return {
                prev: prev,
                next: next,
                data: data
            };
        };


    exports.linkedList = function linkedList() {

        var self       = {},
            _beginNode = dlNode(null, null, null),
            _endNode   = _beginNode,
            _length     = 0;


        Object.defineProperty(self, 'length',
            {
                configurable: false,
                enumerable:   true,
                get: function getLength() {return _length;}
            }
        );


        Object.defineProperty(self, 'isEmpty',
            {
                configurable: false,
                enumerable:   true,
                get: function () {return _beginNode === _endNode;}
            }
        );


        /**
         * Pushes an item onto the end of this list.
         * @param {any} data - The item to be pushed onto this list.
         * @returns {linkedList} This list (allows chaining)
         */
        self.push = function push(data) {
            var newNode = dlNode(null, null, data);
            insert(newNode, _endNode);
            return self;
        };


        /**
         * Removes an item from the end of this list.
         * @returns {any} The removed item
         */
        self.pop = function pop() {

            if (self.isEmpty) {
                throw new Error('Attempted to pop() on an empty list.');
            }

            return remove(_endNode.prev);
        };


        /**
         * Pushes an item onto the beginning of this list.
         * @param {any} data - The item to be pushed onto this list
         * @returns {linkedList} This list (allows chaining)
         */
        self.unshift = function unshift(data) {
            var newNode = dlNode(null, null, data);
            insert(newNode, _beginNode);
            return self;
        };


        /**
         * Removes an item from the beginning of this list.
         * @returns {any} The removed item
         */
        self.shift = function shift() {

            if (self.isEmpty) {
                throw new Error('Attempted to shift() on an empty list.');
            }

            return remove(_beginNode);
        };


        /**
         * Gets the item at the specified index.
         * @param {number} index - The index of the item to be retrieved
         * @returns {any} The specified item
         */
        self.item = function item(index) {
            var node = resolveIndex(index);
            if (node === _endNode) {
                throw new Error('Indexed one past the end of linkedList.');
            }
            return node.data;
        };


        /**
         * Inserts an item into this list before at the specified index.
         * @param {number} index - The index where the new item is to be
         *      inserted.
         * @param {any} data - The item to be inserted
         */
        self.insertAt = function insertAt(index, data) {
            var newNode = dlNode(null, null, data),
                nextNode = resolveIndex(index);
            insert(newNode, nextNode);
        };


        /**
         * Removes the item at the specified index
         * @param {number} index - The index of the item to be removed
         * @returns {any} The removed item
         */
        self.removeAt = function removeAt(index) {

            var removeNode = resolveIndex(index);
            if (removeNode === _endNode) {
                throw new Error('Attempting to remove one past the end of linkedList.');
            }

            return remove(removeNode);
        };


        self.toArray = function toArray() {
            var retArray = [],
                curNode = _beginNode;

            while (curNode !== _endNode) {
                retArray.push(curNode.data);
                curNode = curNode.next;
            }

            return retArray;
        };


        return self;

        ////////////////////////////////////////////////////////////////////////
        // Helper Functions
        ////////////////////////////////////////////////////////////////////////

        /**
         * Helper function that inserts a new node into this list.
         * @param {dlNode} newNode - The new node to be inserted
         * @param {dlNode} nextNode - The node that will follow the inserted node
         */
        function insert(newNode, nextNode) {

            // Update newNode.
            newNode.prev = nextNode.prev;
            newNode.next = nextNode;

            // Update the previous node.
            if (newNode.prev) {
                newNode.prev.next = newNode;
            } else {
                // There is no previous node.  Update _beginNode.
                _beginNode = newNode;
            }

            // Update the next node.
            nextNode.prev = newNode;

            // Update list management.
            _length += 1;
        }


        /**
         * Helper function that removes a node from the list.
         * @param {dlNode} removeNode - The node to be removed
         * @returns {any} The data associated with the removed node
         */
        function remove(removeNode) {

            // Update the previous node.
            if (removeNode.prev) {
                removeNode.prev.next = removeNode.next;
            } else {
                // We are removing the first node.
                _beginNode = removeNode.next;
            }

            // Update the next node.
            removeNode.next.prev = removeNode.prev;

            // Update list management.
            _length -= 1;

            return removeNode.data;
        }


        /**
         * Returns the node corresponding to the specified index, or the end
         * node.
         * @param {number} index - The index. This index is allowed to be one
         *      past the current maximum index.  This is needed to support
         *      insertion at the end of the list (see insertAt()).  In this
         *      case, the end node will be returned.
         * @returns {dlNode} The node corresponding to the index.
         */
        function resolveIndex(index) {
            var isPositiveIndex = (index >= 0),
                stepsRemaining,
                curNode;

            // If this list is large, there is no point in traversing the entire
            // list only to find out that the index is too large.  So do the
            // check up front.

            // Allow the index to be one past the end of the list.
            // This is needed in order to support insertAt()'s ability to
            // insert nodes at the end of the list.  In this situation,
            // _endNode will be returned.
            if (isPositiveIndex && (index > _length)) {
                throw new Error('Indexed off the end of linkedList.');
            } else if (!isPositiveIndex && -index > _length) {
                throw new Error('Indexed off the beginning of linkedList.');
            }

            if (isPositiveIndex) {
                curNode = _beginNode;
                stepsRemaining = index;
            } else {
                curNode = _endNode;
                stepsRemaining = -index;
            }

            while (stepsRemaining) {
                if (isPositiveIndex) {
                    // The following test is not needed, because this condition
                    // was checked for at the beginning of this function.
                    //if (curNode.next === _endNode) {
                    //    throw new Error('Indexed off the end of linkedList.');
                    //}
                    curNode = curNode.next;
                } else {
                    // The following test is not needed, because this condition
                    // was checked for at the beginning of this function.
                    //if (!curNode.prev) {
                    //    throw new Error('Index off the beginning of linkedList.');
                    //}
                    curNode = curNode.prev;
                }
                stepsRemaining -= 1;
            }

            // We have reached the desired node.
            return curNode;
        }
    };


    exports.linkedList.fromArray = function fromArray(srcArray) {
        var newList = exports.linkedList();

        srcArray.forEach(function (curItem) {
            newList.push(curItem);
        });

        return newList;
    };


    return exports;
})();