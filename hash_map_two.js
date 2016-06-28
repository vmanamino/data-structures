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
var count = 0;
var inner_count = 0;
var littera = '';
var group = [];
var digest = [];
var outer_count = 0;
// var current_word = 'east';

var words = ['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race'];
console.log(words);
current_letters = [];
hash_map.set('words', words);
var words_length = hash_map.get('words').length;
var hash_count = 0;
while (words_length){
  var current_word = hash_map.get('words')[0]
  while (outer_count < current_word.length){
    littera = current_word.charAt(outer_count);   
    while (count < words.length){
      var word = words[count];
      while (inner_count < word.length){
        var letter = word.charAt(inner_count)
        if (letter == littera){
          group.push(word);
          inner_count = word.length;
        }    
        inner_count++;      
      }  
      inner_count = 0;
      
      count++;
    }
    count = 0;
    if(group){
      hash_map.set(current_word, group);
    }
    words = hash_map.get(current_word);
    outer_count++;
    group = []
    
  }
  digest.push(words);
  var current_words_values = hash_map.get('words');
  var new_word_values = [];
  var match = 0;
  var word_value = '';
  for (var i = 0; i < current_words_values.length; i++){
    word_value = current_words_values[i];
    for (var j = 0; j < words.length; j++){
      if (word_value == words[j]){
        match++;
      }
    }
    if (match == 0){
      new_word_values.push(word_value);
    }
    else {
      match = 0;
    }
  }
  hash_map.set('words', new_word_values);
  current_letters = [];
  words_length = hash_map.get('words').length;
  words = hash_map.get('words');
  outer_count = 0;
  hash_count++;
}
console.log(digest)

