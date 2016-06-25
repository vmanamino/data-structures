var HashMap = function(initialCapacity) {
    this.length = 0;
    this._slots = [];
    this._capacity = initialCapacity || 8;
    this._deleted = 0;
};
HashMap.MAX_LOAD_RATIO = 0.9;
HashMap.SIZE_RATIO = 3;

HashMap._hashString = function(string) {
    var hash = 5381;
    for (var i=0; i<string.length; i++) {
        hash = (hash << 5) + hash + string.charCodeAt(i);
        hash = hash & hash;
    }
    return hash >>> 0;
};

HashMap.prototype.get = function(key) {
    var index = this._findSlot(key);
    if (this._slots[index] === undefined) {
        throw new Error('Key error');
    }
    return this._slots[index].value;
};

HashMap.prototype.get_index = function(key) {
    var index = this._findSlot(key);
    if (this._slots[index] === undefined) {
        throw new Error('Key error');
    }
    return index;
};

HashMap.prototype.set = function(key, value) {
    var loadRatio = (this.length + this._deleted + 1) / this._capacity;
    if (loadRatio > HashMap.MAX_LOAD_RATIO) {
        this._resize(this._capacity * HashMap.SIZE_RATIO);
    }

    var index = this._findSlot(key);
    this._slots[index] = {
        index: index,
        key: key,
        value: value,
        deleted: false
    };
    this.length++;
};

HashMap.prototype.remove = function(key) {
    var index = this._findSlot(key);
    var slot = this._slots[index];
    if (slot === undefined) {
        throw new Error('Key error');
    }
    slot.deleted = true;
    this.length--;
    this._deleted++;
};

HashMap.prototype._findSlot = function(key) {
    var hash = HashMap._hashString(key);
    var start = hash % this._capacity;

    for (var i=start; i<start + this._capacity; i++) {
        var index = i % this._capacity;
        var slot = this._slots[index];
        if (slot === undefined || (slot.key == key && !slot.deleted)) {
            return index;
        }
    }
    // Unreachable
};

HashMap.prototype._resize = function(size) {
    var oldSlots = this._slots;
    this._capacity = size;
    this._deleted = 0;
    this._slots = [];
    for (var i=0; i<oldSlots.length; i++) {
        var slot = oldSlots[i];
        if (slot !== undefined && !slot.deleted) {
            this.set(slot.key, slot.value);
        }
    }
};

var hash_map = new HashMap();
console.log('initial length'+hash_map.length)

var example1 = 'cclli';

var length = example1.length;

var count = 0;

while (count < length){
  
  hash_map.set(example1.charAt(count), 0)
  count++;
}
count = 0;
inner = 0;
var value = 0;
var littera = '';
var indices = [];
console.log(hash_map._slots);
while (count < length){
  var instances = hash_map.get(example1.charAt(count));
  littera = example1.charAt(count);
  inner = count
  if (!instances){
    
    while (inner < length){
      if (littera == example1.charAt(inner)){
        value++;
        hash_map.set(littera, value);
        if (value == 1){
          indices.push(hash_map.get_index(littera))
        }
        
      }
      inner++;
    }
    value = 0;
  }
  else {
    
    console.log('multiple instances '+instances+' of '+example1.charAt(count))
  }
  
  count++;
}
count = 0;

// length = hash_map.length;
console.log(hash_map._slots);
console.log(indices)
while (count < indices.length){
  console.log(hash_map._slots[indices[count]])
  count++;
}