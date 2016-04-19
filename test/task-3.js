
/*!
 * Enveronment.
 */

process.env.NODE_ENV = 'test'

/*!
 * Module dependencies.
 */

var assert = require('chai').assert;
var inspect = require("util").inspect
var task = require('../task-3');

describe('Task 3', function () {
  it('should return the tree', function () {
    var arr = [{id: 1, parentId: 0}, {id: 2, parentId: 0}, {id: 3, parentId: 1}, {id: 4, parentId: 1}, {id: 5, parentId: 2}, {id: 6, parentId: 4}, {id: 7, parentId: 5}];
    var standard = [
      { id: 1, parentId: 0, children: [{ id: 3, parentId: 1 }, { id: 4, parentId: 1, children: [{ id: 6, parentId: 4 }] }] },
      { id: 2, parentId: 0, children: [{ id: 5, parentId: 2, children: [{ id: 7, parentId: 5 }] }] }
    ];

    assert.equal(JSON.stringify(task(arr)), JSON.stringify(standard));
  })
})
