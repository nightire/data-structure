module.exports = List;

function List() {
  this.dataStore = [];
  this.size      = 0;
  this.index     = 0;
}

List.prototype.length = function () {
  return this.size;
};

List.prototype.append = function (element) {
  this.dataStore[this.size++] = element;
};

List.prototype.find = function (element) {
  var i = 0;

  for (; i < this.size; i += 1) {
    if (this.dataStore[i] === element) return i;
  }
  return -1;
};

List.prototype.remove = function (element) {
  var foundAt = this.find(element);

  if (foundAt > -1) {
    this.dataStore.splice(foundAt, 1);
    this.size -= 1;
    return true;
  }
  return false;
};

List.prototype.toString = function () {
  return this.dataStore;
};

List.prototype.insert = function (element, after) {
  var insertPosition = this.find(after);

  if (insertPosition > -1) {
    this.dataStore.splice(insertPosition + 1, 0, element);
    this.size += 1;
    return true;
  }
  return false;
};

List.prototype.clear = function () {
  this.dataStore = [];
  this.size = 0;
};

List.prototype.contains = function (element) {
  var i = 0;

  for (; i < this.size; i += 1) {
    if (this.dataStore[i] === element) return true;
  }
  return false;
};

List.prototype.current = function () {
  return this.dataStore[this.index];
};

List.prototype.toFirst = function () {
  this.index = 0;
};

List.prototype.toLast = function () {
  this.index = this.size - 1;
};

List.prototype.next = function () {
  if (this.index < this.size - 1) {
    this.index += 1;
    return true;
  }
  return false;
};

List.prototype.prev = function () {
  if (this.index > 0) {
    this.index -= 1;
    return true;
  }
  return false;
};

List.prototype.moveTo = function (index) {
  if (index >= 0 && index < this.size) {
    this.index = index;
    return true;
  }
  throw new Error('Out of range');
};
