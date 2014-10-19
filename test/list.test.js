var assert = require('assert');
var List   = require('../lib/list');

describe('List', function () {
  var aList = new List();

  it('instance has correct constructor', function () {
    assert.equal(aList.constructor, List);
  });

  describe('this.dataStore', function () {
    it('is an array', function () {
      assert(Array.isArray(aList.dataStore));
    });

    it('is empty by default', function () {
      assert.equal(aList.dataStore.length, 0);
    });
  });

  describe('this.size', function () {
    it('represents the amount of elements in list', function () {
      assert.equal(aList.size, 0);
    });
  });

  describe('this.index', function () {
    it('indicate the current index of list\'s dataStore', function () {
      assert.equal(aList.index, 0);
    });
  });
});

describe('List.prototype.length', function () {
  it('alias for this.size', function () {
    var aList = new List();
    assert.equal(aList.length(), 0);
  });
});

describe('List.prototype.append', function () {
  var aList;

  beforeEach(function () {
    aList = new List();
    aList.append(1);
  });

  it('add element to the next position in list', function () {
    assert.equal(aList.size, 1);
  });

  it('add list\'s size by 1 at each call', function () {
    assert.equal(aList.dataStore[0], 1);
  });
});

describe('List.prototype.find', function () {
  var aList;

  beforeEach(function () {
    aList = new List();
    ['a', 'b', 'c', 'd'].forEach(function (element) {
      aList.append(element);
    });
  });

  it('return index of list for specified element', function () {
    assert.equal(aList.find('d'), 3);
  });

  it('return -1 if specified element can not be found', function () {
    assert.equal(aList.find('x'), -1);
  });
});

describe('List.prototype.remove', function () {
  var aList;

  beforeEach(function () {
    aList = new List();
    ['a', 'b', 'c', 'd'].forEach(function (element) {
      aList.append(element);
    });
  });

  describe('if element can be found', function () {
    it('removes it', function () {
      aList.remove('b');
      assert.deepEqual(aList.dataStore, ['a', 'c', 'd'], 'remove the element');
    });

    it('then reduce this.size by 1', function () {
      aList.remove('b');
      assert.equal(aList.size, 3);
    });

    it('and return true finally', function () {
      assert(aList.remove('b'));
    });
  });

  describe('if element can not be found', function () {
    it('return false', function () {
      assert.equal(aList.remove('x'), false);
    });
  });
});

describe('List.prototype.toString', function () {
  it('return this.dataStore', function () {
    var aList = new List();
    ['a', 'b', 'c', 'd'].forEach(function (element) {
      aList.append(element);
    });
    assert.deepEqual(aList.toString(), ['a', 'b', 'c', 'd']);
  });
});

describe('List.prototype.insert', function () {
  var aList;

  beforeEach(function () {
    aList = new List();
    ['a', 'b', 'c', 'd'].forEach(function (element) {
      aList.append(element);
    });
  });

  describe('specified element can be found', function () {
    it('insert new element after it', function () {
      aList.insert('b\'', 'b');
      assert.deepEqual(aList.dataStore, ['a', 'b', 'b\'', 'c', 'd']);
    });

    it('then increase this.size by 1', function () {
      aList.insert('b\'', 'b');
      assert.equal(aList.size, 5);
    });

    it('return true finally', function () {
      assert(aList.insert('b\'', 'b'));
    });
  });

  describe('if specified element can not be found', function () {
    it('return false', function () {
      assert.equal(aList.insert('b\'', 'x'), false);
    });
  });
});

describe('List.prototype.clear', function () {
  it('empty this.dataStore and reset this.size', function () {
    var aList = new List();
    aList.append('a');
    aList.clear();
    assert.deepEqual(aList.dataStore, []);
    assert.equal(aList.size, 0);
  });
});

describe('List.prototype.contains', function () {
  var aList;

  beforeEach(function () {
    aList = new List();
    ['a', 'b', 'c', 'd'].forEach(function (element) {
      aList.append(element);
    });
  });

  it('return true if element can be found', function () {
    assert(aList.contains('c'));
  });

  it('return false if element can not be found', function () {
    assert.equal(aList.contains('x'), false);
  });
});

describe('List.prototype.{movements}', function () {
  var aList;

  beforeEach(function () {
    aList = new List();
    ['a', 'b', 'c', 'd'].forEach(function (element) {
      aList.append(element);
    });
  });

  describe('#current', function () {
    it('represents the current element of list', function () {
      assert.equal(aList.current(), 'a');
    });
  });

  describe('#toFirst', function () {
    it('move the current position to the first element', function () {
      aList.toLast();
      aList.toFirst();
      assert.equal(aList.current(), 'a');
    });
  });

  describe('#toLast', function () {
    it('move the current position to the last element', function () {
      aList.toLast();
      assert.equal(aList.current(), 'd');
    });
  });

  describe('#next', function () {
    it('move the index to next position and return true', function () {
      assert(aList.next());
      assert.equal(aList.current(), 'b');
    });

    it('return false if current element is the last one', function () {
      aList.toLast();
      assert.equal(aList.next(), false);
    });
  });

  describe('#prev', function () {
    it('move the index to previous position and return true', function () {
      aList.toLast();
      assert(aList.prev());
      assert.equal(aList.current(), 'c');
    });

    it('return false if current element is the first one', function () {
      assert.equal(aList.prev(), false);
      assert.equal(aList.current(), 'a');
    });
  });

  describe('moveTo', function () {
    it('move the index to anywhere specified', function () {
      assert(aList.moveTo(2));
      assert.equal(aList.current(), 'c');
    });

    it('throw an error if beyond the list\'s range', function () {
      assert.throws(
        function () { aList.moveTo(10) },
        function (e) {
          if ( (e instanceof Error) && /range/.test(e) ) return true;
        }
      );
      assert.throws(
        function () { aList.moveTo(-2) },
        function (e) {
          if ( (e instanceof Error) && /range/.test(e) ) return true;
        }
      );
    });
  });
});
