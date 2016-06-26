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
    return this._slots[index].index;
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

var words = ['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race'];

var count = 0;
var inner_count = 0;
var littera = '';
var group = [];
var princeps = [];
var outer_count = 0;
var first_word = 'east'
while (outer_count < first_word.length){
  littera = first_word.charAt(outer_count);
  console.log(littera)
  while (count < words.length){
    var word = words[count];
    while (inner_count < word.length){
      var letter = word.charAt(inner_count)
      if (letter == littera){
        group.push(word);
        inner_count = word.length;
        console.log('yes')
      }    
      inner_count++;      
    }  
    inner_count = 0;
    count++;
  }
  count = 0;
  if(group){
    princeps.push(group)
  }
  outer_count++;
  group = []
}
console.log(princeps)
// while(count < words.length){
//   var word = words[count];
//   inner_count = 0;
//   while ()
//   count++;
// }
